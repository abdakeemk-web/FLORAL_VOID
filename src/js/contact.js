// Commission form: preselects the service, validates, and submits to Web3Forms.
// The applicant's email is sent as the `email` field so Web3Forms uses it as the
// Reply-To address: replying to the owner notification in Gmail answers the applicant.
(function () {
  var WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  var form = document.getElementById('commission-form');
  if (!form) return;

  var status = form.querySelector('.form-status');
  var submitButton = form.querySelector('.submit');
  var submitLabel = form.querySelector('.submit-label');
  var success = document.querySelector('.form-success');
  var serviceSelect = document.getElementById('service');
  var serviceNote = document.getElementById('service-note');
  var defaultServiceNote = serviceNote.textContent;

  var fieldNames = ['name', 'email', 'discord', 'service', 'budget', 'description', 'character', 'references', 'notes', 'termsAccepted'];
  var limits = { name: 100, email: 254, discord: 64, budget: 100, description: 3000, character: 2000, references: 2000, notes: 2000 };
  var emailPattern = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;

  var isSubmitting = false;

  function serviceLabel() {
    var option = serviceSelect.options[serviceSelect.selectedIndex];
    return option && option.value ? option.text : '';
  }

  function fieldValue(name) {
    var element = form.elements[name];
    if (element.type === 'checkbox') return element.checked;
    return element.value.trim();
  }

  function checkField(name) {
    var value = fieldValue(name);
    if (name === 'name' && !value) return 'Please enter your name.';
    if (name === 'email') {
      if (!value) return 'Please enter your email address.';
      if (!emailPattern.test(value)) return 'Please enter a complete email address, like name@example.com.';
    }
    if (name === 'service' && !value) return 'Please choose a service.';
    if (name === 'description') {
      if (!value) return 'Please describe what you would like made.';
      if (value.length < 20) return 'Please give a little more detail (at least 20 characters).';
    }
    if (name === 'termsAccepted' && !value) return 'Please confirm that you accept the Terms of Service.';
    if (limits[name] && value.length > limits[name]) return 'This is too long. Please keep it under ' + limits[name] + ' characters.';
    return '';
  }

  function showError(name, message) {
    var element = form.elements[name];
    var error = document.getElementById(name + '-error');
    if (message) {
      error.textContent = message;
      error.hidden = false;
      element.setAttribute('aria-invalid', 'true');
    } else {
      error.textContent = '';
      error.hidden = true;
      element.removeAttribute('aria-invalid');
    }
  }

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'form-status' + (message ? ' is-' + kind : '');
  }

  function updateServiceNote() {
    var option = serviceSelect.options[serviceSelect.selectedIndex];
    if (!option || !option.value) {
      serviceNote.textContent = defaultServiceNote;
    } else if (option.dataset.quote === 'true') {
      serviceNote.textContent = 'This service is priced by quote. Tell me what you need and I will send you a quote.';
    } else {
      serviceNote.textContent = 'Starting price: ' + option.dataset.price + '. Final prices depend on your character.';
    }
  }

  function preselectService() {
    var requested = new URLSearchParams(window.location.search).get('service');
    if (!requested) return;
    for (var i = 0; i < serviceSelect.options.length; i += 1) {
      if (serviceSelect.options[i].value === requested) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  function validateAll() {
    var firstInvalid = null;
    var count = 0;
    fieldNames.forEach(function (name) {
      var message = checkField(name);
      showError(name, message);
      if (message) {
        count += 1;
        if (!firstInvalid) firstInvalid = form.elements[name];
      }
    });
    return { count: count, firstInvalid: firstInvalid };
  }

  function collect() {
    var data = {};
    fieldNames.forEach(function (name) { data[name] = fieldValue(name); });
    data.botcheck = form.elements.botcheck.value;
    return data;
  }

  // Web3Forms expects multipart form data (no JSON Content-Type header: the
  // browser sets the boundary itself). `email` becomes the Reply-To address.
  function buildPayload(data) {
    var payload = new FormData();
    payload.append('access_key', form.elements.access_key.value);
    payload.append('subject', 'New commission application: ' + serviceLabel() + ' from ' + data.name);
    payload.append('from_name', 'FLORAL VOID Commission Form');
    payload.append('name', data.name);
    payload.append('email', data.email);
    payload.append('discord', data.discord);
    payload.append('service', serviceLabel());
    payload.append('budget', data.budget);
    payload.append('description', data.description);
    payload.append('character', data.character);
    payload.append('references', data.references);
    payload.append('notes', data.notes);
    payload.append('termsAccepted', data.termsAccepted ? 'Yes' : 'No');
    if (data.botcheck) payload.append('botcheck', data.botcheck);
    return payload;
  }

  function setSubmitting(active) {
    isSubmitting = active;
    submitButton.disabled = active;
    submitButton.setAttribute('aria-busy', active ? 'true' : 'false');
    submitLabel.textContent = active ? 'Sending…' : 'Submit application';
  }

  // The free Web3Forms plan does not send an automatic confirmation email to the
  // applicant, so success only ever claims that the application was received.
  function showSuccess() {
    success.querySelector('.success-message').textContent = 'Your commission application has been submitted successfully. FLORAL VOID will review it and get back to you.';
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  function showFailure(message) {
    setStatus(message || 'Something went wrong while submitting your application. Please try again or contact FLORAL VOID directly.', 'error');
    status.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (isSubmitting) return;

    var result = validateAll();
    if (result.count > 0) {
      setStatus('Please fix ' + result.count + (result.count === 1 ? ' field' : ' fields') + ' below before submitting.', 'error');
      result.firstInvalid.focus();
      return;
    }

    setStatus('', '');
    var data = collect();
    // Obvious bot submissions are quietly accepted without sending anything.
    if (data.botcheck) {
      showSuccess();
      return;
    }

    setSubmitting(true);
    fetch(WEB3FORMS_URL, {
      method: 'POST',
      body: buildPayload(data)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          return { status: response.status, body: body };
        });
      })
      .then(function (result) {
        if (result.body && result.body.success) {
          showSuccess();
        } else if (result.status === 429) {
          showFailure('You have sent several applications in a short time. Please wait a few minutes and try again.');
        } else {
          showFailure();
        }
      })
      .catch(function () { showFailure(); })
      .then(function () { setSubmitting(false); });
  });

  fieldNames.forEach(function (name) {
    var element = form.elements[name];
    var eventName = element.type === 'checkbox' || element.tagName === 'SELECT' ? 'change' : 'blur';
    element.addEventListener(eventName, function () { showError(name, checkField(name)); });
    element.addEventListener('input', function () {
      if (element.getAttribute('aria-invalid') === 'true' && !checkField(name)) showError(name, '');
    });
  });

  serviceSelect.addEventListener('change', updateServiceNote);

  document.querySelector('[data-new-application]').addEventListener('click', function () {
    form.reset();
    preselectService();
    updateServiceNote();
    setStatus('', '');
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  preselectService();
  updateServiceNote();
})();

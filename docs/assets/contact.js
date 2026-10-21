// Kleine Vleugels: normale formulierverzending naar FormSubmit.
// De browser verzorgt de POST en de formulierdienst bevestigt de verwerking.
// Deze code valideert de invoer en voorkomt dubbel klikken; zij verzendt niets zelf.
export const CONTACT_EMAIL = 'Kleinevleugels@gmail.com';

export function setupContactForm(form) {
  const button = form.querySelector('button[type="submit"]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('#contact-status');
  if (!button || !label || !status || form.dataset.contactReady) return;
  form.dataset.contactReady = 'true';
  let pending = false;

  function resetState() {
    pending = false;
    button.disabled = false;
    form.setAttribute('aria-busy', 'false');
    label.textContent = 'Verstuur bericht';
    status.hidden = true;
    status.replaceChildren();
  }

  form.addEventListener('input', event => event.target.setCustomValidity?.(''));
  form.addEventListener('reset', resetState);
  form.ownerDocument.defaultView?.addEventListener('pageshow', resetState);

  form.addEventListener('submit', event => {
    if (pending) {
      event.preventDefault();
      return;
    }
    for (const id of ['contact-name', 'contact-message']) {
      const field = form.querySelector('#' + id);
      if (!field || !field.value.trim()) {
        event.preventDefault();
        field?.setCustomValidity('Vul dit veld in.');
        field?.reportValidity?.();
        field?.focus();
        return;
      }
    }
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
      event.preventDefault();
      return;
    }
    if (form.querySelector('[name="_honey"]')?.value) {
      event.preventDefault();
      return;
    }
    pending = true;
    button.disabled = true;
    label.textContent = 'Bericht versturen…';
    form.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Je bericht wordt verstuurd. Rond een eventuele spamcontrole af; daarna kom je terug op onze website.';
    status.hidden = false;
    // Do not preventDefault: native POST supports the service's activation and CAPTCHA flow.
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-contact-form]').forEach(form => setupContactForm(form));
}

// Kleine Vleugels: bevestigde ontvangst opent onze eigen bedankpagina.
// De standaard POST blijft beschikbaar zonder JavaScript en als handmatige terugval.
export const CONTACT_EMAIL = 'Kleinevleugels@gmail.com';

export function setupContactForm(form, send = globalThis.fetch?.bind(globalThis), navigate = url => globalThis.location.assign(url)) {
  const button = form.querySelector('button[type="submit"]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('#contact-status');
  const nativeButton = form.querySelector('[data-native-send]');
  if (!button || !label || !status || form.dataset.contactReady) return;
  form.dataset.contactReady = 'true';
  let pending = false;
  let nativeNext = false;

  function setPending(value) {
    pending = value;
    button.disabled = value;
    if (nativeButton) nativeButton.disabled = value;
    form.setAttribute('aria-busy', String(value));
    label.textContent = value ? 'Bericht versturen…' : 'Verstuur bericht';
  }

  function resetState() {
    setPending(false);
    nativeNext = false;
    status.hidden = true;
    status.replaceChildren();
    if (nativeButton) nativeButton.hidden = true;
  }

  function validate() {
    for (const id of ['contact-name', 'contact-message']) {
      const field = form.querySelector('#' + id);
      if (!field || !field.value.trim()) {
        field?.setCustomValidity?.('Vul dit veld in.');
        field?.reportValidity?.();
        field?.focus();
        return false;
      }
    }
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return false;
    return !form.querySelector('[name="_honey"]')?.value;
  }

  form.addEventListener('input', event => event.target.setCustomValidity?.(''));
  form.addEventListener('reset', resetState);
  form.ownerDocument.defaultView?.addEventListener('pageshow', resetState);
  nativeButton?.addEventListener('click', () => {
    if (pending) return;
    nativeNext = true;
    if (typeof form.requestSubmit === 'function') form.requestSubmit(button);
  });

  form.addEventListener('submit', async event => {
    if (pending || !validate()) {
      event.preventDefault();
      return;
    }
    if (nativeNext || typeof send !== 'function') {
      nativeNext = false;
      setPending(true);
      status.dataset.state = 'pending';
      status.textContent = 'Je bericht wordt verstuurd. Rond een eventuele spamcontrole af; daarna kom je terug op onze website.';
      status.hidden = false;
      return; // The browser performs the normal POST and preserves CAPTCHA handling.
    }
    event.preventDefault();
    const payload = new URLSearchParams();
    for (const input of form.querySelectorAll('input[name],select[name],textarea[name]')) {
      if (input.disabled || ['submit','button','file'].includes(input.type)) continue;
      if (['checkbox','radio'].includes(input.type) && !input.checked) continue;
      payload.append(input.name, String(input.value).trim());
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    setPending(true);
    status.hidden = true;
    if (nativeButton) nativeButton.hidden = true;
    try {
      const response = await send('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        credentials: 'omit',
        body: payload,
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !(data.success === true || data.success === 'true')) throw new Error('Unconfirmed submission');
      const destination = form.querySelector('[name="_next"]')?.value;
      if (destination !== 'https://kleinevleugels.nl/bedankt.html') throw new Error('Unexpected destination');
      // Success navigation occurs only after a positive response from the mail service.
      navigate(destination);
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'We konden de ontvangst van je bericht nog niet bevestigen. Je gegevens staan er nog. Je kunt de andere verzendknop hieronder gebruiken of ons rechtstreeks mailen.';
      status.hidden = false;
      if (nativeButton) nativeButton.hidden = false;
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-contact-form]').forEach(form => setupContactForm(form));
}

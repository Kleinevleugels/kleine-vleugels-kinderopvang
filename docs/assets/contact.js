// Kleine Vleugels: verzending op de eigen website via Web3Forms.
export const CONTACT_EMAIL = 'Kleinevleugels@gmail.com';
export const SUBMIT_ENDPOINT = 'https://api.web3forms.com/submit';
export const THANKS_URL = 'https://kleinevleugels.nl/bedankt.html';

export function setupContactForm(form, send = globalThis.fetch?.bind(globalThis), navigate = url => globalThis.location.assign(url)) {
  const button = form.querySelector('button[type="submit"]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('#contact-status');
  const accessKey = form.querySelector('[name="access_key"]')?.value.trim();
  if (!button || !label || !status || form.dataset.contactReady) return;
  form.dataset.contactReady = 'true';
  if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
    form.hidden = true;
    const unavailable = form.parentElement.querySelector('[data-contact-unavailable]');
    if (unavailable) unavailable.hidden = false;
    return;
  }
  let pending = false;

  function setPending(value) {
    pending = value;
    button.disabled = value;
    label.textContent = value ? 'Bericht versturen…' : 'Verstuur bericht';
    form.setAttribute('aria-busy', String(value));
  }

  form.addEventListener('input', event => event.target.setCustomValidity?.(''));
  form.ownerDocument.defaultView?.addEventListener('pageshow', () => setPending(false));
  form.addEventListener('submit', async event => {
    if (pending) { event.preventDefault(); return; }
    for (const id of ['contact-name', 'contact-message']) {
      const field = form.querySelector('#' + id);
      if (!field?.value.trim()) {
        event.preventDefault();
        field?.setCustomValidity?.('Vul dit veld in.');
        field?.reportValidity?.();
        field?.focus();
        return;
      }
    }
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
      event.preventDefault(); return;
    }
    if (form.querySelector('[name="botcheck"]')?.checked) { event.preventDefault(); return; }
    if (typeof send !== 'function') { setPending(true); return; }
    event.preventDefault();

    const payload = {};
    for (const input of form.querySelectorAll('input[name],select[name],textarea[name]')) {
      if (input.disabled || input.name === 'redirect' || ['submit','button','file'].includes(input.type)) continue;
      if (['checkbox','radio'].includes(input.type) && !input.checked) continue;
      payload[input.name] = String(input.value).trim();
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    status.hidden = true;
    setPending(true);
    try {
      const response = await send(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Unconfirmed submission');
      // No local success message or redirect until the provider confirms acceptance.
      navigate(THANKS_URL);
    } catch {
      const doc = form.ownerDocument;
      status.replaceChildren(doc.createTextNode('We konden de verzending nog niet bevestigen. Je ingevulde gegevens staan er nog. Probeer het opnieuw of mail ons rechtstreeks op '));
      const link = doc.createElement('a');
      link.href = 'mailto:' + CONTACT_EMAIL;
      link.textContent = CONTACT_EMAIL;
      status.append(link, doc.createTextNode('.'));
      status.dataset.state = 'error';
      status.hidden = false;
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-contact-form]').forEach(form => setupContactForm(form));
}

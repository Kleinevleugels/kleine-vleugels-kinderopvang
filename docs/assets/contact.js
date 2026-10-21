// Kleine Vleugels: contactformulier voor de statische GitHub Pages-website.
// Berichten gaan uitsluitend na verzenden via FormSubmit naar de opvang.
export const CONTACT_EMAIL = 'Kleinevleugels@gmail.com';
const AJAX_URL = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

export function setupContactForm(form, send = globalThis.fetch?.bind(globalThis)) {
  const button = form.querySelector('button[type="submit"]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('#contact-status');
  const card = form.closest('.contact-card');
  const success = card?.querySelector('[data-contact-success]');
  const again = card?.querySelector('[data-contact-again]');
  if (!button || !label || !status || !success || typeof send !== 'function') return;
  let pending = false;

  function setPending(value) {
    pending = value;
    button.disabled = value;
    form.setAttribute('aria-busy', String(value));
    label.textContent = value ? 'Bericht versturen…' : 'Verstuur bericht';
  }

  function showError(message) {
    status.replaceChildren(document.createTextNode(message + ' Je kunt ook mailen naar '));
    const link = document.createElement('a');
    link.href = 'mailto:' + CONTACT_EMAIL;
    link.textContent = CONTACT_EMAIL;
    status.append(link, document.createTextNode('.'));
    status.dataset.state = 'error';
    status.hidden = false;
  }

  form.addEventListener('input', event => {
    event.target.setCustomValidity?.('');
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    // Native required/email constraints also apply to the no-JavaScript POST.
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
    for (const id of ['contact-name', 'contact-message']) {
      const field = form.querySelector('#' + id);
      if (!field?.value.trim()) {
        field?.setCustomValidity('Vul dit veld in.');
        field?.reportValidity?.();
        field?.focus();
        return;
      }
    }
    if (form.querySelector('[name="_honey"]')?.value) return;

    const payload = {};
    for (const input of form.querySelectorAll('input[name], select[name], textarea[name]')) {
      if (input.disabled || ['submit', 'button', 'file'].includes(input.type)) continue;
      if (['checkbox', 'radio'].includes(input.type) && !input.checked) continue;
      payload[input.name] = String(input.value).trim();
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    status.hidden = true;
    status.replaceChildren();
    setPending(true);
    try {
      const response = await send(AJAX_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !(data.success === true || data.success === 'true')) {
        throw new Error('Submission was not accepted');
      }
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      showError(error.name === 'AbortError'
        ? 'We konden niet bevestigen of je bericht is verzonden. Probeer het later opnieuw.'
        : 'Versturen is niet gelukt. Je ingevulde gegevens staan er nog; probeer het opnieuw.');
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  });

  again?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    status.hidden = true;
    form.querySelector('#contact-name')?.focus();
  });
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-contact-form]').forEach(form => setupContactForm(form));
}

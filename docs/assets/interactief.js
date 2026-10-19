// Kleine Vleugels: browserinteractie voor GitHub Pages.
// Geen externe bibliotheken, netwerkverzoeken of opslag van persoonsgegevens.

export function calculateMonthlyCost(days, hourly, dailyHours, weeks) {
  const values = [days, hourly, dailyHours, weeks];
  if (values.some(value => value === '' || value == null)) return null;
  const [d, price, hours, w] = values.map(Number);
  if (![d, price, hours, w].every(Number.isFinite)) return null;
  if (!Number.isInteger(d) || d < 1 || d > 5) return null;
  if (price <= 0 || price > 100 || hours < 1 || hours > 16) return null;
  if (![40, 48, 52].includes(w)) return null;
  const monthlyHours = d * hours * w / 12;
  return { monthlyHours, monthlyCost: monthlyHours * price };
}

export function normalizeSearch(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('nl-NL').trim();
}

export function matchesFilter(text, itemCategory, query, category) {
  return (category === 'Alles' || category === itemCategory) && normalizeSearch(text).includes(normalizeSearch(query));
}

function setupMenu() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mobile-navigation');
  if (!button || !nav) return;
  function setOpen(open, returnFocus = false) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    if (open) nav.querySelector('a')?.focus();
    else if (returnFocus) button.focus();
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-wrap')) setOpen(false);
  });
}

function setupTabs(container, buttonSelector, panelSelector) {
  const buttons = Array.from(container.querySelectorAll(buttonSelector));
  const panels = Array.from(container.querySelectorAll(panelSelector));
  if (!buttons.length || buttons.length !== panels.length) return;
  let current = 0;
  function show(index, focus = false) {
    current = (index + buttons.length) % buttons.length;
    buttons.forEach((button, i) => {
      const active = i === current;
      button.setAttribute('aria-selected', String(active));
      button.setAttribute('aria-pressed', String(active));
      button.tabIndex = active ? 0 : -1;
      button.classList.toggle('selected', active);
      button.classList.toggle('active', active);
      panels[i].hidden = !active;
    });
    if (focus) buttons[current].focus();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => show(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = index + 1;
      else if (event.key === 'ArrowLeft') next = index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      show(next, true);
    });
  });
  container.querySelectorAll('[data-day-step]').forEach(button => {
    button.addEventListener('click', () => show(current + Number(button.dataset.dayStep), true));
  });
  show(0);
}

function setupCalculator(box) {
  const buttons = Array.from(box.querySelectorAll('.day-picker button'));
  const inputs = box.querySelectorAll('input[type="number"]');
  const weeks = box.querySelector('select');
  const amount = box.querySelector('.calculator-output > strong');
  const hoursText = box.querySelector('.calculator-output > p');
  if (inputs.length !== 2 || !weeks || !amount || !hoursText) return;
  let days = 3;
  const currency = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
  function update() {
    const result = calculateMonthlyCost(days, inputs[0].value, inputs[1].value, weeks.value);
    buttons.forEach((button, i) => {
      button.classList.toggle('selected', i + 1 === days);
      button.setAttribute('aria-pressed', String(i + 1 === days));
    });
    amount.textContent = result ? currency.format(result.monthlyCost) : '—';
    hoursText.textContent = result
      ? result.monthlyHours.toLocaleString('nl-NL', { maximumFractionDigits: 1 }) + ' uur per maand · gemiddeld over 12 maanden'
      : 'Vul een geldig tarief en aantal uren in.';
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => { days = i + 1; update(); }));
  inputs.forEach(input => input.addEventListener('input', update));
  weeks.addEventListener('change', update);
  update();
}

function setupFilters(box, itemSelector, label) {
  const search = box.querySelector('input[type="search"]');
  const buttons = Array.from(box.querySelectorAll('.filter-pills button'));
  const items = Array.from(box.querySelectorAll(itemSelector));
  const counter = box.querySelector('.results-count');
  if (!search || !buttons.length) return;
  let category = 'Alles';
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const explanation = document.createElement('p');
  explanation.textContent = 'Geen resultaten. Probeer een ander zoekwoord of een andere categorie.';
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'text-link';
  reset.textContent = 'Toon alles';
  empty.append(explanation, reset);
  box.append(empty);
  function update() {
    let count = 0;
    items.forEach(item => {
      const visible = matchesFilter(item.textContent, item.dataset.category, search.value, category);
      item.hidden = !visible;
      if (visible) count += 1;
    });
    buttons.forEach(button => {
      const active = button.textContent.trim() === category;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });
    if (counter) counter.textContent = count + ' ' + label(count);
    empty.hidden = count !== 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.textContent.trim(); update(); }));
  search.addEventListener('input', update);
  reset.addEventListener('click', () => { category = 'Alles'; search.value = ''; update(); search.focus(); });
  update();
}

if (typeof document !== 'undefined') {
  setupMenu();
  document.querySelectorAll('.age-explorer').forEach(box => setupTabs(box, '.segmented button', '.age-panel'));
  document.querySelectorAll('.day-explorer').forEach(box => setupTabs(box, '.day-times button', '.day-detail'));
  document.querySelectorAll('.calculator').forEach(setupCalculator);
  document.querySelectorAll('.faq').forEach(box => setupFilters(box, 'details', count => count === 1 ? 'vraag' : 'vragen'));
  document.querySelectorAll('[data-policy-library]').forEach(box => setupFilters(box, '.policy-card', () => 'onderwerpen'));
}

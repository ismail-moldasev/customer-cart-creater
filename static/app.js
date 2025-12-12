function formatCounter(count) {
  if (count === 0) return '0 карточек';
  if (count % 10 === 1 && count % 100 !== 11) return `${count} карточка`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} карточки`;
  }
  return `${count} карточек`;
}

function buildCard(data) {
  const card = document.createElement('article');
  card.className = 'card';

  const roleLabel = data.role === 'seller' ? 'Продавец' : 'Клиент';
  const amountLabel = data.role === 'seller' ? 'Предлагает объём' : 'Готов заплатить';

  const metaItems = [];
  if (data.age) metaItems.push(`${data.age} лет`);
  if (data.gender) metaItems.push(data.gender);
  if (data.phone) metaItems.push(data.phone);
  if (data.amount) metaItems.push(`${amountLabel}: ${data.amount}`);

  card.innerHTML = `
    <div class="card__content">
      <div class="card__header">
        <h3 class="card__name">${data.name || 'Без имени'}</h3>
        <span class="card__role">${roleLabel}</span>
      </div>
      <div class="card__meta">
        ${metaItems.map((item) => `<span>${item}</span>`).join('')}
      </div>
      ${data.notes ? `<p class="card__notes">${data.notes}</p>` : ''}
    </div>
  `;

  return card;
}

function main() {
  const form = document.getElementById('profile-form');
  const cards = document.getElementById('cards');
  const counter = document.getElementById('card-counter');
  const resetList = document.getElementById('reset-list');

  const state = { list: [] };

  function renderCards() {
    counter.textContent = formatCounter(state.list.length);
    cards.innerHTML = '';

    if (state.list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = '<p>Пока нет карточек</p><p class="hint">Заполните форму, чтобы добавить первую карточку.</p>';
      cards.appendChild(empty);
      return;
    }

    state.list.forEach((entry) => cards.appendChild(buildCard(entry)));
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      role: formData.get('role') || 'client',
      name: formData.get('name')?.trim() ?? '',
      age: formData.get('age')?.trim() ?? '',
      gender: formData.get('gender') || '',
      phone: formData.get('phone')?.trim() ?? '',
      amount: formData.get('amount')?.trim() ?? '',
      notes: formData.get('notes')?.trim() ?? '',
    };

    state.list.push(entry);
    renderCards();
    form.reset();
    form.elements.role[0].checked = true;
  });

  resetList.addEventListener('click', (event) => {
    event.preventDefault();
    state.list = [];
    renderCards();
  });

  renderCards();
}

document.addEventListener('DOMContentLoaded', main);

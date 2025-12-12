const form = document.getElementById('profile-form');
const cardsContainer = document.getElementById('cards');
const counterEl = document.getElementById('card-counter');
const resetListBtn = document.getElementById('reset-list');

const roleMap = {
  client: { label: 'Клиент', className: 'role-client' },
  seller: { label: 'Продавец', className: 'role-seller' },
};

function updateCounter(count) {
  const suffix = count === 1 ? 'карточка' : count >= 2 && count <= 4 ? 'карточки' : 'карточек';
  counterEl.textContent = `${count} ${suffix}`;
}

function clearEmptyState() {
  const empty = cardsContainer.querySelector('.empty-state');
  if (empty) {
    empty.remove();
  }
}

function addEmptyState() {
  if (cardsContainer.children.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `<p>Пока нет карточек</p><p class="hint">Заполните форму, чтобы добавить первую карточку.</p>`;
    cardsContainer.appendChild(emptyState);
    updateCounter(0);
  }
}

function createCard(data) {
  const card = document.createElement('article');
  card.className = 'card';

  const roleMeta = roleMap[data.role] || roleMap.client;
  const roleBadge = `<span class="role-badge ${roleMeta.className}">${roleMeta.label}</span>`;
  const agePart = data.age ? `${data.age} лет` : 'Возраст не указан';
  const genderPart = data.gender || 'Пол не указан';

  const phone = data.phone ? `<span>☎️ ${data.phone}</span>` : '';
  const amount = data.amount ? `<span>💰 ${data.amount}</span>` : '';
  const notes = data.notes ? `<div>📝 ${data.notes}</div>` : '';

  const details = [phone, amount].filter(Boolean).join(' · ');
  const createdAt = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date());

  card.innerHTML = `
    <div class="card__header">
      <div class="card__title">${roleBadge}<span>${data.name || 'Без имени'}</span></div>
      <div class="card__meta">${genderPart} · ${agePart}</div>
    </div>
    <div class="card__body">
      ${details ? `<div>${details}</div>` : '<div class="hint">Контакты не указаны</div>'}
      ${notes}
    </div>
    <div class="card__footer">
      <span>Добавлено: ${createdAt}</span>
      <span class="pill pill--ghost">${roleMeta.label}</span>
    </div>
  `;

  return card;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const data = {
    role: formData.get('role') || 'client',
    name: (formData.get('name') || '').trim(),
    age: (formData.get('age') || '').trim(),
    gender: formData.get('gender') || '',
    phone: (formData.get('phone') || '').trim(),
    amount: (formData.get('amount') || '').trim(),
    notes: (formData.get('notes') || '').trim(),
  };

  clearEmptyState();
  const card = createCard(data);
  cardsContainer.appendChild(card);
  updateCounter(cardsContainer.querySelectorAll('.card').length);
  form.reset();
  form.querySelector('input[name="role"]').checked = true;
});

resetListBtn.addEventListener('click', (event) => {
  event.preventDefault();
  cardsContainer.innerHTML = '';
  addEmptyState();
});

addEmptyState();
updateCounter(0);

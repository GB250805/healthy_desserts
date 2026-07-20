(async () => {
  const STORAGE_KEY = 'healthy-desserts-clean-state-v1';
  const availableClassrooms = new Set();
  const classroomCatalogPromise = loadClassroomCatalog();
  const productsPromise = loadProducts();

  function normalizeClassroom(classroom) {
    return classroom.trim().toUpperCase();
  }

  function isAvailableClassroom(classroom) {
    return availableClassrooms.has(normalizeClassroom(classroom));
  }

  async function loadClassroomCatalog() {
    const response = await fetch('aulas.csv', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`No se pudo cargar aulas.csv (${response.status})`);
    }

    const csvText = await response.text();
    const classrooms = csvText
      .split(/\r?\n/)
      .flatMap((line) => line.split(','))
      .map((value) => value.trim().toUpperCase())
      .filter(Boolean);

    classrooms.forEach((classroom) => availableClassrooms.add(classroom));
    return Array.from(availableClassrooms).sort();
  }

  async function loadProducts() {
    const response = await fetch('products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo cargar products.json');
    CATALOG = await response.json();
  }

  function renderClassroomCatalog() {
    if (!el.classroomOptions) return;
    el.classroomOptions.innerHTML = Array.from(availableClassrooms)
      .sort()
      .map((classroom) => `<option value="${classroom}"></option>`)
      .join('');
  }

  function imageFor(id) {
    const product = CATALOG.find(function(p) { return p.id === id; });
    return product && product.image ? 'pics/' + encodeURI(product.image) : '';
  }

  const QUESTIONS = [
    {
      key: 'diet',
      title: '¿Qué tipo de dieta prefieres?',
      options: [
        { value: 'vegano', label: 'Vegano', hint: 'Sin ingredientes de origen animal.' },
        { value: 'keto', label: 'Keto', hint: 'Más grasa saludable y menos azúcar.' },
        { value: 'sin gluten', label: 'Sin gluten', hint: 'Para una elección más ligera.' },
        { value: 'tradicional', label: 'Tradicional', hint: 'Sabor clásico y balanceado.' },
      ],
    },
    {
      key: 'need',
      title: '¿Qué necesitas hoy?',
      options: [
        { value: 'concentracion', label: 'Mejorar concentración', hint: 'Para estudiar con foco.' },
        { value: 'energia', label: 'Energía sostenida', hint: 'Para clases, tareas y biblioteca.' },
        { value: 'antiestres', label: 'Solo un antojo saludable', hint: 'Para bajar el ritmo sin culpa.' },
      ],
    },
    {
      key: 'format',
      title: '¿Qué formato prefieres?',
      options: [
        { value: 'portable', label: 'Portátil', hint: 'Algo que puedas llevar en la mochila.' },
        { value: 'fresco', label: 'Fresco', hint: 'Ligero para media tarde.' },
        { value: 'intenso', label: 'Intenso', hint: 'Más sabor, más impacto.' },
      ],
    },
  ];

  const el = {
    studentScreen: document.getElementById('studentScreen'),
    adminScreen: document.getElementById('adminScreen'),
    goToAdminButton: document.getElementById('goToAdminButton'),
    backToStoreButton: document.getElementById('backToStoreButton'),
    restartQuizButton: document.getElementById('restartQuizButton'),
    wizardProgress: document.getElementById('wizardProgress'),
    wizardStepLabel: document.getElementById('wizardStepLabel'),
    questionTitle: document.getElementById('questionTitle'),
    questionOptions: document.getElementById('questionOptions'),
    wizardNextButton: document.getElementById('wizardNextButton'),
    matchCard: document.getElementById('matchCard'),
    matchName: document.getElementById('matchName'),
    matchDescription: document.getElementById('matchDescription'),
    matchTags: document.getElementById('matchTags'),
    matchPrice: document.getElementById('matchPrice'),
    matchCalories: document.getElementById('matchCalories'),
    matchVisual: document.getElementById('matchVisual'),
    addMatchToCartButton: document.getElementById('addMatchToCartButton'),
    menuFilters: document.getElementById('menuFilters'),
    menuGrid: document.getElementById('menuGrid'),
    cartList: document.getElementById('cartList'),
    cartBadge: document.getElementById('cartBadge'),
    cartSection: document.getElementById('cartSection'),
    backToMenuButton: document.getElementById('backToMenuButton'),
    viewCartShortcut: document.getElementById('viewCartShortcut'),
    orderForm: document.getElementById('orderForm'),
    classroomInput: document.getElementById('classroomInput'),
    subtotalValue: document.getElementById('subtotalValue'),
    totalValue: document.getElementById('totalValue'),
    energyScore: document.getElementById('energyScore'),
    energyBar: document.getElementById('energyBar'),
    recommendationNote: document.getElementById('recommendationNote'),
    studentGreeting: document.getElementById('studentGreeting'),
    adminPasswordModal: document.getElementById('adminPasswordModal'),
    adminPasswordForm: document.getElementById('adminPasswordForm'),
    adminPasswordInput: document.getElementById('adminPasswordInput'),
    adminPasswordSubmit: document.getElementById('adminPasswordSubmit'),
    adminPasswordHint: document.getElementById('adminPasswordHint'),
    orderConfirmationModal: document.getElementById('orderConfirmationModal'),
    orderConfirmationCode: document.getElementById('orderConfirmationCode'),
    orderConfirmationClassroom: document.getElementById('orderConfirmationClassroom'),
    orderConfirmationTotal: document.getElementById('orderConfirmationTotal'),
    orderConfirmationMessage: document.getElementById('orderConfirmationMessage'),
    closeOrderConfirmationButton: document.getElementById('closeOrderConfirmationButton'),
    toast: document.getElementById('toast'),
    adminTodayOrders: document.getElementById('adminTodayOrders'),
    adminRevenue: document.getElementById('adminRevenue'),
    adminReady: document.getElementById('adminReady'),
    adminReadyCard: document.getElementById('adminReadyCard'),
    adminOrders: document.getElementById('adminOrders'),
    deliveryHistoryModal: document.getElementById('deliveryHistoryModal'),
    deliveryHistoryList: document.getElementById('deliveryHistoryList'),
    closeHistoryButton: document.getElementById('closeHistoryButton'),
    adminCatalog: document.getElementById('adminCatalog'),
    studentList: document.getElementById('studentList'),
    classroomOptions: document.getElementById('classroomOptions'),
    resetDemoDataButton: document.getElementById('resetDemoDataButton'),
    registrationModal: document.getElementById('registrationModal'),
    registrationForm: document.getElementById('registrationForm'),
    regNombres: document.getElementById('regNombres'),
    regApellidos: document.getElementById('regApellidos'),
    regId: document.getElementById('regId'),
    regCelular: document.getElementById('regCelular'),
    bottomNavItems: Array.from(document.querySelectorAll('.bottom-nav__item')),
  };

  const state = loadState();
  state.student = { answers: { diet: '', need: '', format: '' }, selectedFilter: 'todos', cart: [] };
  saveState();
  let selectedFilter = state.student.selectedFilter || 'todos';
  let selectedView = 'home';
  let pendingOrder = null;
  let lastConfirmedBuyer = null;
  let adminLock = loadAdminLock();
  let adminLockCountdown = null;

  function defaultState() {
    return {
      student: {
        answers: { diet: '', need: '', format: '' },
        selectedFilter: 'todos',
        cart: [],
      },
      orders: [],
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      return {
        ...base,
        ...parsed,
        student: {
          ...base.student,
          ...(parsed.student || {}),
          answers: { ...base.student.answers, ...((parsed.student && parsed.student.answers) || {}) },
          cart: Array.isArray(parsed.student && parsed.student.cart) ? parsed.student.cart : base.student.cart,
        },
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  const ADMIN_PASSWORD = 'Gabobh2005#';
  const ADMIN_LOCK_KEY = 'healthy-desserts-admin-lock-v1';
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 60 * 1000;

  function loadAdminLock() {
    try {
      const raw = localStorage.getItem(ADMIN_LOCK_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return { attempts: Number(parsed?.attempts) || 0, lockUntil: Number(parsed?.lockUntil) || 0 };
    } catch {
      return { attempts: 0, lockUntil: 0 };
    }
  }

  function saveAdminLock() {
    localStorage.setItem(ADMIN_LOCK_KEY, JSON.stringify(adminLock));
  }

  function isAdminLocked() {
    return adminLock.lockUntil > Date.now();
  }

  function remainingLockSeconds() {
    return Math.max(0, Math.ceil((adminLock.lockUntil - Date.now()) / 1000));
  }

  function money(amount) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(amount);
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.toast.classList.remove('is-visible'), 2200);
  }

  function normalizeValue(value) {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  function getAnswerSeed() {
    return Object.values(state.student.answers).map(normalizeValue).join('|');
  }

  function pickFromTopScorers(scoredItems, seed) {
    if (!scoredItems.length) return null;
    if (!seed) return scoredItems[0].item;
    let hash = 0;
    for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    return scoredItems[hash % scoredItems.length].item;
  }

  function currentQuestionIndex() {
    return QUESTIONS.findIndex((q) => !state.student.answers[q.key]);
  }

  function hasCompletedQuiz() {
    return QUESTIONS.every((question) => state.student.answers[question.key]);
  }

  function recommendedProduct() {
    if (!hasCompletedQuiz()) return null;
    const answers = state.student.answers;
    const scoredItems = CATALOG.map((item, index) => {
      let score = 0;
      if (item.match.diet.some((value) => normalizeValue(value) === normalizeValue(answers.diet))) score += 5;
      if (item.match.need.some((value) => normalizeValue(value) === normalizeValue(answers.need))) score += 4;
      if (item.match.format.some((value) => normalizeValue(value) === normalizeValue(answers.format))) score += 3;
      return { item, score, index };
    }).sort((left, right) => right.score - left.score || left.index - right.index);
    const topScore = scoredItems[0]?.score ?? 0;
    const finalists = scoredItems.filter((entry) => entry.score === topScore);
    return pickFromTopScorers(finalists, getAnswerSeed());
  }

  function setScreen(mode) {
    el.studentScreen.classList.toggle('is-hidden', mode !== 'student');
    el.adminScreen.classList.toggle('is-hidden', mode !== 'admin');
  }

  function renderQuestionnaire() {
    const index = Math.max(0, currentQuestionIndex() === -1 ? QUESTIONS.length - 1 : currentQuestionIndex());
    const question = QUESTIONS[index];
    el.wizardProgress.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
    el.wizardStepLabel.textContent = `Paso ${index + 1} de ${QUESTIONS.length}`;
    el.questionTitle.textContent = question.title;
    el.wizardNextButton.textContent = index === QUESTIONS.length - 1 ? 'Descubrir mi postre' : 'Siguiente';
    el.questionOptions.innerHTML = question.options.map((option) => `
      <button type="button" class="option-card ${state.student.answers[question.key] === option.value ? 'is-selected' : ''}" data-q="${question.key}" data-v="${option.value}">
        <div><strong>${option.label}</strong><small>${option.hint}</small></div>
      </button>
    `).join('');
    el.questionOptions.querySelectorAll('[data-q]').forEach((button) => {
      button.addEventListener('click', () => {
        state.student.answers[button.dataset.q] = button.dataset.v;
        saveState();
        renderQuestionnaire();
        renderMatch();
        renderHero();
      });
    });
  }

  function renderMatch() {
    const match = recommendedProduct();
    el.matchCard.classList.toggle('is-empty', !match);
    el.addMatchToCartButton.disabled = !match;
    if (!match) {
      el.matchName.textContent = 'Tu match aparecerá aquí';
      el.matchDescription.textContent = 'Responde las 3 preguntas del personalizador para descubrir el postre que mejor encaja con tu dieta, tu necesidad de hoy y tu formato ideal.';
      el.matchTags.innerHTML = '<span>Encuesta pendiente</span>';
      el.matchPrice.textContent = '—';
      el.matchCalories.textContent = '';
      el.matchVisual.innerHTML = '';
      el.matchVisual.style.background = 'transparent';
      return;
    }
    el.matchName.textContent = match.name;
    el.matchDescription.textContent = match.description;
    el.matchPrice.textContent = money(match.price);
    el.matchCalories.textContent = `${match.calories} kcal`;
    el.matchTags.innerHTML = match.benefits.map((benefit) => `<span>${benefit}</span>`).join('');
    el.matchVisual.style.background = 'transparent';
    el.matchVisual.innerHTML = `<img src="${imageFor(match.id)}" alt="${match.name}" />`;
  }

  function renderMenu() {
    const filters = [
      ['todos', 'Todos'],
      ['concentracion', 'Concentración'],
      ['energia', 'Energía sostenida'],
      ['keto', 'Keto'],
      ['vegano', 'Vegano'],
      ['fresco', 'Fresco'],
      ['tradicional', 'Tradicional'],
    ];
    el.menuFilters.innerHTML = filters.map(([value, label]) => `<button type="button" class="filter-pill ${selectedFilter === value ? 'is-selected' : ''}" data-filter="${value}">${label}</button>`).join('');
    el.menuFilters.querySelectorAll('[data-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        selectedFilter = button.dataset.filter;
        state.student.selectedFilter = selectedFilter;
        saveState();
        renderMenu();
      });
    });
    const visible = selectedFilter === 'todos'
      ? CATALOG
      : CATALOG.filter((item) => item.tags.some((tag) => normalizeValue(tag) === normalizeValue(selectedFilter)));
    el.menuGrid.innerHTML = visible.map((item) => `<article class="product-card">
  <div class="product-card__visual">
    <img src="${imageFor(item.id)}" alt="${item.name}" loading="lazy" />
  </div>
  <div class="product-card__body">
    <span class="product-chip">${item.badge}</span>
    <strong>${item.name}</strong>
    <p class="product-meta">${item.flavor}</p>
    <div class="product-price"><span>${money(item.price)}</span><button type="button" class="text-button" data-add="${item.id}">Añadir</button></div>
  </div>
</article>`).join('');
    el.menuGrid.querySelectorAll('[data-add]').forEach((button) => {
      button.addEventListener('click', () => {
        const existing = state.student.cart.find((entry) => entry.id === button.dataset.add);
        if (existing) existing.quantity += 1; else state.student.cart.push({ id: button.dataset.add, quantity: 1 });
        saveState();
        renderCart();
        renderHero();
        toast('Producto agregado al carrito.');
      });
    });
  }

  function renderCart() {
    const items = state.student.cart.map((entry) => ({ ...CATALOG.find((item) => item.id === entry.id), quantity: entry.quantity })).filter((item) => item.id);
    el.cartBadge.textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    el.subtotalValue.textContent = money(subtotal);
    el.totalValue.textContent = money(subtotal);
    el.cartList.innerHTML = items.length ? items.map((item) => `
      <article class="cart-item">
        <div class="cart-item__body">
          <div class="cart-item__header">
            <div class="cart-item__media" aria-hidden="true"><img src="${imageFor(item.id)}" alt="${item.name}" /></div>
            <div><strong>${item.name}</strong><p class="muted">${item.flavor}</p></div>
            <button class="remove-button" type="button" data-remove="${item.id}">Eliminar</button>
          </div>
          <div class="price-row"><span>${money(item.price)}</span><span>${item.calories} kcal</span></div>
          <div class="quantity-control"><button type="button" data-dec="${item.id}">−</button><strong>${item.quantity}</strong><button type="button" data-inc="${item.id}">+</button></div>
        </div>
      </article>
    `).join('') : '<article class="cart-item"><div class="cart-item__body"><strong>Tu carrito está vacío</strong><p class="muted">Agrega un producto desde el menú inteligente o desde tu match recomendado.</p></div></article>';
    el.cartList.querySelectorAll('[data-inc]').forEach((button) => button.addEventListener('click', () => { const entry = state.student.cart.find((item) => item.id === button.dataset.inc); if (entry) entry.quantity += 1; saveState(); renderCart(); }));
    el.cartList.querySelectorAll('[data-dec]').forEach((button) => button.addEventListener('click', () => { const entry = state.student.cart.find((item) => item.id === button.dataset.dec); if (!entry) return; if (entry.quantity > 1) entry.quantity -= 1; else state.student.cart = state.student.cart.filter((item) => item.id !== entry.id); saveState(); renderCart(); }));
    el.cartList.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => { state.student.cart = state.student.cart.filter((item) => item.id !== button.dataset.remove); saveState(); renderCart(); }));
  }

  function renderHero() {
    const cartCount = state.student.cart.reduce((sum, entry) => sum + entry.quantity, 0);
    const energy = Math.min(100, Math.max(0, cartCount * 8));
    el.energyScore.textContent = String(energy);
    el.energyBar.style.width = `${energy}%`;
    const match = recommendedProduct();
    if (cartCount) {
      el.recommendationNote.textContent = `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.`;
    } else if (match) {
      el.recommendationNote.textContent = `Mantén el ritmo con ${match.name} para tu próxima clase.`;
    } else {
      el.recommendationNote.textContent = 'Responde la encuesta para descubrir tu postre ideal.';
    }
    el.studentGreeting.textContent = 'Hola, estudiante';
  }

  function renderAdmin() {
    const orders = state.orders;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    el.adminTodayOrders.textContent = String(orders.length);
    el.adminRevenue.textContent = money(revenue);
    el.adminReady.textContent = String(orders.filter((order) => order.status === 'done').length);
    el.adminOrders.innerHTML = orders.length ? orders.slice(0, 7).map((order) => `
      <article class="order-card">
        <div class="order-card__body">
          <div class="order-card__header">
            <div><strong>${order.id}</strong><p class="admin-order__meta">${order.classroom}${order.buyer ? ` · ${order.buyer.nombres} ${order.buyer.apellidos} · ID: ${order.buyer.id}` : ''}</p></div>
            <span class="order-status order-status--${order.status}">${({ new: 'Nuevo', cooking: 'En preparación', ready: 'Listo', done: 'Entregado' })[order.status] || 'Nuevo'}</span>
          </div>
          <p class="admin-order__meta">${order.buyer ? `📞 ${order.buyer.celular}` : ''}${order.items.map((item) => ` · ${item.quantity}x ${item.name}`).join('')}</p>
          <div class="order-card__footer"><strong>${money(order.total)}</strong>${order.status !== 'done' ? `<button type="button" class="deliver-button" data-deliver="${order.id}">Marcar entregado</button>` : ''}</div>
        </div>
      </article>
    `).join('') : '<article class="order-card"><div class="order-card__body"><strong>No hay pedidos todavía.</strong><p class="muted">Cuando un estudiante confirme un pedido aparecerá aquí.</p></div></article>';
    el.adminOrders.querySelectorAll('[data-deliver]').forEach((button) => {
        button.addEventListener('click', () => markAsDelivered(button.dataset.deliver));
    });
    el.adminCatalog.innerHTML = CATALOG.slice(0, 8).map((item) => `<article class="catalog-card"><div class="catalog-card__visual"><img src="${imageFor(item.id)}" alt="${item.name}" loading="lazy" /></div><div class="catalog-card__body"><div class="catalog-card__header"><div><strong>${item.name}</strong><p class="admin-catalog__meta">${item.flavor}</p></div><span class="admin-chip">${item.badge}</span></div><div class="price-row"><span>${item.calories} kcal</span><strong>${money(item.price)}</strong></div></div></article>`).join('');
    el.studentList.innerHTML = `
      <article class="student-item"><div class="student-item__body"><strong>Tienda abierta</strong><p class="student-item__meta">Cualquier persona puede pedir sin necesidad de cuenta.</p></div></article>
      <article class="student-item"><div class="student-item__body"><strong>Pedidos con entrega de aula</strong><p class="student-item__meta">Solo se aceptan aulas incluidas en aulas.csv.</p></div></article>
    `;
  }

  function markAsDelivered(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order || order.status === 'done') return;
    order.status = 'done';
    saveState();
    renderAdmin();
    toast(`Pedido ${orderId} marcado como entregado.`);
  }

  function renderDeliveryHistory() {
    const doneOrders = state.orders.filter((order) => order.status === 'done');
    el.deliveryHistoryList.innerHTML = doneOrders.length ? doneOrders.map((order) => `
      <article class="order-card">
        <div class="order-card__body">
          <div class="order-card__header">
            <div><strong>${order.id}</strong><p class="admin-order__meta">${order.classroom}${order.buyer ? ` · ${order.buyer.nombres} ${order.buyer.apellidos} · ID: ${order.buyer.id}` : ''}</p></div>
            <span class="order-status order-status--done">Entregado</span>
          </div>
          <p class="admin-order__meta">${order.buyer ? `📞 ${order.buyer.celular}` : ''}${order.items.map((item) => ` · ${item.quantity}x ${item.name}`).join('')}</p>
          <div class="order-card__footer"><strong>${money(order.total)}</strong></div>
        </div>
      </article>
    `).join('') : '<article class="order-card"><div class="order-card__body"><strong>No hay entregas todavía.</strong><p class="muted">Los pedidos marcados como entregados aparecerán aquí.</p></div></article>';
  }

  function openDeliveryHistory() {
    renderDeliveryHistory();
    el.deliveryHistoryModal.classList.remove('is-hidden');
  }

  function closeDeliveryHistory() {
    el.deliveryHistoryModal.classList.add('is-hidden');
  }

  function showView(view) {
    selectedView = view;
    el.cartSection.classList.toggle('is-hidden', view !== 'cart');
    el.bottomNavItems.forEach((item) => item.classList.toggle('is-active', item.dataset.view === view));
    if (view === 'menu') el.menuGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (view === 'cart') el.cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function submitOrder(event) {
    event.preventDefault();
    await classroomCatalogPromise;
    const classroom = normalizeClassroom(el.classroomInput.value);
    if (!availableClassrooms.size) { toast('No se pudo cargar la lista de aulas disponibles. Recarga la página.'); return; }
    if (!isAvailableClassroom(classroom)) { toast('Selecciona un aula disponible en la lista de la UPAO.'); el.classroomInput.focus(); return; }
    if (!state.student.cart.length) { toast('Tu carrito está vacío. Agrega al menos un producto.'); return; }
    const items = state.student.cart.map((entry) => {
      const item = CATALOG.find((product) => product.id === entry.id);
      return { id: item.id, name: item.name, price: item.price, image: item.image, quantity: entry.quantity };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    pendingOrder = { classroom, items, total: Number(total.toFixed(2)) };
    el.regNombres.value = '';
    el.regApellidos.value = '';
    el.regId.value = '';
    el.registrationModal.classList.remove('is-hidden');
    el.regNombres.focus();
  }

  function submitRegistration(event) {
    event.preventDefault();
    const nombres = el.regNombres.value.trim();
    const apellidos = el.regApellidos.value.trim();
    const id = el.regId.value.trim();
    const celular = el.regCelular.value.trim();
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const phoneRegex = /^\+?\d+$/;
    if (!nombres) { toast('Ingresa tus nombres.'); el.regNombres.focus(); return; }
    if (!nameRegex.test(nombres)) { toast('Los nombres solo pueden contener letras.'); el.regNombres.focus(); return; }
    if (!apellidos) { toast('Ingresa tus apellidos.'); el.regApellidos.focus(); return; }
    if (!nameRegex.test(apellidos)) { toast('Los apellidos solo pueden contener letras.'); el.regApellidos.focus(); return; }
    if (!/^\d{9}$/.test(id)) { toast('El ID debe tener exactamente 9 dígitos.'); el.regId.focus(); return; }
    if (!celular) { toast('Ingresa tu número de celular.'); el.regCelular.focus(); return; }
    if (!phoneRegex.test(celular)) { toast('El celular solo puede contener números y opcionalmente + al inicio.'); el.regCelular.focus(); return; }
    if (!pendingOrder) { toast('Error: no hay un pedido pendiente.'); return; }

    const { classroom, items, total } = pendingOrder;
    const buyer = { nombres, apellidos, id, celular };
    lastConfirmedBuyer = buyer;
    state.orders.unshift({
      id: `HD-${Date.now().toString(36).toUpperCase()}`,
      userId: null,
      buyer,
      classroom,
      status: 'new',
      createdAt: new Date().toISOString(),
      items,
      total,
    });
    state.student.cart = [];
    saveState();
    renderCart();
    renderAdmin();
    renderHero();
    el.orderForm.reset();
    pendingOrder = null;
    el.registrationModal.classList.add('is-hidden');
    openOrderConfirmation({ classroom, total, orderId: state.orders[0].id, nombres, id });
    toast(`Pedido confirmado para ${classroom}.`);
    showView('home');
  }

  function openOrderConfirmation(order) {
    el.orderConfirmationCode.textContent = order.orderId;
    el.orderConfirmationClassroom.textContent = `Entrega en ${order.classroom}`;
    el.orderConfirmationTotal.textContent = money(order.total);
    el.orderConfirmationMessage.textContent = 'Tu pedido quedó registrado y se entregará en tu salón. El pago será presencial al recogerlo.';
    el.orderConfirmationModal.classList.remove('is-hidden');
    el.closeOrderConfirmationButton.dataset.nombres = order.nombres;
    el.closeOrderConfirmationButton.dataset.id = order.id;
  }

  function closeOrderConfirmation() {
    const nombres = el.closeOrderConfirmationButton.dataset.nombres;
    const id = el.closeOrderConfirmationButton.dataset.id;
    const mensaje = `Hola, soy ${nombres}, mi id es ${id} y confirmo mi pedido`;
    const url = `https://wa.me/51967167272?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    el.orderConfirmationModal.classList.add('is-hidden');
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function updateAdminPasswordHint() {
    if (isAdminLocked()) {
      el.adminPasswordHint.textContent = `Demasiados intentos fallidos. Intenta de nuevo en ${remainingLockSeconds()}s.`;
      el.adminPasswordInput.disabled = true;
      el.adminPasswordSubmit.disabled = true;
      return;
    }
    el.adminPasswordInput.disabled = false;
    el.adminPasswordSubmit.disabled = false;
    el.adminPasswordHint.textContent = adminLock.attempts > 0
      ? `Contraseña incorrecta. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - adminLock.attempts}.`
      : 'Ingresa la contraseña para ver el panel de administración.';
  }

  function startAdminLockCountdown() {
    clearInterval(adminLockCountdown);
    adminLockCountdown = null;
    updateAdminPasswordHint();
    if (!isAdminLocked()) return;
    adminLockCountdown = setInterval(() => {
      if (!isAdminLocked()) { clearInterval(adminLockCountdown); adminLockCountdown = null; }
      updateAdminPasswordHint();
    }, 1000);
  }

  function openAdminPasswordModal() {
    el.adminPasswordInput.value = '';
    el.adminPasswordModal.classList.remove('is-hidden');
    startAdminLockCountdown();
    if (!isAdminLocked()) el.adminPasswordInput.focus();
  }

  function closeAdminPasswordModal() {
    el.adminPasswordModal.classList.add('is-hidden');
    clearInterval(adminLockCountdown);
    adminLockCountdown = null;
  }

  function handleAdminPasswordSubmit(event) {
    event.preventDefault();
    if (isAdminLocked()) { updateAdminPasswordHint(); return; }
    if (el.adminPasswordInput.value.trim() === ADMIN_PASSWORD) {
      adminLock = { attempts: 0, lockUntil: 0 };
      saveAdminLock();
      closeAdminPasswordModal();
      setScreen('admin');
      renderAdmin();
      return;
    }
    adminLock.attempts += 1;
    if (adminLock.attempts >= MAX_LOGIN_ATTEMPTS) {
      adminLock.attempts = 0;
      adminLock.lockUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
    saveAdminLock();
    el.adminPasswordInput.value = '';
    if (isAdminLocked()) {
      toast('Demasiados intentos fallidos. Acceso bloqueado temporalmente.');
      startAdminLockCountdown();
    } else {
      toast('Contraseña incorrecta.');
      updateAdminPasswordHint();
      el.adminPasswordInput.focus();
    }
  }

  el.goToAdminButton.addEventListener('click', openAdminPasswordModal);
  el.adminPasswordForm.addEventListener('submit', handleAdminPasswordSubmit);
  el.adminPasswordModal.addEventListener('click', (event) => { if (event.target === el.adminPasswordModal) closeAdminPasswordModal(); });
  el.adminReadyCard.addEventListener('click', openDeliveryHistory);
  el.closeHistoryButton.addEventListener('click', closeDeliveryHistory);
  el.deliveryHistoryModal.addEventListener('click', (event) => { if (event.target === el.deliveryHistoryModal) closeDeliveryHistory(); });
  el.backToStoreButton.addEventListener('click', () => { setScreen('student'); });
  el.restartQuizButton.addEventListener('click', () => { state.student.answers = { diet: '', need: '', format: '' }; saveState(); renderQuestionnaire(); renderMatch(); renderHero(); toast('Flujo reiniciado.'); });
  el.wizardNextButton.addEventListener('click', () => {
    const unanswered = QUESTIONS.find((question) => !state.student.answers[question.key]);
    if (unanswered) { toast('Selecciona una opción para continuar.'); return; }
    const match = recommendedProduct();
    if (match) toast(`Tu match es ${match.name}.`);
    el.matchCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  el.addMatchToCartButton.addEventListener('click', () => {
    const match = recommendedProduct();
    if (!match) return;
    const existing = state.student.cart.find((entry) => entry.id === match.id);
    if (existing) existing.quantity += 1; else state.student.cart.push({ id: match.id, quantity: 1 });
    saveState();
    renderCart();
    renderHero();
    toast(`${match.name} añadido al carrito.`);
    showView('cart');
  });
  el.viewCartShortcut.addEventListener('click', () => showView('cart'));
  el.backToMenuButton.addEventListener('click', () => showView('menu'));
  el.orderForm.addEventListener('submit', submitOrder);
  el.orderConfirmationModal.addEventListener('click', (event) => { if (event.target === el.orderConfirmationModal) closeOrderConfirmation(); });
  el.closeOrderConfirmationButton.addEventListener('click', closeOrderConfirmation);
  el.registrationForm.addEventListener('submit', submitRegistration);
  el.resetDemoDataButton.addEventListener('click', resetDemo);
  el.bottomNavItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));

  Promise.all([classroomCatalogPromise, productsPromise])
    .then(() => {
      renderClassroomCatalog();
      el.classroomInput.setAttribute('list', 'classroomOptions');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderQuestionnaire();
      renderMatch();
      renderMenu();
      renderCart();
      renderHero();
      renderAdmin();
      setScreen('student');
    });
})();

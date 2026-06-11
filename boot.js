(() => {
  const STORAGE_KEY = 'healthy-desserts-clean-state-v1';
  const STUDENT_ID = '000255928';
  const ADMIN_ID = 'Admin';
  const CLASSROOM_PATTERN = /^[A-Z]\d{3}$/;

  const CATALOG = [
    { id: 'brownie-keto', name: 'Brownie Keto Energizante', price: 8.5, calories: 180, badge: 'Sin azúcar', emoji: '🍫', tags: ['keto', 'energía', 'concentración'], flavor: 'Cacao puro + nueces', description: 'Ideal para recuperar enfoque sin picos de azúcar.', benefits: ['Energía sostenida', 'Alta saciedad'] },
    { id: 'trufas-matcha', name: 'Trufas de Matcha', price: 12, calories: 140, badge: 'Alto en proteína', emoji: '🍵', tags: ['concentración', 'anti-estrés', 'proteína'], flavor: 'Matcha ceremonial + almendra', description: 'Textura suave y efecto calmante para sesiones largas de estudio.', benefits: ['Enfoque mental', 'Sensorial premium'] },
    { id: 'galletas-avena', name: 'Galletas Avena & Arándanos', price: 9, calories: 210, badge: 'Alto en fibra', emoji: '🫐', tags: ['energía', 'tradicional', 'fibra'], flavor: 'Avena integral + arándanos', description: 'Perfectas para una tarde activa con energía duradera.', benefits: ['Fibra natural', 'Dulzor equilibrado'] },
    { id: 'barras-maca-cacao', name: 'Barras Maca & Cacao', price: 7.5, calories: 165, badge: 'Energía limpia', emoji: '⚡', tags: ['energía', 'sin gluten', 'estudio'], flavor: 'Maca andina + nibs de cacao', description: 'Un snack práctico para rendir sin caer pesado.', benefits: ['Rápidas de llevar', 'Buenas para antes de clases'] },
    { id: 'mousse-chia', name: 'Mousse de Chía y Mango', price: 10, calories: 155, badge: 'Vegano', emoji: '🥭', tags: ['vegano', 'fresco', 'digestivo'], flavor: 'Chía hidratada + mango', description: 'Ligero, fresco y amable para horas largas en campus.', benefits: ['Digestión ligera', 'Opción plant-based'] },
    { id: 'tarta-limon', name: 'Tarta de Limón Proteica', price: 11.5, calories: 190, badge: 'Proteína', emoji: '🍋', tags: ['proteína', 'fresco', 'post-entreno'], flavor: 'Cítricos + yogur alto en proteína', description: 'Equilibrio entre frescura y aporte nutritivo.', benefits: ['Recarga de tarde', 'Sabor vibrante'] },
    { id: 'barritas-cacao', name: 'Barritas Cacao & Nuez', price: 7.5, calories: 172, badge: 'Sin gluten', emoji: '🌰', tags: ['sin gluten', 'keto', 'energía'], flavor: 'Cacao amargo + nueces tostadas', description: 'Crujiente, simple y fácil de sumar al pedido.', benefits: ['Snack de bolsillo', 'Bajo índice glucémico'] },
  ];

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
    authScreen: document.getElementById('authScreen'),
    studentScreen: document.getElementById('studentScreen'),
    adminScreen: document.getElementById('adminScreen'),
    loginForm: document.getElementById('loginForm'),
    loginUser: document.getElementById('loginUser'),
    loginPassword: document.getElementById('loginPassword'),
    logoutStudent: document.getElementById('logoutStudent'),
    logoutAdmin: document.getElementById('logoutAdmin'),
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
    profileSection: document.getElementById('profileSection'),
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
    profileDays: document.getElementById('profileDays'),
    profileSnacks: document.getElementById('profileSnacks'),
    profileCalories: document.getElementById('profileCalories'),
    savedPreferences: document.getElementById('savedPreferences'),
    openChangePasswordButton: document.getElementById('openChangePasswordButton'),
    passwordModal: document.getElementById('passwordModal'),
    passwordForm: document.getElementById('passwordForm'),
    newPassword: document.getElementById('newPassword'),
    confirmPassword: document.getElementById('confirmPassword'),
    toast: document.getElementById('toast'),
    adminTodayOrders: document.getElementById('adminTodayOrders'),
    adminRevenue: document.getElementById('adminRevenue'),
    adminReady: document.getElementById('adminReady'),
    adminOrders: document.getElementById('adminOrders'),
    adminCatalog: document.getElementById('adminCatalog'),
    studentList: document.getElementById('studentList'),
    resetDemoDataButton: document.getElementById('resetDemoDataButton'),
    bottomNavItems: Array.from(document.querySelectorAll('.bottom-nav__item')),
  };

  const state = loadState();
  let activeUserId = null;
  let selectedFilter = state.student.selectedFilter || 'todos';
  let selectedView = 'home';

  function defaultState() {
    return {
      users: {
        [STUDENT_ID]: { id: STUDENT_ID, password: STUDENT_ID, role: 'student', firstLogin: true, profile: { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 } },
        [ADMIN_ID]: { id: ADMIN_ID, password: ADMIN_ID, role: 'admin', firstLogin: false },
      },
      student: {
        answers: { diet: '', need: '', format: '' },
        selectedFilter: 'todos',
        cart: [{ id: 'trufas-matcha', quantity: 1 }],
        profile: { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 },
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
        users: { ...base.users, ...(parsed.users || {}) },
        student: {
          ...base.student,
          ...(parsed.student || {}),
          answers: { ...base.student.answers, ...((parsed.student && parsed.student.answers) || {}) },
          profile: { ...base.student.profile, ...((parsed.student && parsed.student.profile) || {}) },
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

  function money(amount) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(amount);
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('is-visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.toast.classList.remove('is-visible'), 2200);
  }

  function profile() {
    if (!state.student.profile) state.student.profile = { daysActive: 12, healthySnacks: 27, avoidedCoffee: 9 };
    return state.student.profile;
  }

  function currentQuestionIndex() {
    return QUESTIONS.findIndex((q) => !state.student.answers[q.key]);
  }

  function recommendedProduct() {
    const answers = state.student.answers;
    return CATALOG.map((item) => {
      let score = 0;
      if (answers.diet && item.tags.includes(answers.diet)) score += 3;
      if (answers.need && item.tags.includes(answers.need)) score += 4;
      if (answers.format === 'portable' && item.tags.includes('energía')) score += 1;
      if (answers.format === 'fresco' && item.tags.includes('fresco')) score += 2;
      if (answers.format === 'intenso' && item.tags.includes('proteína')) score += 1;
      return { item, score };
    }).sort((a, b) => b.score - a.score)[0].item;
  }

  function setScreen(mode) {
    el.authScreen.classList.toggle('is-hidden', !!mode);
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
        renderProfile();
      });
    });
  }

  function renderMatch() {
    const match = recommendedProduct();
    el.matchName.textContent = match.name;
    el.matchDescription.textContent = match.description;
    el.matchPrice.textContent = money(match.price);
    el.matchCalories.textContent = `${match.calories} kcal`;
    el.matchTags.innerHTML = match.benefits.map((benefit) => `<span>${benefit}</span>`).join('');
    el.matchVisual.style.background = {
      'brownie-keto': 'linear-gradient(135deg, #f5be65, #7b4a2e)',
      'trufas-matcha': 'linear-gradient(135deg, #c9f0d0, #39b676)',
      'galletas-avena': 'linear-gradient(135deg, #ffd65f, #ef9c3e)',
      'barras-maca-cacao': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
      'mousse-chia': 'linear-gradient(135deg, #bcead3, #76c68d)',
      'tarta-limon': 'linear-gradient(135deg, #ffe78f, #ffb24d)',
      'barritas-cacao': 'linear-gradient(135deg, #b2d7ff, #3ea2ff)',
    }[match.id] || 'linear-gradient(135deg, #c9f0d0, #7ecb59)';
  }

  function renderMenu() {
    const filters = [
      ['todos', 'Todos'],
      ['concentracion', 'Concentración'],
      ['energia', 'Energía sostenida'],
      ['keto', 'Keto'],
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
    const visible = selectedFilter === 'todos' ? CATALOG : CATALOG.filter((item) => item.tags.includes(selectedFilter));
    el.menuGrid.innerHTML = visible.map((item) => `
      <article class="product-card">
        <div class="product-card__visual" data-emoji="${item.emoji}"></div>
        <div class="product-card__body">
          <span class="product-chip">${item.badge}</span>
          <strong>${item.name}</strong>
          <p class="product-meta">${item.flavor}</p>
          <div class="product-price"><span>${money(item.price)}</span><button type="button" class="text-button" data-add="${item.id}">Añadir</button></div>
        </div>
      </article>
    `).join('');
    el.menuGrid.querySelectorAll('[data-add]').forEach((button) => {
      button.addEventListener('click', () => {
        const existing = state.student.cart.find((entry) => entry.id === button.dataset.add);
        if (existing) existing.quantity += 1; else state.student.cart.push({ id: button.dataset.add, quantity: 1 });
        saveState();
        renderCart();
        renderProfile();
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
            <div class="cart-item__media" aria-hidden="true">${item.emoji}</div>
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

  function renderProfile() {
    const p = profile();
    el.profileDays.textContent = String(p.daysActive);
    el.profileSnacks.textContent = String(p.healthySnacks);
    el.profileCalories.textContent = String(p.avoidedCoffee);
    el.savedPreferences.textContent = Object.values(state.student.answers).filter(Boolean).join(' · ') || 'Sin preferencias guardadas aún.';
    const cartCount = state.student.cart.reduce((sum, entry) => sum + entry.quantity, 0);
    const energy = Math.min(100, 45 + cartCount * 8 + (recommendedProduct().tags.includes('energía') ? 8 : 0));
    el.energyScore.textContent = String(energy);
    el.energyBar.style.width = `${energy}%`;
    el.recommendationNote.textContent = cartCount ? `Tienes ${cartCount} snack${cartCount === 1 ? '' : 's'} listo${cartCount === 1 ? '' : 's'} para tu jornada.` : `Mantén el ritmo con ${recommendedProduct().name} para tu próxima clase.`;
    el.studentGreeting.textContent = 'Hola, estudiante';
  }

  function renderAdmin() {
    const orders = state.orders;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    el.adminTodayOrders.textContent = String(orders.length);
    el.adminRevenue.textContent = money(revenue);
    el.adminReady.textContent = String(orders.filter((order) => order.status === 'ready').length);
    el.adminOrders.innerHTML = orders.length ? orders.slice(0, 7).map((order) => `
      <article class="order-card">
        <div class="order-card__body">
          <div class="order-card__header">
            <div><strong>${order.id}</strong><p class="admin-order__meta">${order.classroom}</p></div>
            <span class="order-status order-status--${order.status}">${({ new: 'Nuevo', cooking: 'En preparación', ready: 'Listo', done: 'Entregado' })[order.status] || 'Nuevo'}</span>
          </div>
          <p class="admin-order__meta">${order.items.map((item) => `${item.quantity}x ${item.name}`).join(' · ')}</p>
          <div class="order-card__footer"><strong>${money(order.total)}</strong></div>
        </div>
      </article>
    `).join('') : '<article class="order-card"><div class="order-card__body"><strong>No hay pedidos todavía.</strong><p class="muted">Cuando un estudiante confirme un pedido aparecerá aquí.</p></div></article>';
    el.adminCatalog.innerHTML = CATALOG.slice(0, 4).map((item) => `
      <article class="catalog-card"><div class="catalog-card__visual" data-emoji="${item.emoji}"></div><div class="catalog-card__body"><div class="catalog-card__header"><div><strong>${item.name}</strong><p class="admin-catalog__meta">${item.flavor}</p></div><span class="admin-chip">${item.badge}</span></div><div class="price-row"><span>${item.calories} kcal</span><strong>${money(item.price)}</strong></div></div></article>
    `).join('');
    el.studentList.innerHTML = `
      <article class="student-item"><div class="student-item__body"><div class="student-item__header"><strong>Alumno ${STUDENT_ID}</strong><span class="admin-chip">${state.users[STUDENT_ID].firstLogin ? 'Clave inicial activa' : 'Cuenta configurada'}</span></div><p class="student-item__meta">Preferencias actuales: ${Object.values(state.student.answers).filter(Boolean).join(' · ') || 'Sin preferencias guardadas aún.'}</p></div></article>
      <article class="student-item"><div class="student-item__body"><strong>Pedidos con entrega de aula</strong><p class="student-item__meta">Formato validado: G503, C201, K607.</p></div></article>
    `;
  }

  function showView(view) {
    selectedView = view;
    el.cartSection.classList.toggle('is-hidden', view !== 'cart');
    el.profileSection.classList.toggle('is-hidden', view !== 'profile');
    el.matchCard.classList.toggle('is-hidden', view === 'profile');
    el.bottomNavItems.forEach((item) => item.classList.toggle('is-active', item.dataset.view === view));
    if (view === 'menu') el.menuGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (view === 'cart') el.cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (view === 'profile') el.profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openPasswordModal() {
    el.passwordModal.classList.remove('is-hidden');
    el.newPassword.value = '';
    el.confirmPassword.value = '';
    el.newPassword.focus();
  }

  function closePasswordModal() {
    el.passwordModal.classList.add('is-hidden');
  }

  function login(event) {
    event.preventDefault();
    const userId = el.loginUser.value.trim();
    const password = el.loginPassword.value;
    const user = state.users[userId];
    if (!user || user.password !== password) { toast('Credenciales inválidas.'); return; }
    activeUserId = userId;
    if (user.role === 'student' && user.firstLogin && password === STUDENT_ID) { openPasswordModal(); toast('Primer acceso detectado. Crea tu nueva contraseña.'); return; }
    if (user.role === 'student') { setScreen('student'); renderQuestionnaire(); renderMatch(); renderMenu(); renderCart(); renderProfile(); showView('home'); toast('Sesión iniciada como alumno.'); return; }
    setScreen('admin'); renderAdmin(); toast('Sesión iniciada como administrador.');
  }

  function savePassword(event) {
    event.preventDefault();
    const nextPassword = el.newPassword.value.trim();
    const confirm = el.confirmPassword.value.trim();
    if (nextPassword.length < 8) { toast('La nueva contraseña debe tener al menos 8 caracteres.'); return; }
    if (nextPassword !== confirm) { toast('Las contraseñas no coinciden.'); return; }
    state.users[STUDENT_ID].password = nextPassword;
    state.users[STUDENT_ID].firstLogin = false;
    saveState();
    closePasswordModal();
    setScreen('student');
    renderQuestionnaire(); renderMatch(); renderMenu(); renderCart(); renderProfile(); showView('home');
    toast('Contraseña actualizada correctamente.');
  }

  function submitOrder(event) {
    event.preventDefault();
    const classroom = el.classroomInput.value.trim().toUpperCase();
    if (!CLASSROOM_PATTERN.test(classroom)) { toast('Ingresa un aula válida en formato como G503, C201 o K607.'); el.classroomInput.focus(); return; }
    if (!state.student.cart.length) { toast('Tu carrito está vacío. Agrega al menos un producto.'); return; }
    const items = state.student.cart.map((entry) => {
      const item = CATALOG.find((product) => product.id === entry.id);
      return { id: item.id, name: item.name, price: item.price, emoji: item.emoji, quantity: entry.quantity };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    state.orders.unshift({ id: `HD-${Date.now().toString(36).toUpperCase()}`, userId: activeUserId, classroom, status: 'new', createdAt: new Date().toISOString(), items, total: Number(total.toFixed(2)) });
    state.student.cart = [];
    profile().daysActive += 1;
    profile().healthySnacks += 1;
    saveState();
    renderCart();
    renderAdmin();
    renderProfile();
    el.orderForm.reset();
    toast(`Pedido confirmado para ${classroom}.`);
    showView('home');
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  el.loginForm.addEventListener('submit', login);
  el.passwordForm.addEventListener('submit', savePassword);
  el.logoutStudent.addEventListener('click', () => setScreen(null));
  el.logoutAdmin.addEventListener('click', () => setScreen(null));
  el.restartQuizButton.addEventListener('click', () => { state.student.answers = { diet: '', need: '', format: '' }; saveState(); renderQuestionnaire(); renderMatch(); renderProfile(); toast('Flujo reiniciado.'); });
  el.wizardNextButton.addEventListener('click', () => { const unanswered = QUESTIONS.find((question) => !state.student.answers[question.key]); if (unanswered) { toast('Selecciona una opción para continuar.'); return; } toast(`Tu match es ${recommendedProduct().name}.`); el.matchCard.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  el.addMatchToCartButton.addEventListener('click', () => { const match = recommendedProduct(); const existing = state.student.cart.find((entry) => entry.id === match.id); if (existing) existing.quantity += 1; else state.student.cart.push({ id: match.id, quantity: 1 }); saveState(); renderCart(); renderProfile(); toast(`${match.name} añadido al carrito.`); showView('cart'); });
  el.viewCartShortcut.addEventListener('click', () => showView('cart'));
  el.backToMenuButton.addEventListener('click', () => showView('menu'));
  el.orderForm.addEventListener('submit', submitOrder);
  el.openChangePasswordButton.addEventListener('click', openPasswordModal);
  el.passwordModal.addEventListener('click', (event) => { if (event.target === el.passwordModal) closePasswordModal(); });
  el.resetDemoDataButton.addEventListener('click', resetDemo);
  el.bottomNavItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));

  renderQuestionnaire();
  renderMatch();
  renderMenu();
  renderCart();
  renderProfile();
  renderAdmin();
  setScreen(null);
})();

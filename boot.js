(() => {
  const STORAGE_KEY = 'healthy-desserts-clean-state-v1';
  const availableClassrooms = new Set();
  const classroomCatalogPromise = loadClassroomCatalog();

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

  function renderClassroomCatalog() {
    if (!el.classroomOptions) return;
    el.classroomOptions.innerHTML = Array.from(availableClassrooms)
      .sort()
      .map((classroom) => `<option value="${classroom}"></option>`)
      .join('');
  }

  const CATALOG = [
    {
      id: 'barras-maca-cacao',
      name: 'Barras de Maca, Algarrobina y Cacao',
      price: 7.0,
      calories: 165,
      badge: 'Energía limpia',
      emoji: '⚡',
      tags: ['vegano', 'concentracion', 'portable'],
      flavor: 'Maca andina + algarrobina + nibs de cacao',
      description: 'Barra nutritiva con superalimentos andinos para enfoque mental sostenido.',
      benefits: ['Energía natural', 'Enfoque sostenido'],
      match: { diet: ['vegano'], need: ['concentracion'], format: ['portable'] },
    },
    {
      id: 'brownie-canihua',
      name: 'Brownie Proteico de Cañihua',
      price: 9.0,
      calories: 180,
      badge: 'Sin gluten',
      emoji: '🍫',
      tags: ['sin gluten', 'concentracion', 'intenso'],
      flavor: 'Cañihua andina + whey vegetal + cacao chuncho',
      description: 'Brownie denso en proteínas para recuperar energía sin gluten.',
      benefits: ['Alta proteína', 'Sin gluten'],
      match: { diet: ['sin gluten'], need: ['concentracion'], format: ['intenso'] },
    },
    {
      id: 'pie-limon-proteico',
      name: 'Pie de Limón Proteico',
      price: 9.0,
      calories: 185,
      badge: 'Fresco',
      emoji: '🍋',
      tags: ['keto', 'antiestres', 'fresco'],
      flavor: 'Limón peruano + crema ligera alta en proteína',
      description: 'Un clásico renovado para una pausa ligera y balanceada.',
      benefits: ['Sabor cítrico', 'Postre de media tarde'],
      match: { diet: ['keto'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'queque-zanahoria-andino',
      name: 'Queque de Zanahoria Andino',
      price: 7.0,
      calories: 220,
      badge: 'Casero',
      emoji: '🥕',
      tags: ['tradicional', 'energia', 'portable'],
      flavor: 'Zanahoria, nueces, chía y harina integral',
      description: 'Denso, aromático y cómodo para acompañar la jornada.',
      benefits: ['Sensación casera', 'Buen snack de ruta'],
      match: { diet: ['tradicional'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'galletas-quinoa-choco',
      name: 'Galletas de Quinoa Choco-Chips',
      price: 7.5,
      calories: 160,
      badge: 'Sin gluten',
      emoji: '🍪',
      tags: ['sin gluten', 'energia', 'portable'],
      flavor: 'Quinoa pop + harina de almendras + chocolate 70%',
      description: 'Crujientes y nutritivas, pensadas para llevar sin complicaciones.',
      benefits: ['Toque local', 'Textura crocante'],
      match: { diet: ['sin gluten'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'cheesecake-aguaymanto',
      name: 'Cheesecake Light de Aguaymanto',
      price: 10.0,
      calories: 175,
      badge: 'Light',
      emoji: '🟡',
      tags: ['sin gluten', 'antiestres', 'fresco'],
      flavor: 'Queso crema bajo en grasa + mermelada de aguaymanto',
      description: 'Suave, cremoso y endulzado naturalmente para consentirte sin culpa.',
      benefits: ['Antioxidante natural', 'Bajo en grasa'],
      match: { diet: ['sin gluten'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'trufas-keto-amazonicas',
      name: 'Trufas Keto Amazónicas',
      price: 8.5,
      calories: 140,
      badge: 'Keto',
      emoji: '🥥',
      tags: ['keto', 'concentracion', 'intenso'],
      flavor: 'Palta cremosa + cacao oscuro + coco rallado',
      description: 'Bomba de grasas saludables en un bocado concentrado y delicioso.',
      benefits: ['Alta saciedad', 'Enfoque mental'],
      match: { diet: ['keto'], need: ['concentracion'], format: ['intenso'] },
    },
    {
      id: 'pudin-chia-camu',
      name: 'Pudín de Chía y Camu Camu',
      price: 8.0,
      calories: 140,
      badge: 'Vegano',
      emoji: '🫐',
      tags: ['vegano', 'energia', 'fresco'],
      flavor: 'Leche de almendras + chía + coulis de camu camu',
      description: 'Fresco, cítrico y cargado de vitamina C para empezar con vitalidad.',
      benefits: ['Vitamina C natural', 'Digestión ligera'],
      match: { diet: ['vegano'], need: ['energia'], format: ['fresco'] },
    },
    {
      id: 'mousse-lucuma-vegano',
      name: 'Mousse Vegano de Lúcuma',
      price: 10.0,
      calories: 155,
      badge: 'Vegano',
      emoji: '🟢',
      tags: ['vegano', 'antiestres', 'fresco'],
      flavor: 'Castañas licuadas + pulpa de lúcuma + leche de coco',
      description: 'Crema suave y dulce natural que calma el antojo sin remordimientos.',
      benefits: ['Sabor peruano', 'Textura aterciopelada'],
      match: { diet: ['vegano'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'alfajores-kiwicha',
      name: 'Alfajores de Kiwicha',
      price: 7.0,
      calories: 170,
      badge: 'Tradicional',
      emoji: '🥮',
      tags: ['tradicional', 'antiestres', 'portable'],
      flavor: 'Harina de kiwicha + manjar blanco de dátiles',
      description: 'Dos galletas de kiwicha abrazando un relleno cremoso y natural.',
      benefits: ['Bocado familiar', 'Energía rápida'],
      match: { diet: ['tradicional'], need: ['antiestres'], format: ['portable'] },
    },
    {
      id: 'mazamorra-morada',
      name: 'Copa de Mazamorra Morada Fit',
      price: 5.5,
      calories: 145,
      badge: 'Fit',
      emoji: '🟣',
      tags: ['sin gluten', 'antiestres', 'fresco'],
      flavor: 'Maíz morado + stevia + harina de camote',
      description: 'Tradición peruana reinventada sin azúcar para un antojo ligero.',
      benefits: ['Antioxidante', 'Tradición fit'],
      match: { diet: ['sin gluten'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'volcan-chocolate',
      name: 'Volcán de Chocolate al 80%',
      price: 11.0,
      calories: 175,
      badge: 'Intenso',
      emoji: '🌋',
      tags: ['keto', 'antiestres', 'intenso'],
      flavor: 'Harina de coco + eritritol + cacao puro derretido',
      description: 'Explosión de chocolate oscuro con centro fundido para los más intensos.',
      benefits: ['Antioxidante puro', 'Sin azúcar'],
      match: { diet: ['keto'], need: ['antiestres'], format: ['intenso'] },
    },
    {
      id: 'muffins-avena-arandanos',
      name: 'Muffins de Avena y Arándanos',
      price: 6.5,
      calories: 175,
      badge: 'Energético',
      emoji: '🧁',
      tags: ['tradicional', 'energia', 'portable'],
      flavor: 'Harina de avena + plátano seda + arándanos frescos',
      description: 'Espectaculares muffins húmedos y frutales para una dosis de energía limpia.',
      benefits: ['Fruta natural', 'Dulzor justo'],
      match: { diet: ['tradicional'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'cuadritos-almendras',
      name: 'Cuadritos de Almendras y Sal de Maras',
      price: 8.5,
      calories: 195,
      badge: 'Keto',
      emoji: '🟫',
      tags: ['keto', 'concentracion', 'portable'],
      flavor: 'Mantequilla de almendras + aceite de coco + sal de Maras',
      description: 'Cuadrito crujiente y salado que mantiene el enfoque sin carbohidratos.',
      benefits: ['Alta saciedad', 'Electrolitos naturales'],
      match: { diet: ['keto'], need: ['concentracion'], format: ['portable'] },
    },
    {
      id: 'turron-higos-vegano',
      name: 'Turrón Crudi-Vegano de Higos',
      price: 9.0,
      calories: 180,
      badge: 'Crudi-vegano',
      emoji: '🍯',
      tags: ['vegano', 'energia', 'intenso'],
      flavor: 'Higos secos + nueces + kiwicha + especias',
      description: 'Turrón crudo sin horno, denso en nutrientes y energía duradera.',
      benefits: ['100% crudo', 'Energía compacta'],
      match: { diet: ['vegano'], need: ['energia'], format: ['intenso'] },
    },
    {
      id: 'tartaleta-fresas',
      name: 'Tartaleta Cruda de Fresas',
      price: 12.0,
      calories: 165,
      badge: 'Cruda',
      emoji: '🍓',
      tags: ['sin gluten', 'antiestres', 'intenso'],
      flavor: 'Base de pecanas iqueñas + dátiles + crema de cashews + fresas',
      description: 'Tartaleta fresca y frutal con base crujiente de frutos secos.',
      benefits: ['Fibra natural', 'Grasas saludables'],
      match: { diet: ['sin gluten'], need: ['antiestres'], format: ['intenso'] },
    },
    {
      id: 'galleta-avena-lucuma',
      name: 'Galleta de Avena y Lúcuma',
      price: 5.0,
      calories: 170,
      badge: 'Tradicional',
      emoji: '🟡',
      tags: ['tradicional', 'energia', 'portable'],
      flavor: 'Hojuelas de avena + harina de lúcuma + linaza + aceite de coco',
      description: 'Galleta peruana crujiente con el dulzor único de la lúcuma.',
      benefits: ['Toque peruano', 'Fibra extra'],
      match: { diet: ['tradicional'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'trufas-matcha',
      name: 'Trufas de Matcha',
      price: 10.0,
      calories: 140,
      badge: 'Alto en proteína',
      emoji: '🍵',
      tags: ['sin gluten', 'concentracion', 'portable'],
      flavor: 'Matcha ceremonial + almendra molida + coco rallado',
      description: 'Textura suave y efecto calmante para sesiones largas de estudio.',
      benefits: ['Enfoque mental', 'Sensorial premium'],
      match: { diet: ['sin gluten', 'vegano'], need: ['concentracion'], format: ['portable'] },
    },
    {
      id: 'mousse-chia-mango',
      name: 'Mousse de Chía y Mango',
      price: 8.0,
      calories: 155,
      badge: 'Vegano',
      emoji: '🥭',
      tags: ['vegano', 'antiestres', 'fresco'],
      flavor: 'Chía hidratada en leche de coco + puré de mango fresco',
      description: 'Ligero, fresco y amable para horas largas en campus.',
      benefits: ['Digestión ligera', 'Opción plant-based'],
      match: { diet: ['vegano'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'torta-palta-cacao',
      name: 'Torta de Palta y Cacao',
      price: 10.0,
      calories: 210,
      badge: 'Keto',
      emoji: '🥑',
      tags: ['keto', 'energia', 'intenso', 'portable'],
      flavor: 'Palta madura + cacao oscuro puro + endulzante natural',
      description: 'Más cremosa, más intensa y con una personalidad marcada.',
      benefits: ['Textura rica', 'Muy saciante'],
      match: { diet: ['keto'], need: ['energia'], format: ['intenso'] },
    },
    {
      id: 'pudin-cacao-avena',
      name: 'Pudín de Cacao y Avena',
      price: 6.0,
      calories: 150,
      badge: 'Ligero',
      emoji: '🍮',
      tags: ['vegano', 'energia', 'fresco'],
      flavor: 'Cacao amargo + avena remojada en leche de almendras + canela',
      description: 'Suave y práctico para quienes buscan algo liviano con sabor intenso.',
      benefits: ['Textura cremosa', 'Fácil de personalizar'],
      match: { diet: ['vegano'], need: ['energia'], format: ['fresco'] },
    },
    {
      id: 'cheesecake-maracuya-light',
      name: 'Cheesecake de Maracuyá Light',
      price: 9.0,
      calories: 175,
      badge: 'Light',
      emoji: '🧡',
      tags: ['tradicional', 'antiestres', 'fresco'],
      flavor: 'Queso crema ligero + maracuyá fresco + base integral',
      description: 'Ácido, cremoso y pensado para una pausa con aire tropical.',
      benefits: ['Perfil fresco', 'Muy compartible'],
      match: { diet: ['tradicional'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'alfajores-avena-cacao',
      name: 'Alfajores de Avena y Cacao',
      price: 6.5,
      calories: 170,
      badge: 'Portátil',
      emoji: '🥮',
      tags: ['tradicional', 'energia', 'portable'],
      flavor: 'Galletas de avena integral + crema de cacao y dátiles',
      description: 'Formato pequeño, cómodo y con sabor familiar que siempre funciona.',
      benefits: ['Fáciles de llevar', 'Antojo sin culpa'],
      match: { diet: ['tradicional'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'brownie-lucuma-nuez',
      name: 'Brownie de Lúcuma y Nuez',
      price: 9.5,
      calories: 195,
      badge: 'Peruano',
      emoji: '🌰',
      tags: ['keto', 'energia', 'portable'],
      flavor: 'Lúcuma peruana + nuez tostada + harina de almendras',
      description: 'Un brownie con identidad local y energía estable para toda la jornada.',
      benefits: ['Toque peruano', 'Energía sostenida'],
      match: { diet: ['keto'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'galletas-kiwicha-chocolate',
      name: 'Galletas de Kiwicha y Chocolate 70%',
      price: 7.5,
      calories: 155,
      badge: 'Sin gluten',
      emoji: '🍪',
      tags: ['sin gluten', 'energia', 'portable'],
      flavor: 'Kiwicha inflada + chocolate oscuro + pasta de maní',
      description: 'Croquetas crujientes de kiwicha bañadas en chocolate puro.',
      benefits: ['Alta proteína', 'Crujiente único'],
      match: { diet: ['sin gluten'], need: ['energia'], format: ['portable'] },
    },
    {
      id: 'queque-platano-canela',
      name: 'Queque de Plátano y Canela',
      price: 6.5,
      calories: 200,
      badge: 'Casero',
      emoji: '🍌',
      tags: ['tradicional', 'concentracion', 'portable'],
      flavor: 'Plátano maduro + harina integral + canela + nueces pecanas',
      description: 'Húmedo, aromático y reconfortante para una pausa productiva.',
      benefits: ['Sabor casero', 'Energía natural'],
      match: { diet: ['tradicional'], need: ['concentracion'], format: ['portable'] },
    },
    {
      id: 'crema-volteada-fit',
      name: 'Crema Volteada Fit',
      price: 6.0,
      calories: 160,
      badge: 'Fit',
      emoji: '🍮',
      tags: ['tradicional', 'antiestres', 'fresco'],
      flavor: 'Huevos + leche evaporada light + vainilla + stevia',
      description: 'El clásico peruano hecho versión saludable para darse un gusto.',
      benefits: ['Bajo en azúcar', 'Tradición fit'],
      match: { diet: ['tradicional'], need: ['antiestres'], format: ['fresco'] },
    },
    {
      id: 'helado-coco-maracuya',
      name: 'Helado Vegano de Coco y Maracuyá',
      price: 8.0,
      calories: 130,
      badge: 'Vegano',
      emoji: '🍨',
      tags: ['vegano', 'concentracion', 'fresco'],
      flavor: 'Leche de coco + pulpa de maracuyá + endulzante natural',
      description: 'Helado cremoso sin lácteos que refresca y ayuda a mantener el foco.',
      benefits: ['Refrescante', '100% vegetal'],
      match: { diet: ['vegano'], need: ['concentracion'], format: ['fresco'] },
    },
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
    adminPasswordModal: document.getElementById('adminPasswordModal'),
    adminPasswordForm: document.getElementById('adminPasswordForm'),
    adminPasswordInput: document.getElementById('adminPasswordInput'),
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
    adminOrders: document.getElementById('adminOrders'),
    adminCatalog: document.getElementById('adminCatalog'),
    studentList: document.getElementById('studentList'),
    classroomOptions: document.getElementById('classroomOptions'),
    resetDemoDataButton: document.getElementById('resetDemoDataButton'),
    bottomNavItems: Array.from(document.querySelectorAll('.bottom-nav__item')),
  };

  const state = loadState();
  let selectedFilter = state.student.selectedFilter || 'todos';
  let selectedView = 'home';

  function defaultState() {
    return {
      student: {
        answers: { diet: '', need: '', format: '' },
        selectedFilter: 'todos',
        cart: [],
        profile: { daysActive: 0, healthySnacks: 0, avoidedCoffee: 0 },
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

  function normalizeValue(value) {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  function itemHasTag(item, tag) {
    const normalizedTag = normalizeValue(tag);
    return item.tags.some((entry) => normalizeValue(entry) === normalizedTag);
  }

  function itemMatchesAny(item, values) {
    return values.some((value) => itemHasTag(item, value));
  }

  function getAnswerSeed() {
    return Object.values(state.student.answers).map(normalizeValue).join('|');
  }

  function pickFromTopScorers(scoredItems, seed) {
    if (!scoredItems.length) return CATALOG[0];
    if (!seed) return scoredItems[0].item;
    let hash = 0;
    for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    return scoredItems[hash % scoredItems.length].item;
  }

  function profile() {
    if (!state.student.profile) state.student.profile = { daysActive: 0, healthySnacks: 0, avoidedCoffee: 0 };
    return state.student.profile;
  }

  function currentQuestionIndex() {
    return QUESTIONS.findIndex((q) => !state.student.answers[q.key]);
  }

  function recommendedProduct() {
    const answers = state.student.answers;
    const scoredItems = CATALOG.map((item, index) => {
      let score = 0;
      if (answers.diet && item.match.diet.some((value) => normalizeValue(value) === normalizeValue(answers.diet))) score += 5;
      if (answers.need && item.match.need.some((value) => normalizeValue(value) === normalizeValue(answers.need))) score += 4;
      if (answers.format && item.match.format.some((value) => normalizeValue(value) === normalizeValue(answers.format))) score += 3;
      if (answers.need === 'concentracion' && itemMatchesAny(item, ['proteina', 'matcha', 'cacao'])) score += 1;
      if (answers.need === 'energia' && itemMatchesAny(item, ['energia', 'maca', 'nuez', 'lucuma'])) score += 1;
      if (answers.need === 'antiestres' && itemMatchesAny(item, ['fresco', 'chia', 'maracuya', 'limon'])) score += 1;
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
        renderProfile();
      });
    });
  }

  function renderMatch() {
    const isComplete = QUESTIONS.every((question) => state.student.answers[question.key]);
    if (!isComplete) {
      const preview = CATALOG[(profile().daysActive + profile().healthySnacks + 1) % CATALOG.length];
      el.matchName.textContent = 'Completa tu perfil para personalizar';
      el.matchDescription.textContent = 'Responde las 3 preguntas para descubrir el postre que mejor encaja con tu momento, tu energía y tu formato ideal.';
      el.matchTags.innerHTML = '<span>Quiz pendiente</span><span>Recomendación dinámica</span>';
      el.matchPrice.textContent = money(preview.price);
      el.matchCalories.textContent = `${preview.calories} kcal`;
      el.matchVisual.style.background = {
        'barras-maca-cacao': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
        'brownie-canihua': 'linear-gradient(135deg, #f5be65, #7b4a2e)',
        'pie-limon-proteico': 'linear-gradient(135deg, #fff0a4, #f08f61)',
        'queque-zanahoria-andino': 'linear-gradient(135deg, #ffcb93, #d96d37)',
        'galletas-quinoa-choco': 'linear-gradient(135deg, #f2e78b, #d09c2d)',
        'cheesecake-aguaymanto': 'linear-gradient(135deg, #ffefb1, #ff9f7a)',
        'trufas-keto-amazonicas': 'linear-gradient(135deg, #a7d8b8, #4f8d5a)',
        'pudin-chia-camu': 'linear-gradient(135deg, #bcead3, #76c68d)',
        'mousse-lucuma-vegano': 'linear-gradient(135deg, #c9f0d0, #39b676)',
        'alfajores-kiwicha': 'linear-gradient(135deg, #f0dfb7, #b57b4b)',
        'mazamorra-morada': 'linear-gradient(135deg, #d4b8e0, #7b4fa0)',
        'volcan-chocolate': 'linear-gradient(135deg, #d8d0c8, #6b3a2a)',
        'muffins-avena-arandanos': 'linear-gradient(135deg, #ffc8a2, #b06d8a)',
        'cuadritos-almendras': 'linear-gradient(135deg, #f7d680, #b8863a)',
        'turron-higos-vegano': 'linear-gradient(135deg, #d4a574, #7b4a2e)',
        'tartaleta-fresas': 'linear-gradient(135deg, #ffb5b5, #e86a6a)',
        'galleta-avena-lucuma': 'linear-gradient(135deg, #f2e78b, #d09c2d)',
        'trufas-matcha': 'linear-gradient(135deg, #c9f0d0, #39b676)',
        'mousse-chia-mango': 'linear-gradient(135deg, #bcead3, #76c68d)',
        'torta-palta-cacao': 'linear-gradient(135deg, #a7d8b8, #4f8d5a)',
        'pudin-cacao-avena': 'linear-gradient(135deg, #d8d0c8, #916f57)',
        'cheesecake-maracuya-light': 'linear-gradient(135deg, #ffefb1, #ff9f7a)',
        'alfajores-avena-cacao': 'linear-gradient(135deg, #f0dfb7, #b57b4b)',
        'brownie-lucuma-nuez': 'linear-gradient(135deg, #f7d680, #bb7a35)',
        'galletas-kiwicha-chocolate': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
        'queque-platano-canela': 'linear-gradient(135deg, #ffc8a2, #d96d37)',
        'crema-volteada-fit': 'linear-gradient(135deg, #fff0a4, #f08f61)',
        'helado-coco-maracuya': 'linear-gradient(135deg, #bcead3, #76c68d)',
      }[preview.id] || 'linear-gradient(135deg, #c9f0d0, #7ecb59)';
      return;
    }
    const match = recommendedProduct();
    el.matchName.textContent = match.name;
    el.matchDescription.textContent = match.description;
    el.matchPrice.textContent = money(match.price);
    el.matchCalories.textContent = `${match.calories} kcal`;
    el.matchTags.innerHTML = match.benefits.map((benefit) => `<span>${benefit}</span>`).join('');
    el.matchVisual.style.background = {
      'barras-maca-cacao': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
      'brownie-canihua': 'linear-gradient(135deg, #f5be65, #7b4a2e)',
      'pie-limon-proteico': 'linear-gradient(135deg, #fff0a4, #f08f61)',
      'queque-zanahoria-andino': 'linear-gradient(135deg, #ffcb93, #d96d37)',
      'galletas-quinoa-choco': 'linear-gradient(135deg, #f2e78b, #d09c2d)',
      'cheesecake-aguaymanto': 'linear-gradient(135deg, #ffefb1, #ff9f7a)',
      'trufas-keto-amazonicas': 'linear-gradient(135deg, #a7d8b8, #4f8d5a)',
      'pudin-chia-camu': 'linear-gradient(135deg, #bcead3, #76c68d)',
      'mousse-lucuma-vegano': 'linear-gradient(135deg, #c9f0d0, #39b676)',
      'alfajores-kiwicha': 'linear-gradient(135deg, #f0dfb7, #b57b4b)',
      'mazamorra-morada': 'linear-gradient(135deg, #d4b8e0, #7b4fa0)',
      'volcan-chocolate': 'linear-gradient(135deg, #d8d0c8, #6b3a2a)',
      'muffins-avena-arandanos': 'linear-gradient(135deg, #ffc8a2, #b06d8a)',
      'cuadritos-almendras': 'linear-gradient(135deg, #f7d680, #b8863a)',
      'turron-higos-vegano': 'linear-gradient(135deg, #d4a574, #7b4a2e)',
      'tartaleta-fresas': 'linear-gradient(135deg, #ffb5b5, #e86a6a)',
      'galleta-avena-lucuma': 'linear-gradient(135deg, #f2e78b, #d09c2d)',
      'trufas-matcha': 'linear-gradient(135deg, #c9f0d0, #39b676)',
      'mousse-chia-mango': 'linear-gradient(135deg, #bcead3, #76c68d)',
      'torta-palta-cacao': 'linear-gradient(135deg, #a7d8b8, #4f8d5a)',
      'pudin-cacao-avena': 'linear-gradient(135deg, #d8d0c8, #916f57)',
      'cheesecake-maracuya-light': 'linear-gradient(135deg, #ffefb1, #ff9f7a)',
      'alfajores-avena-cacao': 'linear-gradient(135deg, #f0dfb7, #b57b4b)',
      'brownie-lucuma-nuez': 'linear-gradient(135deg, #f7d680, #bb7a35)',
      'galletas-kiwicha-chocolate': 'linear-gradient(135deg, #d6b4ff, #7c54f0)',
      'queque-platano-canela': 'linear-gradient(135deg, #ffc8a2, #d96d37)',
      'crema-volteada-fit': 'linear-gradient(135deg, #fff0a4, #f08f61)',
      'helado-coco-maracuya': 'linear-gradient(135deg, #bcead3, #76c68d)',
    }[match.id] || 'linear-gradient(135deg, #c9f0d0, #7ecb59)';
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
    const energy = Math.min(100, Math.max(0, cartCount * 8));
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
    el.adminCatalog.innerHTML = CATALOG.slice(0, 8).map((item) => `
      <article class="catalog-card"><div class="catalog-card__visual" data-emoji="${item.emoji}"></div><div class="catalog-card__body"><div class="catalog-card__header"><div><strong>${item.name}</strong><p class="admin-catalog__meta">${item.flavor}</p></div><span class="admin-chip">${item.badge}</span></div><div class="price-row"><span>${item.calories} kcal</span><strong>${money(item.price)}</strong></div></div></article>
    `).join('');
    el.studentList.innerHTML = `
      <article class="student-item"><div class="student-item__body"><strong>Tienda abierta</strong><p class="student-item__meta">Cualquier persona puede pedir sin necesidad de cuenta.</p></div></article>
      <article class="student-item"><div class="student-item__body"><strong>Pedidos con entrega de aula</strong><p class="student-item__meta">Solo se aceptan aulas incluidas en aulas.csv.</p></div></article>
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

  async function submitOrder(event) {
    event.preventDefault();
    await classroomCatalogPromise;
    const classroom = normalizeClassroom(el.classroomInput.value);
    if (!availableClassrooms.size) { toast('No se pudo cargar la lista de aulas disponibles. Recarga la página.'); return; }
    if (!isAvailableClassroom(classroom)) { toast('Selecciona un aula disponible en la lista de la UPAO.'); el.classroomInput.focus(); return; }
    if (!state.student.cart.length) { toast('Tu carrito está vacío. Agrega al menos un producto.'); return; }
    const items = state.student.cart.map((entry) => {
      const item = CATALOG.find((product) => product.id === entry.id);
      return { id: item.id, name: item.name, price: item.price, emoji: item.emoji, quantity: entry.quantity };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    state.orders.unshift({ id: `HD-${Date.now().toString(36).toUpperCase()}`, userId: null, classroom, status: 'new', createdAt: new Date().toISOString(), items, total: Number(total.toFixed(2)) });
    state.student.cart = [];
    profile().daysActive += 1;
    profile().healthySnacks += 1;
    saveState();
    renderCart();
    renderAdmin();
    renderProfile();
    el.orderForm.reset();
    openOrderConfirmation({ classroom, total: Number(total.toFixed(2)), orderId: state.orders[0].id });
    toast(`Pedido confirmado para ${classroom}.`);
    showView('home');
  }

  function openOrderConfirmation(order) {
    el.orderConfirmationCode.textContent = order.orderId;
    el.orderConfirmationClassroom.textContent = `Entrega en ${order.classroom}`;
    el.orderConfirmationTotal.textContent = money(order.total);
    el.orderConfirmationMessage.textContent = 'Tu pedido quedó registrado y se entregará en tu salón. El pago será presencial al recogerlo.';
    el.orderConfirmationModal.classList.remove('is-hidden');
  }

  function closeOrderConfirmation() {
    el.orderConfirmationModal.classList.add('is-hidden');
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function openAdminPasswordModal() {
    el.adminPasswordInput.value = '';
    el.adminPasswordModal.classList.remove('is-hidden');
    el.adminPasswordInput.focus();
  }

  function closeAdminPasswordModal() {
    el.adminPasswordModal.classList.add('is-hidden');
  }

  function handleAdminPasswordSubmit(event) {
    event.preventDefault();
    if (el.adminPasswordInput.value.trim() === '123456789') {
      closeAdminPasswordModal();
      setScreen('admin');
      renderAdmin();
    } else {
      toast('Contraseña incorrecta.');
      el.adminPasswordInput.value = '';
      el.adminPasswordInput.focus();
    }
  }

  el.goToAdminButton.addEventListener('click', openAdminPasswordModal);
  el.adminPasswordForm.addEventListener('submit', handleAdminPasswordSubmit);
  el.adminPasswordModal.addEventListener('click', (event) => { if (event.target === el.adminPasswordModal) closeAdminPasswordModal(); });
  el.backToStoreButton.addEventListener('click', () => { setScreen('student'); });
  el.restartQuizButton.addEventListener('click', () => { state.student.answers = { diet: '', need: '', format: '' }; saveState(); renderQuestionnaire(); renderMatch(); renderProfile(); toast('Flujo reiniciado.'); });
  el.wizardNextButton.addEventListener('click', () => { const unanswered = QUESTIONS.find((question) => !state.student.answers[question.key]); if (unanswered) { toast('Selecciona una opción para continuar.'); return; } toast(`Tu match es ${recommendedProduct().name}.`); el.matchCard.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  el.addMatchToCartButton.addEventListener('click', () => { const match = recommendedProduct(); const existing = state.student.cart.find((entry) => entry.id === match.id); if (existing) existing.quantity += 1; else state.student.cart.push({ id: match.id, quantity: 1 }); saveState(); renderCart(); renderProfile(); toast(`${match.name} añadido al carrito.`); showView('cart'); });
  el.viewCartShortcut.addEventListener('click', () => showView('cart'));
  el.backToMenuButton.addEventListener('click', () => showView('menu'));
  el.orderForm.addEventListener('submit', submitOrder);
  el.orderConfirmationModal.addEventListener('click', (event) => { if (event.target === el.orderConfirmationModal) closeOrderConfirmation(); });
  el.closeOrderConfirmationButton.addEventListener('click', closeOrderConfirmation);
  el.resetDemoDataButton.addEventListener('click', resetDemo);
  el.bottomNavItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));

  classroomCatalogPromise
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
      renderProfile();
      renderAdmin();
      setScreen('student');
    });
})();

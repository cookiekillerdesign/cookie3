/* ================= i18n ================= */
export const LANGS = ['ru', 'ro', 'en'];
export const DEFAULT_LANG = 'en';

export function detectLang() {
  try {
    const saved = localStorage.getItem('cc_lang');
    if (saved && LANGS.includes(saved)) return saved;
  } catch { /* ignore */ }
  return DEFAULT_LANG;
}

const PROJECTS_I18N = [
  {
    tags: { en: 'Banking Platform · Product Design', ru: 'Банковская платформа · Продуктовый дизайн', ro: 'Platformă bancară · Product Design' },
    overview: {
      en: 'A closed internal banking platform used by 50+ staff daily. I rebuilt the information architecture from the ground up — clearer data models, role-based navigation, and a checkout-grade approval flow that cut processing time without touching the backend.',
      ru: 'Закрытая внутренняя банковская платформа, которой каждый день пользуются 50+ сотрудников. Я пересобрал информационную архитектуру с нуля — понятные модели данных, ролевая навигация и цепочка согласований уровня чекаута, которая сократила время обработки без изменений в бэкенде.',
      ro: 'O platformă bancară internă, închisă, folosită zilnic de 50+ angajați. Am reconstruit arhitectura informației de la zero — modele de date mai clare, navigare bazată pe roluri și un flux de aprobare la nivel de checkout care a redus timpul de procesare fără să atingă backend-ul.'
    }
  },
  {
    tags: { en: 'Healthcare Platform · Product Design', ru: 'Платформа здравоохранения · Продуктовый дизайн', ro: 'Platformă medicală · Product Design' },
    overview: {
      en: 'A healthcare booking platform where every extra tap costs a patient. I simplified appointment scheduling into a three-step flow and rebuilt the doctor directory so people find the right specialist without calling the front desk.',
      ru: 'Платформа для записи к врачу, где каждый лишний тап стоит пациенту времени. Я упростил запись до трёх шагов и пересобрал каталог врачей — теперь нужного специалиста находят сами, без звонка на ресепшн.',
      ro: 'O platformă de programări medicale unde fiecare tap în plus costă timpul pacientului. Am simplificat programarea la trei pași și am reconstruit catalogul de medici — pacienții găsesc singuri specialistul potrivit, fără telefon la recepție.'
    }
  },
  {
    tags: { en: 'iOS App · Product & UX/UI', ru: 'iOS-приложение · Продукт и UX/UI', ro: 'Aplicație iOS · Product & UX/UI' },
    overview: {
      en: 'A money-transfer product built for speed under real financial stakes. I mapped the full send-and-receive flow, prototyped the MVP in Figma, and ran two rounds of usability testing before a single line of code shipped.',
      ru: 'Продукт для денежных переводов, где скорость важна так же, как и деньги пользователей. Я построил весь флоу отправки и получения, спрототипировал MVP в Figma и провёл два раунда юзабилити-тестирования до того, как написали первую строчку кода.',
      ro: 'Un produs de transfer de bani unde viteza contează la fel de mult ca banii utilizatorilor. Am mapat tot fluxul de trimitere și primire, am prototipat MVP-ul în Figma și am rulat două runde de testare de uzabilitate înainte să scriem prima linie de cod.'
    }
  },
  {
    tags: { en: 'Agency Website · UX/UI', ru: 'Сайт агентства · UX/UI', ro: 'Site de agenție · UX/UI' },
    overview: {
      en: "The agency's own front door. A wireframe-first rebuild that turned a static brochure site into a lead-generating page — faster load, clearer service pages, and a handoff-ready component library for the dev team.",
      ru: 'Собственный сайт агентства. Пересборка с вайрфреймов — из статичной визитки получилась страница, которая реально приводит заявки: быстрее загрузка, понятные страницы услуг и библиотека компонентов, готовая к передаче в разработку.',
      ro: 'Site-ul propriu al agenției. O reconstrucție pornind de la wireframe-uri — dintr-o broșură statică a ieșit o pagină care chiar aduce lead-uri: încărcare mai rapidă, pagini de servicii clare și o bibliotecă de componente gata pentru predare către dezvoltare.'
    }
  },
  {
    tags: { en: 'E-Commerce · UX/UI', ru: 'Интернет-магазин · UX/UI', ro: 'E-Commerce · UX/UI' },
    overview: {
      en: 'A food & drink e-commerce brand that needed to feel handmade, not templated. I redesigned the storefront around the product photography, rebuilt checkout to cut abandoned carts, and gave it a responsive layout that holds up on mobile.',
      ru: 'E-commerce бренд еды и напитков, которому нужно было выглядеть не как шаблон, а как ручная работа. Я пересобрал витрину вокруг предметной съёмки, переделал чекаут против брошенных корзин и сделал адаптивную вёрстку, которая держится на мобильных.',
      ro: 'Un brand de e-commerce pentru mâncare și băuturi care trebuia să pară lucrat manual, nu templat. Am redesenat vitrina în jurul fotografiei de produs, am reconstruit checkout-ul împotriva coșurilor abandonate și am făcut un layout responsive care ține pe mobil.'
    }
  },
  {
    tags: { en: 'E-Commerce · UX/UI', ru: 'Интернет-магазин · UX/UI', ro: 'E-Commerce · UX/UI' },
    overview: {
      en: 'An online store carrying a wide, messy catalogue. I restructured navigation and filtering around how people actually shop, then simplified checkout from five steps to two.',
      ru: 'Интернет-магазин с большим и запутанным каталогом. Я перестроил навигацию и фильтры под реальное поведение покупателей и сократил чекаут с пяти шагов до двух.',
      ro: 'Un magazin online cu un catalog mare și încurcat. Am restructurat navigarea și filtrele după cum cumpără oamenii cu adevărat și am redus checkout-ul de la cinci pași la doi.'
    }
  },
  {
    tags: { en: 'E-Commerce · UX/UI', ru: 'Интернет-магазин · UX/UI', ro: 'E-Commerce · UX/UI' },
    overview: {
      en: 'A rebrand-and-rebuild for an online store outgrowing its old identity. New visual system, new storefront, and a checkout flow rebuilt for mobile-first traffic.',
      ru: 'Ребрендинг и пересборка магазина, который перерос старую айдентику. Новая визуальная система, новая витрина и чекаут, пересобранный под mobile-first трафик.',
      ro: 'Rebranding și reconstrucție pentru un magazin care depășise vechea identitate. Sistem vizual nou, vitrină nouă și checkout reconstruit pentru trafic mobile-first.'
    }
  },
  {
    tags: { en: 'Android App · Branding & UX/UI', ru: 'Android-приложение · Брендинг и UX/UI', ro: 'Aplicație Android · Branding & UX/UI' },
    overview: {
      en: 'An Android VPN app where trust is the whole product. I designed the onboarding, settings architecture and subscription flow, then built the icon and app identity to match — calm, technical, no dark patterns.',
      ru: 'Android-приложение VPN, где доверие — это и есть продукт. Я спроектировал онбординг, архитектуру настроек и флоу подписки, а затем собрал иконку и айдентику под это — спокойно, технично, без тёмных паттернов.',
      ro: 'O aplicație Android de VPN unde încrederea este chiar produsul. Am proiectat onboarding-ul, arhitectura setărilor și fluxul de abonament, apoi am construit iconița și identitatea aplicației pe măsură — calm, tehnic, fără dark patterns.'
    }
  },
  {
    tags: { en: 'UX/UI Design', ru: 'UX/UI дизайн', ro: 'Design UX/UI' },
    overview: {
      en: "An early-stage product still finding its shape. I'm running the UX research and wireframing now, prototyping flows before the visual system locks in — the kind of ambiguous, ground-floor work I like most.",
      ru: 'Продукт на ранней стадии, который ещё ищет свою форму. Сейчас веду UX-исследование и вайрфрейминг, прототипирую флоу до того, как зафиксируется визуальная система — люблю именно такую, неопределённую работу с нуля.',
      ro: 'Un produs la început de drum, care încă își caută forma. Acum fac research UX și wireframing, prototipez fluxurile înainte ca sistemul vizual să se fixeze — genul ăsta de lucru ambiguu, de la zero, îmi place cel mai mult.'
    }
  },
  {
    tags: { en: 'Pets App · UX/UI', ru: 'Приложение для питомцев · UX/UI', ro: 'Aplicație pentru animale de companie · UX/UI' },
    overview: {
      en: "A pet-adoption and rescue marketplace, currently in build. I prototyped the adoption flow end-to-end and I'm shaping the identity system now — this one gets the same rigor as any paid client, pro-bono rate or not.",
      ru: 'Маркетплейс усыновления и помощи животным, сейчас в разработке. Я спрототипировал флоу усыновления от начала до конца и сейчас леплю систему айдентики — этому проекту тот же уровень внимания, что и любому платному, несмотря на тариф pro bono.',
      ro: 'Un marketplace de adopții și salvare a animalelor, momentan în lucru. Am prototipat fluxul de adopție integral și acum construiesc sistemul de identitate — proiectul primește același nivel de atenție ca oricare client plătit, indiferent de tariful pro bono.'
    }
  },
  {
    name: { en: 'Logos for Business', ru: 'Логотипы для бизнеса', ro: 'Logo-uri pentru afaceri' },
    tags: { en: 'Branding · Logos', ru: 'Брендинг · Логотипы', ro: 'Branding · Logo-uri' },
    overview: {
      en: 'A running collection of identity work for small businesses across Moldova and the EU — logo systems built to survive a business card, a storefront sign, and a social feed equally well.',
      ru: 'Постоянная коллекция айдентики для малого бизнеса из Молдовы и ЕС — логотипы, которые одинаково хорошо держатся на визитке, на вывеске и в ленте соцсетей.',
      ro: 'O colecție continuă de identitate vizuală pentru afaceri mici din Moldova și UE — sisteme de logo construite să reziste la fel de bine pe o carte de vizită, pe o firmă de magazin și într-un feed de social media.'
    }
  },
  {
    tags: { en: 'Branding · Logos', ru: 'Брендинг · Логотипы', ro: 'Branding · Logo-uri' },
    overview: {
      en: "Branding for Moldova's rock and metal scene — posters, merch and stage identity for bands and labels who'd rather spend the budget on a real show than a logo redesign, so I keep it fast and cheap without it looking cheap.",
      ru: 'Брендинг для рок- и метал-сцены Молдовы — постеры, мерч и сценическая айдентика для групп и лейблов, которые лучше потратят бюджет на концерт, чем на редизайн логотипа, так что я держу это быстро и недорого, не теряя в качестве.',
      ro: 'Branding pentru scena rock și metal din Moldova — postere, merch și identitate de scenă pentru trupe și case de discuri care preferă să bage bugetul într-un concert adevărat, nu într-un redesign de logo, așa că țin totul rapid și ieftin, fără să arate ieftin.'
    }
  }
];

export function projectName(p, lang) {
  return (p.i18n && p.i18n.name && p.i18n.name[lang]) || p.name;
}
export function projectTags(p, lang) {
  return (p.i18n && p.i18n.tags && p.i18n.tags[lang]) || p.tags;
}
export function projectOverview(p, lang) {
  return (p.i18n && p.i18n.overview && p.i18n.overview[lang]) || '';
}
export { PROJECTS_I18N };

const en = {
  meta: {
    title: 'Cookiekiller® UX/UI & Visual Design',
    description: "Senior UX/UI & Product Designer. I turn complex product logic into interfaces that convert. Chisinau → worldwide."
  },
  city: 'Chisinau',
  header: { openToWork: 'Open to work', menu: 'Menu', close: 'Close', home: 'Home', language: 'Language', mainNav: 'Main navigation' },
  loader: { tag: 'cookiekiller.design — portfolio 2026' },
  nav: {
    work: { label: 'Work', n: '12 projects · 2018—2026', desc: 'Selected case studies — e-commerce, CRM, mobile.' },
    portfolio: { label: 'Portfolio', n: 'The full grid', desc: 'Every project, filterable by type — one page, no scrolling past Behance ads.' },
    about: { label: 'About', n: 'The short version', desc: "Who's behind the screen, in a few lines." },
    capabilities: { label: 'Capabilities', n: 'Stacked, like my sprints', desc: 'Product & UX, UI systems, branding, and the AI stack that keeps it fast.' },
    experience: { label: 'Experience', n: '2018 → now', desc: 'Senior UX/UI at Zazitex SRL, lecturing at IT STEP Academy.' },
    contact: { label: 'Contact', n: 'Say hello', desc: "Got a messy flow? A leaky funnel? Let's kill it together." }
  },
  menuFoot: { location: 'Chisinau, MD → Worldwide' },
  hero: {
    line1: 'I KILL', line2: 'BAD DESIGN', line3: 'FOR A LIVING',
    subPre: 'I turn complex product logic — ',
    subBold: 'CRM architecture, marketplaces, checkout funnels',
    subPost: ' — into interfaces people actually finish using. 5+ years shipping for international clients.'
  },
  marquee: ['Product Design', 'UX Research', 'Design Systems', 'E-Commerce', 'CRM Architecture', 'Conversion Optimization', 'Branding', 'Mobile Apps'],
  status: { live: 'Live', dev: 'In dev', case: 'Case study' },
  work: {
    eyebrow: 'Selected Work', count: '12 projects · 2018—2026',
    more: 'View full portfolio',
    viewCase: 'View case study', viewBehance: 'View on Behance'
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'All Work',
    intro: 'Twelve products, one habit: turning tangled logic into interfaces people can actually finish using.',
    filters: { all: 'All', product: 'Product', ecommerce: 'E-Commerce', mobile: 'Mobile', branding: 'Branding' },
    viewCase: 'View case study',
    backHome: 'Back to home'
  },
  project: {
    back: 'All projects',
    client: 'Client', role: 'Scope', year: 'Year', platform: 'Platform',
    overviewLabel: 'Overview', skillsLabel: 'What I used',
    behance: 'View on Behance', next: 'Next project',
    notFoundTitle: "This one's not here",
    notFoundBody: "That project doesn't exist — or the link is broken. Try the full portfolio instead.",
    notFoundCta: 'Back to portfolio'
  },
  caseStudy: {
    eyebrowLabel: 'Case study', category: 'Branding & Logo Design',
    scopeValue: '13 marks · full folio', fullSet: 'Full set',
    allLabel: 'All 13', clickHint: 'Click any to jump',
    items: [
      { name: 'Cursed Bakery', tag: 'Streetwear Brand' },
      { name: 'XSpace Events', tag: 'Event Agency' },
      { name: 'Zazitex', tag: 'Logo Variation for Agency' },
      { name: 'Mayson Solutions', tag: 'Game Design Studio' },
      { name: 'AETO Academy', tag: 'Language Academy' },
      { name: 'Pulse', tag: 'Event App' },
      { name: 'Friends MD', tag: 'Telegram Society' },
      { name: 'Go Networking', tag: 'Networking Project' },
      { name: 'Avanguard Ltd', tag: 'US Trucking Company' },
      { name: 'YukaVPN', tag: 'VPN Service App' },
      { name: 'Musqogee VPN', tag: 'VPN Service App' },
      { name: 'Skydive Tenerife', tag: 'Skydiving Club & Dropzone' },
      { name: 'FSNAS', tag: 'Airsoft Federation' }
    ]
  },
  platformLabels: { web: 'Web Platform', ios: 'iOS App', android: 'Android App', mobile: 'Mobile App', print: 'Print & Digital' },
  about: {
    eyebrow: 'About', count: 'The short version',
    statementPre: "Design isn't decoration. It's ",
    statementEm: 'logic you can click',
    statementPost: ' — and I build it end-to-end: discovery, systems, prototypes, delivery.',
    p1Pre: 'I specialise in products where the flows are messy and the stakes are real: ',
    p1Bold: 'banking platforms, healthcare, marketplaces, closed CRM systems for 50+ internal users.',
    p2: 'By day I ship at Zazitex. By night I lecture UX/UI Design, Design Thinking and Product Strategy at IT STEP Academy — because explaining design out loud keeps my own thinking honest.',
    p3: 'English B2 · Russian native · Romanian fluent.',
    stats: ['Years in product design', 'Products shipped', 'Brands designed', 'Adobe certifications']
  },
  capabilities: {
    eyebrow: 'Capabilities', count: 'Stacked, like my sprints',
    decks: [
      { top1: 'A — Product & UX', top2: 'Where I start', h3: 'Product & UX Design', items: ['User Flows', 'Information Architecture', 'MVP Design', 'A/B Testing', 'Conversion Optimization', 'UX Research', 'Usability Testing', 'Wireframing'] },
      { top1: 'B — UI & Systems', top2: 'Where it scales', h3: 'UI & Design Systems', items: ['Design Systems', 'Prototyping', 'Responsive Design', 'Accessibility', 'Web · iOS · Android', 'Design-to-dev handoff'] },
      { top1: 'C — Brand', top2: 'Where it gets a face', h3: 'Branding & Visual', items: ['Identity Systems', 'Rebranding', 'Packaging', 'Motion & Visual Communication', 'Print & Digital'] },
      { top1: 'D — Stack', top2: 'Where it gets fast', h3: 'Tools & AI Stack', items: ['Figma', 'Adobe CC', 'Miro', 'Notion', 'Jira', 'Midjourney', 'Sora', 'ChatGPT', 'Real-ESRGAN'] }
    ]
  },
  experience: {
    eyebrow: 'Experience', count: '2018 → now',
    rows: [
      { when: 'Jun 2024 — Present', now: true, role: 'Senior UX/UI & Product Designer', org: 'Zazitex SRL', desc: 'End-to-end UX/UI for e-commerce platforms and internal systems. Architected closed CRM logic from scratch — data models, navigation, role-based access for 50+ users. Reduced checkout friction through IA restructuring and progressive disclosure. Mentoring juniors, running UX workshops.' },
      { when: 'Jun 2024 — Present', now: true, role: 'Lecturer, UX/UI Design', org: 'IT STEP Academy', desc: 'Teaching UX/UI Design, Design Thinking and Product Strategy. Guiding students through research, prototyping and usability testing on real client projects.' },
      { when: 'Dec 2022 — Jan 2024', now: false, role: 'Middle UX/UI Designer', org: 'Yucatech Software SRL · Hostry.com · Lycaste.com', desc: 'Redesigned core e-commerce flows, improved onboarding and cut drop-off at key conversion points. Built a multi-platform design system (web + iOS + Android) across 3 products. Shipped a VPN app: onboarding, settings architecture, subscription flows.' },
      { when: 'Dec 2021 — Dec 2022', now: false, role: 'Middle Graphic Designer', org: 'Art Poligraf SRL', desc: 'Brand identity and packaging for clients across Moldova and EU markets; visual communication across print and digital campaigns.' },
      { when: '2018 — 2021', now: false, role: 'Junior Graphic Designer', org: 'Sonaris-com Advertising Agency · Freelance', desc: 'Brand identities and digital ads for 20+ SMEs and startups; UI layouts for early-stage e-commerce products.' }
    ],
    certsEyebrow: 'Certifications', certsCount: '5 verified credentials', verifyLabel: 'Verify'
  },
  special: {
    eyebrow: 'Side Quests', count: "Not every project is a bank",
    tickerVet: 'Strays get a discount', tickerMetal: 'Riffs get a deal',
    vetTitle: 'Animal Rescue & Vet Volunteers',
    vetDesc: 'Shelters and rescues get pro-bono or cost-only rates — sites, adoption flows and donation pages built to actually convert.',
    vetCta: 'Tell me about your shelter', vetCursor: 'Woof-approved rate',
    metalTitle: 'Metal Bands & Labels',
    metalDesc: "Flat rate, revenue split, or vinyl toward the invoice — album art, merch stores and sites that don't embarrass the music.",
    metalCta: 'Book the slot', metalCursor: 'Full send rate'
  },
  footer: {
    eyebrow: 'Got a messy flow? A leaky funnel? A CRM nobody can use?',
    ctaPre: "Let's ", ctaSwap: 'kill it', ctaPost: ' together.',
    formTrigger: 'Leave a request',
    fineSuffix: 'Chisinau time'
  },
  form: {
    title: 'Leave a request', sub: "Fill it in — I'll get back within a day, usually faster.",
    nameLabel: 'Name', namePlaceholder: 'Your name',
    emailLabel: 'Email', emailPlaceholder: 'you@company.com',
    msgLabel: 'What are we killing?', msgPlaceholder: 'Project, budget range, timeline…',
    submit: 'Send the brief', note: 'Opens your email app with everything filled in.',
    thanksTitle: 'Thanks for reaching out!',
    thanksSub: "Got your message — I'll get back to you soon, usually within a day.",
    close: 'Close'
  }
};

const ru = {
  meta: {
    title: 'Cookiekiller® UX/UI & Visual Design',
    description: 'Senior UX/UI и продуктовый дизайнер. Превращаю сложную бизнес-логику продукта в интерфейсы, которые доводят пользователя до цели. Кишинёв → весь мир.'
  },
  city: 'Кишинёв',
  header: { openToWork: 'Открыт для работы', menu: 'Меню', close: 'Закрыть', home: 'Главная', language: 'Язык', mainNav: 'Основная навигация' },
  loader: { tag: 'cookiekiller.design — портфолио 2026' },
  nav: {
    work: { label: 'Работы', n: '12 проектов · 2018—2026', desc: 'Избранные кейсы — e-commerce, CRM, мобильные приложения.' },
    portfolio: { label: 'Портфолио', n: 'Вся сетка', desc: 'Все проекты с фильтром по типу — на одной странице, без рекламы Behance.' },
    about: { label: 'Обо мне', n: 'Коротко', desc: 'Кто по ту сторону экрана — в двух словах.' },
    capabilities: { label: 'Компетенции', n: 'Собрано, как мои спринты', desc: 'Product & UX, UI-системы, брендинг и AI-стек, который держит скорость.' },
    experience: { label: 'Опыт', n: '2018 → сейчас', desc: 'Senior UX/UI в Zazitex SRL, преподаю в IT STEP Academy.' },
    contact: { label: 'Контакты', n: 'Написать', desc: 'Кривой флоу? Дырявая воронка? Убьём это вместе.' }
  },
  menuFoot: { location: 'Кишинёв, Молдова → весь мир' },
  hero: {
    line1: 'Я УБИВАЮ', line2: 'ПЛОХОЙ ДИЗАЙН', line3: 'ПРОФЕССИОНАЛЬНО',
    subPre: 'Я превращаю сложную бизнес-логику продукта — ',
    subBold: 'архитектуру CRM, маркетплейсы, воронки оформления заказа',
    subPost: ' — в интерфейсы, которые реально доводят до конца, а не бросают на полпути. 5+ лет опыта с международными клиентами.'
  },
  marquee: ['Продуктовый дизайн', 'UX-исследования', 'Дизайн-системы', 'E-Commerce', 'CRM-архитектура', 'Оптимизация конверсии', 'Брендинг', 'Мобильные приложения'],
  status: { live: 'Работает', dev: 'В разработке', case: 'Кейс' },
  work: {
    eyebrow: 'Избранные работы', count: '12 проектов · 2018—2026',
    more: 'Смотреть всё портфолио',
    viewCase: 'Смотреть кейс', viewBehance: 'Смотреть на Behance'
  },
  portfolio: {
    eyebrow: 'Портфолио',
    title: 'Все работы',
    intro: 'Двенадцать продуктов и одна привычка: превращать запутанную логику в интерфейсы, которые реально доводят до конца.',
    filters: { all: 'Все', product: 'Продукт', ecommerce: 'E-Commerce', mobile: 'Мобильные', branding: 'Брендинг' },
    viewCase: 'Смотреть кейс',
    backHome: 'На главную'
  },
  project: {
    back: 'Все проекты',
    client: 'Клиент', role: 'Формат', year: 'Год', platform: 'Платформа',
    overviewLabel: 'Обзор', skillsLabel: 'Что использовал',
    behance: 'Смотреть на Behance', next: 'Следующий проект',
    notFoundTitle: 'Такого проекта нет',
    notFoundBody: 'Этот проект не существует — либо ссылка битая. Загляните в полное портфолио.',
    notFoundCta: 'В портфолио'
  },
  caseStudy: {
    eyebrowLabel: 'Кейс-стади', category: 'Брендинг и логотипы',
    scopeValue: '13 знаков · полное портфолио', fullSet: 'Всё портфолио',
    allLabel: 'Все 13', clickHint: 'Клик — переход к проекту',
    items: [
      { name: 'Cursed Bakery', tag: 'Стритвир-бренд' },
      { name: 'XSpace Events', tag: 'Ивент-агентство' },
      { name: 'Zazitex', tag: 'Вариация логотипа для агентства' },
      { name: 'Mayson Solutions', tag: 'Студия геймдизайна' },
      { name: 'AETO Academy', tag: 'Языковая академия' },
      { name: 'Pulse', tag: 'Приложение для мероприятий' },
      { name: 'Friends MD', tag: 'Телеграм-сообщество' },
      { name: 'Go Networking', tag: 'Нетворкинг-проект' },
      { name: 'Avanguard Ltd', tag: 'Транспортная компания (США)' },
      { name: 'YukaVPN', tag: 'VPN-сервис' },
      { name: 'Musqogee VPN', tag: 'VPN-сервис' },
      { name: 'Skydive Tenerife', tag: 'Клуб парашютного спорта' },
      { name: 'FSNAS', tag: 'Федерация страйкбола' }
    ]
  },
  platformLabels: { web: 'Веб-платформа', ios: 'iOS-приложение', android: 'Android-приложение', mobile: 'Мобильное приложение', print: 'Print и digital' },
  about: {
    eyebrow: 'Обо мне', count: 'Коротко',
    statementPre: 'Дизайн — это не украшательство. Это ',
    statementEm: 'логика, по которой можно кликнуть',
    statementPost: ' — и я строю её полностью: исследование, системы, прототипы, сдача.',
    p1Pre: 'Я специализируюсь на продуктах, где флоу запутанные, а ставки реальные: ',
    p1Bold: 'банковские платформы, здравоохранение, маркетплейсы, закрытые CRM-системы для 50+ внутренних пользователей.',
    p2: 'Днём я делаю продукты в Zazitex. Вечером преподаю UX/UI дизайн, дизайн-мышление и продуктовую стратегию в IT STEP Academy — потому что объяснять дизайн вслух держит собственное мышление честным.',
    p3: 'Английский B2 · Русский родной · Румынский свободно.',
    stats: ['Лет в продуктовом дизайне', 'Продуктов запущено', 'Брендов разработано', 'Сертификатов Adobe']
  },
  capabilities: {
    eyebrow: 'Компетенции', count: 'Собрано, как мои спринты',
    decks: [
      { top1: 'A — Продукт и UX', top2: 'С чего я начинаю', h3: 'Продукт и UX дизайн', items: ['Пользовательские флоу', 'Информационная архитектура', 'MVP-дизайн', 'A/B-тестирование', 'Оптимизация конверсии', 'UX-исследования', 'Юзабилити-тестирование', 'Вайрфреймы'] },
      { top1: 'B — UI и системы', top2: 'Где это масштабируется', h3: 'UI и дизайн-системы', items: ['Дизайн-системы', 'Прототипирование', 'Адаптивный дизайн', 'Доступность', 'Web · iOS · Android', 'Передача в разработку'] },
      { top1: 'C — Бренд', top2: 'Где появляется лицо', h3: 'Брендинг и визуал', items: ['Айдентика', 'Ребрендинг', 'Упаковка', 'Моушн и визуальные коммуникации', 'Print и digital'] },
      { top1: 'D — Стек', top2: 'Где это ускоряется', h3: 'Инструменты и AI-стек', items: ['Figma', 'Adobe CC', 'Miro', 'Notion', 'Jira', 'Midjourney', 'Sora', 'ChatGPT', 'Real-ESRGAN'] }
    ]
  },
  experience: {
    eyebrow: 'Опыт', count: '2018 → сейчас',
    rows: [
      { when: 'Июнь 2024 — по наст. время', now: true, role: 'Senior UX/UI и продуктовый дизайнер', org: 'Zazitex SRL', desc: 'End-to-end UX/UI для e-commerce платформ и внутренних систем. Спроектировал закрытую CRM-логику с нуля — модели данных, навигация, ролевой доступ для 50+ пользователей. Снизил трение в чекауте за счёт реструктуризации IA и прогрессивного раскрытия информации. Менторю джунов, провожу UX-воркшопы.' },
      { when: 'Июнь 2024 — по наст. время', now: true, role: 'Преподаватель UX/UI дизайна', org: 'IT STEP Academy', desc: 'Преподаю UX/UI дизайн, дизайн-мышление и продуктовую стратегию. Провожу студентов через research, прототипирование и юзабилити-тестирование на реальных клиентских проектах.' },
      { when: 'Дек 2022 — Янв 2024', now: false, role: 'Middle UX/UI дизайнер', org: 'Yucatech Software SRL · Hostry.com · Lycaste.com', desc: 'Редизайн основных e-commerce флоу, улучшение онбординга и снижение оттока на ключевых точках конверсии. Построил мультиплатформенную дизайн-систему (web + iOS + Android) для 3 продуктов. Выпустил VPN-приложение: онбординг, архитектура настроек, флоу подписки.' },
      { when: 'Дек 2021 — Дек 2022', now: false, role: 'Middle графический дизайнер', org: 'Art Poligraf SRL', desc: 'Айдентика и упаковка для клиентов на рынках Молдовы и ЕС; визуальные коммуникации в print и digital кампаниях.' },
      { when: '2018 — 2021', now: false, role: 'Junior графический дизайнер', org: 'Sonaris-com Advertising Agency · Freelance', desc: 'Айдентика и digital-реклама для 20+ малых компаний и стартапов; UI-макеты для e-commerce продуктов на раннем этапе.' }
    ],
    certsEyebrow: 'Сертификаты', certsCount: '5 подтверждённых сертификатов', verifyLabel: 'Проверить'
  },
  special: {
    eyebrow: 'Не только банки', count: 'Не всякий проект — банк',
    tickerVet: 'Бездомным — скидка', tickerMetal: 'Металлистам — скидка',
    vetTitle: 'Приютам и ветеринарам-волонтёрам',
    vetDesc: 'Приютам и спасательным организациям — pro bono или по себестоимости: сайты, флоу усыновления и страницы донатов, которые реально конвертят.',
    vetCta: 'Расскажите о своём приюте', vetCursor: 'Одобрено лапой',
    metalTitle: 'Метал-группам и лейблам',
    metalDesc: 'Фикс, доля от выручки или винил в счёт оплаты — обложки альбомов, merch-магазины и сайты, за которые не будет стыдно перед музыкой.',
    metalCta: 'Забронировать слот', metalCursor: 'На полной мощности'
  },
  footer: {
    eyebrow: 'Кривой флоу? Дырявая воронка? CRM, которым никто не пользуется?',
    ctaPre: 'Давайте ', ctaSwap: 'убьём это', ctaPost: ' вместе.',
    formTrigger: 'Оставить заявку',
    fineSuffix: 'время в Кишинёве'
  },
  form: {
    title: 'Оставить заявку', sub: 'Заполните форму — отвечу в течение дня, обычно быстрее.',
    nameLabel: 'Имя', namePlaceholder: 'Ваше имя',
    emailLabel: 'Email', emailPlaceholder: 'you@company.com',
    msgLabel: 'Что будем убивать?', msgPlaceholder: 'Проект, бюджет, сроки…',
    submit: 'Отправить бриф', note: 'Откроет почтовое приложение с готовым письмом.',
    thanksTitle: 'Спасибо, что написали!',
    thanksSub: 'Я получил ваше сообщение и свяжусь с вами в ближайшее время — обычно в течение дня.',
    close: 'Закрыть'
  }
};

const ro = {
  meta: {
    title: 'Cookiekiller® UX/UI & Visual Design',
    description: 'Senior UX/UI & Product Designer. Transform logica complexă a produsului în interfețe care convertesc. Chișinău → în toată lumea.'
  },
  city: 'Chișinău',
  header: { openToWork: 'Disponibil pentru proiecte', menu: 'Meniu', close: 'Închide', home: 'Acasă', language: 'Limbă', mainNav: 'Navigare principală' },
  loader: { tag: 'cookiekiller.design — portofoliu 2026' },
  nav: {
    work: { label: 'Lucrări', n: '12 proiecte · 2018—2026', desc: 'Studii de caz selectate — e-commerce, CRM, mobil.' },
    portfolio: { label: 'Portofoliu', n: 'Toată grila', desc: 'Toate proiectele, filtrabile după tip — pe o singură pagină, fără reclame Behance.' },
    about: { label: 'Despre mine', n: 'Pe scurt', desc: 'Cine e în spatele ecranului, pe scurt.' },
    capabilities: { label: 'Competențe', n: 'Organizate, ca sprinturile mele', desc: 'Product & UX, sisteme UI, branding și stack-ul AI care ține totul rapid.' },
    experience: { label: 'Experiență', n: '2018 → prezent', desc: 'Senior UX/UI la Zazitex SRL, predau la IT STEP Academy.' },
    contact: { label: 'Contact', n: 'Scrie-mi', desc: 'Ai un flow încurcat? Un funnel care pierde clienți? Hai să-l ucidem împreună.' }
  },
  menuFoot: { location: 'Chișinău, Moldova → în toată lumea' },
  hero: {
    line1: 'EU UCID', line2: 'DESIGNUL PROST', line3: 'CA MESERIE',
    subPre: 'Transform logica complexă a produsului — ',
    subBold: 'arhitectură CRM, marketplace-uri, fluxuri de checkout',
    subPost: ' — în interfețe pe care oamenii chiar le duc până la capăt. 5+ ani de experiență cu clienți internaționali.'
  },
  marquee: ['Product Design', 'Cercetare UX', 'Sisteme de design', 'E-Commerce', 'Arhitectură CRM', 'Optimizare conversii', 'Branding', 'Aplicații mobile'],
  status: { live: 'Activ', dev: 'În dezvoltare', case: 'Studiu de caz' },
  work: {
    eyebrow: 'Lucrări selectate', count: '12 proiecte · 2018—2026',
    more: 'Vezi tot portofoliul',
    viewCase: 'Vezi studiul de caz', viewBehance: 'Vezi pe Behance'
  },
  portfolio: {
    eyebrow: 'Portofoliu',
    title: 'Toate lucrările',
    intro: 'Douăsprezece produse și un singur obicei: transform logica încurcată în interfețe pe care oamenii chiar le duc până la capăt.',
    filters: { all: 'Toate', product: 'Product', ecommerce: 'E-Commerce', mobile: 'Mobil', branding: 'Branding' },
    viewCase: 'Vezi studiul de caz',
    backHome: 'Înapoi acasă'
  },
  project: {
    back: 'Toate proiectele',
    client: 'Client', role: 'Format', year: 'An', platform: 'Platformă',
    overviewLabel: 'Prezentare', skillsLabel: 'Ce am folosit',
    behance: 'Vezi pe Behance', next: 'Proiectul următor',
    notFoundTitle: 'Nu există acest proiect',
    notFoundBody: 'Acest proiect nu există — sau link-ul e stricat. Încearcă portofoliul complet.',
    notFoundCta: 'Către portofoliu'
  },
  caseStudy: {
    eyebrowLabel: 'Studiu de caz', category: 'Branding & Design de Logo',
    scopeValue: '13 mărci · folio complet', fullSet: 'Setul complet',
    allLabel: 'Toate cele 13', clickHint: 'Click pentru a sări la proiect',
    items: [
      { name: 'Cursed Bakery', tag: 'Brand Streetwear' },
      { name: 'XSpace Events', tag: 'Agenție de evenimente' },
      { name: 'Zazitex', tag: 'Variație de logo pentru agenție' },
      { name: 'Mayson Solutions', tag: 'Studio de game design' },
      { name: 'AETO Academy', tag: 'Academie de limbi' },
      { name: 'Pulse', tag: 'Aplicație pentru evenimente' },
      { name: 'Friends MD', tag: 'Comunitate Telegram' },
      { name: 'Go Networking', tag: 'Proiect de networking' },
      { name: 'Avanguard Ltd', tag: 'Companie de transport (SUA)' },
      { name: 'YukaVPN', tag: 'Aplicație VPN' },
      { name: 'Musqogee VPN', tag: 'Aplicație VPN' },
      { name: 'Skydive Tenerife', tag: 'Club de parașutism' },
      { name: 'FSNAS', tag: 'Federație de airsoft' }
    ]
  },
  platformLabels: { web: 'Platformă web', ios: 'Aplicație iOS', android: 'Aplicație Android', mobile: 'Aplicație mobilă', print: 'Print & Digital' },
  about: {
    eyebrow: 'Despre mine', count: 'Pe scurt',
    statementPre: 'Design-ul nu e decorație. E ',
    statementEm: 'logică pe care poți da click',
    statementPost: ' — și o construiesc integral: research, sisteme, prototipuri, livrare.',
    p1Pre: 'Mă specializez pe produse unde fluxurile sunt complicate, iar mizele sunt reale: ',
    p1Bold: 'platforme bancare, sănătate, marketplace-uri, sisteme CRM închise pentru 50+ utilizatori interni.',
    p2: 'Ziua livrez produse la Zazitex. Seara predau UX/UI Design, Design Thinking și Product Strategy la IT STEP Academy — pentru că atunci când explic design-ul cu voce tare, îmi țin gândirea onestă.',
    p3: 'Engleză B2 · Rusă maternă · Română fluent.',
    stats: ['Ani în product design', 'Produse livrate', 'Branduri create', 'Certificări Adobe']
  },
  capabilities: {
    eyebrow: 'Competențe', count: 'Organizate, ca sprinturile mele',
    decks: [
      { top1: 'A — Product & UX', top2: 'De unde încep', h3: 'Product & UX Design', items: ['User Flows', 'Arhitectura informației', 'Design MVP', 'Testare A/B', 'Optimizare conversii', 'Cercetare UX', 'Testare de uzabilitate', 'Wireframing'] },
      { top1: 'B — UI & Sisteme', top2: 'Unde se scalează', h3: 'UI & Design Systems', items: ['Sisteme de design', 'Prototipare', 'Design responsive', 'Accesibilitate', 'Web · iOS · Android', 'Handoff către dezvoltare'] },
      { top1: 'C — Brand', top2: 'Unde capătă o față', h3: 'Branding & Visual', items: ['Sisteme de identitate', 'Rebranding', 'Ambalaje', 'Motion & comunicare vizuală', 'Print & Digital'] },
      { top1: 'D — Stack', top2: 'Unde devine rapid', h3: 'Tools & AI Stack', items: ['Figma', 'Adobe CC', 'Miro', 'Notion', 'Jira', 'Midjourney', 'Sora', 'ChatGPT', 'Real-ESRGAN'] }
    ]
  },
  experience: {
    eyebrow: 'Experiență', count: '2018 → prezent',
    rows: [
      { when: 'Iun 2024 — Prezent', now: true, role: 'Senior UX/UI & Product Designer', org: 'Zazitex SRL', desc: 'UX/UI end-to-end pentru platforme e-commerce și sisteme interne. Am arhitecturat de la zero logica unui CRM închis — modele de date, navigare, acces bazat pe roluri pentru 50+ utilizatori. Am redus frecările din checkout prin restructurarea arhitecturii informației și dezvăluire progresivă a conținutului. Mentorez juniori, susțin workshop-uri de UX.' },
      { when: 'Iun 2024 — Prezent', now: true, role: 'Lector, UX/UI Design', org: 'IT STEP Academy', desc: 'Predau UX/UI Design, Design Thinking și Product Strategy. Ghidez studenții prin research, prototipare și testare de uzabilitate pe proiecte reale ale clienților.' },
      { when: 'Dec 2022 — Ian 2024', now: false, role: 'Middle UX/UI Designer', org: 'Yucatech Software SRL · Hostry.com · Lycaste.com', desc: 'Am redesenat fluxurile principale de e-commerce, am îmbunătățit onboarding-ul și am redus abandonul în punctele cheie de conversie. Am construit un sistem de design multi-platformă (web + iOS + Android) pentru 3 produse. Am livrat o aplicație VPN: onboarding, arhitectura setărilor, fluxuri de abonament.' },
      { when: 'Dec 2021 — Dec 2022', now: false, role: 'Middle Graphic Designer', org: 'Art Poligraf SRL', desc: 'Identitate de brand și ambalaje pentru clienți din Moldova și piețele UE; comunicare vizuală în campanii print și digital.' },
      { when: '2018 — 2021', now: false, role: 'Junior Graphic Designer', org: 'Sonaris-com Advertising Agency · Freelance', desc: 'Identități de brand și reclame digitale pentru 20+ IMM-uri și startup-uri; layout-uri UI pentru produse e-commerce la început de drum.' }
    ],
    certsEyebrow: 'Certificări', certsCount: '5 certificări verificate', verifyLabel: 'Verifică'
  },
  special: {
    eyebrow: 'Dincolo de birou', count: 'Nu orice proiect e o bancă',
    tickerVet: 'Reducere pentru animale fără stăpân', tickerMetal: 'Reducere pentru trupe rock',
    vetTitle: 'Adăposturi & voluntari veterinari',
    vetDesc: 'Adăposturile și organizațiile de salvare primesc tarife pro-bono sau la cost — site-uri, fluxuri de adopție și pagini de donații construite să convertească cu adevărat.',
    vetCta: 'Spune-mi despre adăpostul tău', vetCursor: 'Aprobat de lăbuțe',
    metalTitle: 'Trupe & Case de Discuri Metal',
    metalDesc: 'Tarif fix, procent din venituri sau vinil în contul facturii — coperți de album, magazine de merch și site-uri care nu fac de rușine muzica.',
    metalCta: 'Rezervă un slot', metalCursor: 'Tarif la maximum'
  },
  footer: {
    eyebrow: 'Ai un flow încurcat? Un funnel care pierde clienți? Un CRM pe care nimeni nu-l folosește?',
    ctaPre: 'Hai să ', ctaSwap: 'o ucidem', ctaPost: ' împreună.',
    formTrigger: 'Trimite o cerere',
    fineSuffix: 'ora Chișinăului'
  },
  form: {
    title: 'Trimite o cerere', sub: 'Completează-l — revin în cel mult o zi, de obicei mai repede.',
    nameLabel: 'Nume', namePlaceholder: 'Numele tău',
    emailLabel: 'Email', emailPlaceholder: 'you@company.com',
    msgLabel: 'Ce proiect ucidem?', msgPlaceholder: 'Proiect, buget, termen…',
    submit: 'Trimite briefing-ul', note: 'Deschide aplicația de email cu totul completat.',
    thanksTitle: 'Mulțumesc că mi-ai scris!',
    thanksSub: 'Am primit mesajul tău — te contactez în curând, de obicei în aceeași zi.',
    close: 'Închide'
  }
};

export const translations = { en, ru, ro };

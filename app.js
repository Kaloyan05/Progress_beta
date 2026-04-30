const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ============ ICONS (inline SVG) ============
const Icon = ({ name, className = "w-5 h-5", strokeWidth = 2, fill = "none" }) => {
  const icons = {
    flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
    mountain: <><path d="m3 20 6.5-9 3 4 2-3L21 20H3z"/><path d="m7 14 2-3"/><circle cx="16" cy="6" r="2.5" fill="currentColor" stroke="none"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>,
    checkCircle: <><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>,
    circle: <><circle cx="12" cy="12" r="10"/></>,
    plus: <><path d="M5 12h14M12 5v14"/></>,
    trash: <><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    trending: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    sparkles: <><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></>,
    x: <><path d="M18 6 6 18M6 6l12 12"/></>,
    chevronRight: <><path d="m9 18 6-6-6-6"/></>,
    chevronLeft: <><path d="m15 18-6-6 6-6"/></>,
    zap: <><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    bar: <><path d="M3 3v18h18"/><path d="M7 16V9M12 16V5M17 16v-3"/></>,
    languages: <><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></>,
    quote: <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    alert: <><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    edit: <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>,
    settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    broken: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3"/><path d="M13 2c.5 2.5 2 4.9 4 6.5"/><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.5"/></>,
    note: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
    snowflake: <><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></>,
    volume: <><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V4.702z"/><path d="M16 9a5 5 0 0 1 0 6"/></>,
    moon: <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    palette: <><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>,
    archive: <><rect width="20" height="5" x="2" y="4" rx="2"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4"/></>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    lightbulb: <><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.4.3.7.7.9 1.1.2.4.1.9.1 1.2h6c0-.3-.1-.8.1-1.2.2-.4.5-.8.9-1.1A7 7 0 0 0 12 2z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>,
    // т.2.11: link/chain icon used to mark habit-stack relationships in HabitsView
    // and in the toast that follows a parent-habit completion.
    chain: <><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

// ============ TRANSLATIONS ============
const T = {
  bg: {
    appName: 'ПРОГРЕС', tagline: 'Превръщай амбициите в постижения',
    dashboard: 'Табло', habits: 'Навици', goals: 'Цели', tasks: 'Задачи', stats: 'Статистика', calendar: 'Календар',
    addHabit: 'Нов навик', addGoal: 'Нова цел', addTask: 'Нова задача',
    todayProgress: 'Днешен прогрес', activeStreak: 'Активна серия', longestStreak: 'Най-дълга серия',
    streakChampions: 'Streak шампиони', tasksToday: 'Задачи днес', noTasksToday: 'Няма задачи за днес 🎉', bestStreak: 'Най-дълга',
    openTasksLabel: 'Отворени задачи',
    completedToday: 'Днес', days: 'дни', day: 'ден', done: 'Готово', ofTotal: 'от',
    progress: 'Прогрес', deadline: 'Краен срок', subtasks: 'Подстъпки', addSubtask: 'Добави подстъпка',
    milestonesHint: 'Разбий целта на стъпки — прогресът се изчислява автоматично.',
    milestonesAuto: 'изчислен', milestonesCompleted: 'завършени',
    name: 'Име', category: 'Категория', target: 'Цел (дни серия)', targetOptional: 'Цел (дни серия) — опционално', noTarget: 'Без цел', noDeadline: 'Без дата',
    save: 'Запази', cancel: 'Отказ', delete: 'Изтрий', confirm: 'Потвърди',
    noHabits: 'Все още няма навици. Добави първия си!', noGoals: 'Няма цели. Започни сега!', noTasks: 'Няма задачи. Добави първата!',
    searchPlaceholder: 'Търси…', noMatches: 'Няма съвпадения',
    priority: 'Приоритет', high: 'Висок', medium: 'Среден', low: 'Нисък',
    overdue: 'Просрочено', today: 'днес', tomorrow: 'утре', daysLeft: 'дни',
    paceExpected: 'Трябва', paceYouAre: 'на', paceOnTrack: 'по график', paceBehind: 'изоставаш', paceAhead: 'преднина',
    paceOverdue: 'след срока', paceNoDeadline: 'Задай дедлайн, за да видиш темпо',
    goalStarted: 'Начало', editDeadline: 'Дедлайн', clearDeadline: 'Махни дедлайна',
    weekActivity: 'Седмица', categoryBreakdown: 'По категории',
    // т.2.10 sub-5: Stats разрез по таг — нова секция след „По категории".
    // OR-логика: елемент с няколко тага се брои във всеки от тях.
    // `tagBreakdownEmpty` се показва, когато има дефинирани тагове, но
    // нито един активен елемент не ги използва.
    tagBreakdown: 'По тагове', tagBreakdownEmpty: 'Все още няма елементи с тагове.',
    totalHabits: 'Навици', totalGoals: 'Цели', totalTasks: 'Задачи', avgProgress: 'среден',
    streakBadge: 'СЕРИЯ', motivationTitle: 'Мисъл за деня', open: 'отворени',
    reminder: 'Напомняне', reminderTime: 'Час за напомняне', noReminder: 'Без напомняне',
    notes: 'Бележки', addNote: 'Добави бележка...',
    journal: 'Журнал', addJournalEntry: 'Добави запис', journalPlaceholder: 'Какво постигна днес?',
    noJournalEntries: 'Още няма записи. Отбелязвай прогреса си тук.',
    deleteEntry: 'Изтрий записа',
    settings: 'Настройки', exportData: 'Свали бекъп', importData: 'Зареди от файл',
    backupDesc: 'Свали JSON файл с всички навици, цели, задачи и настройки.',
    restoreDesc: 'Презапиши текущите данни с такива от предишен бекъп.',
    importSuccess: 'Данните са заредени!', importError: 'Грешка при импортиране',
    importInvalidFile: 'Невалиден файл — не е JSON или липсват habits/goals/tasks.',
    importBadVersion: 'Несъвместима версия на бекъпа.',
    importTooLarge: 'Файлът е твърде голям (>10 MB).',
    backupSummary: (h, g, ta) => `Файлът съдържа: ${h} навика · ${g} цели · ${ta} задачи.`,
    brokenStreak: 'Серията е прекъсната', currentMonth: 'Текущ месец',
    numericGoal: 'Числова цел', currentValue: 'Текуща стойност', targetValue: 'Целева стойност', unit: 'Мерна единица',
    enableNotifications: 'Разреши известия', notifDenied: 'Известията са забранени в браузъра',
    // NEW
    appearance: 'Външен вид', behavior: 'Поведение', data: 'Данни',
    theme: 'Тема', lightMode: 'Светъл режим', weekStart: 'Начало на седмицата',
    monday: 'Понеделник', sunday: 'Неделя',
    sound: 'Звук при отметка', vibration: 'Вибрация', textSize: 'Размер на текст',
    sizeSmall: 'Малък', sizeMedium: 'Среден', sizeLarge: 'Голям',
    eveningReminder: 'Вечерно напомняне', eveningReminderDesc: 'Дневен обзор — колко навика остават',
    freezeDays: 'Дни за пауза (freeze)', freezeDaysDesc: 'Серията не се губи при пропуски до този брой дни',
    backfillDays: 'Бек-фил (минали дни)', backfillDaysDesc: 'До колко дни назад можеш да отметнеш пропуснат навик', backfillOff: 'Изключен',
    backfillHint: 'Можеш да отметнеш този ден със задна дата.', backfillLocked: 'Извън прозореца за бек-фил — само преглед.',
    autoArchive: 'Авто-архив на задачи', autoArchiveDesc: 'Изпълнените задачи се скриват след N дни',
    archiveDays: 'Дни до архивиране', showArchived: 'Покажи архивирани',
    quickIncrement: 'Бърз +1 на таблото', quickIncrementDesc: 'Бутон +1 за числови цели от таблото',
    none: 'Няма', on: 'Вкл.', off: 'Изкл.',
    themeFire: 'Огън', themeOcean: 'Океан', themeForest: 'Гора', themePurple: 'Лилаво', themeMinimal: 'Минимал',
    confirmDeleteTitle: 'Сигурен ли си?', confirmDeleteHabit: 'Навикът ще бъде изтрит заедно с цялата история на серията.',
    confirmDeleteGoal: 'Целта ще бъде изтрита заедно с подстъпките.', confirmDeleteTask: 'Задачата ще бъде изтрита.',
    confirmDeleteSubtask: 'Подстъпката ще бъде изтрита.',
    confirmImportTitle: 'Презапиши всички данни?', confirmImportBody: 'Текущите навици, цели и задачи ще бъдат заменени с тези от файла.',
    yesDelete: 'Да, изтрий', yesOverwrite: 'Да, презапиши',
    frozen: 'Пауза', freezeToday: 'Ден за пауза', streakProtected: 'Серия защитена', daysFrozen: 'дни пауза',
    freezeUsed: 'пропуск използван', freezeUsedPlural: 'пропуска използвани', freezeOf: 'от',
    archived: 'Архивирано', hidden: 'скрити',
    archiveAction: 'Архивирай', yesArchive: 'Да, архивирай',
    confirmArchiveGoalTitle: 'Архивирай целта?', confirmArchiveGoalBody: 'Целта ще бъде скрита от активния списък. Можеш да я възстановиш по всяко време от архива.',
    retireHabit: 'Пенсионирай навика', completeAndArchiveGoal: 'Завърши и архивирай',
    restoreItem: 'Възстанови', archivedHabits: 'Архивирани навици', archivedGoals: 'Архивирани цели',
    archivedOn: 'Архивирано на', showArchivedItems: 'Покажи архивирани', hideArchivedItems: 'Скрий архивирани',
    habitRetired: 'Навикът е пенсиониран', goalCompleted: 'Целта е завършена',
    habitRestored: 'Навикът е възстановен', goalRestored: 'Целта е възстановена',
    noArchivedHabits: 'Няма архивирани навици', noArchivedGoals: 'Няма архивирани цели',
    important: 'Важен', importantHabit: 'Важен навик', markImportant: 'Отбележи като важен', unmarkImportant: 'Премахни важност',
    // т.2.10: tags / категории — потребителски ктагове, паралелен слой над hard-coded category-тата.
    tags: 'Категории', tagsDesc: 'Цветни тагове за гъвкаво групиране на навици, цели и задачи. Не заменят съществуващите категории.',
    addTag: 'Добави', tagName: 'Име на категория', tagColor: 'Цвят',
    noTagsYet: 'Все още няма категории. Добави първата.',
    editTag: 'Редактирай', deleteTag: 'Изтрий',
    confirmDeleteTagTitle: 'Изтрий категорията?',
    confirmDeleteTagBody: (n) => n === 0
      ? 'Категорията не е приложена към елементи. Безопасно за изтриване.'
      : `Категорията ще бъде премахната от ${n} ${n === 1 ? 'елемент' : 'елемента'}.`,
    // т.2.10 sub-3: chip-селектор в add/edit модала. `tagsLabel` е нов
    // отделен ключ, защото `tags` вече се ползва за заглавие на секцията
    // в Settings ("Категории"); тук искаме по-кратко "Тагове" под полето
    // "Категория". `addFirstTag` е CTA-то за empty state, което води към
    // Settings → Категории.
    tagsLabel: 'Тагове', addFirstTag: 'Добави първа категория',
    // т.2.10 sub-4: цветен филтър над листите. `tagFilterClear` е label-ът
    // на × pill-а, който се появява при ≥1 активен филтър.
    tagFilterClear: 'Изчисти филтъра',
    // т.2.11: habit stacking — "след X прави Y". `stackedAfter` е label-ът на
    // dropdown-а в add/edit модала; `standalone` е default опцията. `comesAfter`
    // се рендерира в разгънатата карта като "идва след: <име>". Toast-ът след
    // маркиране на родител използва `stackPromptTitle`/`stackPromptBody`/
    // `stackPromptCheck`. `stackParentBadge`/`stackChildBadge` са pill-ите в
    // metadata реда на картата (parent → "Стак: 2" / child → "идва след X").
    stackedAfter: 'След кой навик?',
    standalone: 'Самостоятелен',
    comesAfter: 'Идва след',
    stackPromptTitle: 'Стак навик',
    stackPromptBody: (name) => `Готов ли си и с „${name}"?`,
    stackPromptCheck: 'Отметни',
    stackParentBadge: (n) => `Стак · ${n}`,
    stackChildBadge: 'Стак',
    // т.2.12: Седмичен преглед — модал с обобщение на изминалата седмица
    // (отметки, най-силен ден, най-силен навик, разрез по таг, задържани
    // стакове) + текстов размисъл, който се записва в weeklyReviews лога
    // и се появява в Stats → "История на прегледите".
    weeklyReviewCTA: 'Преглед на седмицата',
    weeklyReviewCTASub: 'Обобщи как мина и запиши какво да промениш',
    weeklyReviewTitle: 'Седмичен преглед',
    weeklyReviewThisWeek: 'Тази седмица',
    weeklyReviewLastWeek: 'Миналата седмица',
    weeklyTicks: 'Отметки',
    weeklyTicksSub: (n) => `${n} ${n === 1 ? 'навик' : 'навика'} активни`,
    weeklyStrongestDay: 'Най-силен ден',
    weeklyStrongestDayNone: 'Все още няма',
    weeklyTopHabit: 'Най-силен навик',
    weeklyTopHabitNone: '—',
    weeklyTagBreakdownTitle: 'Отметки по таг',
    weeklyTagBreakdownEmpty: 'Тази седмица няма отметки с тагове.',
    weeklyStacksHeld: 'Задържани стакове',
    weeklyStacksHeldDesc: (n) => `Двойки, направени всеки от ${n} ${n === 1 ? 'завършен ден' : 'завършени дни'}.`,
    weeklyStacksHeldEmpty: 'Все още няма задържани стакове за тази седмица.',
    weeklyReflection: 'Размисъл',
    weeklyReflectionPlaceholder: 'Какво научи? Какво ще промениш следващата седмица?',
    weeklyReviewSaveBtn: 'Запази прегледа',
    weeklyReviewSavedToast: 'Прегледът е запазен',
    weeklyReviewExisting: 'Този преглед вече е запазен. Запази отново, за да го обновиш.',
    weeklyEligibleDays: (n) => `${n} ${n === 1 ? 'завършен ден' : 'завършени дни'} от 7`,
    weeklyReviewsHistory: 'Седмични прегледи',
    weeklyReviewsEmpty: 'Все още няма запазени седмични прегледи.',
    weeklyReviewItemSummary: (ticks) => `${ticks} ${ticks === 1 ? 'отметка' : 'отметки'}`,
    confirmDeleteWeeklyReviewTitle: 'Изтрий прегледа?',
    confirmDeleteWeeklyReviewBody: 'Седмичният преглед ще бъде премахнат от историята.',
    weeklyTicksLabel: 'отметки',
    welcomeTitle: 'Добре дошъл в ПРОГРЕС',
    welcomeBody: 'Проследявай навиците, целите и задачите си на едно място. Започни, като добавиш нещо свое или зареди пример, за да видиш как изглежда.',
    welcomeAddHabit: 'Добави първия си навик',
    welcomeAddGoal: 'Добави цел',
    welcomeAddTask: 'Добави задача',
    seeExample: 'Виж пример',
    skipWelcome: 'Пропусни за сега',
    loadSampleData: 'Добави примерни данни',
    sampleDataDesc: '3 навика, 1 цел и 2 задачи — за демонстрация',
    confirmSampleTitle: 'Добави примерни данни?',
    confirmSampleBody: 'Примерните навици, цел и задачи ще бъдат добавени към съществуващите.',
    yesAdd: 'Да, добави',
    monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    categories: { health: 'Здраве', work: 'Работа', learning: 'Учене', personal: 'Лично', finance: 'Финанси' },
    quotes: [
      'Малките стъпки всеки ден водят до големи резултати.',
      'Успехът е сума от малки усилия, повтаряни ден след ден.',
      'Не спирай, когато си уморен. Спри, когато си готов.',
      'Дисциплината е мостът между целите и постиженията.',
      'Всеки експерт някога е бил начинаещ.',
      'Прогресът е по-важен от съвършенството.',
      'Ти си по-силен, отколкото си мислиш.',
      'Фокусирай се върху пътуването, не само върху дестинацията.',
      'Единственият невъзможен път е този, който не започваш.',
      'Мотивацията те стартира, навикът те поддържа.'
    ],
    days_short_sun: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    days_short_mon: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
    eveningBody: (n) => `🌙 Остават ${n} ${n === 1 ? 'навик' : 'навика'} за днес`
  },
  en: {
    appName: 'PROGRESS', tagline: 'Turn ambitions into achievements',
    dashboard: 'Dashboard', habits: 'Habits', goals: 'Goals', tasks: 'Tasks', stats: 'Stats', calendar: 'Calendar',
    addHabit: 'New habit', addGoal: 'New goal', addTask: 'New task',
    todayProgress: "Today's progress", activeStreak: 'Active streak', longestStreak: 'Longest streak',
    streakChampions: 'Streak Champions', tasksToday: "Today's Tasks", noTasksToday: 'No tasks today 🎉', bestStreak: 'Longest',
    openTasksLabel: 'Open tasks',
    completedToday: 'Today', days: 'days', day: 'day', done: 'Done', ofTotal: 'of',
    progress: 'Progress', deadline: 'Deadline', subtasks: 'Milestones', addSubtask: 'Add milestone',
    milestonesHint: 'Break the goal into steps — progress is computed automatically.',
    milestonesAuto: 'auto', milestonesCompleted: 'done',
    name: 'Name', category: 'Category', target: 'Target (streak days)', targetOptional: 'Target (streak days) — optional', noTarget: 'No target', noDeadline: 'No date',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', confirm: 'Confirm',
    noHabits: 'No habits yet. Add your first!', noGoals: 'No goals yet. Start now!', noTasks: 'No tasks yet. Add your first!',
    searchPlaceholder: 'Search…', noMatches: 'No matches',
    priority: 'Priority', high: 'High', medium: 'Medium', low: 'Low',
    overdue: 'Overdue', today: 'today', tomorrow: 'tomorrow', daysLeft: 'days',
    paceExpected: 'Expected', paceYouAre: 'at', paceOnTrack: 'on track', paceBehind: 'behind by', paceAhead: 'ahead by',
    paceOverdue: 'past deadline', paceNoDeadline: 'Set a deadline to see pace',
    goalStarted: 'Started', editDeadline: 'Deadline', clearDeadline: 'Clear deadline',
    weekActivity: 'This week', categoryBreakdown: 'By category',
    // т.2.10 sub-5: tag breakdown section in Stats. OR semantics —
    // an item with multiple tags counts in each.
    tagBreakdown: 'By tag', tagBreakdownEmpty: 'No items have tags yet.',
    totalHabits: 'Habits', totalGoals: 'Goals', totalTasks: 'Tasks', avgProgress: 'avg',
    streakBadge: 'STREAK', motivationTitle: 'Thought of the day', open: 'open',
    reminder: 'Reminder', reminderTime: 'Reminder time', noReminder: 'No reminder',
    notes: 'Notes', addNote: 'Add note...',
    journal: 'Journal', addJournalEntry: 'Add entry', journalPlaceholder: 'What did you accomplish?',
    noJournalEntries: 'No entries yet. Log your progress here.',
    deleteEntry: 'Delete entry',
    settings: 'Settings', exportData: 'Download backup', importData: 'Load from file',
    backupDesc: 'Download a JSON file with all habits, goals, tasks and settings.',
    restoreDesc: 'Overwrite current data with a previous backup.',
    importSuccess: 'Data imported!', importError: 'Import error',
    importInvalidFile: 'Invalid file — not JSON or missing habits/goals/tasks.',
    importBadVersion: 'Incompatible backup version.',
    importTooLarge: 'File is too large (>10 MB).',
    backupSummary: (h, g, ta) => `Backup contains: ${h} habits · ${g} goals · ${ta} tasks.`,
    brokenStreak: 'Streak broken', currentMonth: 'Current month',
    numericGoal: 'Numeric goal', currentValue: 'Current value', targetValue: 'Target value', unit: 'Unit',
    enableNotifications: 'Enable notifications', notifDenied: 'Notifications blocked in browser',
    appearance: 'Appearance', behavior: 'Behavior', data: 'Data',
    theme: 'Theme', lightMode: 'Light mode', weekStart: 'Week starts on',
    monday: 'Monday', sunday: 'Sunday',
    sound: 'Sound on tick', vibration: 'Vibration', textSize: 'Text size',
    sizeSmall: 'Small', sizeMedium: 'Medium', sizeLarge: 'Large',
    eveningReminder: 'Evening reminder', eveningReminderDesc: 'Daily digest — how many habits remain',
    freezeDays: 'Freeze days', freezeDaysDesc: "Streak isn't lost if you miss up to this many days",
    backfillDays: 'Backfill (past days)', backfillDaysDesc: 'How many days back you can mark a missed habit', backfillOff: 'Off',
    backfillHint: 'You can mark this day retroactively.', backfillLocked: 'Outside the backfill window — view only.',
    autoArchive: 'Auto-archive tasks', autoArchiveDesc: 'Completed tasks hide after N days',
    archiveDays: 'Days to archive', showArchived: 'Show archived',
    quickIncrement: 'Quick +1 on dashboard', quickIncrementDesc: '+1 button for numeric goals on dashboard',
    none: 'None', on: 'On', off: 'Off',
    themeFire: 'Fire', themeOcean: 'Ocean', themeForest: 'Forest', themePurple: 'Purple', themeMinimal: 'Minimal',
    confirmDeleteTitle: 'Are you sure?', confirmDeleteHabit: 'The habit and all its streak history will be deleted.',
    confirmDeleteGoal: 'The goal and its milestones will be deleted.', confirmDeleteTask: 'The task will be deleted.',
    confirmDeleteSubtask: 'The milestone will be deleted.',
    confirmImportTitle: 'Overwrite all data?', confirmImportBody: 'Current habits, goals and tasks will be replaced with the ones in the file.',
    yesDelete: 'Yes, delete', yesOverwrite: 'Yes, overwrite',
    frozen: 'Frozen', freezeToday: 'Freeze day', streakProtected: 'Streak protected', daysFrozen: 'days frozen',
    freezeUsed: 'miss used', freezeUsedPlural: 'misses used', freezeOf: 'of',
    archived: 'Archived', hidden: 'hidden',
    archiveAction: 'Archive', yesArchive: 'Yes, archive',
    confirmArchiveGoalTitle: 'Archive goal?', confirmArchiveGoalBody: 'The goal will be hidden from the active list. You can restore it at any time from the archive.',
    retireHabit: 'Retire habit', completeAndArchiveGoal: 'Complete & archive',
    restoreItem: 'Restore', archivedHabits: 'Archived habits', archivedGoals: 'Archived goals',
    archivedOn: 'Archived on', showArchivedItems: 'Show archived', hideArchivedItems: 'Hide archived',
    habitRetired: 'Habit retired', goalCompleted: 'Goal completed',
    habitRestored: 'Habit restored', goalRestored: 'Goal restored',
    noArchivedHabits: 'No archived habits', noArchivedGoals: 'No archived goals',
    important: 'Important', importantHabit: 'Important habit', markImportant: 'Mark as important', unmarkImportant: 'Unmark important',
    // т.2.10: tags — user-defined orthogonal layer over the legacy hard-coded categories.
    tags: 'Tags', tagsDesc: 'Color tags for flexible grouping across habits, goals, and tasks. They do not replace the existing categories.',
    addTag: 'Add', tagName: 'Tag name', tagColor: 'Color',
    noTagsYet: 'No tags yet. Add the first one.',
    editTag: 'Edit', deleteTag: 'Delete',
    confirmDeleteTagTitle: 'Delete tag?',
    confirmDeleteTagBody: (n) => n === 0
      ? 'This tag is not applied to any items. Safe to delete.'
      : `The tag will be removed from ${n} item${n === 1 ? '' : 's'}.`,
    // т.2.10 sub-3: chip selector strings — separate `tagsLabel` from the
    // section title (`tags`) used in Settings.
    tagsLabel: 'Tags', addFirstTag: 'Add first tag',
    // т.2.10 sub-4: tag filter row above the lists.
    tagFilterClear: 'Clear filter',
    // т.2.11: habit stacking — "after X do Y".
    stackedAfter: 'After which habit?',
    standalone: 'Standalone',
    comesAfter: 'Comes after',
    stackPromptTitle: 'Stacked habit',
    stackPromptBody: (name) => `Ready for "${name}" too?`,
    stackPromptCheck: 'Check',
    stackParentBadge: (n) => `Stack · ${n}`,
    stackChildBadge: 'Stack',
    // т.2.12: Weekly review — recap modal of the last 7 days. Stats are computed
    // on open; the user adds a reflection and saves into the weeklyReviews log,
    // which is then surfaced in Stats → "Weekly reviews".
    weeklyReviewCTA: 'Review the week',
    weeklyReviewCTASub: 'Recap how it went and write what to change',
    weeklyReviewTitle: 'Weekly review',
    weeklyReviewThisWeek: 'This week',
    weeklyReviewLastWeek: 'Last week',
    weeklyTicks: 'Ticks',
    weeklyTicksSub: (n) => `${n} active ${n === 1 ? 'habit' : 'habits'}`,
    weeklyStrongestDay: 'Strongest day',
    weeklyStrongestDayNone: 'None yet',
    weeklyTopHabit: 'Top habit',
    weeklyTopHabitNone: '—',
    weeklyTagBreakdownTitle: 'Ticks by tag',
    weeklyTagBreakdownEmpty: 'No tagged ticks this week.',
    weeklyStacksHeld: 'Stacks held',
    weeklyStacksHeldDesc: (n) => `Pairs done on every ${n === 1 ? 'one of the completed day' : `${n} completed days`}.`,
    weeklyStacksHeldEmpty: 'No stacks held this week yet.',
    weeklyReflection: 'Reflection',
    weeklyReflectionPlaceholder: 'What did you learn? What will you change next week?',
    weeklyReviewSaveBtn: 'Save review',
    weeklyReviewSavedToast: 'Review saved',
    weeklyReviewExisting: 'A review for this week already exists. Saving again will overwrite it.',
    weeklyEligibleDays: (n) => `${n} of 7 ${n === 1 ? 'day' : 'days'} completed`,
    weeklyReviewsHistory: 'Weekly reviews',
    weeklyReviewsEmpty: 'No weekly reviews saved yet.',
    weeklyReviewItemSummary: (ticks) => `${ticks} ${ticks === 1 ? 'tick' : 'ticks'}`,
    confirmDeleteWeeklyReviewTitle: 'Delete review?',
    confirmDeleteWeeklyReviewBody: 'The weekly review will be removed from history.',
    weeklyTicksLabel: 'ticks',
    welcomeTitle: 'Welcome to PROGRESS',
    welcomeBody: 'Track your habits, goals, and tasks in one place. To get started, add something of your own — or load the sample data to see how a filled-in tracker looks.',
    welcomeAddHabit: 'Add your first habit',
    welcomeAddGoal: 'Add a goal',
    welcomeAddTask: 'Add a task',
    seeExample: 'See example',
    skipWelcome: 'Skip for now',
    loadSampleData: 'Load sample data',
    sampleDataDesc: '3 habits, 1 goal, and 2 tasks for demonstration',
    confirmSampleTitle: 'Load sample data?',
    confirmSampleBody: 'Sample habits, a goal, and tasks will be added to your existing data.',
    yesAdd: 'Yes, add',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    categories: { health: 'Health', work: 'Work', learning: 'Learning', personal: 'Personal', finance: 'Finance' },
    quotes: [
      'Small steps every day lead to big results.',
      'Success is the sum of small efforts repeated daily.',
      "Don't stop when you're tired. Stop when you're done.",
      'Discipline is the bridge between goals and achievement.',
      'Every expert was once a beginner.',
      'Progress, not perfection.',
      'You are stronger than you think.',
      'Focus on the journey, not just the destination.',
      'The only impossible journey is the one you never begin.',
      'Motivation starts you. Habit keeps you going.'
    ],
    days_short_sun: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    days_short_mon: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    eveningBody: (n) => `🌙 ${n} ${n === 1 ? 'habit' : 'habits'} left for today`
  }
};

const STORAGE_KEY = 'progress-tracker-v2';
const SETTINGS_KEY = 'progress-settings-v1';
const ONBOARDING_KEY = 'progress-onboarding-v1';
const SCHEMA_VERSION = 2;

// ===== Safe storage with quota handling + debounced writes =====
const storage = {
  save(key, value) {
    try {
      const s = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, s);
      return true;
    } catch (e) {
      if (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) {
        try {
          window.dispatchEvent(new CustomEvent('storage-quota-exceeded', { detail: { key } }));
        } catch {}
      }
      return false;
    }
  },
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return fallback;
      try { return JSON.parse(raw); } catch { return raw; }
    } catch { return fallback; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  }
};

// Migrate older data shapes into current schema.
function migrateData(raw) {
  const empty = { habits: [], goals: [], tasks: [], tags: [], weeklyReviews: [], version: SCHEMA_VERSION };
  if (!raw || typeof raw !== 'object') return empty;
  const v = raw.version || 1;
  const out = {
    habits: Array.isArray(raw.habits) ? raw.habits : [],
    goals:  Array.isArray(raw.goals)  ? raw.goals  : [],
    tasks:  Array.isArray(raw.tasks)  ? raw.tasks  : [],
    // т.2.10: tags are a brand-new envelope field. Backward-compat default
    // is an empty array — pre-v18 stores simply don't have this key yet.
    tags:   Array.isArray(raw.tags)   ? raw.tags   : [],
    // т.2.12: weeklyReviews is the new append/replace log of saved weekly
    // recaps. Backward-compat default is []; pre-v23 stores never had it.
    weeklyReviews: Array.isArray(raw.weeklyReviews) ? raw.weeklyReviews : [],
    version: SCHEMA_VERSION
  };
  if (v < 2) {
    out.habits = out.habits.map(h => ({
      notes: '', reminderTime: '', target: 21, completions: [], important: false, ...h
    }));
    out.goals = out.goals.map(g => ({
      subtasks: [], notes: '', numeric: null, progress: 0, ...g
    }));
    out.tasks = out.tasks.map(t => ({
      notes: '', reminderTime: '', priority: 'medium', completedAt: null, done: false, ...t
    }));
  }
  // Ensure archived defaults on every load — this is backward-compatible for
  // pre-v11 stores that simply don't have the field yet (т.2.6).
  out.habits = out.habits.map(h => ({ archived: false, archivedAt: null, ...h }));
  out.goals  = out.goals.map(g  => ({ archived: false, archivedAt: null, ...g  }));
  // т.3.1: ensure createdAt on every goal — fall back to id (ids are Date.now() millis).
  out.goals = out.goals.map(g => g.createdAt
    ? g
    : { ...g, createdAt: typeof g.id === 'number' ? new Date(g.id).toISOString() : new Date().toISOString() });
  // т.3.2: ensure journal array on every goal — backward-compatible for pre-v15 stores.
  out.goals = out.goals.map(g => Array.isArray(g.journal) ? g : { ...g, journal: [] });
  // т.2.10: ensure tagIds:[] on every habit/goal/task — backward-compatible
  // for pre-v18 stores. Tags are a new orthogonal layer over the legacy
  // hard-coded `category` field, NOT a replacement for it.
  out.habits = out.habits.map(h => Array.isArray(h.tagIds) ? h : { ...h, tagIds: [] });
  out.goals  = out.goals.map(g  => Array.isArray(g.tagIds) ? g : { ...g, tagIds: [] });
  out.tasks  = out.tasks.map(ta => Array.isArray(ta.tagIds) ? ta : { ...ta, tagIds: [] });
  // т.2.11: habit stacking — every habit gets `stackedAfter: null` by default.
  // The field stores the parent habit's id (or null for "standalone"). Existing
  // pre-v22 stores simply don't have this key yet, so we add it idempotently
  // — items that already have a non-undefined stackedAfter are not rewritten.
  out.habits = out.habits.map(h => 'stackedAfter' in h ? h : { ...h, stackedAfter: null });
  return out;
}

// Validate a parsed backup envelope before we let it overwrite live state (т.2.9).
// Accepts both v2 (legacy export sans envelope version, before v17) and v3 (current
// export with `version: 3` field). Returns `{ ok, reason }` on failure or
// `{ ok: true, counts: { habits, goals, tasks } }` on success.
function validateBackup(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, reason: 'shape' };
  if (!Array.isArray(raw.habits) || !Array.isArray(raw.goals) || !Array.isArray(raw.tasks)) {
    return { ok: false, reason: 'shape' };
  }
  // Envelope `version` is optional for backward-compat; if present, must be a known one.
  // 2 = pre-v17 internal store schema; 3 = backup envelope shipped from v17 onwards.
  if (raw.version != null && raw.version !== 2 && raw.version !== 3) {
    return { ok: false, reason: 'version' };
  }
  return {
    ok: true,
    counts: {
      habits: raw.habits.length,
      goals: raw.goals.length,
      tasks: raw.tasks.length
    }
  };
}

// Debounced effect — writes happen 200ms after the last change.
function useDebouncedEffect(fn, deps, delay = 200) {
  useEffect(() => {
    const h = setTimeout(fn, delay);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Diacritic-insensitive substring match (BG + EN friendly).
function normalizeText(s) {
  if (!s) return '';
  return s.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function fuzzyMatch(query, text) {
  const q = normalizeText(query).trim();
  if (!q) return true;
  return normalizeText(text).includes(q);
}

const CATEGORY_META = {
  health:   { color: '#10b981', emoji: '🌿' },
  work:     { color: '#3b82f6', emoji: '💼' },
  learning: { color: '#a855f7', emoji: '📚' },
  personal: { color: '#f59e0b', emoji: '✨' },
  finance:  { color: '#f43f5e', emoji: '💰' }
};

// т.2.10: Predefined color palette for user-defined tags. The hard-coded
// CATEGORY_META above stays as-is — tags are a NEW additive layer over it,
// not a replacement. 10 swatches chosen to be visually distinct on dark bg.
const TAG_COLORS = [
  '#f43f5e', // rose
  '#f97316', // orange
  '#f59e0b', // amber
  '#eab308', // yellow
  '#10b981', // emerald
  '#14b8a6', // teal
  '#0ea5e9', // sky
  '#6366f1', // indigo
  '#a855f7', // violet
  '#ec4899'  // pink
];

const PRIORITY_COLORS = {
  high:   { bg: 'bg-rose-500/15',  text: 'text-rose-400',  border: 'border-rose-500/30' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  low:    { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30' }
};

// ============ THEMES ============
// Each theme defines primary/accent colors used to override the amber defaults.
const THEMES = {
  fire: {
    label: 'themeFire',
    primary: '#f59e0b',        // amber-500
    primaryLight: '#fbbf24',   // amber-400
    primaryDark: '#ea580c',    // orange-600
    accent: '#c2410c',         // orange-700
    text: '#fef3c7',           // amber-50
    mutedText: '#fde68a',      // amber-200
    bgGradFrom: '#1a0f08',
    bgGradMid: '#0a0604',
    bgGradTo: '#000000',
    glow: 'rgba(245, 158, 11, 0.4)',
    glowSoft: 'rgba(245, 158, 11, 0.2)'
  },
  ocean: {
    label: 'themeOcean',
    primary: '#0ea5e9',        // sky-500
    primaryLight: '#38bdf8',   // sky-400
    primaryDark: '#0284c7',    // sky-600
    accent: '#0369a1',
    text: '#e0f2fe',
    mutedText: '#bae6fd',
    bgGradFrom: '#0c2d4a',
    bgGradMid: '#061628',
    bgGradTo: '#000714',
    glow: 'rgba(14, 165, 233, 0.4)',
    glowSoft: 'rgba(14, 165, 233, 0.2)'
  },
  forest: {
    label: 'themeForest',
    primary: '#10b981',        // emerald-500
    primaryLight: '#34d399',   // emerald-400
    primaryDark: '#059669',
    accent: '#047857',
    text: '#d1fae5',
    mutedText: '#a7f3d0',
    bgGradFrom: '#0a2818',
    bgGradMid: '#04140c',
    bgGradTo: '#000806',
    glow: 'rgba(16, 185, 129, 0.4)',
    glowSoft: 'rgba(16, 185, 129, 0.2)'
  },
  purple: {
    label: 'themePurple',
    primary: '#a855f7',        // violet-500
    primaryLight: '#c084fc',   // violet-400
    primaryDark: '#9333ea',
    accent: '#6b21a8',
    text: '#f3e8ff',
    mutedText: '#e9d5ff',
    bgGradFrom: '#1b0f33',
    bgGradMid: '#0a0516',
    bgGradTo: '#000006',
    glow: 'rgba(168, 85, 247, 0.4)',
    glowSoft: 'rgba(168, 85, 247, 0.2)'
  },
  minimal: {
    label: 'themeMinimal',
    primary: '#94a3b8',        // slate-400
    primaryLight: '#cbd5e1',   // slate-300
    primaryDark: '#64748b',
    accent: '#475569',
    text: '#f1f5f9',
    mutedText: '#cbd5e1',
    bgGradFrom: '#1e293b',
    bgGradMid: '#0f172a',
    bgGradTo: '#020617',
    glow: 'rgba(148, 163, 184, 0.3)',
    glowSoft: 'rgba(148, 163, 184, 0.15)'
  }
};

const DEFAULT_SETTINGS = {
  theme: 'fire',
  lightMode: false,
  weekStart: 1,                 // 1=Mon, 0=Sun
  sound: true,
  vibration: true,
  textSize: 'md',               // sm/md/lg
  eveningReminder: false,
  eveningReminderTime: '21:00',
  freezeDays: 1,                // 0 = strict, 1 = allow 1 missed day, etc.
  backfillDays: 3,              // how many days back a missed habit day can be checked/unchecked
  autoArchive: false,
  archiveDays: 7,
  showArchived: false,
  showArchivedItems: false,     // т.2.6: toggle archived habits/goals in their views
  quickIncrement: true
};

// ============ UTILS ============
const dateKey = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
};

// Streak with freeze tolerance: allow up to `freezeDays` consecutive missed days
// inside the tail, starting from today (or yesterday if today not done).
const calculateStreak = (completions, freezeDays = 0) => {
  if (!completions?.length) return 0;
  const set = new Set(completions);
  let streak = 0;
  let d = new Date();
  // If today missing, start from yesterday
  if (!set.has(d.toDateString())) d.setDate(d.getDate() - 1);
  let missed = 0;
  // Safety cap: 3650 days (~10 years) of history
  for (let i = 0; i < 3650; i++) {
    if (set.has(d.toDateString())) {
      streak++;
      missed = 0;
    } else {
      missed++;
      if (missed > freezeDays) break;
    }
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

// Broken if yesterday NOT done AND day before WAS done AND today NOT done
// AND the gap exceeds freezeDays.
const isStreakBroken = (completions, freezeDays = 0) => {
  if (!completions?.length) return false;
  const set = new Set(completions);
  const today = new Date();
  if (set.has(today.toDateString())) return false;

  // Walk back and count consecutive missed days before finding a completed one
  let missed = 0;
  let d = new Date(Date.now() - 86400000); // start from yesterday
  for (let i = 0; i < 30; i++) {
    if (set.has(d.toDateString())) {
      return missed > freezeDays;
    }
    missed++;
    d.setDate(d.getDate() - 1);
  }
  return false;
};

// Longest historical streak in the completion log. A "run" continues as long
// as each gap between consecutive unique completions is <= 1 + freezeDays days
// (so freezeDays=0 requires strictly consecutive days).
const calculateLongestStreak = (completions, freezeDays = 0) => {
  if (!completions?.length) return 0;
  const days = [...new Set(completions.map(d => {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt.getTime();
  }))].sort((a, b) => a - b);
  let longest = 1;
  let current = 1;
  const maxGap = 1 + (freezeDays || 0);
  for (let i = 1; i < days.length; i++) {
    const gap = Math.round((days[i] - days[i - 1]) / 86400000);
    if (gap <= maxGap) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }
  return longest;
};

// How many freeze days are currently "consumed" inside the active streak tail.
// Counts missed days that are bracketed by completions (i.e. misses the freeze is
// actively protecting). Matches calculateStreak: if today is missing we start from
// yesterday so today's miss itself is not counted. Returns 0 when freezeDays=0 or
// no miss inside the running streak — i.e. no "active pause".
const calculateFreezeUsed = (completions, freezeDays = 0) => {
  if (!completions?.length || freezeDays <= 0) return 0;
  const set = new Set(completions);
  let d = new Date();
  if (!set.has(d.toDateString())) d.setDate(d.getDate() - 1);
  let used = 0;
  let pendingMisses = 0;   // misses since the last completion — only confirmed when we hit another completion
  let missed = 0;          // consecutive misses (break condition, mirrors calculateStreak)
  for (let i = 0; i < 3650; i++) {
    if (set.has(d.toDateString())) {
      used += pendingMisses;
      pendingMisses = 0;
      missed = 0;
    } else {
      missed++;
      pendingMisses++;
      if (missed > freezeDays) break;
    }
    d.setDate(d.getDate() - 1);
  }
  return used;
};

// т.2.11: cycle detection for habit stacking.
// Returns true if assigning `parentId` as the parent of `childId` would
// create a cycle (A→B and B→A, longer chains, or self-stack). Walks the
// parent chain from `parentId` upwards via `stackedAfter`; a cycle exists
// iff we ever revisit `childId`. Hard cap on iterations as defense against
// pre-existing corrupt data.
const wouldCreateStackCycle = (habits, childId, parentId) => {
  if (parentId == null) return false;
  if (parentId === childId) return true;
  const byId = new Map(habits.map(h => [h.id, h]));
  let current = byId.get(parentId);
  for (let i = 0; i < 256 && current; i++) {
    if (current.id === childId) return true;
    if (current.stackedAfter == null) return false;
    current = byId.get(current.stackedAfter);
  }
  return false;
};

// Returns the list of habits eligible to be the parent of `childId` —
// excludes the child itself, archived habits, and any habit that would
// create a cycle. Used by the dropdown in AddModal/HabitsView edit panel.
const getEligibleStackParents = (habits, childId) => {
  return habits.filter(h => !h.archived
    && h.id !== childId
    && !wouldCreateStackCycle(habits, childId, h.id));
};

// т.2.12: weekly review helpers.
// `weekRangeForOffset(now, weekStart, offset)` returns the [start, end] Date
// pair for the week containing `now` shifted by `offset` (0 = current,
// -1 = previous, etc.). Start is normalized to 00:00:00 local; end is
// 23:59:59.999 of the 6th day. `weekStart` follows DEFAULT_SETTINGS:
// 1 = Monday-anchored, 0 = Sunday-anchored.
const weekRangeForOffset = (now, weekStart, offset = 0) => {
  const ref = new Date(now);
  ref.setHours(0, 0, 0, 0);
  // dow: 0=Sun..6=Sat. Shift so Monday=0 when weekStart=1; Sunday=0 when weekStart=0.
  const dow = ref.getDay();
  const back = weekStart === 1 ? (dow === 0 ? 6 : dow - 1) : dow;
  const start = new Date(ref);
  start.setDate(start.getDate() - back + offset * 7);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

// Shapes the 7-day window for the modal: returns an array of {date, key} for
// each day in the week, plus eligibility (date <= today). Used both to
// compute stats and to know which days are "completed" so we don't count
// future days when reviewing the current week.
const buildWeekDays = (start, end, now = new Date()) => {
  const today = new Date(now);
  today.setHours(23, 59, 59, 999);
  const days = [];
  const d = new Date(start);
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const day = new Date(d);
    days.push({
      date: day,
      key: day.toDateString(),
      eligible: day.getTime() <= today.getTime()
    });
    d.setDate(d.getDate() + 1);
  }
  return days;
};

// Compute everything the WeeklyReviewModal renders for a given week.
// - totalTicks: completions across all active habits in the 7-day window
// - bestDay: { key, date, count } with the highest completion count (any of the
//   7 days, eligible or not — when eligible-only, pick from those)
// - topHabit: { id, name, count, important } with the most ticks; null if 0
// - tagCounts: { tagId: number } — habit ticks attributed to each tag (OR
//   semantics — a habit with multiple tags contributes its weekly ticks to
//   each tag)
// - stacksHeld: [{ childId, parentId, childName, parentName }] — child + parent
//   both completed on every eligible day (and at least 1 eligible day)
// - eligibleDayCount: number of eligible days in the window
// - activeHabitsCount: passed back for the "X navika aktivni" subtitle
const computeWeeklyStats = (habits, tags, start, end, now = new Date()) => {
  const days = buildWeekDays(start, end, now);
  const weekKeys = new Set(days.map(d => d.key));
  const eligibleDays = days.filter(d => d.eligible);
  // Active habits only — archived items shouldn't pollute the recap.
  const active = (habits || []).filter(h => !h.archived);
  // Per-day counts (sum across all active habits).
  const dayCounts = days.map(({ key, date, eligible }) => {
    const count = active.reduce((sum, h) => sum + ((h.completions || []).includes(key) ? 1 : 0), 0);
    return { key, date, count, eligible };
  });
  let totalTicks = 0;
  dayCounts.forEach(d => { totalTicks += d.count; });
  // Best day — pick from eligible days first; if none eligible, leave null.
  let bestDay = null;
  dayCounts.forEach(d => {
    if (!d.eligible) return;
    if (!bestDay || d.count > bestDay.count) bestDay = d;
  });
  // Per-habit weekly tick count (any completion that lands in the 7-day window).
  const perHabit = active.map(h => {
    const count = (h.completions || []).reduce((sum, c) => sum + (weekKeys.has(c) ? 1 : 0), 0);
    return { habit: h, count };
  });
  // Top habit — must have ≥1 ticks; tie-break by first-encountered (sort stable).
  let topHabit = null;
  perHabit.forEach(({ habit, count }) => {
    if (count > 0 && (!topHabit || count > topHabit.count)) {
      topHabit = { id: habit.id, name: habit.name, count, important: !!habit.important };
    }
  });
  // Tag breakdown — sum each habit's weekly ticks into every tag it carries.
  const tagCounts = {};
  perHabit.forEach(({ habit, count }) => {
    if (count <= 0) return;
    (habit.tagIds || []).forEach(tid => {
      tagCounts[tid] = (tagCounts[tid] || 0) + count;
    });
  });
  // Stacks held — for every child that points to a still-active parent, the
  // pair is "held" iff BOTH habits are completed on every eligible day. If
  // there are no eligible days yet (e.g. the week hasn't started) we skip.
  const stacksHeld = [];
  if (eligibleDays.length > 0) {
    const byId = new Map(active.map(h => [h.id, h]));
    active.forEach(child => {
      if (child.stackedAfter == null) return;
      const parent = byId.get(child.stackedAfter);
      if (!parent) return;
      const allHeld = eligibleDays.every(d =>
        (child.completions || []).includes(d.key) &&
        (parent.completions || []).includes(d.key));
      if (allHeld) {
        stacksHeld.push({
          childId: child.id, childName: child.name,
          parentId: parent.id, parentName: parent.name
        });
      }
    });
  }
  return {
    days: dayCounts,
    eligibleDayCount: eligibleDays.length,
    totalTicks,
    bestDay,
    topHabit,
    tagCounts,
    stacksHeld,
    activeHabitsCount: active.length
  };
};

// Format a YYYY-MM-DD ISO date string for display in the weekly review header.
// "1–7 април 2026" / "Apr 1 – 7, 2026" — same month collapses to one label.
const formatWeekRange = (start, end, lang) => {
  const fmtDay = (d) => d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { day: 'numeric' });
  const fmtMonth = (d) => d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { month: 'short' });
  const fmtYear = (d) => d.getFullYear();
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return lang === 'bg'
      ? `${fmtDay(start)}–${fmtDay(end)} ${fmtMonth(end)} ${fmtYear(end)}`
      : `${fmtMonth(start)} ${fmtDay(start)}–${fmtDay(end)}, ${fmtYear(end)}`;
  }
  return lang === 'bg'
    ? `${fmtDay(start)} ${fmtMonth(start)} – ${fmtDay(end)} ${fmtMonth(end)} ${fmtYear(end)}`
    : `${fmtMonth(start)} ${fmtDay(start)} – ${fmtMonth(end)} ${fmtDay(end)}, ${fmtYear(end)}`;
};

// YYYY-MM-DD key from a Date — used to identify a week by its start date.
const isoDateKey = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
};

const isTaskArchivable = (task, archiveDays) => {
  if (!task.done || !task.completedAt) return false;
  const age = (Date.now() - new Date(task.completedAt).getTime()) / 86400000;
  return age >= archiveDays;
};

// Sound: short pleasant "tick" using Web Audio API
let audioCtx = null;
const playTick = () => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(880, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08);
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.3);
  } catch {}
};

const vibrate = (ms = 15) => {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch {}
};

// ============ THEME INJECTOR ============
// Runtime CSS that overrides amber Tailwind utility classes with the chosen theme's palette.
function useThemeInjector(settings) {
  useEffect(() => {
    const theme = THEMES[settings.theme] || THEMES.fire;
    const light = settings.lightMode;
    const sizeMap = { sm: '14px', md: '16px', lg: '18px' };

    // Root body styles via data attributes
    document.body.dataset.theme = settings.theme;
    document.body.dataset.light = light ? '1' : '0';
    document.body.dataset.size = settings.textSize;
    document.documentElement.style.setProperty('--app-base-font', sizeMap[settings.textSize] || '16px');

    // Theme meta (browser chrome)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#fef7ed' : theme.bgGradMid);

    // Generate override CSS
    const css = `
      :root {
        --theme-primary: ${theme.primary};
        --theme-primary-light: ${theme.primaryLight};
        --theme-primary-dark: ${theme.primaryDark};
        --theme-accent: ${theme.accent};
        --theme-text: ${theme.text};
        --theme-muted: ${theme.mutedText};
        --theme-glow: ${theme.glow};
        --theme-glow-soft: ${theme.glowSoft};
        --theme-bg-from: ${theme.bgGradFrom};
        --theme-bg-mid: ${theme.bgGradMid};
        --theme-bg-to: ${theme.bgGradTo};
      }
      html { font-size: var(--app-base-font, 16px); }
      body { background: ${light ? '#faf7f2' : '#000'} !important; color: ${light ? '#1c1917' : theme.text} !important; }

      /* --- Accent color overrides (apply to all themes) --- */
      .text-amber-400 { color: ${theme.primaryLight} !important; }
      .text-amber-300 { color: ${theme.primary} !important; }
      .text-amber-300\\/40 { color: ${theme.primary}66 !important; }
      .text-amber-300\\/60 { color: ${theme.primary}99 !important; }
      .text-amber-300\\/70 { color: ${theme.primary}b3 !important; }
      .text-amber-400\\/60 { color: ${theme.primaryLight}99 !important; }
      .text-amber-400\\/70 { color: ${theme.primaryLight}b3 !important; }
      .text-amber-100 { color: ${light ? '#1c1917' : theme.text} !important; }
      .text-amber-100\\/70 { color: ${light ? '#1c1917b3' : theme.text + 'b3'} !important; }
      .text-amber-100\\/80 { color: ${light ? '#1c1917cc' : theme.text + 'cc'} !important; }
      .text-amber-100\\/40 { color: ${light ? '#57534e66' : theme.text + '66'} !important; }
      .text-amber-50 { color: ${light ? '#1c1917' : theme.text} !important; }
      .text-amber-50\\/90 { color: ${light ? '#1c1917e6' : theme.text + 'e6'} !important; }
      .text-amber-200\\/30 { color: ${light ? '#78716c4d' : theme.mutedText + '4d'} !important; }
      .text-amber-200\\/40 { color: ${light ? '#78716c66' : theme.mutedText + '66'} !important; }
      .text-amber-200\\/50 { color: ${light ? '#78716c80' : theme.mutedText + '80'} !important; }
      .text-amber-200\\/60 { color: ${light ? '#78716c99' : theme.mutedText + '99'} !important; }

      .bg-amber-500 { background-color: ${theme.primary} !important; }
      .bg-amber-400 { background-color: ${theme.primaryLight} !important; }
      .bg-amber-500\\/5 { background-color: ${theme.primary}0d !important; }
      .bg-amber-500\\/10 { background-color: ${theme.primary}1a !important; }
      .bg-amber-500\\/15 { background-color: ${theme.primary}26 !important; }
      .bg-amber-500\\/20 { background-color: ${theme.primary}33 !important; }
      .bg-orange-500\\/15 { background-color: ${theme.primaryDark}26 !important; }

      .border-amber-500\\/10 { border-color: ${theme.primary}1a !important; }
      .border-amber-500\\/20 { border-color: ${theme.primary}33 !important; }
      .border-amber-500\\/30 { border-color: ${theme.primary}4d !important; }
      .border-amber-500\\/40 { border-color: ${theme.primary}66 !important; }
      .border-amber-500\\/60 { border-color: ${theme.primary}99 !important; }
      .border-orange-500\\/30 { border-color: ${theme.primaryDark}4d !important; }
      .text-orange-400 { color: ${theme.primaryLight} !important; }
      .text-orange-300 { color: ${theme.primary} !important; }
      .accent-amber-500 { accent-color: ${theme.primary} !important; }

      /* Light-mode adjustments for panels that are white/5 dark */
      ${light ? `
        body { background: linear-gradient(180deg, #fffbf5, #fef5e7) !important; }
        .bg-white\\/\\[0\\.02\\] { background-color: #00000008 !important; }
        .bg-white\\/\\[0\\.03\\] { background-color: #0000000d !important; }
        .bg-white\\/\\[0\\.04\\] { background-color: #00000012 !important; }
        .bg-white\\/5 { background-color: #00000010 !important; }
        .border-white\\/5 { border-color: #00000015 !important; }
        .border-white\\/10 { border-color: #00000025 !important; }
        .text-amber-50 { color: #1c1917 !important; }
      ` : ''}
    `;

    let tag = document.getElementById('theme-styles');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'theme-styles';
      document.head.appendChild(tag);
    }
    tag.textContent = css;
  }, [settings.theme, settings.lightMode, settings.textSize]);
}

// ============ CONFIRM MODAL ============
function ConfirmModal({ t, title, body, confirmLabel, tone = 'danger', onConfirm, onClose }) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
      if (e.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault(); onConfirm(); onClose();
      }
    };
    // Focus trap — focus the confirm button on open
    const prevFocus = document.activeElement;
    confirmBtnRef.current?.focus();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, [onClose, onConfirm]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.15s ease' }} onClick={onClose}
      role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl border p-6"
        style={{
          background: 'linear-gradient(180deg, var(--theme-bg-from), var(--theme-bg-mid))',
          borderColor: tone === 'danger' ? 'rgba(244, 63, 94, 0.3)' : 'var(--theme-primary)',
          animation: 'slideUp 0.25s ease',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))'
        }}>
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center ${tone === 'danger' ? 'bg-rose-500/20 border border-rose-500/40' : 'bg-amber-500/20 border border-amber-500/40'}`}>
            <Icon name="alert" className={`w-5 h-5 ${tone === 'danger' ? 'text-rose-400' : 'text-amber-400'}`} strokeWidth={2.5} />
          </div>
          <div className="flex-1 pt-1">
            <h3 id="confirm-title" className="text-lg font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{title}</h3>
            <p className="text-sm text-amber-200/70 mt-1 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{body}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-100/80 font-bold">{t.cancel}</button>
          <button ref={confirmBtnRef} onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-3 rounded-xl font-black transition-all active:scale-95 ${tone === 'danger' ? 'text-white' : 'text-black'}`}
            style={{
              background: tone === 'danger'
                ? 'linear-gradient(135deg, #f43f5e, #be123c)'
                : 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))',
              boxShadow: tone === 'danger'
                ? '0 4px 20px rgba(244, 63, 94, 0.4)'
                : '0 4px 20px var(--theme-glow)'
            }}>
            {confirmLabel || t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ UNDO TOAST ============
// Shown for ~5s after a delete; a single tap restores the previous state.
function UndoToast({ label, onUndo, onDismiss, lang }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDismiss]);

  return (
    <div role="status" aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl max-w-sm w-[90%]"
      style={{
        bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 5.5rem))',
        background: 'linear-gradient(180deg, rgba(20,14,10,0.98), rgba(10,6,4,0.98))',
        borderColor: 'var(--theme-primary)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 20px var(--theme-glow-soft)',
        animation: 'slideUp 0.25s ease',
      }}>
      <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
           style={{ background: 'var(--theme-primary)', opacity: 0.2 }}>
        <Icon name="check" className="w-4 h-4" style={{ color: 'var(--theme-primary-light)' }} strokeWidth={3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-amber-200/60 font-bold uppercase tracking-wider">
          {lang === 'bg' ? 'Изтрито' : 'Deleted'}
        </div>
        <div className="text-sm text-amber-100 font-semibold truncate">{label}</div>
      </div>
      <button onClick={onUndo}
        aria-label={lang === 'bg' ? 'Върни' : 'Undo'}
        className="px-3 py-2 rounded-xl font-black text-sm active:scale-95 transition-transform flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))',
          color: '#000',
          boxShadow: '0 2px 12px var(--theme-glow)'
        }}>
        {lang === 'bg' ? 'Върни' : 'Undo'}
      </button>
    </div>
  );
}

// ============ STACK PROMPT TOAST (т.2.11) ============
// Shown for ~6s after the user marks a parent habit done today and there is a
// not-yet-done stack child for today. Tapping "Отметни" calls onAccept(childId)
// and dismisses; the × button just dismisses. Auto-hides after the timer.
function StackPromptToast({ t, childName, onAccept, onDismiss }) {
  // Keep latest dismiss in a ref so the auto-dismiss timer is set ONCE on mount
  // and isn't reset by App re-renders that recreate the onDismiss closure.
  const dismissRef = useRef(onDismiss);
  useEffect(() => { dismissRef.current = onDismiss; }, [onDismiss]);
  useEffect(() => {
    const timer = setTimeout(() => dismissRef.current(), 6000);
    const onKey = (e) => { if (e.key === 'Escape') dismissRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const body = typeof t.stackPromptBody === 'function' ? t.stackPromptBody(childName) : '';

  return (
    <div role="status" aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl max-w-sm w-[90%]"
      style={{
        bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 5.5rem))',
        background: 'linear-gradient(180deg, rgba(20,14,10,0.98), rgba(10,6,4,0.98))',
        borderColor: 'var(--theme-primary)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6), 0 0 20px var(--theme-glow-soft)',
        animation: 'slideUp 0.25s ease',
      }}>
      <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
           style={{ background: 'var(--theme-primary)', opacity: 0.2 }}>
        <Icon name="chain" className="w-4 h-4" style={{ color: 'var(--theme-primary-light)' }} strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-amber-200/60 font-bold uppercase tracking-wider">
          {t.stackPromptTitle}
        </div>
        <div className="text-sm text-amber-100 font-semibold truncate">{body}</div>
      </div>
      <button onClick={onAccept}
        aria-label={t.stackPromptCheck}
        className="px-3 py-2 rounded-xl font-black text-sm active:scale-95 transition-transform flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))',
          color: '#000',
          boxShadow: '0 2px 12px var(--theme-glow)'
        }}>
        {t.stackPromptCheck}
      </button>
      <button onClick={onDismiss}
        aria-label={t.cancel}
        className="p-1.5 rounded-lg text-amber-200/50 hover:text-amber-200/80 flex-shrink-0">
        <Icon name="x" className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============ QUICK-ADD FAB ============
// Floating action button bottom-right. Tap opens a mini-menu with habit/goal/task.
// Selecting a type calls onSelect(type) and the parent opens the AddModal.
function QuickAddFAB({ t, onSelect }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); } };
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [open]);

  const pick = (type) => {
    setOpen(false);
    vibrate(10);
    onSelect(type);
  };

  // Ordered bottom-up (last in array is closest to FAB)
  const items = [
    { type: 'task',  icon: 'checkCircle', label: t.addTask,  grad: 'linear-gradient(135deg, #10b981, #059669)' },
    { type: 'goal',  icon: 'target',      label: t.addGoal,  grad: 'linear-gradient(135deg, #0ea5e9, #0369a1)' },
    { type: 'habit', icon: 'flame',       label: t.addHabit, grad: 'linear-gradient(135deg, #f59e0b, #ea580c)' },
  ];

  const a11yLabel = open
    ? (t.cancel || 'Close')
    : `${t.addHabit} / ${t.addGoal} / ${t.addTask}`;

  return (
    <div
      ref={wrapRef}
      className="fixed z-30 right-4 flex flex-col items-end"
      style={{ bottom: 'calc(5.25rem + env(safe-area-inset-bottom))' }}
    >
      {open && (
        <div className="flex flex-col items-end gap-3 mb-3">
          {items.map((it, i) => (
            <button
              key={it.type}
              onClick={() => pick(it.type)}
              className="flex items-center gap-3 active:scale-95 transition-transform"
              style={{ animation: `fadeIn .2s ease ${i * 45}ms both` }}
              aria-label={it.label}
            >
              <span className="px-3 py-1.5 rounded-lg bg-black/85 text-amber-100 text-xs font-semibold border border-amber-500/25 shadow-lg whitespace-nowrap backdrop-blur">
                {it.label}
              </span>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-white/10"
                style={{ background: it.grad }}
              >
                <Icon name={it.icon} className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => { vibrate(10); setOpen(o => !o); }}
        aria-label={a11yLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        className="w-14 h-14 rounded-full flex items-center justify-center active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 24px var(--theme-glow)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform .22s ease'
        }}
      >
        <Icon name="plus" className="w-7 h-7 text-black" strokeWidth={3} />
      </button>
    </div>
  );
}

// ============ MAIN APP ============
function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'bg');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  // т.2.10: global tag list. Each tag is { id, name, color }. Items reference
  // tags via their `tagIds: []` field — kept as IDs (not embedded objects) so
  // a tag rename or color change updates everywhere without item-level edits.
  const [tags, setTags] = useState([]);
  // т.2.12: log of saved weekly reviews. Each entry: { id, weekStart (YYYY-MM-DD),
  // weekEnd (YYYY-MM-DD), text, createdAt (ISO), stats { totalTicks, bestDayKey,
  // bestDayCount, topHabitId, topHabitName, topHabitTicks, tagCounts {tagId:n},
  // stacksHeld [{childId, parentId}], eligibleDays } }. One entry per weekStart —
  // saving again replaces the previous entry for that week.
  const [weeklyReviews, setWeeklyReviews] = useState([]);
  // Local UI state — opens the WeeklyReviewModal from the Dashboard CTA.
  const [showWeeklyReview, setShowWeeklyReview] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null); // { title, body, confirmLabel, onConfirm }
  const [undo, setUndo] = useState(null);        // { label, restore }
  // т.2.11: queued stack-suggestion toast — { childId, childName }. Auto-dismisses
  // after 6s; tapping "Отметни" toggles the child habit for today and dismisses.
  const [stackPrompt, setStackPrompt] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notifPermission, setNotifPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');
  const [loaded, setLoaded] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const reminderCheckRef = useRef(null);

  const t = T[lang];
  useThemeInjector(settings);

  // Load data + settings (with migration). First-time users land on an empty
  // state so the WelcomeScreen can guide them — no more auto-seeded demo data.
  useEffect(() => {
    const saved = storage.load(STORAGE_KEY, null);
    if (saved && typeof saved === 'object' && (saved.habits || saved.goals || saved.tasks)) {
      const data = migrateData(saved);
      setHabits(data.habits);
      setGoals(data.goals);
      setTasks(data.tasks);
      setTags(data.tags || []);
      setWeeklyReviews(data.weeklyReviews || []);
      if (data.version !== (saved.version || 1)) {
        storage.save(STORAGE_KEY, { ...data });
      }
    }
    const savedSettings = storage.load(SETTINGS_KEY, null);
    if (savedSettings && typeof savedSettings === 'object') {
      setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
    }
    const onboarding = storage.load(ONBOARDING_KEY, null);
    if (onboarding && onboarding.dismissed) setOnboardingDone(true);
    setLoaded(true);
    setQuoteIdx(Math.floor(Math.random() * 10));
  }, []);

  const dismissOnboarding = useCallback(() => {
    setOnboardingDone(true);
    storage.save(ONBOARDING_KEY, { dismissed: true, at: new Date().toISOString() });
  }, []);

  // Loads a small, opinionated sample set (3 habits, 1 goal, 2 tasks — per PLAN 2.4).
  // Appends to existing data so it's safe to call from Settings even mid-use.
  const loadSampleData = useCallback(() => {
    const today = new Date().toDateString();
    const y = new Date(Date.now() - 86400000).toDateString();
    const y2 = new Date(Date.now() - 2 * 86400000).toDateString();
    const base = Date.now();
    const isBg = lang === 'bg';
    const sampleHabits = [
      { id: base + 1, name: isBg ? 'Сутрешна разходка' : 'Morning walk', category: 'health', completions: [today, y, y2], target: 30, reminderTime: '08:00', notes: '', important: false },
      { id: base + 2, name: isBg ? 'Четене 30 минути' : 'Read for 30 minutes', category: 'learning', completions: [y, y2], target: 60, reminderTime: '', notes: '', important: false },
      { id: base + 3, name: isBg ? 'Медитация' : 'Meditation', category: 'personal', completions: [today], target: 21, reminderTime: '07:00', notes: '', important: true }
    ];
    const sampleGoals = [
      { id: base + 11, name: isBg ? 'Научи испански' : 'Learn Spanish', category: 'learning', progress: 33, deadline: '2026-12-31', notes: '',
        subtasks: [
          { id: base + 101, text: isBg ? 'Завърши A1 курс' : 'Finish A1 course', done: true },
          { id: base + 102, text: isBg ? 'Достигни A2 ниво' : 'Reach A2 level', done: false },
          { id: base + 103, text: isBg ? 'Първи разговор' : 'First conversation', done: false }
        ], numeric: null }
    ];
    const sampleTasks = [
      { id: base + 21, name: isBg ? 'Подай данъчна декларация' : 'File tax return', category: 'personal', deadline: '2026-04-30', done: false, priority: 'high', reminderTime: '', notes: '', completedAt: null },
      { id: base + 22, name: isBg ? 'Завърши проект отчет' : 'Finish project report', category: 'work', deadline: '2026-04-25', done: false, priority: 'medium', reminderTime: '', notes: '', completedAt: null }
    ];
    setHabits(prev => [...prev, ...sampleHabits]);
    setGoals(prev => [...prev, ...sampleGoals]);
    setTasks(prev => [...prev, ...sampleTasks]);
    dismissOnboarding();
  }, [lang, dismissOnboarding]);

  // Save data — debounced so rapid edits batch into a single write.
  // т.2.10: `tags` is part of the persisted envelope alongside habits/goals/tasks.
  // т.2.12: `weeklyReviews` is also persisted in the same envelope.
  useDebouncedEffect(() => {
    if (!loaded) return;
    storage.save(STORAGE_KEY, { habits, goals, tasks, tags, weeklyReviews, version: SCHEMA_VERSION });
  }, [habits, goals, tasks, tags, weeklyReviews, loaded], 200);

  useDebouncedEffect(() => {
    if (!loaded) return;
    storage.save(SETTINGS_KEY, settings);
  }, [settings, loaded], 200);

  useEffect(() => { storage.save('lang', lang); }, [lang]);

  // Quota-exceeded toast
  const [storageError, setStorageError] = useState(null);
  useEffect(() => {
    const onQuota = () => setStorageError(
      lang === 'bg'
        ? 'Паметта е пълна. Изтрий стари записи или направи експорт.'
        : 'Storage is full. Delete old entries or export your data.'
    );
    window.addEventListener('storage-quota-exceeded', onQuota);
    return () => window.removeEventListener('storage-quota-exceeded', onQuota);
  }, [lang]);

  // Data notice toast — used by the backup/import flow (т.2.9).
  // tone: 'success' | 'error'. Auto-dismisses after 4s.
  const [dataNotice, setDataNotice] = useState(null);
  useEffect(() => {
    if (!dataNotice) return;
    const h = setTimeout(() => setDataNotice(null), 4000);
    return () => clearTimeout(h);
  }, [dataNotice]);

  // ===== Reminder system =====
  useEffect(() => {
    if (!loaded || notifPermission !== 'granted') return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const today = now.toDateString();
      const notifKey = `notif-${dateKey(now)}-${currentTime}`;

      habits.forEach(h => {
        if (h.archived) return;
        if (h.reminderTime === currentTime && !h.completions.includes(today)) {
          const key = `${notifKey}-h${h.id}`;
          if (!sessionStorage.getItem(key)) {
            new Notification(t.appName, { body: `🏔 ${h.name}`, icon: 'icon-192.png', tag: key });
            sessionStorage.setItem(key, '1');
          }
        }
      });

      tasks.forEach(ta => {
        if (ta.reminderTime === currentTime && !ta.done) {
          const key = `${notifKey}-t${ta.id}`;
          if (!sessionStorage.getItem(key)) {
            new Notification(t.appName, { body: `✓ ${ta.name}`, icon: 'icon-192.png', tag: key });
            sessionStorage.setItem(key, '1');
          }
        }
      });

      // Evening digest
      if (settings.eveningReminder && settings.eveningReminderTime === currentTime) {
        const remaining = habits.filter(h => !h.archived && !h.completions.includes(today)).length;
        const key = `${notifKey}-evening`;
        if (remaining > 0 && !sessionStorage.getItem(key)) {
          new Notification(t.appName, { body: t.eveningBody(remaining), icon: 'icon-192.png', tag: key });
          sessionStorage.setItem(key, '1');
        }
      }
    };

    checkReminders();
    reminderCheckRef.current = setInterval(checkReminders, 30000);
    return () => clearInterval(reminderCheckRef.current);
  }, [habits, tasks, notifPermission, loaded, t.appName, settings.eveningReminder, settings.eveningReminderTime]);

  const requestNotifPermission = async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    setNotifPermission(result);
  };

  // Filter archived tasks from main views
  const visibleTasks = useMemo(() => {
    if (!settings.autoArchive || settings.showArchived) return tasks;
    return tasks.filter(ta => !isTaskArchivable(ta, settings.archiveDays));
  }, [tasks, settings.autoArchive, settings.archiveDays, settings.showArchived]);

  const archivedCount = useMemo(() => {
    if (!settings.autoArchive) return 0;
    return tasks.filter(ta => isTaskArchivable(ta, settings.archiveDays)).length;
  }, [tasks, settings.autoArchive, settings.archiveDays]);

  // т.2.6 — manual archive for habits and goals. Archived items are hidden
  // from Dashboard, Calendar, Stats and the active HabitsView/GoalsView lists,
  // but stay in storage with an archivedAt timestamp and can be restored.
  const activeHabits = useMemo(() => habits.filter(h => !h.archived), [habits]);
  const activeGoals  = useMemo(() => goals.filter(g => !g.archived),  [goals]);
  const archivedHabitCount = useMemo(() => habits.filter(h => h.archived).length, [habits]);
  const archivedGoalCount  = useMemo(() => goals.filter(g => g.archived).length,  [goals]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const doneToday = activeHabits.filter(h => h.completions.includes(today)).length;
    const habitRate = activeHabits.length ? Math.round((doneToday / activeHabits.length) * 100) : 0;
    const streaks = activeHabits.map(h => calculateStreak(h.completions, settings.freezeDays));
    const maxStreak = Math.max(0, ...streaks);
    const activeStreak = streaks.filter(s => s > 0).length;
    const brokenCount = activeHabits.filter(h => isStreakBroken(h.completions, settings.freezeDays)).length;
    const avgGoal = activeGoals.length ? Math.round(activeGoals.reduce((s, g) => s + g.progress, 0) / activeGoals.length) : 0;
    const openTasks = visibleTasks.filter(ta => !ta.done).length;
    const week = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const count = activeHabits.filter(h => h.completions.includes(d.toDateString())).length;
      week.push({ day: d, count, total: activeHabits.length });
    }
    return { doneToday, habitRate, maxStreak, activeStreak, avgGoal, openTasks, week, brokenCount };
  }, [activeHabits, activeGoals, visibleTasks, settings.freezeDays]);

  const tick = useCallback(() => {
    if (settings.sound) playTick();
    if (settings.vibration) vibrate(12);
  }, [settings.sound, settings.vibration]);

  const toggleHabit = (id, date = null) => {
    const targetDate = date || new Date().toDateString();
    const todayKey = new Date().toDateString();
    let becameDone = false;
    setHabits(habits.map(h => {
      if (h.id !== id) return h;
      const has = h.completions.includes(targetDate);
      if (!has) becameDone = true;
      return { ...h, completions: has ? h.completions.filter(d => d !== targetDate) : [...h.completions, targetDate] };
    }));
    if (becameDone) tick();
    // т.2.11: when a parent habit is checked for today, surface a one-tap toast
    // suggesting the first stack-child that's still open today. Only fires for
    // today (backfilling a past day shouldn't pop suggestions in the present);
    // archived children are skipped.
    if (becameDone && targetDate === todayKey) {
      const child = habits.find(h => h.stackedAfter === id
        && !h.archived
        && !h.completions.includes(todayKey));
      if (child) setStackPrompt({ childId: child.id, childName: child.name });
    }
  };

  const toggleTask = (id) => {
    let becameDone = false;
    setTasks(tasks.map(ta => {
      if (ta.id !== id) return ta;
      const nextDone = !ta.done;
      if (nextDone) becameDone = true;
      return { ...ta, done: nextDone, completedAt: nextDone ? new Date().toISOString() : null };
    }));
    if (becameDone) tick();
  };

  const toggleSubtask = (goalId, subId) => {
    let becameDone = false;
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      const subs = g.subtasks.map(s => {
        if (s.id !== subId) return s;
        if (!s.done) becameDone = true;
        return { ...s, done: !s.done };
      });
      const progress = subs.length ? Math.round((subs.filter(s => s.done).length / subs.length) * 100) : g.progress;
      return { ...g, subtasks: subs, progress };
    }));
    if (becameDone) tick();
  };

  const addItem = (type, data) => {
    const id = Date.now();
    // т.2.10: every new item starts with an empty `tagIds` array. Existing
    // pre-v18 items get the same default via migrateData on load.
    if (type === 'habit') setHabits([...habits, { id, completions: [], target: null, notes: '', reminderTime: '', important: false, archived: false, archivedAt: null, tagIds: [], stackedAfter: null, ...data }]);
    if (type === 'goal') setGoals([...goals, { id, progress: 0, subtasks: [], notes: '', journal: [], numeric: null, archived: false, archivedAt: null, createdAt: new Date().toISOString(), tagIds: [], ...data }]);
    if (type === 'task') setTasks([...tasks, { id, done: false, priority: 'medium', notes: '', reminderTime: '', completedAt: null, tagIds: [], ...data }]);
    setModal(null);
  };

  const updateItem = (type, id, updates) => {
    if (type === 'habit') setHabits(habits.map(h => h.id === id ? { ...h, ...updates } : h));
    if (type === 'goal') setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
    if (type === 'task') setTasks(tasks.map(ta => ta.id === id ? { ...ta, ...updates } : ta));
  };

  // === Undo state — shown for 5s after every delete ===
  const undoTimerRef = useRef(null);
  const showUndo = useCallback((label, restore) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndo({ label, restore });
    undoTimerRef.current = setTimeout(() => setUndo(null), 5000);
  }, []);
  const applyUndo = useCallback(() => {
    if (undo && typeof undo.restore === 'function') undo.restore();
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndo(null);
  }, [undo]);

  // === Confirmed deletes with undo ===
  const requestDeleteHabit = (id) => {
    const h = habits.find(x => x.id === id);
    if (!h) return;
    setConfirm({
      title: t.confirmDeleteTitle,
      body: `"${h.name}" — ${t.confirmDeleteHabit}`,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        const prev = habits;
        // т.2.11: also strip dangling stackedAfter on any child pointing to
        // the deleted habit. Undo restores the whole `prev` array, so a
        // restored parent comes back with its children's links intact.
        setHabits(habits
          .filter(x => x.id !== id)
          .map(x => x.stackedAfter === id ? { ...x, stackedAfter: null } : x));
        showUndo(`${t.confirmDeleteHabit}: ${h.name}`, () => setHabits(prev));
      }
    });
  };
  const requestDeleteGoal = (id) => {
    const g = goals.find(x => x.id === id);
    if (!g) return;
    setConfirm({
      title: t.confirmDeleteTitle,
      body: `"${g.name}" — ${t.confirmDeleteGoal}`,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        const prev = goals;
        setGoals(goals.filter(x => x.id !== id));
        showUndo(`${t.confirmDeleteGoal}: ${g.name}`, () => setGoals(prev));
      }
    });
  };
  const requestDeleteTask = (id) => {
    const ta = tasks.find(x => x.id === id);
    if (!ta) return;
    setConfirm({
      title: t.confirmDeleteTitle,
      body: `"${ta.name}" — ${t.confirmDeleteTask}`,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        const prev = tasks;
        setTasks(tasks.filter(x => x.id !== id));
        showUndo(`${t.confirmDeleteTask}: ${ta.name}`, () => setTasks(prev));
      }
    });
  };
  // Swipe-right delete for tasks (т.2.7). Bypasses the confirm modal because
  // the swipe itself is an explicit intent; the 5s undo toast is the safety net.
  const deleteTaskSwipe = (id) => {
    const ta = tasks.find(x => x.id === id);
    if (!ta) return;
    const prev = tasks;
    setTasks(tasks.filter(x => x.id !== id));
    showUndo(`${t.confirmDeleteTask}: ${ta.name}`, () => setTasks(prev));
  };
  // Swipe-right archive for goals (т.2.7) — per PLAN.md, this one DOES ask
  // for confirmation because archiving a goal with history feels weightier
  // than deleting a single task.
  const requestArchiveGoal = (id) => {
    const g = goals.find(x => x.id === id);
    if (!g) return;
    setConfirm({
      title: t.confirmArchiveGoalTitle,
      body: `"${g.name}" — ${t.confirmArchiveGoalBody}`,
      confirmLabel: t.yesArchive,
      onConfirm: () => archiveGoal(id)
    });
  };
  const requestDeleteSubtask = (goalId, subId) => {
    setConfirm({
      title: t.confirmDeleteTitle,
      body: t.confirmDeleteSubtask,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        const prev = goals;
        setGoals(goals.map(g => {
          if (g.id !== goalId) return g;
          const subs = g.subtasks.filter(s => s.id !== subId);
          const progress = subs.length ? Math.round((subs.filter(s => s.done).length / subs.length) * 100) : g.progress;
          return { ...g, subtasks: subs, progress };
        }));
        showUndo(t.confirmDeleteSubtask, () => setGoals(prev));
      }
    });
  };

  // === Archive / unarchive for habits and goals (т.2.6) ===
  // Soft-hide without deletion; completions/subtasks/notes stay intact.
  // Undo toast gives a 5s window to reverse (matches delete UX).
  const archiveHabit = (id) => {
    const h = habits.find(x => x.id === id);
    if (!h) return;
    const prev = habits;
    setHabits(habits.map(x => x.id === id ? { ...x, archived: true, archivedAt: new Date().toISOString() } : x));
    showUndo(`${t.habitRetired}: ${h.name}`, () => setHabits(prev));
  };
  const unarchiveHabit = (id) => {
    const h = habits.find(x => x.id === id);
    if (!h) return;
    const prev = habits;
    setHabits(habits.map(x => x.id === id ? { ...x, archived: false, archivedAt: null } : x));
    showUndo(`${t.habitRestored}: ${h.name}`, () => setHabits(prev));
  };
  const archiveGoal = (id) => {
    const g = goals.find(x => x.id === id);
    if (!g) return;
    const prev = goals;
    setGoals(goals.map(x => x.id === id ? { ...x, archived: true, archivedAt: new Date().toISOString() } : x));
    showUndo(`${t.goalCompleted}: ${g.name}`, () => setGoals(prev));
  };
  const unarchiveGoal = (id) => {
    const g = goals.find(x => x.id === id);
    if (!g) return;
    const prev = goals;
    setGoals(goals.map(x => x.id === id ? { ...x, archived: false, archivedAt: null } : x));
    showUndo(`${t.goalRestored}: ${g.name}`, () => setGoals(prev));
  };

  const updateGoalProgress = (id, progress) => setGoals(goals.map(g => g.id === id ? { ...g, progress } : g));

  const updateNumericGoal = (id, current) => {
    setGoals(goals.map(g => {
      if (g.id !== id || !g.numeric) return g;
      const progress = Math.min(100, Math.round((current / g.numeric.target) * 100));
      return { ...g, numeric: { ...g.numeric, current }, progress };
    }));
  };

  const addSubtask = (goalId, text) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, subtasks: [...g.subtasks, { id: Date.now(), text, done: false }] } : g));
  };

  // т.3.2: journal entries — append-only log of progress inside a goal.
  // Date defaults to today but the user can backdate. Delete is allowed for typos
  // (kept minimal — small × on hover, matching the subtask-row pattern).
  const addGoalJournalEntry = (goalId, text, date) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;
    const today = new Date().toISOString().slice(0, 10);
    setGoals(goals.map(g => g.id === goalId
      ? { ...g, journal: [{ id: Date.now(), date: date || today, text: trimmed }, ...(g.journal || [])] }
      : g));
  };
  const deleteGoalJournalEntry = (goalId, entryId) => {
    setGoals(goals.map(g => g.id === goalId
      ? { ...g, journal: (g.journal || []).filter(e => e.id !== entryId) }
      : g));
  };

  // === т.2.10: Tags CRUD ===
  // Tags live in their own global list and are referenced by id from
  // habits/goals/tasks. Renames/recolors propagate automatically because
  // items only store the id. Deletes strip the id from every item.
  const addTag = (name, color) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    const safeColor = TAG_COLORS.includes(color) ? color : TAG_COLORS[0];
    setTags([...tags, { id: Date.now(), name: trimmed, color: safeColor }]);
  };
  const renameTag = (id, name, color) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    const safeColor = TAG_COLORS.includes(color) ? color : TAG_COLORS[0];
    setTags(tags.map(x => x.id === id ? { ...x, name: trimmed, color: safeColor } : x));
  };
  // Delete asks for confirmation (per PLAN.md sub-2): the body shows how many
  // items will lose this tag, and the action ALSO strips `tagIds` from every
  // habit/goal/task so we never end up with orphan ids in storage.
  const requestDeleteTag = (id) => {
    const tag = tags.find(x => x.id === id);
    if (!tag) return;
    const inHabits = habits.filter(h => (h.tagIds || []).includes(id)).length;
    const inGoals  = goals.filter(g => (g.tagIds || []).includes(id)).length;
    const inTasks  = tasks.filter(ta => (ta.tagIds || []).includes(id)).length;
    const n = inHabits + inGoals + inTasks;
    setConfirm({
      title: t.confirmDeleteTagTitle,
      body: `"${tag.name}" — ${typeof t.confirmDeleteTagBody === 'function' ? t.confirmDeleteTagBody(n) : ''}`,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        setHabits(habits.map(h => ({ ...h, tagIds: (h.tagIds || []).filter(tid => tid !== id) })));
        setGoals(goals.map(g  => ({ ...g, tagIds: (g.tagIds || []).filter(tid => tid !== id) })));
        setTasks(tasks.map(ta => ({ ...ta, tagIds: (ta.tagIds || []).filter(tid => tid !== id) })));
        setTags(tags.filter(x => x.id !== id));
      }
    });
  };

  // === т.2.12: Weekly reviews CRUD ===
  // One review per weekStart key (YYYY-MM-DD): saving when one already exists
  // for the same week REPLACES it — the user can revise the reflection without
  // accumulating duplicates. Stats are snapshotted at save time so the history
  // stays meaningful even if habits/tags are later edited or removed.
  const saveWeeklyReview = (review) => {
    if (!review || !review.weekStart) return;
    const without = weeklyReviews.filter(r => r.weekStart !== review.weekStart);
    const entry = {
      id: Date.now(),
      weekStart: review.weekStart,
      weekEnd: review.weekEnd,
      text: (review.text || '').trim(),
      createdAt: new Date().toISOString(),
      stats: review.stats || {}
    };
    setWeeklyReviews([entry, ...without]);
    setDataNotice({ tone: 'success', text: t.weeklyReviewSavedToast });
  };
  const requestDeleteWeeklyReview = (id) => {
    const r = weeklyReviews.find(x => x.id === id);
    if (!r) return;
    setConfirm({
      title: t.confirmDeleteWeeklyReviewTitle,
      body: t.confirmDeleteWeeklyReviewBody,
      confirmLabel: t.yesDelete,
      onConfirm: () => {
        const prev = weeklyReviews;
        setWeeklyReviews(weeklyReviews.filter(x => x.id !== id));
        showUndo(t.confirmDeleteWeeklyReviewBody, () => setWeeklyReviews(prev));
      }
    });
  };

  const exportData = () => {
    const data = { habits, goals, tasks, tags, weeklyReviews, settings, exported: new Date().toISOString(), version: 3 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-backup-${dateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Commit a validated, already-parsed backup into live state. Routed through
  // `migrateData` so older shapes (missing `archived`, `journal`, `createdAt`,
  // etc.) are coerced into the current schema before they hit React state.
  const commitImport = (parsed) => {
    const migrated = migrateData(parsed);
    setHabits(migrated.habits);
    setGoals(migrated.goals);
    setTasks(migrated.tasks);
    // т.2.10: tags also come through migrateData (defaults to [] if missing
    // — older v17 backups won't have the field at all).
    setTags(migrated.tags || []);
    // т.2.12: weeklyReviews comes through migrateData (defaults to [] if
    // missing — older v22 backups won't have the field at all).
    setWeeklyReviews(migrated.weeklyReviews || []);
    if (parsed.settings && typeof parsed.settings === 'object') {
      setSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
    }
    setDataNotice({ tone: 'success', text: t.importSuccess });
  };

  // Read + parse + validate a backup file BEFORE asking the user to confirm
  // overwrite. Invalid files surface a toast error and never reach the confirm
  // modal — that way the user can't accidentally OK something that won't load.
  const startImport = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setDataNotice({ tone: 'error', text: t.importTooLarge });
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setDataNotice({ tone: 'error', text: t.importError });
    reader.onload = (e) => {
      let parsed;
      try { parsed = JSON.parse(e.target.result); }
      catch { setDataNotice({ tone: 'error', text: t.importInvalidFile }); return; }
      const v = validateBackup(parsed);
      if (!v.ok) {
        setDataNotice({
          tone: 'error',
          text: v.reason === 'version' ? t.importBadVersion : t.importInvalidFile
        });
        return;
      }
      const summary = typeof t.backupSummary === 'function'
        ? t.backupSummary(v.counts.habits, v.counts.goals, v.counts.tasks)
        : '';
      setConfirm({
        title: t.confirmImportTitle,
        body: `${t.confirmImportBody}${summary ? '\n\n' + summary : ''}`,
        confirmLabel: t.yesOverwrite,
        tone: 'warn',
        onConfirm: () => { commitImport(parsed); setShowSettings(false); }
      });
    };
    reader.readAsText(file);
  };

  const theme = THEMES[settings.theme] || THEMES.fire;
  const daysShort = settings.weekStart === 1 ? t.days_short_mon : t.days_short_sun;

  // Welcome screen visible only when: loaded, not dismissed, dashboard tab, and data is empty.
  const isEmpty = habits.length === 0 && goals.length === 0 && tasks.length === 0;
  const showWelcome = loaded && !onboardingDone && isEmpty && activeTab === 'dashboard';

  const handleLoadSampleFromSettings = () => {
    const run = () => { loadSampleData(); setShowSettings(false); };
    if (!isEmpty) {
      setConfirm({
        title: t.confirmSampleTitle,
        body: t.confirmSampleBody,
        confirmLabel: t.yesAdd,
        tone: 'warn',
        onConfirm: run
      });
    } else {
      run();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: settings.lightMode
        ? 'radial-gradient(ellipse at top, #fef5e7 0%, #fff8f0 50%, #fffbf5 100%)'
        : `radial-gradient(ellipse at top left, ${theme.bgGradFrom} 0%, ${theme.bgGradMid} 50%, ${theme.bgGradTo} 100%)` }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${theme.primary}, transparent)` }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(circle, ${theme.primaryDark}, transparent)` }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-6 pb-28">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`, boxShadow: `0 0 30px ${theme.glow}` }}>
                <Icon name="mountain" className="w-6 h-6 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif', letterSpacing: '-0.02em' }}>
                  <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t.appName}
                  </span>
                </h1>
                <p className="text-xs text-amber-200/50 italic">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSettings(true)}
                aria-label={t.settings}
                className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all active:scale-95">
                <Icon name="settings" className="w-4 h-4" />
              </button>
              <button onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                aria-label={lang === 'bg' ? 'Switch to English' : 'Превключи на български'}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all active:scale-95">
                <Icon name="languages" className="w-4 h-4" />
                {lang === 'bg' ? 'EN' : 'BG'}
              </button>
            </div>
          </div>
        </header>

        {stats.brokenCount > 0 && (
          <div className="mb-4 flex items-center gap-3 p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10" style={{ animation: 'shake 0.5s ease' }}>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name="broken" className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1 text-sm">
              <p className="font-bold text-rose-300">{t.brokenStreak}</p>
              <p className="text-xs text-rose-200/70">{stats.brokenCount} {stats.brokenCount === 1 ? t.day : t.days}</p>
            </div>
          </div>
        )}

        {!showWelcome && (
          <div className="mb-6 relative overflow-hidden rounded-3xl border border-amber-500/20 p-5"
            style={{ background: `linear-gradient(135deg, ${theme.primary}14, ${theme.primaryDark}0a)` }}>
            <div className="absolute -top-6 -right-6 opacity-10">
              <Icon name="quote" className="w-24 h-24 text-amber-400" />
            </div>
            <div className="relative flex items-start gap-3">
              <Icon name="sparkles" className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-bold mb-1">{t.motivationTitle}</p>
                <p className="text-amber-50/90 leading-relaxed italic" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>"{t.quotes[quoteIdx]}"</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (showWelcome
          ? <WelcomeScreen t={t}
              onAddHabit={() => { dismissOnboarding(); setModal({ type: 'habit' }); }}
              onAddGoal={() => { dismissOnboarding(); setModal({ type: 'goal' }); }}
              onAddTask={() => { dismissOnboarding(); setModal({ type: 'task' }); }}
              onLoadSample={loadSampleData}
              onSkip={dismissOnboarding} />
          : <DashboardView t={t} stats={stats} habits={activeHabits} goals={activeGoals} tasks={visibleTasks} settings={settings} daysShort={daysShort} onUpdateNumeric={updateNumericGoal} onToggleTask={toggleTask} onSwipeDeleteTask={deleteTaskSwipe} tick={tick} lang={lang} onOpenWeeklyReview={() => setShowWeeklyReview(true)} />)}
        {activeTab === 'habits' && <HabitsView t={t} habits={habits} settings={settings} archivedCount={archivedHabitCount} showArchivedItems={settings.showArchivedItems} onToggleShowArchived={() => setSettings(s => ({ ...s, showArchivedItems: !s.showArchivedItems }))} onToggle={toggleHabit} onDelete={requestDeleteHabit} onUpdate={(id, u) => updateItem('habit', id, u)} onArchive={archiveHabit} onUnarchive={unarchiveHabit} onAdd={() => setModal({ type: 'habit' })} lang={lang} tags={tags} onOpenSettings={() => setShowSettings(true)} />}
        {activeTab === 'goals' && <GoalsView t={t} goals={goals} archivedCount={archivedGoalCount} showArchivedItems={settings.showArchivedItems} onToggleShowArchived={() => setSettings(s => ({ ...s, showArchivedItems: !s.showArchivedItems }))} onToggleSubtask={toggleSubtask} onDelete={requestDeleteGoal} onDeleteSubtask={requestDeleteSubtask} onUpdate={(id, u) => updateItem('goal', id, u)} onUpdateProgress={updateGoalProgress} onUpdateNumeric={updateNumericGoal} onAddSubtask={addSubtask} onAddJournalEntry={addGoalJournalEntry} onDeleteJournalEntry={deleteGoalJournalEntry} onArchive={archiveGoal} onSwipeArchive={requestArchiveGoal} onUnarchive={unarchiveGoal} onAdd={() => setModal({ type: 'goal' })} lang={lang} tags={tags} onOpenSettings={() => setShowSettings(true)} />}
        {activeTab === 'tasks' && <TasksView t={t} tasks={visibleTasks} settings={settings} archivedCount={archivedCount} onToggle={toggleTask} onDelete={requestDeleteTask} onSwipeDelete={deleteTaskSwipe} onUpdate={(id, u) => updateItem('task', id, u)} onAdd={() => setModal({ type: 'task' })} onToggleArchived={() => setSettings(s => ({ ...s, showArchived: !s.showArchived }))} lang={lang} tags={tags} onOpenSettings={() => setShowSettings(true)} />}
        {activeTab === 'calendar' && <CalendarView t={t} habits={activeHabits} tasks={visibleTasks} goals={activeGoals} settings={settings} daysShort={daysShort} onToggleHabit={toggleHabit} lang={lang} />}
        {activeTab === 'stats' && <StatsView t={t} stats={stats} habits={activeHabits} goals={activeGoals} tasks={visibleTasks} daysShort={daysShort} settings={settings} lang={lang} tags={tags} weeklyReviews={weeklyReviews} onDeleteWeeklyReview={requestDeleteWeeklyReview} />}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-amber-500/10"
        style={{ background: settings.lightMode ? 'rgba(255, 251, 245, 0.85)' : 'rgba(10, 6, 4, 0.85)', backdropFilter: 'blur(20px)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-around py-2 px-1 overflow-x-auto scroll-hide">
          {[
            { id: 'dashboard', icon: 'bar', label: t.dashboard },
            { id: 'habits', icon: 'flame', label: t.habits },
            { id: 'goals', icon: 'target', label: t.goals },
            { id: 'tasks', icon: 'checkCircle', label: t.tasks },
            { id: 'calendar', icon: 'calendar', label: t.calendar },
            { id: 'stats', icon: 'trending', label: t.stats }
          ].map(({ id, icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-all flex-shrink-0 ${activeTab === id ? 'text-amber-400' : 'text-amber-100/40'}`}>
              <div className={`relative ${activeTab === id ? 'scale-110' : ''} transition-transform`}>
                {activeTab === id && <div className="absolute inset-0 bg-amber-400 blur-xl opacity-40 -z-10" />}
                <Icon name={icon} className="w-5 h-5" strokeWidth={activeTab === id ? 2.5 : 2} />
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {!modal && !showSettings && !confirm && !showWelcome && (
        <QuickAddFAB t={t} onSelect={(type) => setModal({ type })} />
      )}

      {modal && <AddModal t={t} type={modal.type} onSave={addItem} onClose={() => setModal(null)} tags={tags} onOpenSettings={() => setShowSettings(true)} habits={habits} />}
      {showWeeklyReview && (
        <WeeklyReviewModal
          t={t}
          lang={lang}
          settings={settings}
          habits={habits}
          tags={tags}
          weeklyReviews={weeklyReviews}
          onSave={saveWeeklyReview}
          onClose={() => setShowWeeklyReview(false)}
        />
      )}
      {showSettings && (
        <SettingsModal
          t={t} settings={settings} setSettings={setSettings}
          onClose={() => setShowSettings(false)}
          onExport={exportData}
          onRequestImport={startImport}
          onLoadSample={handleLoadSampleFromSettings}
          notifPermission={notifPermission} onRequestNotif={requestNotifPermission}
          tags={tags}
          onAddTag={addTag}
          onRenameTag={renameTag}
          onRequestDeleteTag={requestDeleteTag}
        />
      )}
      {confirm && (
        <ConfirmModal t={t} title={confirm.title} body={confirm.body} confirmLabel={confirm.confirmLabel} tone={confirm.tone}
          onConfirm={confirm.onConfirm} onClose={() => setConfirm(null)} />
      )}
      {undo && (
        <UndoToast label={undo.label} onUndo={applyUndo} onDismiss={() => setUndo(null)} lang={lang} />
      )}
      {stackPrompt && !undo && (
        <StackPromptToast
          t={t}
          childName={stackPrompt.childName}
          onAccept={() => {
            const childId = stackPrompt.childId;
            setStackPrompt(null);
            // Mark the child for today. Recursion is bounded — the child being
            // checked here can itself have a child, which will surface its own
            // toast via toggleHabit's effect path.
            toggleHabit(childId);
          }}
          onDismiss={() => setStackPrompt(null)}
        />
      )}
      {storageError && (
        <div role="alert" aria-live="polite"
             className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl bg-rose-600/95 text-white shadow-2xl border border-rose-400/50 max-w-sm text-sm font-semibold"
             style={{ animation: 'fadeIn .2s ease-out' }}>
          {storageError}
          <button onClick={() => setStorageError(null)} className="ml-3 underline opacity-80">OK</button>
        </div>
      )}
      {dataNotice && (
        <div role={dataNotice.tone === 'error' ? 'alert' : 'status'} aria-live="polite"
             className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-2xl border max-w-sm text-sm font-semibold ${
               dataNotice.tone === 'error'
                 ? 'bg-rose-600/95 text-white border-rose-400/50'
                 : 'bg-emerald-600/95 text-white border-emerald-400/50'
             }`}
             style={{ animation: 'fadeIn .2s ease-out' }}>
          {dataNotice.text}
          <button onClick={() => setDataNotice(null)} className="ml-3 underline opacity-80">OK</button>
        </div>
      )}
    </div>
  );
}

// ============ WELCOME SCREEN ============
// Shown on the Dashboard tab when data is completely empty and the user hasn't
// dismissed onboarding. Offers: add first habit/goal/task, load sample data, skip.
function WelcomeScreen({ t, onAddHabit, onAddGoal, onAddTask, onLoadSample, onSkip }) {
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(234, 88, 12, 0.06))' }}>
        <div className="absolute -top-10 -right-10 opacity-[0.08] pointer-events-none" aria-hidden="true">
          <Icon name="mountain" className="w-52 h-52 text-amber-300" strokeWidth={1.5} />
        </div>
        <div className="relative text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary, #f59e0b), var(--theme-accent, #c2410c))', boxShadow: '0 0 40px var(--theme-glow, rgba(245, 158, 11, 0.4))' }}>
            <Icon name="sparkles" className="w-8 h-8 text-white" strokeWidth={2.2} />
          </div>
          <h2 className="text-2xl font-black text-amber-100 mb-2" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.welcomeTitle}</h2>
          <p className="text-sm text-amber-100/70 leading-relaxed max-w-md mx-auto">{t.welcomeBody}</p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button onClick={onAddHabit} aria-label={t.welcomeAddHabit}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 transition-all active:scale-95 text-center">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="flame" className="w-6 h-6 text-amber-300" />
            </div>
            <span className="font-bold text-amber-100 text-sm leading-tight">{t.welcomeAddHabit}</span>
          </button>
          <button onClick={onAddGoal} aria-label={t.welcomeAddGoal}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 transition-all active:scale-95 text-center">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="target" className="w-6 h-6 text-amber-300" />
            </div>
            <span className="font-bold text-amber-100 text-sm leading-tight">{t.welcomeAddGoal}</span>
          </button>
          <button onClick={onAddTask} aria-label={t.welcomeAddTask}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 transition-all active:scale-95 text-center">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="checkCircle" className="w-6 h-6 text-amber-300" />
            </div>
            <span className="font-bold text-amber-100 text-sm leading-tight">{t.welcomeAddTask}</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center gap-4 mt-5 pt-4 border-t border-amber-500/10 flex-wrap">
          <button onClick={onLoadSample}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 text-sm font-bold hover:bg-amber-500/30 transition-all active:scale-95">
            <Icon name="sparkles" className="w-4 h-4" />
            {t.seeExample}
          </button>
          <button onClick={onSkip}
            className="text-xs font-semibold text-amber-100/40 hover:text-amber-100/80 transition-colors px-2 py-1">
            {t.skipWelcome}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ WEEKLY REVIEW MODAL (т.2.12) ============
// Recap modal for the current or previous week. Stats are computed live from
// `habits`/`tags` (so opening the modal mid-day always reflects the latest
// ticks); on save, a snapshot is frozen into the weeklyReviews log so the
// history entry stays coherent even if items are later edited or deleted.
//
// Week toggle: "This week" (offset 0) is the default; "Last week" (offset -1)
// is one tap away. Eligible-day count is shown so the user can tell when the
// current-week review is partial.
//
// Existing-review notice: if there's already a saved review for the displayed
// week, we prefill its text and surface a one-line warning that saving will
// overwrite it.
function WeeklyReviewModal({ t, lang, settings, habits, tags, weeklyReviews, onSave, onClose }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [text, setText] = useState('');
  const dialogRef = useRef(null);

  const range = useMemo(() => weekRangeForOffset(new Date(), settings.weekStart, weekOffset), [settings.weekStart, weekOffset]);
  const weekStartKey = useMemo(() => isoDateKey(range.start), [range.start]);
  const weekEndKey = useMemo(() => isoDateKey(range.end), [range.end]);

  const stats = useMemo(
    () => computeWeeklyStats(habits, tags, range.start, range.end, new Date()),
    [habits, tags, range.start, range.end]
  );

  // Existing review for this exact week (matched by weekStart key).
  const existing = useMemo(
    () => (weeklyReviews || []).find(r => r.weekStart === weekStartKey) || null,
    [weeklyReviews, weekStartKey]
  );

  // Prefill the textarea whenever the displayed week (or its existing review) changes.
  useEffect(() => {
    setText(existing ? existing.text || '' : '');
  }, [weekStartKey, existing]);

  // Modal a11y — Escape closes; focus the dialog on mount so screen readers find it.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const fullDays = lang === 'bg'
    ? ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота']
    : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const handleSave = () => {
    // Snapshot the stats at save time — we deliberately store a flattened,
    // serializable object (no Date instances) so weeklyReviews survives an
    // export/import round-trip without surprises.
    const snapshot = {
      totalTicks: stats.totalTicks,
      bestDayKey: stats.bestDay ? stats.bestDay.key : null,
      bestDayCount: stats.bestDay ? stats.bestDay.count : 0,
      bestDayDow: stats.bestDay ? stats.bestDay.date.getDay() : null,
      topHabitId: stats.topHabit ? stats.topHabit.id : null,
      topHabitName: stats.topHabit ? stats.topHabit.name : null,
      topHabitTicks: stats.topHabit ? stats.topHabit.count : 0,
      tagCounts: stats.tagCounts,
      stacksHeld: stats.stacksHeld.map(s => ({
        childId: s.childId, parentId: s.parentId,
        childName: s.childName, parentName: s.parentName
      })),
      eligibleDayCount: stats.eligibleDayCount,
      activeHabitsCount: stats.activeHabitsCount
    };
    onSave({
      weekStart: weekStartKey,
      weekEnd: weekEndKey,
      text,
      stats: snapshot
    });
    onClose();
  };

  // Tags that received ≥1 tick this week, sorted desc by count. Used by the
  // tag-breakdown bars; the bar widths are relative to the top tag (matches
  // Stats "По тагове" visual language).
  const tagRows = useMemo(() => {
    const list = (tags || []).map(tag => ({ tag, count: stats.tagCounts[tag.id] || 0 }))
      .filter(x => x.count > 0)
      .sort((a, b) => b.count - a.count);
    const max = list.reduce((m, x) => x.count > m ? x.count : m, 0);
    return { list, max };
  }, [tags, stats.tagCounts]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }} onClick={onClose}
      role="dialog" aria-modal="true" aria-labelledby="weekly-review-title">
      <div onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-500/20 p-6 max-h-[92vh] overflow-y-auto scroll-hide focus:outline-none"
        style={{ background: 'linear-gradient(180deg, var(--theme-bg-from), var(--theme-bg-mid))', animation: 'slideUp 0.3s ease', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))', boxShadow: '0 4px 16px var(--theme-glow)' }}>
              <Icon name="calendar" className="w-4.5 h-4.5 text-black" strokeWidth={2.5} />
            </div>
            <h3 id="weekly-review-title" className="text-xl font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.weeklyReviewTitle}</h3>
          </div>
          <button onClick={onClose} aria-label={t.cancel} className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/50">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Week toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { off: 0, label: t.weeklyReviewThisWeek },
            { off: -1, label: t.weeklyReviewLastWeek }
          ].map(({ off, label }) => (
            <button key={off} onClick={() => setWeekOffset(off)}
              aria-pressed={weekOffset === off}
              className={`py-2 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all ${weekOffset === off ? 'border-amber-500/60 bg-amber-500/15 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Date range */}
        <div className="mb-4 px-1">
          <p className="text-base font-bold text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{formatWeekRange(range.start, range.end, lang)}</p>
          <p className="text-[11px] text-amber-200/50 mt-0.5">{typeof t.weeklyEligibleDays === 'function' ? t.weeklyEligibleDays(stats.eligibleDayCount) : ''}</p>
        </div>

        {/* Stats tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {/* Total ticks */}
          <div className="rounded-2xl border border-amber-500/30 p-3.5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--theme-glow-soft), rgba(255,255,255,0.01))' }}>
            <Icon name="zap" className="w-4 h-4 text-amber-400 mb-1.5" />
            <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold">{t.weeklyTicks}</div>
            <div className="text-3xl font-black text-amber-300 leading-none mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{stats.totalTicks}</div>
            <div className="text-[10px] text-amber-200/40 mt-1">{typeof t.weeklyTicksSub === 'function' ? t.weeklyTicksSub(stats.activeHabitsCount) : ''}</div>
          </div>
          {/* Best day */}
          <div className="rounded-2xl border border-white/5 p-3.5"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }}>
            <Icon name="calendar" className="w-4 h-4 text-amber-200/50 mb-1.5" />
            <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold">{t.weeklyStrongestDay}</div>
            {stats.bestDay && stats.bestDay.count > 0 ? (
              <>
                <div className="text-base font-black text-amber-100 leading-snug mt-1" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  {fullDays[stats.bestDay.date.getDay()]}
                </div>
                <div className="text-[10px] text-amber-200/40 mt-0.5">{stats.bestDay.count} {t.weeklyTicksLabel}</div>
              </>
            ) : (
              <div className="text-sm font-semibold text-amber-200/40 mt-1">{t.weeklyStrongestDayNone}</div>
            )}
          </div>
          {/* Top habit */}
          <div className="rounded-2xl border border-white/5 p-3.5"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }}>
            <Icon name="flame" className="w-4 h-4 text-amber-200/50 mb-1.5" />
            <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold">{t.weeklyTopHabit}</div>
            {stats.topHabit ? (
              <>
                <div className="text-sm font-black text-amber-100 leading-snug mt-1 truncate flex items-center gap-1">
                  {stats.topHabit.important && <Icon name="star" className="w-3.5 h-3.5 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                  <span className="truncate" style={{ fontFamily: 'ui-serif, Georgia, serif' }} title={stats.topHabit.name}>{stats.topHabit.name}</span>
                </div>
                <div className="text-[10px] text-amber-200/40 mt-0.5">{stats.topHabit.count} {t.weeklyTicksLabel}</div>
              </>
            ) : (
              <div className="text-sm font-semibold text-amber-200/40 mt-1">{t.weeklyTopHabitNone}</div>
            )}
          </div>
        </div>

        {/* Tag breakdown — only if there are defined tags AND any ticked-this-week tag. */}
        {(tags || []).length > 0 && (
          <section className="mb-4">
            <h4 className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold mb-2 flex items-center gap-1.5">
              <Icon name="palette" className="w-3 h-3" />{t.weeklyTagBreakdownTitle}
            </h4>
            <div className="space-y-2 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
              {tagRows.list.length > 0 ? tagRows.list.map(({ tag, count }) => {
                const pct = tagRows.max > 0 ? (count / tagRows.max) * 100 : 0;
                return (
                  <div key={tag.id}>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-bold truncate"
                        title={tag.name}
                        style={{
                          maxWidth: 160,
                          background: tag.color,
                          color: '#1a1208',
                          boxShadow: `0 0 8px ${tag.color}60`
                        }}>
                        {tag.name}
                      </span>
                      <span className="text-xs font-black text-amber-200/60 flex-shrink-0">{count}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${Math.max(pct, 4)}%`,
                        background: tag.color,
                        boxShadow: `0 0 8px ${tag.color}60`
                      }} />
                    </div>
                  </div>
                );
              }) : (
                <p className="text-xs text-amber-200/40 text-center py-2">{t.weeklyTagBreakdownEmpty}</p>
              )}
            </div>
          </section>
        )}

        {/* Stacks held */}
        <section className="mb-4">
          <h4 className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold mb-2 flex items-center gap-1.5">
            <Icon name="chain" className="w-3 h-3" />{t.weeklyStacksHeld}
          </h4>
          <div className="p-3.5 rounded-2xl border border-white/5 bg-white/[0.02]">
            {stats.stacksHeld.length > 0 ? (
              <>
                <p className="text-[10px] text-amber-200/50 mb-2">
                  {typeof t.weeklyStacksHeldDesc === 'function' ? t.weeklyStacksHeldDesc(stats.eligibleDayCount) : ''}
                </p>
                <div className="space-y-1.5">
                  {stats.stacksHeld.map(s => (
                    <div key={s.childId} className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-violet-500/10 border border-violet-500/25">
                      <Icon name="chain" className="w-3.5 h-3.5 text-violet-300 flex-shrink-0" />
                      <span className="text-xs text-violet-100 truncate min-w-0 flex-1">
                        <span className="font-semibold">{s.parentName}</span>
                        <span className="mx-1 text-violet-300/70">→</span>
                        <span className="font-semibold">{s.childName}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-amber-200/40 text-center py-2">{t.weeklyStacksHeldEmpty}</p>
            )}
          </div>
        </section>

        {/* Reflection */}
        <section className="mb-4">
          <h4 className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold mb-2 flex items-center gap-1.5">
            <Icon name="note" className="w-3 h-3" />{t.weeklyReflection}
          </h4>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.weeklyReflectionPlaceholder}
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none"
          />
          {existing && (
            <p className="text-[11px] text-amber-300/70 mt-1.5 italic flex items-center gap-1.5">
              <Icon name="info" className="w-3 h-3" />
              {t.weeklyReviewExisting}
            </p>
          )}
        </section>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-100/70 font-bold">{t.cancel}</button>
          <button onClick={handleSave}
            className="flex-1 py-3 rounded-xl font-black text-black active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))', boxShadow: '0 4px 20px var(--theme-glow)' }}>
            {t.weeklyReviewSaveBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function DashboardView({ t, stats, habits, goals, tasks, settings, daysShort, onUpdateNumeric, onToggleTask, onSwipeDeleteTask, tick, lang, onOpenWeeklyReview }) {
  const today = new Date().toDateString();
  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label={t.todayProgress} value={`${stats.habitRate}%`} sub={`${stats.doneToday} ${t.ofTotal} ${habits.length}`} icon="zap" highlight />
        <StatCard label={t.openTasksLabel} value={stats.openTasks} sub={t.open} icon="checkCircle" />
      </div>

      {/* т.2.12: Weekly review CTA — opens the WeeklyReviewModal. Always shown
          (no minimum-data threshold) so the entry point is consistent; the
          modal itself handles the empty-state cases inside its tiles. */}
      {onOpenWeeklyReview && (
        <button
          onClick={onOpenWeeklyReview}
          aria-label={t.weeklyReviewCTA}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] hover:bg-amber-500/[0.10] transition-all active:scale-[0.99] text-left"
          style={{ boxShadow: '0 0 18px var(--theme-glow-soft)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))', boxShadow: '0 4px 14px var(--theme-glow)' }}>
            <Icon name="calendar" className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-amber-100 text-sm leading-tight">{t.weeklyReviewCTA}</p>
            <p className="text-[11px] text-amber-200/60 mt-0.5">{t.weeklyReviewCTASub}</p>
          </div>
          <Icon name="chevronRight" className="w-4 h-4 text-amber-300/60 flex-shrink-0" />
        </button>
      )}

      <StreakChampionsSection t={t} habits={habits} settings={settings} />

      <TasksTodaySection t={t} tasks={tasks} onToggleTask={onToggleTask} onSwipeDelete={onSwipeDeleteTask} />

      {habits.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
            <Icon name="calendar" className="w-3.5 h-3.5" />{t.completedToday}
          </h2>
          <div className="space-y-2">
            {habits.slice(0, 4).map(h => {
              const done = h.completions.includes(today);
              const streak = calculateStreak(h.completions, settings.freezeDays);
              const broken = isStreakBroken(h.completions, settings.freezeDays);
              return (
                <div key={h.id} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${done ? 'bg-amber-500/10 border-amber-500/30' : broken ? 'bg-rose-500/5 border-rose-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${done ? 'bg-amber-500' : 'bg-white/5'}`}>
                    {done ? <Icon name="checkCircle" className="w-5 h-5 text-black" strokeWidth={3} /> : <Icon name="circle" className="w-5 h-5 text-amber-200/30" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate flex items-center gap-1.5 ${done ? 'text-amber-100' : 'text-amber-100/80'}`}>
                      {h.important && <Icon name="star" className="w-3.5 h-3.5 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                      <span className="truncate">{h.name}</span>
                    </p>
                    <p className="text-xs text-amber-200/40">{CATEGORY_META[h.category]?.emoji} {t.categories[h.category]}</p>
                  </div>
                  {broken && !done && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30">
                      <Icon name="broken" className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                  )}
                  {streak > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30">
                      <Icon name="flame" className="w-3.5 h-3.5 text-orange-400" fill="currentColor" />
                      <span className="text-xs font-black text-orange-300">{streak}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
          <Icon name="trending" className="w-3.5 h-3.5" />{t.weekActivity}
        </h2>
        <div className="rounded-2xl border border-amber-500/10 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between gap-2 h-32">
            {stats.week.map((d, i) => {
              const pct = d.total ? (d.count / d.total) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div className="w-full rounded-t-lg transition-all relative overflow-hidden"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: pct > 0 ? 'linear-gradient(to top, var(--theme-primary), var(--theme-primary-light))' : 'var(--theme-glow-soft)',
                        boxShadow: pct > 0 ? '0 0 20px var(--theme-glow)' : 'none'
                      }}>
                      {pct >= 100 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-200/40 uppercase">{daysShort[(d.day.getDay() + (settings.weekStart === 1 ? 6 : 0)) % 7]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {goals.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
            <Icon name="target" className="w-3.5 h-3.5" />{t.goals}
          </h2>
          <div className="space-y-2">
            {goals.slice(0, 3).map(g => (
              <div key={g.id} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-100 truncate flex items-center gap-2 flex-1">
                    <span>{CATEGORY_META[g.category]?.emoji}</span>{g.name}
                  </span>
                  <span className="text-xs font-black text-amber-400">{g.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full transition-all" style={{ width: `${g.progress}%`, background: `linear-gradient(to right, ${CATEGORY_META[g.category]?.color}, var(--theme-primary-light))` }} />
                </div>
                {settings.quickIncrement && g.numeric && (
                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/5">
                    <span className="text-xs text-amber-200/50">{g.numeric.current}/{g.numeric.target} {g.numeric.unit}</span>
                    <div className="flex gap-1">
                      <button onClick={() => { onUpdateNumeric(g.id, Math.max(0, g.numeric.current - 1)); tick(); }}
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-amber-300 font-black text-sm active:scale-95">−</button>
                      <button onClick={() => { onUpdateNumeric(g.id, g.numeric.current + 1); tick(); }}
                        className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm active:scale-95">+</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, icon, highlight }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border p-4 ${highlight ? 'border-amber-500/30' : 'border-white/5'}`}
      style={{ background: highlight
        ? 'linear-gradient(135deg, var(--theme-glow-soft), rgba(255,255,255,0.01))'
        : 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))' }}>
      <Icon name={icon} className={`w-5 h-5 mb-2 ${highlight ? 'text-amber-400' : 'text-amber-200/40'}`} />
      <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold mb-1">{label}</div>
      <div className={`text-3xl font-black ${highlight ? 'text-amber-300' : 'text-amber-100'}`} style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{value}</div>
      <div className="text-xs text-amber-200/40 mt-0.5">{sub}</div>
    </div>
  );
}

function InsightCard({ icon, title, body, tone }) {
  const toneBorder = tone === 'warn' ? 'border-rose-500/30' : tone === 'good' ? 'border-emerald-500/30' : 'border-white/5';
  const toneIcon = tone === 'warn' ? 'text-rose-400' : tone === 'good' ? 'text-emerald-400' : 'text-amber-400';
  return (
    <div className={`flex items-start gap-3 p-3 rounded-2xl border ${toneBorder} bg-white/[0.02]`}>
      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className={`w-4 h-4 ${toneIcon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold">{title}</div>
        <div className="text-sm text-amber-100 font-semibold mt-0.5 leading-snug">{body}</div>
      </div>
    </div>
  );
}

// Top 3 habits by longest historical streak, with gold/silver/bronze styling.
// Renders nothing if no habit has any streak.
function StreakChampionsSection({ t, habits, settings }) {
  const champions = useMemo(() => {
    if (!habits || habits.length === 0) return [];
    return habits
      .map(h => ({ habit: h, longest: calculateLongestStreak(h.completions, settings.freezeDays) }))
      .filter(x => x.longest > 0)
      .sort((a, b) => b.longest - a.longest)
      .slice(0, 3);
  }, [habits, settings.freezeDays]);

  if (champions.length === 0) return null;

  const medals = ['🏆', '🥈', '🥉'];
  // Gold, silver, bronze badge gradients
  const badgeGrad = [
    'linear-gradient(135deg, #fde68a, #f59e0b, #b45309)',
    'linear-gradient(135deg, #f1f5f9, #cbd5e1, #64748b)',
    'linear-gradient(135deg, #fed7aa, #fb923c, #9a3412)'
  ];
  const cardBg = [
    'linear-gradient(135deg, rgba(251,191,36,0.14), rgba(180,83,9,0.04))',
    'linear-gradient(135deg, rgba(203,213,225,0.10), rgba(100,116,139,0.03))',
    'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(154,52,18,0.03))'
  ];
  const cardBorder = [
    'rgba(251,191,36,0.40)',
    'rgba(203,213,225,0.28)',
    'rgba(251,146,60,0.35)'
  ];
  const numberColor = ['#fbbf24', '#e2e8f0', '#fb923c'];

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
        <Icon name="trophy" className="w-3.5 h-3.5" />{t.streakChampions}
      </h2>
      <div className="space-y-2">
        {champions.map(({ habit: h, longest }, i) => (
          <div
            key={h.id}
            className="relative overflow-hidden rounded-2xl border p-4 flex items-center gap-3"
            style={{ borderColor: cardBorder[i], background: cardBg[i] }}
          >
            {/* Medal badge */}
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: badgeGrad[i], boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}
              aria-label={`#${i + 1}`}
            >
              <span role="img" aria-hidden="true">{medals[i]}</span>
            </div>
            {/* Name + category */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-black mb-0.5" style={{ color: numberColor[i] }}>
                #{i + 1} · {t.bestStreak}
              </div>
              <div className="text-base font-bold text-amber-100 truncate flex items-center gap-1.5">
                {h.important && <Icon name="star" className="w-4 h-4 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                <span className="truncate">{h.name}</span>
              </div>
              <div className="text-xs text-amber-200/40 truncate">{CATEGORY_META[h.category]?.emoji} {t.categories[h.category]}</div>
            </div>
            {/* Big streak number */}
            <div className="flex-shrink-0 text-right pl-2">
              <div
                className="text-4xl font-black leading-none"
                style={{ fontFamily: 'ui-serif, Georgia, serif', color: numberColor[i], textShadow: i === 0 ? '0 0 20px rgba(251,191,36,0.4)' : 'none' }}
              >
                {longest}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-amber-200/50 font-bold mt-1">
                {longest === 1 ? t.day : t.days}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Undone tasks on dashboard — grouped into today/overdue and undated.
// Tap-to-complete directly from dashboard; items disappear after completion.
function TasksTodaySection({ t, tasks, onToggleTask, onSwipeDelete }) {
  const todayMs = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const { dated, undated } = useMemo(() => {
    if (!tasks) return { dated: [], undated: [] };
    const open = tasks.filter(ta => !ta.done);
    const dated = open
      .filter(ta => {
        if (!ta.deadline) return false;
        const dl = new Date(ta.deadline);
        dl.setHours(0, 0, 0, 0);
        return dl.getTime() <= todayMs;
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    const undated = open
      .filter(ta => !ta.deadline)
      .slice(0, 5);
    return { dated, undated };
  }, [tasks, todayMs]);

  if (dated.length === 0 && undated.length === 0) return null;

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#64748b' };

  const renderRow = (ta, variant) => {
    const isOverdue = variant === 'overdue';
    const isToday = variant === 'today';
    const borderClass = isOverdue
      ? 'border-rose-500/30 bg-rose-500/5'
      : isToday
        ? 'border-amber-500/25 bg-amber-500/5'
        : 'border-white/5 bg-white/[0.02]';
    const metaColor = isOverdue ? 'text-rose-400' : isToday ? 'text-amber-300/80' : 'text-amber-200/50';
    const metaLabel = isOverdue ? t.overdue : isToday ? t.today : t.noDeadline;
    return (
      <SwipeableRow
        key={ta.id}
        rounded="rounded-2xl"
        onSwipeLeft={() => onToggleTask(ta.id)}
        onSwipeRight={onSwipeDelete ? () => onSwipeDelete(ta.id) : null}
        leftLabel={t.done} leftIcon="check" leftBg="rgba(16, 185, 129, 0.92)"
        rightLabel={t.delete} rightIcon="trash" rightBg="rgba(244, 63, 94, 0.92)">
      <div
        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${borderClass}`}
      >
        <button
          onClick={() => onToggleTask(ta.id)}
          aria-label={`${t.done}: ${ta.name}`}
          className="w-9 h-9 rounded-xl flex-shrink-0 border flex items-center justify-center active:scale-90 transition-transform bg-white/5 border-amber-500/30 hover:bg-amber-500/10"
        >
          <Icon name="circle" className="w-5 h-5 text-amber-200/40" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-100 truncate">{ta.name}</p>
          <p className={`text-xs font-bold mt-0.5 flex items-center gap-1.5 ${metaColor}`}>
            {isOverdue && <Icon name="alert" className="w-3 h-3" />}
            <span>{metaLabel}</span>
            <span className="text-amber-200/30">· {CATEGORY_META[ta.category]?.emoji} {t.categories[ta.category]}</span>
          </p>
        </div>
        {ta.priority && (
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: priorityColor[ta.priority] || priorityColor.medium }}
            aria-label={`${t.priority}: ${t[ta.priority] || ta.priority}`}
          />
        )}
      </div>
      </SwipeableRow>
    );
  };

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
        <Icon name="checkCircle" className="w-3.5 h-3.5" />{t.tasksToday}
        <span className="ml-auto text-amber-200/50 normal-case tracking-normal font-bold">{dated.length + undated.length}</span>
      </h2>
      <div className="space-y-2">
        {dated.map(ta => {
          const dl = new Date(ta.deadline);
          dl.setHours(0, 0, 0, 0);
          return renderRow(ta, dl.getTime() < todayMs ? 'overdue' : 'today');
        })}
        {undated.length > 0 && dated.length > 0 && (
          <div className="pt-2 mt-2 border-t border-white/5">
            <div className="text-[10px] uppercase tracking-widest text-amber-200/40 font-bold mb-2">{t.noDeadline}</div>
          </div>
        )}
        {undated.map(ta => renderRow(ta, 'undated'))}
      </div>
    </section>
  );
}

// ============ HABITS ============
function HabitsView({ t, habits, settings, archivedCount, showArchivedItems, onToggleShowArchived, onToggle, onDelete, onUpdate, onArchive, onUnarchive, onAdd, lang, tags, onOpenSettings }) {
  const today = new Date().toDateString();
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');
  // т.2.10 sub-4: multi-select tag filter (OR within filter, AND with search).
  const [filterTagIds, setFilterTagIds] = useState([]);

  // т.2.6: archived habits live alongside active ones in storage but are
  // rendered in a separate, dimmed section below the active list.
  const activeList   = useMemo(() => habits.filter(h => !h.archived), [habits]);
  const archivedList = useMemo(() => habits.filter(h => h.archived),  [habits]);

  const filtered = useMemo(() => {
    let base = activeList;
    if (query.trim()) {
      base = base.filter(h => fuzzyMatch(query, h.name) || fuzzyMatch(query, h.notes || ''));
    }
    if (filterTagIds.length > 0) {
      const filterSet = new Set(filterTagIds);
      base = base.filter(h => Array.isArray(h.tagIds) && h.tagIds.some(id => filterSet.has(id)));
    }
    // Important habits float to the top, preserving relative order within each group.
    return base.slice().sort((a, b) => {
      const ai = a.important ? 1 : 0;
      const bi = b.important ? 1 : 0;
      return bi - ai;
    });
  }, [activeList, query, filterTagIds]);

  const fmtArchivedDate = (iso) => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return ''; }
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.habits} count={activeList.length} onAdd={onAdd} addLabel={t.addHabit} />
      {activeList.length >= 4 && (
        <SearchInput value={query} onChange={setQuery} placeholder={t.searchPlaceholder || (t.habits + '…')} />
      )}
      {/* т.2.10 sub-4: tag filter row (auto-hides when no tags exist). */}
      <TagFilterBar t={t} tags={tags} selected={filterTagIds} onChange={setFilterTagIds} />
      {archivedCount > 0 && (
        <button onClick={onToggleShowArchived}
          className="w-full flex items-center gap-2 p-2 mb-3 rounded-xl border border-white/5 bg-white/[0.02] text-amber-200/60 text-xs hover:bg-white/[0.04] transition-all">
          <Icon name="archive" className="w-3.5 h-3.5" />
          <span className="font-bold">{archivedCount} {t.archivedHabits.toLowerCase()}</span>
          <span className="ml-auto text-amber-400 font-bold">{showArchivedItems ? t.hideArchivedItems : t.showArchivedItems}</span>
        </button>
      )}
      {habits.length === 0 ? <EmptyState message={t.noHabits} icon="flame" /> : activeList.length === 0 && !showArchivedItems ? (
        <EmptyState message={t.noHabits} icon="flame" />
      ) : filtered.length === 0 && activeList.length > 0 ? (
        <EmptyState message={t.noMatches || (t.noHabits)} icon="search" />
      ) : (
        <div className="space-y-3">
          {filtered.map(h => {
            const done = h.completions.includes(today);
            const streak = calculateStreak(h.completions, settings.freezeDays);
            const broken = isStreakBroken(h.completions, settings.freezeDays);
            const freezeUsed = calculateFreezeUsed(h.completions, settings.freezeDays);
            const cat = CATEGORY_META[h.category];
            const hasTarget = typeof h.target === 'number' && h.target > 0;
            const longest = calculateLongestStreak(h.completions, settings.freezeDays);
            const progressPct = hasTarget ? Math.min((streak / h.target) * 100, 100) : 0;
            const isOpen = expanded === h.id;
            // т.2.11: visualize habit-stack relationships on the card itself.
            // `parent` is rendered as a "→ X" pill (this habit comes after X);
            // `childCount` produces a "Стак · N" pill (this habit is the
            // anchor for N other habits). Archived parent/children are ignored.
            const parent = h.stackedAfter != null
              ? habits.find(p => p.id === h.stackedAfter && !p.archived)
              : null;
            const childCount = habits.filter(c => c.stackedAfter === h.id && !c.archived).length;
            return (
              <SwipeableRow
                key={h.id}
                rounded="rounded-3xl"
                disabled={isOpen}
                onSwipeLeft={() => onToggle(h.id)}
                leftLabel={done ? t.restoreItem : t.done}
                leftIcon={done ? 'x' : 'check'}
                leftBg={done ? 'rgba(148, 163, 184, 0.85)' : 'rgba(245, 158, 11, 0.95)'}>
              <div className={`relative overflow-hidden rounded-3xl border transition-all ${done ? 'border-amber-500/40' : broken ? 'border-rose-500/30' : 'border-white/5'}`}
                style={{ background: done ? 'linear-gradient(135deg, var(--theme-glow-soft), rgba(255,255,255,0.02))' : broken ? 'rgba(244, 63, 94, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-stretch">
                  <button onClick={() => onToggle(h.id)} className={`flex-shrink-0 w-16 flex items-center justify-center transition-all ${done ? 'bg-amber-500' : 'bg-white/[0.03] hover:bg-white/[0.06]'}`}>
                    {done ? <Icon name="checkCircle" className="w-7 h-7 text-black" strokeWidth={3} /> : <Icon name="circle" className="w-7 h-7 text-amber-200/30" strokeWidth={2} />}
                  </button>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold leading-tight flex items-center gap-1.5 ${done ? 'text-amber-100' : 'text-amber-50'}`}>
                        {h.important && (
                          <Icon name="star" className="w-4 h-4 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />
                        )}
                        <span>{h.name}</span>
                      </h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onUpdate(h.id, { important: !h.important })}
                          aria-label={h.important ? t.unmarkImportant : t.markImportant}
                          aria-pressed={!!h.important}
                          className={`p-1 transition-colors ${h.important ? 'text-amber-300' : 'text-amber-200/30 hover:text-amber-400'}`}>
                          <Icon name="star" className="w-3.5 h-3.5" fill={h.important ? '#fbbf24' : 'none'} strokeWidth={h.important ? 0 : 2} />
                        </button>
                        <button onClick={() => setExpanded(isOpen ? null : h.id)} className="p-1 text-amber-200/40 hover:text-amber-400">
                          <Icon name="edit" className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onDelete(h.id)} className="p-1 text-amber-200/20 hover:text-rose-400">
                          <Icon name="trash" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
                      <span className="text-amber-200/50">{cat?.emoji} {t.categories[h.category]}</span>
                      {h.reminderTime && (
                        <span className="flex items-center gap-1 text-amber-300/70">
                          <Icon name="bell" className="w-3 h-3" />{h.reminderTime}
                        </span>
                      )}
                      {/* т.2.11: parent pill — this habit comes after `parent.name`. */}
                      {parent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 max-w-[12rem]"
                          title={`${t.comesAfter}: ${parent.name}`}>
                          <Icon name="chain" className="w-3 h-3 text-violet-300" />
                          <span className="font-bold text-violet-200 truncate">→ {parent.name}</span>
                        </span>
                      )}
                      {/* т.2.11: parent-of-N pill — surfaces that this habit is the
                          anchor for N stack-children (rendered when the user is on
                          the parent's card, not the child's). */}
                      {childCount > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25"
                          title={typeof t.stackParentBadge === 'function' ? t.stackParentBadge(childCount) : ''}>
                          <Icon name="chain" className="w-3 h-3 text-violet-300" />
                          <span className="font-bold text-violet-200">{typeof t.stackParentBadge === 'function' ? t.stackParentBadge(childCount) : ''}</span>
                        </span>
                      )}
                      {broken && !done && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">
                          <Icon name="broken" className="w-3 h-3 text-rose-400" />
                          <span className="font-black text-rose-300">{t.brokenStreak}</span>
                        </span>
                      )}
                      {streak > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30">
                          <Icon name="flame" className="w-3 h-3 text-orange-400" fill="currentColor" />
                          <span className="font-black text-orange-300">{streak} {streak === 1 ? t.day : t.days}</span>
                        </span>
                      )}
                      {freezeUsed > 0 && !broken && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30"
                          title={`${t.streakProtected} · ${freezeUsed} ${freezeUsed === 1 ? t.freezeUsed : t.freezeUsedPlural} ${t.freezeOf} ${settings.freezeDays}`}>
                          <Icon name="snowflake" className="w-3 h-3 text-sky-400" />
                          <span className="font-black text-sky-300">{t.streakProtected} · {freezeUsed}/{settings.freezeDays}</span>
                        </span>
                      )}
                    </div>
                    {hasTarget ? (
                      <>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: 'linear-gradient(to right, var(--theme-primary), var(--theme-primary-light))' }} />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] text-amber-200/40 font-bold">{streak}/{h.target}</span>
                          {progressPct >= 100 && (
                            <span className="flex items-center gap-1 text-[10px] font-black text-amber-400">
                              <Icon name="trophy" className="w-3 h-3" /> {t.streakBadge}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between items-center mt-1 text-[10px] font-bold">
                        <span className="text-amber-200/50">{t.activeStreak}: <span className="text-amber-300">{streak}</span></span>
                        <span className="text-amber-200/50">{t.longestStreak}: <span className="text-amber-300">{longest}</span></span>
                      </div>
                    )}
                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                        {/* т.2.11: explicit "идва след: X" line in expanded view —
                            redundant with the dropdown below, but reads as plain
                            text so the relationship is obvious at a glance. */}
                        {parent && (
                          <div className="flex items-center gap-1.5 text-[11px] text-violet-200/80">
                            <Icon name="chain" className="w-3 h-3 text-violet-300" />
                            <span className="uppercase tracking-wider font-bold text-violet-300/70">{t.comesAfter}:</span>
                            <span className="font-semibold text-violet-100 truncate">{parent.name}</span>
                          </div>
                        )}
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="target" className="w-3 h-3" />{t.targetOptional}</label>
                          <input type="number" min="1" inputMode="numeric" value={hasTarget ? h.target : ''} placeholder={t.noTarget}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') { onUpdate(h.id, { target: null }); return; }
                              const n = parseInt(val);
                              onUpdate(h.id, { target: (Number.isFinite(n) && n > 0) ? n : null });
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                          <input type="time" value={h.reminderTime || ''} onChange={(e) => onUpdate(h.id, { reminderTime: e.target.value })}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50" />
                        </div>
                        {/* т.2.11: stack-parent dropdown in inline edit. Eligible
                            parents come from getEligibleStackParents (excludes
                            self, archived, and any choice that would create a
                            cycle). */}
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1">
                            <Icon name="chain" className="w-3 h-3" />{t.stackedAfter}
                          </label>
                          <select value={h.stackedAfter == null ? '' : String(h.stackedAfter)}
                            onChange={(e) => {
                              const v = e.target.value;
                              onUpdate(h.id, { stackedAfter: v === '' ? null : Number(v) });
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50">
                            <option value="">{t.standalone}</option>
                            {getEligibleStackParents(habits, h.id).map(p => (
                              <option key={p.id} value={String(p.id)}>{p.name}</option>
                            ))}
                          </select>
                        </div>
                        {/* т.2.10 sub-3: inline tag editing — paralel към Тагове реда в AddModal. */}
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">{t.tagsLabel}</label>
                          <div className="mt-1">
                            <TagChipSelector t={t} tags={tags} selected={h.tagIds || []} onChange={(ids) => onUpdate(h.id, { tagIds: ids })} onOpenSettings={onOpenSettings} />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                          <textarea value={h.notes || ''} onChange={(e) => onUpdate(h.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                        </div>
                        <button onClick={() => { setExpanded(null); onArchive(h.id); }}
                          className="w-full py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-500/20 transition-all active:scale-[0.99]">
                          <Icon name="archive" className="w-3.5 h-3.5" /> {t.retireHabit}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </SwipeableRow>
            );
          })}
        </div>
      )}
      {showArchivedItems && archivedList.length > 0 && (
        <div className="mt-6">
          <h4 className="text-[10px] uppercase tracking-widest text-amber-200/40 font-bold mb-2 flex items-center gap-1.5">
            <Icon name="archive" className="w-3 h-3" /> {t.archivedHabits} · {archivedList.length}
          </h4>
          <div className="space-y-2">
            {archivedList.map(h => {
              const longest = calculateLongestStreak(h.completions, settings.freezeDays);
              return (
                <div key={h.id} className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.015] opacity-70">
                  <div className="flex items-stretch">
                    <div className="flex-shrink-0 w-14 flex items-center justify-center bg-white/[0.02]">
                      <Icon name="archive" className="w-5 h-5 text-amber-200/30" />
                    </div>
                    <div className="flex-1 p-3 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-amber-100/70 text-sm truncate leading-tight">{h.name}</h3>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => onUnarchive(h.id)} aria-label={t.restoreItem}
                            className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold hover:bg-amber-500/20 transition-all active:scale-95">
                            {t.restoreItem}
                          </button>
                          <button onClick={() => onDelete(h.id)} aria-label={t.delete} className="p-1 text-amber-200/30 hover:text-rose-400">
                            <Icon name="trash" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-amber-200/40 flex-wrap">
                        <span>{CATEGORY_META[h.category]?.emoji} {t.categories[h.category]}</span>
                        {longest > 0 && (
                          <span className="flex items-center gap-1">
                            <Icon name="flame" className="w-3 h-3" /> {t.longestStreak}: {longest}
                          </span>
                        )}
                        {h.archivedAt && (
                          <span className="ml-auto">{t.archivedOn} {fmtArchivedDate(h.archivedAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ GOALS ============
// т.3.1: compute pace between expected and actual progress given a deadline.
// Returns null when pace can't be derived (no deadline, or start >= deadline).
// `overdue` becomes true past deadline when not yet complete; gap = actual - expected.
function computeGoalPace(g, now = new Date()) {
  if (!g || !g.deadline) return null;
  if (g.progress >= 100) return null;
  const deadline = new Date(g.deadline);
  if (isNaN(deadline.getTime())) return null;
  // createdAt fallback: goal.id is typically a Date.now() millis stamp.
  const startSrc = g.createdAt || (typeof g.id === 'number' ? new Date(g.id).toISOString() : null);
  if (!startSrc) return null;
  const start = new Date(startSrc);
  if (isNaN(start.getTime())) return null;
  const totalMs = deadline.getTime() - start.getTime();
  if (totalMs <= 0) return null;
  const elapsedMs = now.getTime() - start.getTime();
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / 86400000);
  const overdue = now.getTime() > deadline.getTime();
  const elapsedPct = Math.max(0, Math.min(100, Math.round((elapsedMs / totalMs) * 100)));
  const expectedPct = overdue ? 100 : elapsedPct;
  const actualPct = Math.round(g.progress || 0);
  const gap = actualPct - expectedPct;
  return { daysLeft, expectedPct, actualPct, gap, overdue, daysOver: overdue ? Math.abs(daysLeft) : 0 };
}

function GoalsView({ t, goals, archivedCount, showArchivedItems, onToggleShowArchived, onToggleSubtask, onDelete, onDeleteSubtask, onUpdate, onUpdateProgress, onUpdateNumeric, onAddSubtask, onAddJournalEntry, onDeleteJournalEntry, onArchive, onSwipeArchive, onUnarchive, onAdd, lang, tags, onOpenSettings }) {
  const [expanded, setExpanded] = useState(null);
  const [newSub, setNewSub] = useState('');
  const [query, setQuery] = useState('');
  // т.2.10 sub-4: multi-select tag filter (OR within filter, AND with search).
  const [filterTagIds, setFilterTagIds] = useState([]);
  // т.3.2: local scratch state for journal composer, keyed by goal id so
  // switching between expanded goals doesn't leak draft text.
  const [journalDraft, setJournalDraft] = useState({ goalId: null, text: '', date: '' });

  // т.2.6: split active vs archived goals — archived render in a faded section below.
  const activeList   = useMemo(() => goals.filter(g => !g.archived), [goals]);
  const archivedList = useMemo(() => goals.filter(g => g.archived),  [goals]);

  const filtered = useMemo(() => {
    let base = activeList;
    if (query.trim()) {
      base = base.filter(g =>
        fuzzyMatch(query, g.name) ||
        fuzzyMatch(query, g.notes || '') ||
        (g.subtasks || []).some(s => fuzzyMatch(query, s.text)) ||
        (g.journal || []).some(e => fuzzyMatch(query, e.text))
      );
    }
    if (filterTagIds.length > 0) {
      const filterSet = new Set(filterTagIds);
      base = base.filter(g => Array.isArray(g.tagIds) && g.tagIds.some(id => filterSet.has(id)));
    }
    return base;
  }, [activeList, query, filterTagIds]);

  const fmtArchivedDate = (iso) => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return ''; }
  };

  // т.3.2: short, year-aware date label for journal entries (YYYY-MM-DD → "15 апр" / "Apr 15").
  // Renders "днес" / "today" when the entry's date equals the current local date.
  const fmtJournalDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      if (isNaN(d.getTime())) return dateStr;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (d.getTime() === today.getTime()) {
        const label = t.today || '';
        return label.charAt(0).toUpperCase() + label.slice(1);
      }
      const sameYear = d.getFullYear() === today.getFullYear();
      return d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US',
        sameYear ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  const todayKey = () => new Date().toISOString().slice(0, 10);

  const submitJournal = (goalId) => {
    const text = (journalDraft.goalId === goalId ? journalDraft.text : '').trim();
    if (!text) return;
    const date = (journalDraft.goalId === goalId && journalDraft.date) || todayKey();
    onAddJournalEntry(goalId, text, date);
    setJournalDraft({ goalId, text: '', date: '' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.goals} count={activeList.length} onAdd={onAdd} addLabel={t.addGoal} />
      {activeList.length >= 4 && (
        <SearchInput value={query} onChange={setQuery} placeholder={t.searchPlaceholder || (t.goals + '…')} />
      )}
      {/* т.2.10 sub-4: tag filter row (auto-hides when no tags exist). */}
      <TagFilterBar t={t} tags={tags} selected={filterTagIds} onChange={setFilterTagIds} />
      {archivedCount > 0 && (
        <button onClick={onToggleShowArchived}
          className="w-full flex items-center gap-2 p-2 mb-3 rounded-xl border border-white/5 bg-white/[0.02] text-amber-200/60 text-xs hover:bg-white/[0.04] transition-all">
          <Icon name="archive" className="w-3.5 h-3.5" />
          <span className="font-bold">{archivedCount} {t.archivedGoals.toLowerCase()}</span>
          <span className="ml-auto text-amber-400 font-bold">{showArchivedItems ? t.hideArchivedItems : t.showArchivedItems}</span>
        </button>
      )}
      {goals.length === 0 ? <EmptyState message={t.noGoals} icon="target" />
        : activeList.length === 0 && !showArchivedItems ? (
          <EmptyState message={t.noGoals} icon="target" />
        )
        : filtered.length === 0 && activeList.length > 0 ? (
          <EmptyState message={t.noMatches || t.noGoals} icon="search" />
        ) : (
        <div className="space-y-3">
          {filtered.map(g => {
            const isOpen = expanded === g.id;
            const cat = CATEGORY_META[g.category];
            const daysLeft = g.deadline ? Math.ceil((new Date(g.deadline) - new Date()) / 86400000) : null;
            const pace = computeGoalPace(g);
            return (
              <SwipeableRow
                key={g.id}
                rounded="rounded-3xl"
                disabled={isOpen}
                onSwipeRight={onSwipeArchive ? () => onSwipeArchive(g.id) : null}
                rightLabel={t.archiveAction} rightIcon="archive"
                rightBg="rgba(217, 119, 6, 0.92)">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : g.id)} className="w-full p-4 text-left">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{cat?.emoji}</span>
                        <h3 className="font-bold text-amber-50">{g.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-amber-200/50 flex-wrap">
                        <span>{t.categories[g.category]}</span>
                        {daysLeft !== null && (
                          <span className={`flex items-center gap-1 ${daysLeft < 0 ? 'text-rose-400' : daysLeft < 7 ? 'text-amber-400' : ''}`}>
                            <Icon name="clock" className="w-3 h-3" />
                            {daysLeft < 0 ? t.overdue : `${daysLeft} ${t.daysLeft}`}
                          </span>
                        )}
                        {g.numeric && <span>{g.numeric.current}/{g.numeric.target} {g.numeric.unit}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-amber-300 leading-none" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{g.progress}%</div>
                      {/* т.3.3: subtle "N/M · auto" subtitle when milestones drive the progress %. */}
                      {!g.numeric && Array.isArray(g.subtasks) && g.subtasks.length > 0 && (
                        <div className="text-[9px] uppercase tracking-widest text-amber-300/50 font-bold mt-1">
                          {g.subtasks.filter(s => s.done).length}/{g.subtasks.length} · {t.milestonesAuto}
                        </div>
                      )}
                      <Icon name="chevronRight" className={`w-4 h-4 text-amber-200/40 ml-auto transition-transform mt-1 ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  <div className="relative h-2 bg-white/5 rounded-full">
                    <div className="h-full rounded-full transition-all" style={{ width: `${g.progress}%`, background: `linear-gradient(to right, ${cat?.color}, var(--theme-primary-light))`, boxShadow: `0 0 10px ${cat?.color}80` }} />
                    {pace && !pace.overdue && pace.expectedPct > 0 && pace.expectedPct < 100 && (
                      <div
                        aria-hidden="true"
                        title={`${t.paceExpected} ${pace.expectedPct}%`}
                        className="absolute top-[-3px] bottom-[-3px] w-[2px] rounded-sm bg-amber-100/70 pointer-events-none"
                        style={{ left: `${pace.expectedPct}%`, transform: 'translateX(-1px)', boxShadow: '0 0 4px rgba(251,191,36,0.6)' }} />
                    )}
                  </div>
                  {pace && (
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-200/55 flex-wrap">
                      {pace.overdue ? (
                        <>
                          <span className="text-rose-300/80">{t.paceOverdue} · {pace.daysOver} {t.daysLeft}</span>
                          <span className="text-amber-200/40">·</span>
                          <span>{t.paceYouAre} {pace.actualPct}%</span>
                        </>
                      ) : (
                        <>
                          <span>{t.paceExpected} <span className="text-amber-100/80 font-bold">{pace.expectedPct}%</span></span>
                          <span className="text-amber-200/40">·</span>
                          <span>{t.paceYouAre} <span className="text-amber-100/80 font-bold">{pace.actualPct}%</span></span>
                          <span className="text-amber-200/40">·</span>
                          {pace.gap >= -2 && pace.gap <= 2 ? (
                            <span className="text-emerald-300/80">{t.paceOnTrack}</span>
                          ) : pace.gap > 2 ? (
                            <span className="text-emerald-300/80">{t.paceAhead} {pace.gap}%</span>
                          ) : (
                            <span className="text-amber-300/80">{t.paceBehind} {Math.abs(pace.gap)}%</span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 p-4 space-y-3 bg-black/20">
                    {g.numeric ? (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold">{t.currentValue}</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => onUpdateNumeric(g.id, Math.max(0, g.numeric.current - 1))}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-amber-300 font-black">−</button>
                          <input type="number" value={g.numeric.current} onChange={(e) => onUpdateNumeric(g.id, parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-amber-50 font-bold" />
                          <span className="text-amber-200/50 text-sm">/ {g.numeric.target} {g.numeric.unit}</span>
                          <button onClick={() => onUpdateNumeric(g.id, g.numeric.current + 1)}
                            className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black">+</button>
                        </div>
                      </div>
                    ) : g.subtasks.length === 0 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold">{t.progress}</label>
                        <input type="range" min="0" max="100" value={g.progress}
                          onChange={(e) => onUpdateProgress(g.id, parseInt(e.target.value))}
                          className="w-full accent-amber-500" />
                      </div>
                    )}

                    {!g.numeric && (
                      <div>
                        {/* т.3.3: section label includes done/total + auto-computed % when milestones exist. */}
                        <label className="text-xs uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1.5">
                          <Icon name="checkCircle" className="w-3 h-3" />
                          <span>{t.subtasks}</span>
                          {g.subtasks.length > 0 && (() => {
                            const doneCount = g.subtasks.filter(s => s.done).length;
                            const pct = Math.round((doneCount / g.subtasks.length) * 100);
                            return (
                              <span className="ml-0.5 text-amber-200/45 font-normal normal-case tracking-normal">
                                · {doneCount}/{g.subtasks.length} · {pct}%
                              </span>
                            );
                          })()}
                        </label>
                        <div className="mt-2 space-y-1.5">
                          {g.subtasks.map(s => (
                            <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] group">
                              <button onClick={() => onToggleSubtask(g.id, s.id)} className="flex items-center gap-2 flex-1 text-left min-w-0">
                                {s.done ? <Icon name="checkCircle" className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <Icon name="circle" className="w-4 h-4 text-amber-200/30 flex-shrink-0" />}
                                <span className={`text-sm truncate ${s.done ? 'line-through text-amber-200/40' : 'text-amber-100'}`}>{s.text}</span>
                              </button>
                              <button onClick={() => onDeleteSubtask(g.id, s.id)} className="p-1 text-amber-200/20 hover:text-rose-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icon name="x" className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <input value={newSub} onChange={(e) => setNewSub(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && newSub.trim()) { onAddSubtask(g.id, newSub.trim()); setNewSub(''); }}}
                            placeholder={t.addSubtask}
                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                          <button onClick={() => { if (newSub.trim()) { onAddSubtask(g.id, newSub.trim()); setNewSub(''); }}}
                            className="px-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                            <Icon name="plus" className="w-4 h-4" />
                          </button>
                        </div>
                        {/* т.3.3: empty-state hint — explains the auto-compute model when there are no milestones yet. */}
                        {g.subtasks.length === 0 && (
                          <div className="mt-1.5 text-[11px] text-amber-200/40 italic flex items-start gap-1.5">
                            <Icon name="info" className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{t.milestonesHint}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="clock" className="w-3 h-3" />{t.editDeadline}</label>
                      <div className="mt-1 flex gap-2 items-center">
                        <input type="date" value={g.deadline || ''} onChange={(e) => onUpdate(g.id, { deadline: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50" />
                        {g.deadline && (
                          <button onClick={() => onUpdate(g.id, { deadline: '' })} aria-label={t.clearDeadline}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-200/50 hover:text-rose-400">
                            <Icon name="x" className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {!g.deadline && (
                        <div className="mt-1.5 text-[10px] text-amber-200/40 italic">{t.paceNoDeadline}</div>
                      )}
                    </div>

                    {/* т.2.10 sub-3: inline tag editing за цел. */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">{t.tagsLabel}</label>
                      <div className="mt-1">
                        <TagChipSelector t={t} tags={tags} selected={g.tagIds || []} onChange={(ids) => onUpdate(g.id, { tagIds: ids })} onOpenSettings={onOpenSettings} />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                      <textarea value={g.notes || ''} onChange={(e) => onUpdate(g.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                    </div>

                    {/* т.3.2: Journal — append-only log of progress entries. */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1">
                        <Icon name="calendar" className="w-3 h-3" />{t.journal}
                        {(g.journal || []).length > 0 && (
                          <span className="ml-1 text-amber-200/40 font-normal">· {g.journal.length}</span>
                        )}
                      </label>
                      {(g.journal || []).length === 0 ? (
                        <div className="mt-1.5 text-[11px] text-amber-200/35 italic">{t.noJournalEntries}</div>
                      ) : (
                        <div className="mt-2 space-y-1.5 max-h-64 overflow-y-auto scroll-hide">
                          {g.journal.map(e => (
                            <div key={e.id} className="group rounded-lg bg-white/[0.03] border border-white/5 p-2.5 flex items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] uppercase tracking-wider text-amber-300/70 font-bold mb-0.5">{fmtJournalDate(e.date)}</div>
                                <div className="text-sm text-amber-50 whitespace-pre-wrap break-words">{e.text}</div>
                              </div>
                              <button onClick={() => onDeleteJournalEntry(g.id, e.id)} aria-label={t.deleteEntry}
                                className="p-1 text-amber-200/25 hover:text-rose-400 flex-shrink-0 transition-colors">
                                <Icon name="x" className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <input type="date"
                          value={journalDraft.goalId === g.id ? (journalDraft.date || todayKey()) : todayKey()}
                          max={todayKey()}
                          onChange={(e) => setJournalDraft({ goalId: g.id, text: journalDraft.goalId === g.id ? journalDraft.text : '', date: e.target.value })}
                          className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-50 focus:outline-none focus:border-amber-500/50 sm:w-32" />
                        <input
                          value={journalDraft.goalId === g.id ? journalDraft.text : ''}
                          onChange={(e) => setJournalDraft({ goalId: g.id, text: e.target.value, date: journalDraft.goalId === g.id ? journalDraft.date : '' })}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitJournal(g.id); } }}
                          placeholder={t.journalPlaceholder}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                        <button onClick={() => submitJournal(g.id)}
                          disabled={!(journalDraft.goalId === g.id && journalDraft.text.trim())}
                          className="px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-500/30 transition-all active:scale-[0.98]">
                          <Icon name="plus" className="w-4 h-4" /> {t.addJournalEntry}
                        </button>
                      </div>
                    </div>

                    <button onClick={() => { setExpanded(null); onArchive(g.id); }}
                      className="w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
                      style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(234,179,8,0.15))', border: '1px solid rgba(251,191,36,0.35)', color: '#fcd34d' }}>
                      <Icon name="trophy" className="w-3.5 h-3.5" /> {t.completeAndArchiveGoal}
                    </button>
                    <button onClick={() => onDelete(g.id)} className="w-full py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center gap-1.5">
                      <Icon name="trash" className="w-3.5 h-3.5" /> {t.delete}
                    </button>
                  </div>
                )}
              </div>
              </SwipeableRow>
            );
          })}
        </div>
      )}
      {showArchivedItems && archivedList.length > 0 && (
        <div className="mt-6">
          <h4 className="text-[10px] uppercase tracking-widest text-amber-200/40 font-bold mb-2 flex items-center gap-1.5">
            <Icon name="archive" className="w-3 h-3" /> {t.archivedGoals} · {archivedList.length}
          </h4>
          <div className="space-y-2">
            {archivedList.map(g => {
              const cat = CATEGORY_META[g.category];
              return (
                <div key={g.id} className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.015] opacity-75 p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(234,179,8,0.08))' }}>
                      <Icon name="trophy" className="w-5 h-5 text-amber-300/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-amber-100/70 text-sm truncate leading-tight flex items-center gap-1.5">
                          <span className="text-base">{cat?.emoji}</span> {g.name}
                        </h3>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => onUnarchive(g.id)} aria-label={t.restoreItem}
                            className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold hover:bg-amber-500/20 transition-all active:scale-95">
                            {t.restoreItem}
                          </button>
                          <button onClick={() => onDelete(g.id)} aria-label={t.delete} className="p-1 text-amber-200/30 hover:text-rose-400">
                            <Icon name="trash" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-amber-200/40 flex-wrap">
                        <span className="font-bold text-amber-300/70">{g.progress}%</span>
                        <span>· {t.categories[g.category]}</span>
                        {g.archivedAt && (
                          <span className="ml-auto">{t.archivedOn} {fmtArchivedDate(g.archivedAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ TASKS ============
function TasksView({ t, tasks, settings, archivedCount, onToggle, onDelete, onSwipeDelete, onUpdate, onAdd, onToggleArchived, lang, tags, onOpenSettings }) {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');
  // т.2.10 sub-4: multi-select tag filter (OR within filter, AND with search).
  const [filterTagIds, setFilterTagIds] = useState([]);
  const sorted = useMemo(() => {
    let base = query.trim()
      ? tasks.filter(ta => fuzzyMatch(query, ta.name) || fuzzyMatch(query, ta.notes || ''))
      : tasks;
    if (filterTagIds.length > 0) {
      const filterSet = new Set(filterTagIds);
      base = base.filter(ta => Array.isArray(ta.tagIds) && ta.tagIds.some(id => filterSet.has(id)));
    }
    return [...base].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return new Date(a.deadline || '2099-01-01') - new Date(b.deadline || '2099-01-01');
    });
  }, [tasks, query, filterTagIds]);

  const formatDeadline = (dl) => {
    if (!dl) return '';
    const d = new Date(dl);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d - today) / 86400000);
    if (diff < 0) return t.overdue;
    if (diff === 0) return t.today;
    if (diff === 1) return t.tomorrow;
    return d.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <SectionHeader title={t.tasks} count={tasks.filter(ta => !ta.done).length} onAdd={onAdd} addLabel={t.addTask} />
      {tasks.length >= 5 && (
        <SearchInput value={query} onChange={setQuery} placeholder={t.searchPlaceholder || (t.tasks + '…')} />
      )}
      {/* т.2.10 sub-4: tag filter row (auto-hides when no tags exist). */}
      <TagFilterBar t={t} tags={tags} selected={filterTagIds} onChange={setFilterTagIds} />
      {settings.autoArchive && archivedCount > 0 && (
        <button onClick={onToggleArchived}
          className="mb-3 w-full flex items-center gap-2 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-amber-200/60 hover:bg-white/[0.04]">
          <Icon name="archive" className="w-3.5 h-3.5" />
          <span className="font-bold">{archivedCount} {t.hidden} · {t.archived}</span>
          <span className="ml-auto text-amber-400">{settings.showArchived ? t.off : t.on}</span>
        </button>
      )}
      {tasks.length === 0 ? <EmptyState message={t.noTasks} icon="checkCircle" /> : sorted.length === 0 ? (
        <EmptyState message={t.noMatches || t.noTasks} icon="search" />
      ) : (
        <div className="space-y-2">
          {sorted.map(ta => {
            const pri = PRIORITY_COLORS[ta.priority];
            const cat = CATEGORY_META[ta.category];
            const dlText = formatDeadline(ta.deadline);
            const overdue = ta.deadline && new Date(ta.deadline) < new Date() && !ta.done;
            const isOpen = expanded === ta.id;
            return (
              <SwipeableRow
                key={ta.id}
                rounded="rounded-2xl"
                disabled={isOpen}
                onSwipeLeft={ta.done ? null : () => onToggle(ta.id)}
                onSwipeRight={() => onSwipeDelete(ta.id)}
                leftLabel={t.done} leftIcon="check" leftBg="rgba(16, 185, 129, 0.92)"
                rightLabel={t.delete} rightIcon="trash" rightBg="rgba(244, 63, 94, 0.92)">
              <div className={`rounded-2xl border transition-all ${ta.done ? 'opacity-50 border-white/5 bg-white/[0.01]' : overdue ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                <div className="flex items-center gap-3 p-3">
                  <button onClick={() => onToggle(ta.id)} className="flex-shrink-0">
                    {ta.done ? <Icon name="checkCircle" className="w-6 h-6 text-amber-400" strokeWidth={2.5} /> : <Icon name="circle" className="w-6 h-6 text-amber-200/30 hover:text-amber-400" strokeWidth={2} />}
                  </button>
                  <div className="flex-1 min-w-0" onClick={() => setExpanded(isOpen ? null : ta.id)}>
                    <p className={`font-medium ${ta.done ? 'line-through text-amber-200/40' : 'text-amber-50'}`}>{ta.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-amber-200/50">{cat?.emoji} {t.categories[ta.category]}</span>
                      {dlText && (
                        <span className={`text-xs flex items-center gap-1 ${overdue ? 'text-rose-400 font-bold' : 'text-amber-200/50'}`}>
                          {overdue && <Icon name="alert" className="w-3 h-3" />}
                          <Icon name="clock" className="w-3 h-3" /> {dlText}
                        </span>
                      )}
                      {ta.reminderTime && (
                        <span className="text-xs flex items-center gap-1 text-amber-300/70">
                          <Icon name="bell" className="w-3 h-3" />{ta.reminderTime}
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${pri.bg} ${pri.text} ${pri.border} font-bold uppercase`}>{t[ta.priority]}</span>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(isOpen ? null : ta.id)} className="flex-shrink-0 p-1 text-amber-200/40 hover:text-amber-400">
                    <Icon name="edit" className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(ta.id)} className="flex-shrink-0 p-1 text-amber-200/20 hover:text-rose-400">
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0 space-y-2 border-t border-white/5 mt-1">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                      <input type="time" value={ta.reminderTime || ''} onChange={(e) => onUpdate(ta.id, { reminderTime: e.target.value })}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50" />
                    </div>
                    {/* т.2.10 sub-3: inline tag editing за задача. */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">{t.tagsLabel}</label>
                      <div className="mt-1">
                        <TagChipSelector t={t} tags={tags} selected={ta.tagIds || []} onChange={(ids) => onUpdate(ta.id, { tagIds: ids })} onOpenSettings={onOpenSettings} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
                      <textarea value={ta.notes || ''} onChange={(e) => onUpdate(ta.id, { notes: e.target.value })} placeholder={t.addNote} rows={2}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
                    </div>
                  </div>
                )}
              </div>
              </SwipeableRow>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ CALENDAR VIEW ============
function CalendarView({ t, habits, tasks, goals, settings, daysShort, onToggleHabit, lang }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Compute start offset with configurable week start.
  // weekStart=1 (Mon): shift so Monday is col 0
  const rawOffset = firstDay.getDay();
  const startOffset = settings.weekStart === 1 ? (rawOffset + 6) % 7 : rawOffset;
  const daysInMonth = lastDay.getDate();

  const daysArr = [];
  for (let i = 0; i < startOffset; i++) daysArr.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArr.push(new Date(year, month, i));

  const getDayData = (d) => {
    if (!d) return null;
    const ds = d.toDateString();
    const habitCount = habits.filter(h => h.completions.includes(ds)).length;
    const taskCount = tasks.filter(ta => ta.deadline === dateKey(d) && !ta.done).length;
    const goalCount = goals.filter(g => g.deadline === dateKey(d)).length;
    return { habitCount, taskCount, goalCount, habitPct: habits.length ? habitCount / habits.length : 0 };
  };

  const selectedData = useMemo(() => {
    const ds = selectedDay.toDateString();
    const dKey = dateKey(selectedDay);
    const habitsDone = habits.filter(h => h.completions.includes(ds));
    const habitsNotDone = habits.filter(h => !h.completions.includes(ds));
    const tasksOnDay = tasks.filter(ta => ta.deadline === dKey);
    const goalsOnDay = goals.filter(g => g.deadline === dKey);
    return { habitsDone, habitsNotDone, tasksOnDay, goalsOnDay };
  }, [selectedDay, habits, tasks, goals]);

  const today = new Date();
  const isToday = (d) => d && d.toDateString() === today.toDateString();
  const isSelected = (d) => d && d.toDateString() === selectedDay.toDateString();
  const isFuture = (d) => d && d > today;

  // Backfill: how many whole days the selected day is behind today (0 = today,
  // positive = past, negative = future). Used to decide if habits can be
  // toggled retroactively on the selected day.
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selStart = new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate());
  const diffDays = Math.round((todayStart - selStart) / 86400000);
  const backfillWindow = Math.max(0, settings.backfillDays || 0);
  const isSelToday = diffDays === 0;
  const isSelFuture = diffDays < 0;
  const canBackfill = diffDays > 0 && diffDays <= backfillWindow;
  const canToggleSelected = isSelToday || canBackfill;
  const isSelPastLocked = diffDays > backfillWindow;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-amber-50" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.calendar}</h2>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-lg hover:bg-white/5 text-amber-300">
            <Icon name="chevronLeft" className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            {t.monthNames[month]} {year}
          </h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-lg hover:bg-white/5 text-amber-300">
            <Icon name="chevronRight" className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysShort.map((d, i) => (
            <div key={i} className="text-[10px] text-center font-bold text-amber-300/40 uppercase py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysArr.map((d, i) => {
            if (!d) return <div key={i} />;
            const data = getDayData(d);
            const future = isFuture(d);
            const todayBadge = isToday(d);
            const selected = isSelected(d);
            return (
              <button key={i} onClick={() => setSelectedDay(d)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative transition-all ${
                  selected ? 'bg-amber-500 text-black font-black' :
                  todayBadge ? 'border-2 border-amber-500/60 text-amber-300 font-bold' :
                  future ? 'text-amber-100/30' : 'text-amber-100/70 hover:bg-white/5'
                }`}>
                <span>{d.getDate()}</span>
                {data && !future && (
                  <div className="flex gap-0.5 mt-0.5">
                    {data.habitCount > 0 && (
                      <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : ''}`}
                        style={!selected ? { background: `rgba(245, 158, 11, ${0.3 + data.habitPct * 0.7})` } : {}} />
                    )}
                    {data.taskCount > 0 && <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : 'bg-rose-400'}`} />}
                    {data.goalCount > 0 && <div className={`w-1 h-1 rounded-full ${selected ? 'bg-black/40' : 'bg-blue-400'}`} />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-around mt-3 pt-3 border-t border-white/5 text-[10px] text-amber-200/50">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" />{t.habits}</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-400" />{t.tasks}</span>
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t.goals}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-amber-100">
          {selectedDay.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>

        {canBackfill && habits.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-200/80">
            <Icon name="info" className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>{t.backfillHint}</span>
          </div>
        )}
        {isSelPastLocked && habits.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-amber-200/50">
            <Icon name="info" className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t.backfillLocked}</span>
          </div>
        )}

        {selectedData.habitsDone.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">✓ {t.done}</h4>
            {selectedData.habitsDone.map(h => (
              canToggleSelected ? (
                <button key={h.id} onClick={() => onToggleHabit(h.id, selectedDay.toDateString())}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-1 text-left hover:bg-amber-500/15 transition-colors">
                  <Icon name="checkCircle" className="w-4 h-4 text-amber-400" />
                  {h.important && <Icon name="star" className="w-3.5 h-3.5 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                  <span className="text-sm text-amber-100">{h.name}</span>
                </button>
              ) : (
                <div key={h.id} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-1">
                  <Icon name="checkCircle" className="w-4 h-4 text-amber-400" />
                  {h.important && <Icon name="star" className="w-3.5 h-3.5 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                  <span className="text-sm text-amber-100">{h.name}</span>
                </div>
              )
            ))}
          </div>
        )}

        {selectedData.habitsNotDone.length > 0 && canToggleSelected && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.habits}</h4>
            {selectedData.habitsNotDone.map(h => (
              <button key={h.id} onClick={() => onToggleHabit(h.id, selectedDay.toDateString())} className="w-full flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5 mb-1 text-left">
                <Icon name="circle" className="w-4 h-4 text-amber-200/30" />
                {h.important && <Icon name="star" className="w-3.5 h-3.5 flex-shrink-0" fill="#fbbf24" strokeWidth={0} />}
                <span className="text-sm text-amber-100/80">{h.name}</span>
              </button>
            ))}
          </div>
        )}

        {selectedData.tasksOnDay.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.tasks}</h4>
            {selectedData.tasksOnDay.map(ta => (
              <div key={ta.id} className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/20 mb-1">
                <Icon name={ta.done ? "checkCircle" : "circle"} className={`w-4 h-4 ${ta.done ? 'text-amber-400' : 'text-rose-400'}`} />
                <span className={`text-sm ${ta.done ? 'line-through text-amber-200/40' : 'text-amber-100'}`}>{ta.name}</span>
              </div>
            ))}
          </div>
        )}

        {selectedData.goalsOnDay.length > 0 && (
          <div>
            <h4 className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold mb-2">{t.goals} — {t.deadline}</h4>
            {selectedData.goalsOnDay.map(g => (
              <div key={g.id} className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/20 mb-1">
                <Icon name="target" className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-amber-100 flex-1">{g.name}</span>
                <span className="text-xs font-black text-amber-300">{g.progress}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ STATS ============
function StatsView({ t, stats, habits, goals, tasks, daysShort, settings, lang, tags = [], weeklyReviews = [], onDeleteWeeklyReview }) {
  const byCategory = useMemo(() => {
    const cats = {};
    [...habits, ...goals, ...tasks].forEach(item => { cats[item.category] = (cats[item.category] || 0) + 1; });
    const total = Object.values(cats).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(cats).map(([cat, count]) => ({ cat, count, pct: (count / total) * 100 }));
  }, [habits, goals, tasks]);

  // т.2.10 sub-5: tag breakdown — за всеки дефиниран таг броим в колко
  // активни елемента (habits + goals + tasks) се появява. OR-логика:
  // елемент с няколко тага се брои във всеки от тях (същото поведение
  // като филтъра в листите). Сортираме по общ count desc; bar-ът е
  // относителен спрямо най-горния (max), за да се вижда йерархията
  // дори при малки числа. Ако няма дефинирани тагове — секцията не
  // се рендерира изобщо. Ако има тагове, но никой елемент не е тагнат —
  // показваме приятен empty state.
  const byTag = useMemo(() => {
    if (!tags || tags.length === 0) return { rows: [], maxCount: 0, anyTagged: false };
    const rows = tags.map(tag => {
      const h = habits.filter(x => Array.isArray(x.tagIds) && x.tagIds.includes(tag.id)).length;
      const g = goals.filter(x => Array.isArray(x.tagIds) && x.tagIds.includes(tag.id)).length;
      const ta = tasks.filter(x => Array.isArray(x.tagIds) && x.tagIds.includes(tag.id)).length;
      return { tag, habits: h, goals: g, tasks: ta, count: h + g + ta };
    }).sort((a, b) => b.count - a.count);
    const maxCount = rows.reduce((m, r) => r.count > m ? r.count : m, 0);
    return { rows, maxCount, anyTagged: maxCount > 0 };
  }, [tags, habits, goals, tasks]);

  // ----- Insights -----
  const insights = useMemo(() => {
    const now = new Date();
    // 1) Best weekday — highest habit completion rate
    const dayCounts = [0,0,0,0,0,0,0];
    const dayTotals = [0,0,0,0,0,0,0];
    const days = 28;
    for (let i = 0; i < days; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const dow = d.getDay();
      habits.forEach(h => {
        dayTotals[dow]++;
        if (h.completions && h.completions.includes(key)) dayCounts[dow]++;
      });
    }
    let bestDow = -1, bestRate = 0;
    for (let i = 0; i < 7; i++) {
      const r = dayTotals[i] ? dayCounts[i] / dayTotals[i] : 0;
      if (r > bestRate) { bestRate = r; bestDow = i; }
    }
    // 2) Momentum — last 7 vs previous 7
    const count7 = (end) => {
      let c = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - end - i);
        const key = d.toDateString();
        habits.forEach(h => { if (h.completions && h.completions.includes(key)) c++; });
      }
      return c;
    };
    const last = count7(0);
    const prev = count7(7);
    const momentumDelta = prev === 0 ? (last > 0 ? 100 : 0) : Math.round(((last - prev) / prev) * 100);
    // 3) Most consistent habit (longest current streak)
    let topHabit = null, topStreak = 0;
    habits.forEach(h => {
      const s = calculateStreak(h.completions || [], settings.freezeDays || 0);
      if (s > topStreak) { topStreak = s; topHabit = h; }
    });
    // 4) Next milestone — closest goal to 100%
    let nextGoal = null, bestPct = -1;
    goals.forEach(g => {
      const p = g.progress || 0;
      if (p < 100 && p > bestPct) { bestPct = p; nextGoal = g; }
    });
    return { bestDow, bestRate, last, prev, momentumDelta, topHabit, topStreak, nextGoal };
  }, [habits, goals, settings.freezeDays]);

  const bg = lang === 'bg';
  const fullDays = bg
    ? ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота']
    : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  return (
    <div className="space-y-5" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label={t.totalHabits} value={habits.length} sub={`${stats.doneToday} ${t.done}`} icon="flame" />
        <StatCard label={t.totalGoals} value={goals.length} sub={`${stats.avgGoal}% ${t.avgProgress}`} icon="target" />
        <StatCard label={t.totalTasks} value={tasks.length} sub={`${stats.openTasks} ${t.open}`} icon="checkCircle" />
        <StatCard label={t.activeStreak} value={stats.activeStreak} sub={t.days} icon="award" highlight />
      </div>

      {(insights.topHabit || insights.nextGoal || insights.bestDow >= 0) && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
            <Icon name="lightbulb" className="w-3.5 h-3.5" />
            {bg ? 'Прозрения' : 'Insights'}
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {insights.bestDow >= 0 && insights.bestRate > 0 && (
              <InsightCard icon="calendar"
                title={bg ? 'Най-силен ден' : 'Strongest day'}
                body={`${fullDays[insights.bestDow]} — ${Math.round(insights.bestRate * 100)}% ${bg ? 'изпълнение' : 'completion'}`} />
            )}
            {(insights.last > 0 || insights.prev > 0) && (
              <InsightCard icon="trending"
                title={bg ? 'Импулс (7 дни)' : 'Momentum (7 days)'}
                body={`${insights.last} ${bg ? 'изпълнения, ' : 'completions, '}${insights.momentumDelta >= 0 ? '+' : ''}${insights.momentumDelta}% ${bg ? 'спрямо миналата седмица' : 'vs previous week'}`}
                tone={insights.momentumDelta >= 0 ? 'good' : 'warn'} />
            )}
            {insights.topHabit && insights.topStreak > 0 && (
              <InsightCard icon="flame"
                title={bg ? 'Най-последователен навик' : 'Most consistent habit'}
                body={`${insights.topHabit.important ? '★ ' : ''}${insights.topHabit.name} — ${insights.topStreak} ${bg ? 'поредни дни' : 'day streak'}`} />
            )}
            {insights.nextGoal && (
              <InsightCard icon="target"
                title={bg ? 'Най-близка цел' : 'Closest goal'}
                body={`${insights.nextGoal.name} — ${insights.nextGoal.progress || 0}%`} />
            )}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3">{t.categoryBreakdown}</h2>
        <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          {byCategory.map(({ cat, count, pct }) => {
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-amber-100">{meta?.emoji} {t.categories[cat]}</span>
                  <span className="text-xs font-black text-amber-200/60">{count}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: meta?.color, boxShadow: `0 0 8px ${meta?.color}60` }} />
                </div>
              </div>
            );
          })}
          {byCategory.length === 0 && <p className="text-sm text-amber-200/40 text-center py-4">—</p>}
        </div>
      </section>

      {/* т.2.10 sub-5: разрез по таг — нова секция, ДОПЪЛВА categoryBreakdown
          (не я заменя). Показва се само ако има поне един дефиниран таг —
          инак секцията липсва изцяло, без dead chrome. */}
      {tags && tags.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3">{t.tagBreakdown}</h2>
          <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            {byTag.anyTagged ? byTag.rows.map(({ tag, habits: hN, goals: gN, tasks: taN, count }) => {
              const pct = byTag.maxCount > 0 ? (count / byTag.maxCount) * 100 : 0;
              const breakdown = [hN && `${hN}н`, gN && `${gN}ц`, taN && `${taN}з`].filter(Boolean).join(' · ');
              const breakdownEn = [hN && `${hN}h`, gN && `${gN}g`, taN && `${taN}t`].filter(Boolean).join(' · ');
              const sub = lang === 'bg' ? breakdown : breakdownEn;
              return (
                <div key={tag.id}>
                  <div className="flex justify-between items-center gap-2 mb-1">
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-bold truncate"
                        title={tag.name}
                        style={{
                          maxWidth: 160,
                          background: count > 0 ? tag.color : `${tag.color}1f`,
                          color: count > 0 ? '#1a1208' : tag.color,
                          boxShadow: count > 0 ? `0 0 8px ${tag.color}60` : 'none',
                          border: count > 0 ? 'none' : `1px solid ${tag.color}55`
                        }}>
                        {tag.name}
                      </span>
                      {sub && <span className="text-[10px] text-amber-200/40 font-medium truncate">{sub}</span>}
                    </span>
                    <span className="text-xs font-black text-amber-200/60 flex-shrink-0">{count}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${Math.max(pct, count > 0 ? 4 : 0)}%`,
                      background: tag.color,
                      boxShadow: count > 0 ? `0 0 8px ${tag.color}60` : 'none'
                    }} />
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-amber-200/40 text-center py-4">{t.tagBreakdownEmpty}</p>
            )}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3">{t.weekActivity}</h2>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-end justify-between gap-2 h-32">
            {stats.week.map((d, i) => {
              const pct = d.total ? (d.count / d.total) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div className="w-full rounded-t-lg transition-all" style={{
                      height: `${Math.max(pct, 4)}%`,
                      background: pct > 0 ? 'linear-gradient(to top, var(--theme-primary), var(--theme-primary-light))' : 'var(--theme-glow-soft)'
                    }} />
                  </div>
                  <span className="text-[10px] font-bold text-amber-200/40 uppercase">{daysShort[(d.day.getDay() + (settings.weekStart === 1 ? 6 : 0)) % 7]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* т.2.12: Weekly reviews history — list of saved reflections with the
          stats snapshot frozen at save time. Newest-first. Empty state shown
          if the user hasn't saved any yet but the section header still
          renders so the feature is discoverable. */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-amber-300/60 font-bold mb-3 flex items-center gap-2">
          <Icon name="calendar" className="w-3.5 h-3.5" />{t.weeklyReviewsHistory}
          {weeklyReviews.length > 0 && <span className="ml-auto text-amber-200/50 normal-case tracking-normal font-bold">{weeklyReviews.length}</span>}
        </h2>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          {weeklyReviews.length === 0 ? (
            <p className="text-sm text-amber-200/40 text-center py-3">{t.weeklyReviewsEmpty}</p>
          ) : (
            <div className="space-y-3">
              {[...weeklyReviews]
                .sort((a, b) => (b.weekStart || '').localeCompare(a.weekStart || ''))
                .map(r => {
                  const startDate = new Date(r.weekStart);
                  const endDate = new Date(r.weekEnd);
                  const valid = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());
                  const range = valid ? formatWeekRange(startDate, endDate, lang) : `${r.weekStart} – ${r.weekEnd}`;
                  const ticks = (r.stats && typeof r.stats.totalTicks === 'number') ? r.stats.totalTicks : 0;
                  const bestDow = r.stats && typeof r.stats.bestDayDow === 'number' ? r.stats.bestDayDow : null;
                  const bestDayLabel = bestDow != null
                    ? (lang === 'bg'
                        ? ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота'][bestDow]
                        : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][bestDow])
                    : null;
                  return (
                    <div key={r.id} className="rounded-xl border border-amber-500/15 bg-white/[0.02] p-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-amber-100 leading-tight">{range}</p>
                          <p className="text-[10px] text-amber-200/50 mt-0.5 flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold">{typeof t.weeklyReviewItemSummary === 'function' ? t.weeklyReviewItemSummary(ticks) : `${ticks}`}</span>
                            {bestDayLabel && <span className="text-amber-200/30">·</span>}
                            {bestDayLabel && <span><Icon name="calendar" className="w-3 h-3 inline-block mr-0.5 -mt-0.5" />{bestDayLabel}</span>}
                            {r.stats && r.stats.topHabitName && <span className="text-amber-200/30">·</span>}
                            {r.stats && r.stats.topHabitName && (
                              <span className="truncate" title={r.stats.topHabitName} style={{ maxWidth: 160 }}>
                                <Icon name="flame" className="w-3 h-3 inline-block mr-0.5 -mt-0.5" />{r.stats.topHabitName}
                              </span>
                            )}
                          </p>
                        </div>
                        {onDeleteWeeklyReview && (
                          <button
                            onClick={() => onDeleteWeeklyReview(r.id)}
                            aria-label={t.delete}
                            title={t.delete}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-amber-200/30 hover:text-rose-400 transition-colors flex-shrink-0">
                            <Icon name="trash" className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      {r.text && r.text.trim() && (
                        <p className="text-xs text-amber-100/80 leading-relaxed whitespace-pre-line border-l-2 border-amber-500/30 pl-2.5 italic">
                          {r.text}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ============ SHARED ============
// ============ SWIPE GESTURES (т.2.7) ============
// Touch-based horizontal swipe wrapper. Shows a colored reveal layer with
// an icon + label as the user drags; fires onSwipeLeft / onSwipeRight once
// the drag crosses THRESHOLD. Vertical scroll still works via touch-action.
// Non-touch input never triggers — existing buttons remain the primary UX
// for mouse/keyboard. A synthetic click that follows a successful swipe is
// swallowed in the capture phase so parent onClick handlers don't fire.
function SwipeableRow({
  onSwipeLeft, onSwipeRight,
  leftLabel, rightLabel,
  leftIcon = 'check', rightIcon = 'trash',
  leftBg = 'rgba(16, 185, 129, 0.92)',
  rightBg = 'rgba(244, 63, 94, 0.92)',
  disabled = false,
  rounded = 'rounded-2xl',
  children
}) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(null);
  const startYRef = useRef(null);
  const axisRef = useRef(null);     // 'h' | 'v' | null
  const firedRef = useRef(false);   // swallows the next click after swipe
  const THRESHOLD = 80;
  const MAX_DRAG = 160;

  const canLeft  = !!onSwipeLeft  && !disabled;
  const canRight = !!onSwipeRight && !disabled;

  const resetGesture = () => {
    setDx(0);
    setDragging(false);
    startXRef.current = null;
    startYRef.current = null;
    axisRef.current = null;
  };

  const onTouchStart = (e) => {
    if (disabled || !canLeft && !canRight) return;
    if (e.touches.length !== 1) return;
    const p = e.touches[0];
    startXRef.current = p.clientX;
    startYRef.current = p.clientY;
    axisRef.current = null;
    firedRef.current = false;
    setDragging(true);
  };

  const onTouchMove = (e) => {
    if (disabled || startXRef.current == null) return;
    const p = e.touches[0];
    const rawDx = p.clientX - startXRef.current;
    const rawDy = p.clientY - startYRef.current;
    if (axisRef.current == null) {
      if (Math.abs(rawDx) < 10 && Math.abs(rawDy) < 10) return;
      axisRef.current = Math.abs(rawDx) > Math.abs(rawDy) ? 'h' : 'v';
    }
    if (axisRef.current !== 'h') return;
    let d = rawDx;
    if (!canLeft  && d < 0) d = 0;
    if (!canRight && d > 0) d = 0;
    if (Math.abs(d) > MAX_DRAG) d = Math.sign(d) * (MAX_DRAG + (Math.abs(d) - MAX_DRAG) * 0.25);
    setDx(d);
  };

  const onTouchEnd = () => {
    let fired = false;
    if (axisRef.current === 'h') {
      if (dx <= -THRESHOLD && canLeft)       { onSwipeLeft();  fired = true; }
      else if (dx >= THRESHOLD && canRight)  { onSwipeRight(); fired = true; }
    }
    firedRef.current = fired;
    resetGesture();
  };

  const onTouchCancel = () => {
    firedRef.current = false;
    resetGesture();
  };

  const onClickCapture = (e) => {
    if (firedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      firedRef.current = false;
    }
  };

  const activeSide = dx < 0 ? 'left' : dx > 0 ? 'right' : null;
  const crossed = Math.abs(dx) >= THRESHOLD;
  const bg = activeSide === 'left' ? leftBg : activeSide === 'right' ? rightBg : 'transparent';

  return (
    <div className={`relative overflow-hidden ${rounded}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{ background: bg, opacity: activeSide ? 1 : 0, transition: 'opacity 0.12s ease' }}>
        {activeSide === 'right' && rightLabel && (
          <div className="flex items-center gap-2 pl-5 text-white">
            <Icon name={rightIcon} className={`w-5 h-5 transition-transform ${crossed ? 'scale-125' : ''}`} strokeWidth={2.5} />
            <span className={`font-black text-xs uppercase tracking-wider transition-opacity ${crossed ? 'opacity-100' : 'opacity-80'}`}>{rightLabel}</span>
          </div>
        )}
        {activeSide === 'left' && leftLabel && (
          <div className="flex items-center gap-2 ml-auto pr-5 text-white">
            <span className={`font-black text-xs uppercase tracking-wider transition-opacity ${crossed ? 'opacity-100' : 'opacity-80'}`}>{leftLabel}</span>
            <Icon name={leftIcon} className={`w-5 h-5 transition-transform ${crossed ? 'scale-125' : ''}`} strokeWidth={2.5} />
          </div>
        )}
      </div>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        onClickCapture={onClickCapture}
        style={{
          transform: `translateX(${dx}px)`,
          transition: dragging ? 'none' : 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
          touchAction: 'pan-y'
        }}>
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ title, count, onAdd, addLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-black text-amber-50" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{title}</h2>
        <span className="text-sm font-bold text-amber-300/40">{count}</span>
      </div>
      <button onClick={onAdd}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
        style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))', boxShadow: '0 4px 20px var(--theme-glow)' }}>
        <Icon name="plus" className="w-4 h-4 text-black" strokeWidth={3} />
        <span className="text-black">{addLabel}</span>
      </button>
    </div>
  );
}

function EmptyState({ message, icon }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 mb-4">
        <Icon name={icon} className="w-7 h-7 text-amber-400/60" />
      </div>
      <p className="text-amber-200/50 text-sm">{message}</p>
    </div>
  );
}

// ============ SEARCH INPUT ============
function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="mb-3 relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/40 pointer-events-none">
        <Icon name="search" className="w-4 h-4" />
      </div>
      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-amber-50 placeholder:text-amber-200/30 text-sm focus:outline-none focus:border-amber-500/40 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-amber-200/50 hover:text-amber-400 hover:bg-white/5 transition-colors">
          <Icon name="x" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ============ ADD MODAL ============
function AddModal({ t, type, onSave, onClose, tags, onOpenSettings, habits = [] }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('personal');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [target, setTarget] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [notes, setNotes] = useState('');
  const [useNumeric, setUseNumeric] = useState(false);
  const [numTarget, setNumTarget] = useState(100);
  const [numUnit, setNumUnit] = useState('');
  const [important, setImportant] = useState(false);
  // т.2.10 sub-3: tagIds is an additive multi-select state alongside the
  // legacy single `category`. Items can have zero tags — that's valid.
  const [tagIds, setTagIds] = useState([]);
  // т.2.11: stackedAfter — id of the parent habit this new habit comes after,
  // or null for "Самостоятелен". For a brand-new habit no cycle is possible
  // (it doesn't exist yet), so we just exclude archived parents.
  const [stackedAfter, setStackedAfter] = useState(null);

  const handleSave = () => {
    if (!name.trim()) return;
    const data = { name: name.trim(), category, notes, tagIds };
    if (type === 'habit') {
      const parsedTarget = parseInt(target);
      data.target = (Number.isFinite(parsedTarget) && parsedTarget > 0) ? parsedTarget : null;
      data.reminderTime = reminderTime;
      data.important = important;
      data.stackedAfter = stackedAfter;
    }
    if (type === 'goal') {
      data.deadline = deadline;
      if (useNumeric) {
        data.numeric = { current: 0, target: parseFloat(numTarget) || 100, unit: numUnit };
      }
    }
    if (type === 'task') {
      data.deadline = deadline;
      data.priority = priority;
      data.reminderTime = reminderTime;
    }
    onSave(type, data);
  };

  const titleMap = { habit: t.addHabit, goal: t.addGoal, task: t.addTask };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }} onClick={onClose}
      role="dialog" aria-modal="true" aria-labelledby="add-modal-title">
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-500/20 p-6 max-h-[90vh] overflow-y-auto scroll-hide"
        style={{ background: 'linear-gradient(180deg, var(--theme-bg-from), var(--theme-bg-mid))', animation: 'slideUp 0.3s ease', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 id="add-modal-title" className="text-xl font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{titleMap[type]}</h3>
          <button onClick={onClose} aria-label={t.cancel} className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/50">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.name}</label>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.category}</label>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {Object.keys(CATEGORY_META).map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`p-2 rounded-xl border transition-all ${category === cat ? 'border-amber-500/60 bg-amber-500/10' : 'border-white/5 bg-white/[0.02]'}`}>
                  <div className="text-xl">{CATEGORY_META[cat].emoji}</div>
                  <div className="text-[9px] font-bold text-amber-100/70 mt-0.5">{t.categories[cat]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* т.2.10 sub-3: tags chip-selector — стои като отделен ред под "Категория".
              Старото поле остава непокътнато; таговете са допълнителен (optional)
              слой, multi-select. При липсващи дефинирани тагове показваме CTA
              към Settings. */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.tagsLabel}</label>
            <div className="mt-1.5">
              <TagChipSelector t={t} tags={tags} selected={tagIds} onChange={setTagIds} onOpenSettings={onOpenSettings} />
            </div>
          </div>

          {type === 'habit' && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.targetOptional}</label>
                <input type="number" min="1" inputMode="numeric" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="30"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} className="accent-amber-500 w-4 h-4" />
                <Icon name="star" className="w-4 h-4" fill={important ? '#fbbf24' : 'none'} strokeWidth={important ? 0 : 2} />
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-300/80">{t.importantHabit}</span>
              </label>
              {/* т.2.11: stack-parent dropdown. New habits can stack after any
                  active habit; cycles are impossible at create-time because the
                  new habit has no id yet. */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1">
                  <Icon name="chain" className="w-3 h-3" />{t.stackedAfter}
                </label>
                <select value={stackedAfter == null ? '' : String(stackedAfter)}
                  onChange={(e) => {
                    const v = e.target.value;
                    setStackedAfter(v === '' ? null : Number(v));
                  }}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50">
                  <option value="">{t.standalone}</option>
                  {habits.filter(h => !h.archived).map(h => (
                    <option key={h.id} value={String(h.id)}>{h.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {(type === 'goal' || type === 'task') && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.deadline}</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
            </div>
          )}

          {type === 'goal' && (
            <div>
              <label className="flex items-center gap-2 text-xs text-amber-100">
                <input type="checkbox" checked={useNumeric} onChange={(e) => setUseNumeric(e.target.checked)} className="accent-amber-500" />
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-300/60">{t.numericGoal}</span>
              </label>
              {useNumeric && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input type="number" value={numTarget} onChange={(e) => setNumTarget(e.target.value)} placeholder={t.targetValue}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
                  <input value={numUnit} onChange={(e) => setNumUnit(e.target.value)} placeholder={t.unit}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50" />
                </div>
              )}
            </div>
          )}

          {type === 'task' && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.priority}</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map(p => (
                    <button key={p} onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl border text-xs font-bold uppercase transition-all ${priority === p ? `${PRIORITY_COLORS[p].bg} ${PRIORITY_COLORS[p].text} ${PRIORITY_COLORS[p].border}` : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                      {t[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="bell" className="w-3 h-3" />{t.reminderTime}</label>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold flex items-center gap-1"><Icon name="note" className="w-3 h-3" />{t.notes}</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.addNote} rows={2}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-amber-500/50 resize-none" />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-100/70 font-bold">{t.cancel}</button>
          <button onClick={handleSave} disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl font-black text-black disabled:opacity-40 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark))', boxShadow: '0 4px 20px var(--theme-glow)' }}>
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ SETTINGS MODAL ============
function SettingsModal({ t, settings, setSettings, onClose, onExport, onRequestImport, onLoadSample, notifPermission, onRequestNotif, tags, onAddTag, onRenameTag, onRequestDeleteTag }) {
  const fileRef = useRef(null);

  const set = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }} onClick={onClose}
      role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-500/20 p-6 max-h-[90vh] overflow-y-auto scroll-hide"
        style={{ background: 'linear-gradient(180deg, var(--theme-bg-from), var(--theme-bg-mid))', animation: 'slideUp 0.3s ease', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 id="settings-modal-title" className="text-xl font-black text-amber-100" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{t.settings}</h3>
          <button onClick={onClose} aria-label={t.cancel} className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/50">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* APPEARANCE */}
          <SettingsSection icon="palette" title={t.appearance}>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.theme}</label>
              <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                {Object.entries(THEMES).map(([k, th]) => (
                  <button key={k} onClick={() => set('theme', k)}
                    className={`aspect-square rounded-xl border-2 transition-all relative overflow-hidden ${settings.theme === k ? 'border-white/60 scale-105' : 'border-white/10'}`}
                    style={{ background: `linear-gradient(135deg, ${th.primary}, ${th.primaryDark})` }}>
                    {settings.theme === k && <Icon name="check" className="w-4 h-4 text-white absolute top-1 right-1" strokeWidth={3} />}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-1.5 mt-1">
                {Object.keys(THEMES).map(k => (
                  <div key={k} className="text-[8px] text-center text-amber-200/50 font-bold uppercase">{t[THEMES[k].label]}</div>
                ))}
              </div>
            </div>

            <ToggleRow icon="moon" label={t.lightMode} value={settings.lightMode} onChange={v => set('lightMode', v)} />

            <div>
              <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.textSize}</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {['sm', 'md', 'lg'].map(s => (
                  <button key={s} onClick={() => set('textSize', s)}
                    className={`py-2 rounded-xl border font-bold transition-all ${settings.textSize === s ? 'border-amber-500/60 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}
                    style={{ fontSize: s === 'sm' ? '12px' : s === 'md' ? '14px' : '16px' }}>
                    Aa
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="text-[10px] text-center text-amber-200/50">{t.sizeSmall}</div>
                <div className="text-[10px] text-center text-amber-200/50">{t.sizeMedium}</div>
                <div className="text-[10px] text-center text-amber-200/50">{t.sizeLarge}</div>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">{t.weekStart}</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <button onClick={() => set('weekStart', 1)}
                  className={`py-2 rounded-xl border font-bold transition-all text-sm ${settings.weekStart === 1 ? 'border-amber-500/60 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                  {t.monday}
                </button>
                <button onClick={() => set('weekStart', 0)}
                  className={`py-2 rounded-xl border font-bold transition-all text-sm ${settings.weekStart === 0 ? 'border-amber-500/60 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                  {t.sunday}
                </button>
              </div>
            </div>

            <ToggleRow icon="volume" label={t.sound} value={settings.sound} onChange={v => set('sound', v)} />
            <ToggleRow icon="zap" label={t.vibration} value={settings.vibration} onChange={v => set('vibration', v)} />
          </SettingsSection>

          {/* BEHAVIOR */}
          <SettingsSection icon="settings" title={t.behavior}>
            <div className="space-y-3">
              <ToggleRow icon="bell" label={t.eveningReminder} value={settings.eveningReminder} onChange={v => set('eveningReminder', v)} desc={t.eveningReminderDesc} />
              {settings.eveningReminder && (
                <div className="ml-6">
                  <input type="time" value={settings.eveningReminderTime}
                    onChange={(e) => set('eveningReminderTime', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 focus:outline-none focus:border-amber-500/50" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <Icon name="snowflake" className="w-4 h-4 text-sky-400" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-100 text-sm">{t.freezeDays}</p>
                      <p className="text-xs text-amber-200/50">{t.freezeDaysDesc}</p>
                    </div>
                  </div>
                  <span className="text-xl font-black text-amber-300" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>{settings.freezeDays}</span>
                </div>
                <input type="range" min="0" max="3" step="1" value={settings.freezeDays}
                  onChange={(e) => set('freezeDays', parseInt(e.target.value))}
                  className="w-full mt-2 accent-amber-500" />
                <div className="flex justify-between text-[10px] text-amber-200/40 mt-0.5 px-1">
                  <span>0</span><span>1</span><span>2</span><span>3</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Icon name="clock" className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-100 text-sm">{t.backfillDays}</p>
                      <p className="text-xs text-amber-200/50">{t.backfillDaysDesc}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[0, 3, 7, 14].map(d => (
                    <button key={d} onClick={() => set('backfillDays', d)}
                      className={`py-2 rounded-lg border font-bold text-sm transition-all ${settings.backfillDays === d ? 'border-amber-500/60 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                      {d === 0 ? t.backfillOff : d}
                    </button>
                  ))}
                </div>
              </div>

              <ToggleRow icon="archive" label={t.autoArchive} value={settings.autoArchive} onChange={v => set('autoArchive', v)} desc={t.autoArchiveDesc} />
              {settings.autoArchive && (
                <div className="ml-6">
                  <label className="text-[10px] uppercase tracking-wider text-amber-300/60 font-bold">{t.archiveDays}</label>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {[3, 7, 14, 30].map(d => (
                      <button key={d} onClick={() => set('archiveDays', d)}
                        className={`py-2 rounded-lg border font-bold text-sm transition-all ${settings.archiveDays === d ? 'border-amber-500/60 bg-amber-500/10 text-amber-200' : 'border-white/5 bg-white/[0.02] text-amber-200/40'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <ToggleRow icon="zap" label={t.quickIncrement} value={settings.quickIncrement} onChange={v => set('quickIncrement', v)} desc={t.quickIncrementDesc} />
            </div>
          </SettingsSection>

          {/* TAGS / т.2.10 */}
          {Array.isArray(tags) && (
            <SettingsSection icon="palette" title={t.tags}>
              {t.tagsDesc && <p className="text-xs text-amber-200/60 leading-relaxed -mt-1">{t.tagsDesc}</p>}
              <TagsManager
                t={t} tags={tags}
                onAdd={onAddTag} onRename={onRenameTag} onRequestDelete={onRequestDeleteTag}
              />
            </SettingsSection>
          )}

          {/* NOTIFICATIONS */}
          {notifPermission !== 'granted' && (
            <button onClick={onRequestNotif}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-left">
              <Icon name="bell" className="w-5 h-5 text-amber-400" />
              <div className="flex-1">
                <p className="font-bold text-amber-100">{t.enableNotifications}</p>
                {notifPermission === 'denied' && <p className="text-xs text-rose-400 mt-0.5">{t.notifDenied}</p>}
              </div>
            </button>
          )}

          {/* DATA */}
          <SettingsSection icon="download" title={t.data}>
            <button onClick={onExport}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all">
              <Icon name="download" className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-amber-100">{t.exportData}</p>
                {t.backupDesc && <p className="text-xs text-amber-200/50">{t.backupDesc}</p>}
              </div>
            </button>

            <button onClick={() => fileRef.current?.click()}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all">
              <Icon name="upload" className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-amber-100">{t.importData}</p>
                {t.restoreDesc && <p className="text-xs text-amber-200/50">{t.restoreDesc}</p>}
              </div>
            </button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden"
              onChange={(e) => { if (e.target.files[0]) { onRequestImport(e.target.files[0]); e.target.value = ''; }}} />

            {onLoadSample && (
              <button onClick={onLoadSample}
                className="w-full flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all">
                <Icon name="sparkles" className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-amber-100">{t.loadSampleData}</p>
                  <p className="text-xs text-amber-200/50">{t.sampleDataDesc}</p>
                </div>
              </button>
            )}
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ icon, title, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-300/60 font-bold">
        <Icon name={icon} className="w-3.5 h-3.5" />
        <span>{title}</span>
      </div>
      <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ icon, label, desc, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className="w-4 h-4 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-amber-100 text-sm">{label}</p>
        {desc && <p className="text-xs text-amber-200/50">{desc}</p>}
      </div>
      <button onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full relative transition-all flex-shrink-0 ${value ? 'bg-amber-500' : 'bg-white/10'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${value ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

// ============ TAG CHIP SELECTOR (т.2.10 sub-3) ============
// Reusable multi-select chip row used in:
//   - AddModal (under the legacy Категория field) — for new habit/goal/task
//   - HabitsView / GoalsView / TasksView expanded edit panels — to retag items inline
// The component is purely presentational: it gets the global tag list and the
// currently-selected ids, and emits the next array via `onChange`. Tags are
// optional — passing an empty `selected` array is a valid state.
// Empty state (no tags defined yet): shows a subtle CTA button that calls
// `onOpenSettings`, which opens SettingsModal where the user can create the
// first tag in TagsManager. SettingsModal renders on top of the current modal
// (or expanded panel), so when the user closes it they return to this exact
// row, now populated with the freshly-created tag(s).
function TagChipSelector({ t, tags, selected, onChange, onOpenSettings }) {
  const list = Array.isArray(tags) ? tags : [];
  const selectedSet = new Set(selected || []);

  if (list.length === 0) {
    return (
      <button
        type="button"
        onClick={onOpenSettings}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-bold hover:bg-amber-500/20 active:scale-95 transition-all">
        <Icon name="plus" className="w-3 h-3" />
        {t.addFirstTag}
      </button>
    );
  }

  const toggle = (id) => {
    if (selectedSet.has(id)) {
      onChange((selected || []).filter(x => x !== id));
    } else {
      onChange([...(selected || []), id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map(tag => {
        const on = selectedSet.has(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            aria-pressed={on}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all active:scale-95 max-w-[140px] truncate ${on ? 'border-white/50' : 'border-white/10 hover:border-white/25'}`}
            style={on
              ? { background: tag.color, color: '#0a0604', boxShadow: `0 0 10px ${tag.color}66` }
              : { background: `${tag.color}1f`, color: tag.color }}
            title={tag.name}>
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}

// ============ TAG FILTER BAR (т.2.10 sub-4) ============
// Multi-select pill row that lives above HabitsView / GoalsView / TasksView
// lists. Click on a tag toggles it on/off in the filter set; OR semantics
// across the selected tags (an item matches if it has ≥1 of the selected
// tagIds). When ≥1 filter is active, a small "×" pill appears at the end
// to clear all filters in one tap.
//
// Empty state: if no tags are defined globally, the component renders null
// — the row simply doesn't appear, so users who never created tags don't
// see dead chrome above their list.
//
// Visual language: identical to TagChipSelector pills (selected = solid
// color + dark text; deselected = faint colored bg + colored text). The
// "filter" semantics are conveyed by position (page-level, above the list)
// rather than by a different pill style — keeps the visual vocabulary
// tight.
function TagFilterBar({ t, tags, selected, onChange }) {
  const list = Array.isArray(tags) ? tags : [];
  if (list.length === 0) return null;

  const selectedSet = new Set(selected || []);
  const hasActive = (selected || []).length > 0;

  const toggle = (id) => {
    if (selectedSet.has(id)) {
      onChange((selected || []).filter(x => x !== id));
    } else {
      onChange([...(selected || []), id]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-3 px-1">
      {list.map(tag => {
        const on = selectedSet.has(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            aria-pressed={on}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all active:scale-95 max-w-[140px] truncate ${on ? 'border-white/50' : 'border-white/10 hover:border-white/25'}`}
            style={on
              ? { background: tag.color, color: '#0a0604', boxShadow: `0 0 10px ${tag.color}66` }
              : { background: `${tag.color}1f`, color: tag.color }}
            title={tag.name}>
            {tag.name}
          </button>
        );
      })}
      {hasActive && (
        <button
          type="button"
          onClick={() => onChange([])}
          aria-label={t.tagFilterClear}
          title={t.tagFilterClear}
          className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] text-amber-200/60 hover:bg-white/[0.06] hover:text-amber-300 active:scale-95 transition-all flex items-center">
          <Icon name="x" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// ============ TAGS MANAGER (т.2.10) ============
// CRUD UI for the global tag list. Lives inside SettingsModal under the
// "Категории" section. The chip-selector that uses these tags inside the
// add/edit modals is т.2.10 sub-3 and is intentionally NOT wired here yet
// — that's the next chat. Sub-1 (state + migration) and sub-2 (CRUD screen)
// are what this component delivers.
function TagsManager({ t, tags, onAdd, onRename, onRequestDelete }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(TAG_COLORS[0]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState(TAG_COLORS[0]);

  const startEdit = (tag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
    setEditColor(tag.color);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };
  const saveEdit = () => {
    if (!editName.trim()) return;
    onRename(editingId, editName.trim(), editColor);
    setEditingId(null);
    setEditName('');
  };
  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), color);
    setName('');
    setColor(TAG_COLORS[0]);
  };

  return (
    <div className="space-y-3">
      {/* Add row */}
      <div className="space-y-2 p-3 rounded-xl border border-white/5 bg-white/[0.03]">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder={t.tagName}
          maxLength={32}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
        />
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={t.tagColor}>
          {TAG_COLORS.map(c => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={color === c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 transition-all active:scale-90 ${color === c ? 'border-white scale-110' : 'border-white/20 hover:border-white/40'}`}
              style={{ background: c }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!name.trim()}
          className="w-full py-2 rounded-lg font-bold text-black text-sm disabled:opacity-40 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, var(--theme-primary, #f59e0b), var(--theme-primary-dark, #ea580c))' }}>
          {t.addTag}
        </button>
      </div>

      {/* Existing tags list */}
      {tags.length === 0 ? (
        <p className="text-xs text-amber-200/50 italic text-center py-2">{t.noTagsYet}</p>
      ) : (
        <div className="space-y-1.5">
          {tags.map(tag => editingId === tag.id ? (
            <div key={tag.id} className="space-y-2 p-2.5 rounded-xl bg-white/[0.05] border border-amber-500/30">
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') { e.preventDefault(); saveEdit(); }
                  if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
                }}
                maxLength={32}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
              />
              <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={t.tagColor}>
                {TAG_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={editColor === c}
                    onClick={() => setEditColor(c)}
                    className={`w-5 h-5 rounded-full border-2 transition-all active:scale-90 ${editColor === c ? 'border-white scale-110' : 'border-white/20 hover:border-white/40'}`}
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-100/70 text-xs font-bold">
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={!editName.trim()}
                  className="flex-1 py-1.5 rounded-lg font-bold text-black text-xs disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, var(--theme-primary, #f59e0b), var(--theme-primary-dark, #ea580c))' }}>
                  {t.save}
                </button>
              </div>
            </div>
          ) : (
            <div key={tag.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span
                className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                style={{ background: tag.color, boxShadow: `0 0 6px ${tag.color}88` }}
                aria-hidden="true"
              />
              <span className="flex-1 text-sm text-amber-100 truncate font-medium">{tag.name}</span>
              <button
                type="button"
                onClick={() => startEdit(tag)}
                aria-label={t.editTag}
                title={t.editTag}
                className="p-1.5 rounded-lg hover:bg-white/5 text-amber-200/60 active:scale-90 transition-all">
                <Icon name="edit" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onRequestDelete(tag.id)}
                aria-label={t.deleteTag}
                title={t.deleteTag}
                className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-300/70 hover:text-rose-300 active:scale-90 transition-all">
                <Icon name="trash" className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

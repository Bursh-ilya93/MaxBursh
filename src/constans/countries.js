const COUNTRIES = [
	"Беларусь",
	"Россия",
	"Украина",
	"Казахстан",
	"Австралия",
	"Австрия",
	"Азербайджан",
	"Албания",
	"Алжир",
	"Американское Самоа",
	"Ангилья",
	"Ангола",
	"Андорра",
	"Антигуа и Барбуда",
	"Аргентина",
	"Армения",
	"Аруба",
	"Афганистан",
	"Багамы",
	"Бангладеш",
	"Барбадос",
	"Бахрейн",
	"Белиз",
	"Бельгия",
	"Бенин",
	"Бермуды",
	"Болгария",
	"Боливия",
	"Бонайре, Синт-Эстатиус и Саба",
	"Босния и Герцеговина",
	"Ботсвана",
	"Бразилия",
	"Бруней",
	"Буркина-Фасо",
	"Бурунди",
	"Бутан",
	"Вануату",
	"Ватикан",
	"Великобритания",
	"Венгрия",
	"Венесуэла",
	"Виргинские острова, Великобритания",
	"Виргинские острова, США",
	"Восточный Тимор",
	"Вьетнам",
	"Габон",
	"Гаити",
	"Гайана",
	"Гамбия",
	"Гана",
	"Гваделупа",
	"Гватемала",
	"Гвинея",
	"Гвинея-Бисау",
	"Германия",
	"Гернси",
	"Гибралтар",
	"Гондурас",
	"Гонконг",
	"Гренада",
	"Гренландия",
	"Греция",
	"Грузия",
	"Гуам",
	"Дания",
	"Джерси",
	"Джибути",
	"Доминика",
	"Доминиканская Республика",
	"Египет",
	"Замбия",
	"Западная Сахара",
	"Зимбабве",
	"Израиль",
	"Индия",
	"Индонезия",
	"Иордания",
	"Ирак",
	"Иран",
	"Ирландия",
	"Исландия",
	"Испания",
	"Италия",
	"Йемен",
	"Кабо-Верде",
	"Камбоджа",
	"Камерун",
	"Канада",
	"Катар",
	"Кения",
	"Кипр",
	"Кирибати",
	"Китай",
	"Колумбия",
	"Коморы",
	"Конго",
	"Конго, демократическая республика",
	"Коста-Рика",
	"Кот-д'Ивуар",
	"Куба",
	"Кувейт",
	"Кыргызстан",
	"Кюрасао",
	"Лаос",
	"Латвия",
	"Лесото",
	"Либерия",
	"Ливан",
	"Ливия",
	"Литва",
	"Лихтенштейн",
	"Люксембург",
	"Маврикий",
	"Мавритания",
	"Мадагаскар",
	"Макао",
	"Македония",
	"Малави",
	"Малайзия",
	"Мали",
	"Мальдивы",
	"Мальта",
	"Марокко",
	"Мартиника",
	"Маршалловы Острова",
	"Мексика",
	"Микронезия, федеративные штаты",
	"Мозамбик",
	"Молдова",
	"Монако",
	"Монголия",
	"Монтсеррат",
	"Мьянма",
	"Намибия",
	"Науру",
	"Непал",
	"Нигер",
	"Нигерия",
	"Нидерланды",
	"Никарагуа",
	"Ниуэ",
	"Новая Зеландия",
	"Новая Каледония",
	"Норвегия",
	"Объединенные Арабские Эмираты",
	"Оман",
	"Остров Мэн",
	"Остров Норфолк",
	"Острова Кайман",
	"Острова Кука",
	"Острова Теркс и Кайкос",
	"Пакистан",
	"Палау",
	"Палестинская автономия",
	"Панама",
	"Папуа — Новая Гвинея",
	"Парагвай",
	"Перу",
	"Питкерн",
	"Польша",
	"Португалия",
	"Пуэрто-Рико",
	"Реюньон",
	"Руанда",
	"Румыния",
	"США",
	"Сальвадор",
	"Самоа",
	"Сан-Марино",
	"Сан-Томе и Принсипи",
	"Саудовская Аравия",
	"Свазиленд",
	"Святая Елена",
	"Северная Корея",
	"Северные Марианские острова",
	"Сейшелы",
	"Сенегал",
	"Сент-Винсент и Гренадины",
	"Сент-Китс и Невис",
	"Сент-Люсия",
	"Сент-Пьер и Микелон",
	"Сербия",
	"Сингапур",
	"Синт-Мартен",
	"Сирия",
	"Словакия",
	"Словения",
	"Соломоновы Острова",
	"Сомали",
	"Судан",
	"Суринам",
	"Сьерра-Леоне",
	"Таджикистан",
	"Таиланд",
	"Тайвань",
	"Танзания",
	"Того",
	"Токелау",
	"Тонга",
	"Тринидад и Тобаго",
	"Тувалу",
	"Тунис",
	"Туркменистан",
	"Турция",
	"Уганда",
	"Узбекистан",
	"Уоллис и Футуна",
	"Уругвай",
	"Фарерские острова",
	"Фиджи",
	"Филиппины",
	"Финляндия",
	"Фолклендские острова",
	"Франция",
	"Французская Гвиана",
	"Французская Полинезия",
	"Хорватия",
	"Центральноафриканская Республика",
	"Чад",
	"Черногория",
	"Чехия",
	"Чили",
	"Швейцария",
	"Швеция",
	"Шпицберген и Ян Майен",
	"Шри-Ланка",
	"Эквадор",
	"Экваториальная Гвинея",
	"Эритрея",
	"Эстония",
	"Эфиопия",
	"Южная Корея",
	"Южно-Африканская Республика",
	"Южный Судан",
	"Ямайка",
	"Япония"
];

export default COUNTRIES;
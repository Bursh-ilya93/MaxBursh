const BANKS = [
	{
		id         : 1,
		name       : "Беларусбанк",
		commission : false,
		ibanPrefix : 'AKBB',
		img        : 'asb.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			},
			{
				id   : 2,
				name : "Вкладной счёт"
			}
		],
		offices    : [
			{
				id   : 100,
				name : "Бресткое областное управление (г. Брест)",
				mfo  : "AKBBBY21100",
				unn  : "200246676"
			},
			{
				id   : 113,
				name : "г. Кобрин",
				mfo  : "AKBBBY21113",
				unn  : "200095969"
			},
			{
				id   : 121,
				name : "г. Пинск",
				mfo  : "AKBBBY21121",
				unn  : "200287840"
			},
			{
				id   : 200,
				name : "Витебское областное управление (г. Витебск)",
				mfo  : "AKBBBY21200",
				unn  : "300229956"
			},
			{
				id   : 215,
				name : "г. Орша",
				mfo  : "AKBBBY21215",
				unn  : "300460375"
			},
			{
				id   : 216,
				name : "г. Полоцк",
				mfo  : "AKBBBY21216",
				unn  : "300230580"
			},
			{
				id   : 300,
				name : "Гомельское областное управление (г. Гомель)",
				mfo  : "AKBBBY21300",
				unn  : "400207877"
			},
			{
				id   : 302,
				name : "г. Гомель",
				mfo  : "AKBBBY21302",
				unn  : "400230505"
			},
			{
				id   : 312,
				name : "г. Жлобин",
				mfo  : "AKBBBY21312",
				unn  : "400230362"
			},
			{
				id   : 317,
				name : "г. Мозырь",
				mfo  : "AKBBBY21317",
				unn  : "400230388"
			},
			{
				id   : 400,
				name : "Гродненское областное управление (г. Гродно)",
				mfo  : "AKBBBY21400",
				unn  : "500156630"
			},
			{
				id   : 402,
				name : "г. Волковыск",
				mfo  : "AKBBBY21402",
				unn  : "500054844"
			},
			{
				id   : 413,
				name : "г. Лида",
				mfo  : "AKBBBY21413",
				unn  : "500191715"
			},
			{
				id   : 500,
				name : "Минское управление (г. Минск)",
				mfo  : "AKBBBY21500",
				unn  : "100603596"
			},
			{
				id   : 510,
				name : "г. Минск",
				mfo  : "AKBBBY21510",
				unn  : "100633430"
			},
			{
				id   : 511,
				name : "г. Минск",
				mfo  : "AKBBBY21511",
				unn  : "100349858"
			},
			{
				id   : 514,
				name : "г. Минск",
				mfo  : "AKBBBY21514",
				unn  : "100420097"
			},
			{
				id   : 527,
				name : "'Белжелдор' (г. Минск)",
				mfo  : "AKBBBY21527",
				unn  : "100783330"
			},
			{
				id   : 529,
				name : "'Белсвязь' (г. Минск)",
				mfo  : "AKBBBY21529",
				unn  : "100348175"
			},
			{
				id   : 601,
				name : "г. Молодечно",
				mfo  : "AKBBBY21601",
				unn  : "600198997"
			},
			{
				id   : 612,
				name : "г. Борисов",
				mfo  : "AKBBBY21612",
				unn  : "600214007"
			},
			{
				id   : 614,
				name : "г. Минск",
				mfo  : "153001520",
				unn  : "AKBBBY21614"
			},
			{
				id   : 633,
				name : "г. Солигорск",
				mfo  : "AKBBBY21633",
				unn  : "600286255"
			},
			{
				id   : 700,
				name : "Могилевское областное управление (г. Могилев)",
				mfo  : "AKBBBY21700",
				unn  : "700007079"
			},
			{
				id   : 703,
				name : "г. Бобруйск",
				mfo  : "AKBBBY21703",
				unn  : "700189758"
			},
			{
				id   : 714,
				name : "г Кричев",
				mfo  : "AKBBBY21714",
				unn  : "700046636"
			},
			{
				id   : 795,
				name : "г Минск",
				mfo  : "AKBBBY2X",
				unn  : "100325912"
			},
			{
				id   : 802,
				name : "г. Барановичи",
				mfo  : "AKBBBY21802",
				unn  : "200369858"
			}
		]
	},
	{
		id         : 2,
		name       : "Беагропромбанк",
		commission : false,
		ibanPrefix : 'BAPB',
		img        : 'bapb-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Филиал ОАО \"Беагропромбанк\" Минское областное управление",
				mfo  : "BAPBBY2X",
				unn  : "100693551"
			},
			{
				id   : 3,
				name : "Филиал ОАО \"Беагропромбанк\" Витебское областное управление",
				mfo  : "BAPBBY22424",
				unn  : "300149648"
			},
			{
				id   : 4,
				name : "Филиал ОАО \"Беагропромбанк\" Гродненское областное управление",
				mfo  : "BAPBBY24457",
				unn  : "500055228"
			},
			{
				id   : 5,
				name : "Филиал ОАО \"Беагропромбанк\" Могилевское областное управление",
				mfo  : "BAPBBY27458",
				unn  : "700187278"
			},
			{
				id   : 6,
				name : "Филиал ОАО \"Беагропромбанк\" Гомельское областное управление",
				mfo  : "BAPBBY23912",
				unn  : "400060581"
			}
		]
	},
	{
		id         : 3,
		name       : "Приорбанк",
		commission : false,
		ibanPrefix : 'PJCB',
		img        : 'priorbank-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Приорбанк",
				mfo  : "PJCBBY2X",
				unn  : "100220190"
			}
		]
	},
	{
		id         : 4,
		name       : "БПС сбербанк",
		commission : false,
		ibanPrefix : 'BPSB',
		img        : 'bps-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "БПС-Сбербанк",
				mfo  : "BPSBBY2X",
				unn  : "100219673"
			}
		]
	},
	{
		id         : 5,
		name       : "Технобанк",
		commission : true,
		ibanPrefix : 'TECN',
		img        : 'techno-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Технобанк",
				mfo  : "TECNBY22",
				unn  : "100706562"
			}
		]
	},
	{
		id         : 6,
		name       : "Белинвестбанк",
		commission : false,
		ibanPrefix : 'BLBB',
		img        : 'belinvest-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Белинвестбанк",
				mfo  : "BLBBBY2X",
				unn  : "807000028"
			}
		],
	},
	{
		id         : 7,
		name       : "Белвэббанк",
		commission : true,
		ibanPrefix : 'BELB',
		img        : 'belveb-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Белвэббанк",
				mfo  : "BELBBY2X",
				unn  : "100394906"
			}
		]
	},
	{
		id         : 8,
		name       : "МТБанк",
		commission : true,
		ibanPrefix : 'MTBK',
		img        : 'mtbank-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "МТБанк",
				mfo  : "MTBKBY22",
				unn  : "100394906"
			}
		]
	},
	{
		id         : 9,
		name       : "Белгазпромбанк",
		commission : true,
		ibanPrefix : 'OLMP',
		img        : 'bgpb-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Белгазпромбанк",
				mfo  : "OLMPBY2X",
				unn  : "100429079"
			}
		]
	},
	{
		id         : 10,
		name       : "Банк Решение",
		commission : true,
		ibanPrefix : 'RSHN',
		img        : 'bank-solution-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Банк Решение",
				mfo  : "RSHNBY2X",
				unn  : "100789114"
			}
		]
	},
	{
		id         : 11,
		name       : "Паритетбанк",
		commission : false,
		ibanPrefix : 'POIS',
		img        : 'paritet-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Паритетбанк",
				mfo  : "POISBY2X",
				unn  : "100233809"
			}
		]
	},
	{
		id         : 12,
		name       : "Москва-Минск",
		commission : true,
		ibanPrefix : 'MMBN',
		img        : 'mmbank-small.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Москва-Минск",
				mfo  : "MMBNBY22",
				unn  : "807000002"
			}
		]
	},
	{
		id         : 13,
		name       : "ЗАО \"Альфа-Банк\"",
		commission : true,
		ibanPrefix : 'ALFA',
		img        : 'alfabank.png',
		type       : [
			{
				id   : 1,
				name : "Карт-счёт"
			}
		],
		offices    : [
			{
				id   : 1,
				name : "Альфа-Банк",
				mfo  : "ALFABY2X",
				unn  : "101541947"
			}
		]
	}
];

export default BANKS;
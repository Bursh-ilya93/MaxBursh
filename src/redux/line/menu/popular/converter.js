export function convertListResp(data = {}) {

	data.sports   = data.sports || [];
	data.leagues  = data.leagues || [];
	data.populars = data.populars || [];

	if ( data.populars.length === 0 ) {
		return {
			sports   : [],
			leagues  : [],
			populars : []
		};
	}

	let sortSport = [
		{'sportId' : 1, 'order' : 1},
		{'sportId' : 3, 'order' : 2},
		{'sportId' : 2, 'order' : 3},
		{'sportId' : 7, 'order' : 5},
		{'sportId' : 4, 'order' : 6},
	];

	let sports = data.sports.map(v => {
		v.id = parseInt(v.id, 10);

		let sort = sortSport.filter((s) => s.sportId === v.id)[0];
		v.sort   = sort ? sort.order : 100;

		return v;
	}).sort((v1, v2) => {
		if ( v1.sort === v2.sort ) {
			return 0;
		}

		return v1.sort > v2.sort ? 1 : -1;
	});

	var popularById = {};

	data.populars = data.populars.map(v => {
		v.id = parseInt(v.id, 10);

		popularById[v.id] = v;

		return v;
	});

	var temp = {};

	let leagues = data.leagues.map(v => {
		v.id         = parseInt(v.id, 10);
		v.sport_id   = parseInt(v.sport_id, 10);
		v.popular_id = parseInt(v.popular_id, 10);

		let popular   = popularById[v.popular_id];
		let sport_id  = v.sport_id;
		let league_id = v.id;

		if ( popular !== undefined ) {
			let popularId = `${sport_id}_${popular.id}`;

			temp[popularId] = {...popular, sport_id, league_id, _id : popularId};
		}

		return v;
	}).sort((v1, v2) => {
		if ( v1.name === v2.name ) {
			return 0;
		}

		return v1.name > v2.name ? 1 : -1;
	});

	let populars = Object.values(temp).sort((v1, v2) => {
		if ( v1.type === v2.type ) {
			if ( v1.name === v2.name ) {
				return 0;
			}

			return v1.name > v2.name ? 1 : -1;
		}

		return v1.type < v2.type ? 1 : -1;
	});

	let showSports = [];
	sports.forEach((s) => {
		const isEvents = populars.filter((event) => event.sport_id === s.id);

		if ( isEvents.length !== 0 ) {
			showSports.push(s);
		}
	});

	return {
		sports : showSports,
		leagues,
		populars
	};
}
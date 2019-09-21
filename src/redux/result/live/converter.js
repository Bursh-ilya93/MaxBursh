import moment from "moment";
export function formatData(data) {
	data.sports  = data.sports || [];
	data.leagues = data.leagues || [];
	data.events  = data.events || [];

	data.sports.sort((v1, v2) => {
		if ( v1.name < v2.name ) {
			return -1;
		}

		if ( v1.name > v2.name ) {
			return 1;
		}

		if ( v1.name === v2.name ) {
			return 0;
		}
	});

	data.leagues.sort((v1, v2) => {
		if ( v1.name < v2.name ) {
			return -1;
		}

		if ( v1.name > v2.name ) {
			return 1;
		}

		if ( v1.name === v2.name ) {
			return 0;
		}
	});

	data.leagues = (function (leagues) {
		let out = {};

		for ( let i = 0, len = leagues.length; i != len; i++ ) {
			let league = leagues[i];
			if ( !out.hasOwnProperty(league.sportId) ) {
				out[league.sportId] = [];
			}

			out[league.sportId].push(league);
		}

		return out;

	})(data.leagues);

	data.events.map((e) => {
		e.name = e.team1 + (e.team2 != '' ? ' - ' + e.team2 : '');

		let m = moment(e.time, "YYYY-MM-DD HH:mm:ss");

		e.timestamp = m.unix();
		e.time      = m.format('HH:mm');
	});

	data.events.sort((v1, v2) => {
		if ( v1.timestamp === v2.timestamp ) {
			if ( v1.name < v2.name ) {
				return -1;
			}

			if ( v1.name > v2.name ) {
				return 1;
			}

			if ( v1.name == v2.name ) {
				return 0;
			}
		}

		if ( v1.timestamp < v2.timestamp ) {
			return -1;
		}

		if ( v1.timestamp > v2.timestamp ) {
			return 1;
		}
	});

	data.events = (function (events) {
		let out = {};

		for ( let i = 0, len = events.length; i != len; i++ ) {
			let event = events[i];

			if ( !out.hasOwnProperty(event.leagueId) ) {
				out[event.leagueId] = [];
			}

			out[event.leagueId].push(event);
		}

		return out;

	})(data.events);

	return data;
}
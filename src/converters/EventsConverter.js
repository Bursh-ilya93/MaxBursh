import moment from "moment";
import EventHelper from "../helpers/EventHelper";
import React from "react";

export function convertEvents(resp) {
	resp = resp || {};

	resp.sports = resp.sports || [];
	resp.leagues = resp.leagues || [];
	resp.events = resp.events || [];
	resp.results = resp.results || [];
	resp.leagues = resp.leagues || [];
	resp.factors = resp.factors || {};
	resp.additional_factors = resp.additional_factors || {};
	resp.additional_factors_count = resp.additional_factors_count || {};

	let sports = resp.sports;

	let leagues = (function (data) {
		const tmp_leagues = {};
		data.forEach((league) => {
			if ( !tmp_leagues.hasOwnProperty(league.sport_id) ) {
				tmp_leagues[league.sport_id] = [];
			}

			tmp_leagues[league.sport_id].push(league);
		});

		return tmp_leagues;
	})(resp.leagues);

	let results = (function (data) {
		const tmp_results = {};

		data.forEach((result) => {
			const event = result.event;
			if ( !tmp_results.hasOwnProperty(event) ) {
				tmp_results[event] = [];
			}

			tmp_results[event].push(result);
		});

		return tmp_results;
	})(resp.results);

	let events = (function (data) {
		data = data.map(e => {
			e.id = parseInt(e.id, 10);
			e.sport_id = parseInt(e.sport_id, 10);
			e.number = parseInt(e.num, 10);
			e.express = parseInt(e.express, 10);
			e.name = e.team1 + (e.team2 !== '' ? ' - ' + e.team2 : '');
			e.results = {};

			if ( results.hasOwnProperty(e.id) ) {
				e.results = EventHelper.parseResults(results[e.id]);
				const {isFinished, comment} = e.results;

				let commentData = comment !== undefined ? comment : '';
				if ( isFinished ) {
					commentData = comment;
				}

				if ( commentData !== '' && commentData !== undefined ) {
					const linkMatch = /([^\"=]{2}|^)((https?):\/\/\S+[^\s.,> )\];'\"!?])/;
					const subst = '$1<a href="$2" target="_blank">$2</a>';

					if ( commentData.match(linkMatch) ) {
						commentData = commentData.replace(linkMatch, subst);
					}
				}

				e.results.commentData = commentData;
			}

			try {
				if ( e.hasOwnProperty('description') ) {
					e.description = e.description !== '' ? JSON.parse(e.description) : {};

					//Нормализация данных для статистики
					if ( e.description.hasOwnProperty('statistic-link') && e.description['statistic-link'] !== '' ) {
						e.description.statistic = e.description['statistic-link'];
					} else if ( e.description.hasOwnProperty('stat') && e.description['stat'] !== '' ) {
						e.description.statistic = "?p=" + e.description['stat'];
					} else {
						e.description.statistic = false;
					}

					e.description.hasWeather = event.description.hasOwnProperty('weather');

					//Нормализация данных для трекера
					if ( e.description.hasOwnProperty('tracker') ) {

						if ( e.description.tracker === 0 ) {
							e.description.tracker = false;
						}
					} else {
						e.description.tracker = false;
					}
				}
			} catch ( e ) {
				e.description = {}
			}

			let m = moment(e.time, "YYYY-MM-DD HH:mm:ss");

			e.m = m;
			e.timestamp = m.unix();
			e.time = m.format('HH:mm');
			e.date = m.format('DD.MM');

			return e;
		})
			.sort(function (v1, v2) {
				if ( v1.timestamp === v2.timestamp ) {
					if ( v1.name === v2.name ) {
						return 0;
					}

					return v1.name > v2.name ? 1 : -1;
				}

				return v1.timestamp > v2.timestamp ? 1 : -1;
			});

		var out = {};
		for ( var i = 0; i !== data.length; ++i ) {
			var event = data[i];
			if ( !out.hasOwnProperty(event.league_id) ) {
				out[event.league_id] = [];
			}

			out[event.league_id].push(event);
		}

		return out;

	})(resp.events);

	let factors = resp.factors;

	let additional_factors = resp.additional_factors;

	let additional_factors_count = resp.additional_factors_count;

	return {
		sports,
		leagues,
		events,
		results,
		factors,
		additional_factors,
		additional_factors_count,
	};
}
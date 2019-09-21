import DescriptionHelper from "./DescriptionHelper";
import lodash from "lodash";
import * as React from "react";

class EventHelper {
	static parseEvents(data) {
		const {sports, leagues, events, results} = Object.assign({}, {...data});
		let result = [];
		sports.forEach((sport) => {
			const leaguesBySport = leagues.filter((league) => league.sport_id === sport.id);
			const sortedLeagues = lodash.sortBy(leaguesBySport, l => l.name);

			sortedLeagues.forEach((league) => {
				const eventsByLeague = events.filter((event) => event.league_id === league.id);

				eventsByLeague.forEach((event) => {
					event['results'] = results.filter((eventResult) => eventResult.event === event.id);
				});

				league['events'] = eventsByLeague;
			});

			sport['leagues'] = sortedLeagues;
			result.push(sport);
		});

		return result;
	}

	/**
	 * Разбираем результаты события
	 *
	 * @param results
	 */
	static parseResults(results) {
		let key = 100;

		let scores = {
			score  : '',
			minute : 0,
			timer  : 0,
		};

		results.forEach((result) => {
			switch ( result.name ) {
				case "score":
					const data = JSON.parse(result.content);
					let score = [];
					if ( "general" in data ) {
						if ( data.general.first !== '' && data.general.second !== '' ) {
							score.push(<span key={key++}>{`${data.general.first}:${data.general.second}`}&nbsp;</span>);
						}
					}

					let gameNum = 1;
					let periodNum = 1;

					if ( "periods" in data && Array.isArray(data.periods) ) {
						let periods = [];

						periodNum = data.periods.length;

						for ( let period of data.periods ) {
							if ( period.first === '' || period.second === '' ) {
								continue;
							}

							gameNum = parseInt(period.first) + parseInt(period.second) + 1;

							periods.push(`${period.first}:${period.second}`);
						}

						if ( periods.length > 0 ) {
							score.push(<span key={key++}>{`(${periods.join(", ")})`}</span>);
						}
					}

					if ( "itog" in data ) {
						scores['isFinished'] = data.itog;
					}

					scores['gameNum'] = gameNum;
					scores['periodNum'] = periodNum;
					scores['score'] = score;
					break;
				case "timer":
					scores['timer'] = parseInt(result.content);//Math.floor(result.content / 60);
					scores['minute'] = Math.floor(result.content / 60);
					break;
				case "minute":

					break;
				case "add":
					scores['add'] = JSON.parse(result.content);
					break;
				case "turn":
					scores['turn'] = parseInt(result.content);
					break;
				case "period":
					scores['period'] = parseInt(result.content);
					break;
				case "points":
					const points = JSON.parse(result.content);
					scores['points'] = {
						data   : `${points.first}:${points.second}`,
						period : points.period
					};
					break;
				case "game":
					scores['game'] = parseInt(result.content);
					break;
				case "comment":
					scores['comment'] = result.content;
					break;
			}
		});

		return scores;
	}

	/**
	 * Разбираем description у события
	 *
	 * @param eventDescription
	 * @returns {*}
	 */
	static parseDescription(eventDescription) {
		return new DescriptionHelper(eventDescription);
	}

	/**
	 * Вывод времени события в удобном формате
	 *
	 * @param eventTime
	 * @returns {{hours: *, minutes: *, day: *, month: *}}
	 */
	static parseTime(eventTime) {
		const time = new Date(eventTime);
		const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
		const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
		const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
		const month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;

		return {hours, minutes, day, month};
	}

	/**
	 * Разбор команд
	 * если нет второй команды или она пустая, то выводится только одна
	 * @param team1
	 * @param team2
	 * @returns {string}
	 */
	static parseTeams(team1, team2 = '') {
		const strTeam2 = team2 !== '' ? `- ${team2}` : '';
		return `${team1} ${strTeam2}`;
	}

	/**
	 * Поднять спорт с определенным id вверх списка
	 *
	 * @param sports
	 * @param sportId
	 * @returns {*}
	 */
	static sportLiftUp(sports, sportId) {
		for ( let i = 0; i < sports.length; i++ ) {
			if ( parseInt(sports[i].id) !== sportId ) {
				continue;
			}

			const item = sports[i];
			sports.splice(i, 1);
			sports.unshift(item);
		}

		return sports;
	}

	static openVideoOnline(videoId) {
		const params = "menubar=no,location=yes, resizable=no,scrollbars=no,status=no,width=500,height=300";
		window.open(`https://maxline.by/event/video/${videoId}`, 'video online', params);
	}

	static openStatistic(path) {
		const params = "menubar=no,location=yes, resizable=no,scrollbars=no,status=no,width=500,height=300";
		window.open(`https://maxline.by/mstat.php?p=${path}`, 'statistics', params);
	}
}

export default EventHelper;
import React from "react";
import FactorTypes from "../constans/FactorTypes";
import PeriodsSettings from "../constans/PeriodsSettings";
import SportSettings from "../constans/SportSettings";
import _ from "lodash";
import t from "@lib/translate";

class FactorsHelper {
	event = {};

	columns = [];
	rows = {
		0 : {}
	};

	NO_POINT_KEY = 'no-point';

	settings = {};

	head_keys = {
		first      : '1',
		draw       : 'X',
		second     : '2',
		dbl_first  : '1X',
		dbl_draw   : '12',
		dbl_second : 'X2',
		f1         : 'Ф1',
		f1_k       : 'K1',
		f2         : 'Ф2',
		f2_k       : 'K2',
		total      : 'Т',
		total_m    : 'М',
		total_b    : 'Б',
		winner_yes : 'Победит',
		winner_no  : 'Не победит',
	};

	constants = FactorTypes;
	periods_tr = PeriodsSettings;
	sport_settings = SportSettings;

	constructor(event, factors = [], settings) {
		this.settings = settings;
		this.event = event;
		const data = this.parseToHeadOrBody(factors);

		this.convertHead(data.head);

		if ( factors.length > 0 ) {
			this.convertBody(data.body);
		}
	}

	parseToHeadOrBody(factors) {
		const data = {
			head : [],
			body : []
		};

		for ( const factor of factors ) {
			const type = factor.h ? 'head' : 'body';
			data[type].push(factor);
		}

		return data;
	}

	/*HEAD TABLE METHODS*/
	getColumns() {
		return this.columns;
	}

	getRows() {
		return this.rows;
	}

	addColumn(key) {
		this.columns.push(key);
	}

	addCellValue(columnIndex, rowIndex, value) {
		if ( !this.rows.hasOwnProperty(rowIndex) ) {
			this.rows[rowIndex] = {};
		}

		this.rows[rowIndex][columnIndex] = value;
	}

	convertHead(data) {
		const {is2Chance, isDraw, isHandicap, isTotal, periodName, periods} = this.sport_settings[this.event.sport_id];

		this.addColumn(this.head_keys.first);
		if ( isDraw ) {
			this.addColumn(this.head_keys.draw);
		}
		this.addColumn(this.head_keys.second);

		if ( is2Chance ) {
			this.addColumn(this.head_keys.dbl_first);
			this.addColumn(this.head_keys.dbl_draw);
			this.addColumn(this.head_keys.dbl_second);
		}

		if ( isHandicap ) {
			this.addColumn(this.head_keys.f1);
			this.addColumn(this.head_keys.f1_k);
			this.addColumn(this.head_keys.f2);
			this.addColumn(this.head_keys.f2_k);
		}

		if ( isTotal ) {
			this.addColumn(this.head_keys.total);
			this.addColumn(this.head_keys.total_m);
			this.addColumn(this.head_keys.total_b);
		}

		let isWinner = false;
		data.forEach((factor) => {
			if ( factor.t === this.constants.F_WINNER && !isWinner ) {
				this.columns = [];
				this.addColumn(this.head_keys.winner_yes);
				this.addColumn(this.head_keys.winner_no);

				isWinner = true;
			}

			this.generateHeadTable(factor);
		});
	}

	generateHeadTable(factor) {
		switch ( factor.t ) {
			case this.constants.F_OUTCOMES: {
				if ( factor.i === 0 ) {
					this.addCellValue(this.head_keys.draw, factor.p, factor);
				} else {
					const key = factor.i === 1 ? 'first' : 'second';
					this.addCellValue(this.head_keys[key], factor.p, factor);
				}
				break;
			}

			case this.constants.F_DBL_CHANCE: {
				switch ( factor.i ) {
					case 0:
						this.addCellValue(this.head_keys.dbl_draw, factor.p, factor);
						break;
					case 1:
						this.addCellValue(this.head_keys.dbl_first, factor.p, factor);
						break;
					case 2:
						this.addCellValue(this.head_keys.dbl_second, factor.p, factor);
						break;
				}
				break;
			}

			case this.constants.F_FORA: {
				const value = {
					isKoeff : false,
					data    : factor.pt > 0 ? `+${factor.pt}` : factor.pt
				};

				this.addCellValue(this.head_keys[`f${factor.i}`], factor.p, value);
				this.addCellValue(this.head_keys[`f${factor.i}_k`], factor.p, factor);
				break;
			}

			case this.constants.F_TOTAL: {
				const value = {
					isKoeff : false,
					data    : factor.pt
				};

				this.addCellValue(this.head_keys.total, factor.p, value);

				if ( factor.i === 1 ) {
					this.addCellValue(this.head_keys.total_m, factor.p, factor);
				}

				if ( factor.i === 2 ) {
					this.addCellValue(this.head_keys.total_b, factor.p, factor);
				}
				break;
			}

			case this.constants.F_WINNER: {
				if ( factor.i === 1 ) {
					this.addCellValue(this.head_keys.winner_yes, factor.p, factor);
				}

				if ( factor.i === 2 ) {
					this.addCellValue(this.head_keys.winner_no, factor.p, factor);
				}
				break;
			}
		}
	}

	/*HEAD TABLE METHODS END*/

	/*BODY TABLE METHODS*/
	body_rows = {};
	body_rows_count = 0;

	printPeriod(period) {
		const periodData = this.getPeriodName();
		return `${period}-${periodData.gender === 0 ? 'я' : 'й'} ${periodData.value}`;
	}

	convertBody(data) {
		this.body_rows_count = data.length;

		data.forEach((factor) => {
			const nameById = _.find(this.settings.names, x => x.id === factor.n);
			if ( !nameById ) {
				return;
			}

			let name = nameById.value.replace(/%player%/g, factor.hasOwnProperty('pName') ? factor.pName : '').replace(/%p%|\[%p%\]/g, factor.hasOwnProperty('pt') ? factor.pt : '').replace('<', 'меньше').replace('>', 'больше');

			let key = factor.hasOwnProperty('pt') ? factor.pt : this.NO_POINT_KEY;

			if ( factor.p > 0 ) {
				name = `${name}: ${this.printPeriod(factor.p)}`;
			}

			if ( factor.hasOwnProperty('gp') && factor.hasOwnProperty('gn') ) {
				name = `${this.printPeriod(factor.gp)}: ${factor.gn}-й гейм`;
			}

			const defaultSort = 1000;
			const sort = {
				6 : 0,
				7 : 1,
				8 : 2,
			};

			const sorted = sort.hasOwnProperty(factor.n) ? sort[factor.n] : defaultSort;

			const k = sorted + factor.t;
			if ( !this.body_rows.hasOwnProperty(k) ) {
				this.body_rows[k] = {};
			}

			// if ( !this.body_rows[factor.n].hasOwnProperty(name) ) {
			// 	this.body_rows[factor.n][name] = {};
			// }

			switch ( factor.t ) {
				case this.constants.F_TOTAL: {
					const newData = {
						isIndividual : false,
						sort         : factor.pt,
						type         : name,
						team         : factor.i,
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], key, newData, name);
					break;
				}

				case this.constants.F_I_TOTAL: {
					const newData = {
						isIndividual : true,
						sort         : factor.pt,
						type         : name,
						team         : this.getIndividualTeam(factor),
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], key, newData, name);
					break;
				}

				case this.constants.F_BOOL : {
					const newData = {
						isIndividual : false,
						sort         : factor.i,
						type         : name,
						team         : factor.i,
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], this.NO_POINT_KEY, newData, name);
					break;
				}

				case this.constants.F_I_BOOL: {
					const newData = {
						isIndividual : true,
						sort         : factor.i,
						type         : name,
						team         : this.getIndividualTeam(factor),
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], key, newData, name);
					break;
				}

				case this.constants.F_FORA: {
					const newData = {
						isIndividual : false,
						sort         : factor.pt,
						type         : name,
						team         : factor.i,
						text         : this.getTeam(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], factor.pt, newData, name);
					break;
				}

				case this.constants.F_SCORES: {
					const newData = {
						isIndividual : false,
						sort         : factor.i,
						type         : name,
						team         : factor.i,
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], key, newData, name);
					break;
				}

				case this.constants.F_PERIOD_M: {
					const newData = {
						sort         : factor.i,
						isIndividual : false,
						type         : name,
						team         : factor.i,
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], key, newData, name);
					break;
				}

				case this.constants.F_GAMES: {
					const newData = {
						sort         : factor.hasOwnProperty('gn') ? factor.gn : factor.i,
						isIndividual : false,
						type         : name,
						team         : factor.i,
						text         : this.getTeam(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], this.NO_POINT_KEY, newData, name);
					break;
				}

				case this.constants.F_TEAM: {
					const newData = {
						sort         : factor.i,
						isIndividual : false,
						type         : name,
						team         : factor.i,
						text         : this.getTeam(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], this.NO_POINT_KEY, newData, name);
					break;
				}

				case this.constants.F_I_TEAM: {
					const newData = {
						sort         : factor.i,
						isIndividual : false,
						type         : name,
						team         : this.getTeam(factor),
						text         : factor.i === 0 ? this.getKoeffName(factor) : this.getTeam(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], this.NO_POINT_KEY, newData, name);
					break;
				}

				case this.constants.F_EFFECTIVE: {
					const newData = {
						sort         : factor.i,
						isIndividual : false,
						type         : name,
						team         : factor.i,
						text         : this.getKoeffName(factor),
						factor       : factor
					};

					this.addValue(this.body_rows[k], this.NO_POINT_KEY, newData, name);
					break;
				}
			}
		});
	}

	addValue(obj, key, value, name) {
		if ( !obj.hasOwnProperty(name) ) {
			obj[name] = {};
		}

		if ( value.factor.t === FactorTypes.F_FORA * 10000 ) {
			const team = value.factor.i > 10 ? (value.factor.i / 10 < 2 ? 1 : 2) : value.factor.i;

			if ( !obj[name].hasOwnProperty(team) ) {
				obj[name][team] = {};
			}

			if ( !obj[name][team].hasOwnProperty(key) ) {
				Object.assign(obj[name][team], {[key] : [value]});
			} else {
				obj[name][team][key].push(value);
			}
		} else {
			if ( !obj[name].hasOwnProperty(key) ) {
				Object.assign(obj[name], {[key] : [value]});
			} else {
				obj[name][key].push(value);
			}
		}
	}

	getTeam(factor) {
		return factor.i === 1 ? this.event.team1 : this.event.team2;
	}

	getIndividualTeam(factor) {
		if ( factor.i < 10 ) {
			return factor.i < 2 ? this.event.team1 : this.event.team2;
		}

		return factor.i / 10 < 2 ? this.event.team1 : this.event.team2;
	}

	getKoeffName(factor) {
		return this.settings.values[factor.t][factor.i];
	}

	getFactorName(n) {
		const name = this.settings.names.find(x => x.id === n);
		if ( name === undefined ) {
			return '';
		}

		return name.value;
	}

	getBodyRows() {
		return this.body_rows;
	}

	getBodyRowsCount() {
		return this.body_rows_count;
	}

	getPeriodName() {
		const {periodName} = this.sport_settings[this.event.sport_id];
		return this.periods_tr[periodName];
	}

	parseBet(bet) {
		const template = {
			text  : '',
			value : 0,
			bet   : {}
		};

		const fName = this.getFactorName(bet.n).replace(/%player%/g, bet.hasOwnProperty('pName') ? bet.pName : '').replace(/%p%|\[%p%\]/g, bet.hasOwnProperty('pt') ? bet.pt : '');
		const kName = this.getKoeffName({
			t : bet.t,
			i : bet.i
		});

		switch ( bet.t ) {
			case this.constants.F_OUTCOMES :
			case this.constants.F_DBL_CHANCE: {
				template.text = `${kName}`;
				break;
			}

			case this.constants.F_TOTAL: {
				template.text = `${fName}: ${kName} (${bet.pt})`;
				break;
			}

			case this.constants.F_I_TOTAL:
			case this.constants.F_I_BOOL: {
				const team = this.getIndividualTeam(bet);
				const point = bet.hasOwnProperty('pt') ? `(${bet.pt})` : '';
				template.text = `${fName}: ${team}: ${kName} ${point}`;
				break;
			}

			case this.constants.F_BOOL :
			case this.constants.F_SCORES:
			case this.constants.F_EFFECTIVE:
			case this.constants.F_PERIOD_M: {
				template.text = `${fName}: ${kName}`;
				break;
			}

			case this.constants.F_GAMES:
			case this.constants.F_TEAM: {
				console.log(bet);
				const team = this.getIndividualTeam(bet);
				template.text = `${fName}: ${team}`;
				break;
			}

			case this.constants.F_FORA: {
				template.text = `${fName}: ${bet.ti} (${bet.pt})`;
				break;
			}

			case this.constants.F_I_TEAM: {
				console.log('fiteam found!', fName, bet);
				break;
			}

			case this.constants.F_WINNER : {
				template.text = `${kName}`;
				break;
			}
		}

		template.value = bet.v;
		template.bet = bet;

		return template;
	}
}

export default FactorsHelper;
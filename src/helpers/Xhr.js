import _ from "lodash";
import TypeNews from "../constans/TypeNews";

const APP_HASH = 'FGDSHE146C67B44BABBF4E65GDDGDG';

class Xhr {
	defaultData = {
		domain      : `http://192.168.88.189/api_v1/${APP_HASH}`,
		cors        : 'cors=1',
		optionsGet  : {
			mode   : 'cors',
			method : 'get'
		},
		optionsPost : {
			mode     : 'cors',
			method   : 'post',
			headers  : {
				"Content-type" : "application/x-www-form-urlencoded; charset=UTF-8",
			},
			body     : {},
			redirect : 'follow',
		}
	};

	/**
	 * Выполнить GET-запрос
	 * @param url
	 * @param params
	 * @param isNeedAuth
	 * @returns {Promise<any>}
	 */
	get(url, params = '', isNeedAuth = false) {
		if ( isNeedAuth ) {
			const token = localStorage.getItem('token');
			if ( token ) {
				params = `${params}&atoken=${token}`;
			}
		}

		url = `${this.defaultData.domain}${url}?${this.defaultData.cors}&${params}`;

		return fetch(url, this.defaultData.optionsGet)
			.then(response => {
				if ( response.status >= 200 && response.status < 300 ) {
					return Promise.resolve(response);
				}

				return Promise.reject(new Error(response.statusText));
			})
			.then(response => response.json())
			.catch(error => {
				console.error('Request failed: ', error);
			});
	}

	/**
	 * выполнить POST-запрос
	 * @param url
	 * @param data
	 * @returns {Promise<any>}
	 */
	post(url, data) {
		const tokenData = localStorage.getItem('token');
		const token = tokenData ? `&atoken=${tokenData}` : '';

		url = `${this.defaultData.domain}${url}?${this.defaultData.cors}${token}`;

		const formData = [];
		_.mapKeys(data, (value, key) => {
			formData.push(`${key}=${value}`);
		});

		this.defaultData.optionsPost.body = formData.join('&');

		return fetch(url, this.defaultData.optionsPost)
			.then(response => {
				// TODO: Redirect processing

				if ( response.status >= 200 && response.status < 300 ) {
					return Promise.resolve(response);
				}

				return Promise.reject(new Error(response.statusText));
			})
			.then(response => response.json())
			.catch(error => {
				console.error('Request failed: ', error);
			});
	}

	upload(url, formData) {
		const tokenData = localStorage.getItem('token');
		const token = tokenData ? `&atoken=${tokenData}` : '';

		url = `${this.defaultData.domain}${url}?${this.defaultData.cors}${token}`;

		return fetch(url, {
			method : "POST",
			body   : formData
		}).then(response => {
			if ( response.status >= 200 && response.status < 300 ) {
				return Promise.resolve(response);
			}

			return Promise.reject(new Error(response.statusText));
		})
			.then(response => response.json())
			.catch(error => {
				console.error('Request failed: ', error);
			});

		//return $.ajax.post(url, formData, {processData : false, contentType : false});
	}

	/**
	 * проверка авторизации
	 * @returns {*}
	 */
	static isAuth() {
		const xhr = new Xhr();
		return xhr.get('/user/is-auth', '', true);
	}

	/**
	 * авторизация
	 * @param login
	 * @param password
	 * @returns {*}
	 */
	static login(login, password) {
		const xhr = new Xhr();
		return xhr.get('/user/login', [`login=${login}`, `password=${password}`].join('&'));
	}

	/**
	 * загрузка скана паспорта
	 * @returns {*}
	 */
	static loadPassport(formData) {
		const xhr = new Xhr();
		return xhr.upload('/user/passport-upload', formData);
	}


	static register(data) {
		const xhr = new Xhr();
		return xhr.post('/user/sign-up', data);
	}

	/**
	 * получение информации о пользователе
	 *
	 * @returns {*}
	 */
	static getInfo() {
		const xhr = new Xhr();
		return xhr.get('/user/get-info', '', true);
	}

	/**
	 * спорты в левом меню
	 *
	 * @returns {*}
	 */
	static getLine(period = 0) {
		const xhr = new Xhr();
		return xhr.get('/sport/line', `period=${period}`);
	}

	static getSports() {
		const xhr = new Xhr();
		return xhr.get('/sport/list');
	}

	/**
	 * популярные в левом меню
	 * @returns {*}
	 */
	static getPopulars(period = 0) {
		const xhr = new Xhr();
		return xhr.get('/popular/line-menu', `period=${period}`);
	}

	/**
	 * лиги по спорту в левом меню
	 *
	 * @param sportId
	 * @param period
	 * @returns {*}
	 */
	static getLeague(sportId, period = 0) {
		const xhr = new Xhr();
		return xhr.get(`/league/line/${sportId}/${period}`);
	}


	/**
	 * лайв на главной странице
	 * @returns {*}
	 */
	static getLive() {
		const xhr = new Xhr();
		return xhr.get('/live/get');
	}


	static getLiveSports() {
		const xhr = new Xhr();
		return xhr.get('/live/sports');
	}

	static getLiveLeagues(sport_id) {
		const xhr = new Xhr();
		return xhr.get('/live/leagues', `sport_id=${sport_id}`);
	}

	static getLiveEvents(league_id) {
		const xhr = new Xhr();
		return xhr.get('/live/events', `league_id=${league_id}`);
	}

	static updateLive(events = '') {
		const xhr = new Xhr();
		return xhr.get('/live/update', `events=${events}`);
	}

	/**
	 * получить live-скоро
	 * @returns {*}
	 */
	static getLiveSoon() {
		const xhr = new Xhr();
		return xhr.get('/event/live-soon');
	}

	/**
	 * получить live по событиям
	 *
	 * @returns {*}
	 * @param event_id
	 */
	static getLiveData(event_id) {
		const xhr = new Xhr();
		return xhr.get('/live/get-by-id', `event_id=${event_id}`);
	}

	/**
	 * получение линии популярных
	 *
	 * @param data
	 * @returns {*}
	 */
	static getLineDataSeveral(data) {
		const xhr = new Xhr();
		let params = [`params=${data}`];
		return xhr.get('/popular/line-data-several', params.join('&'));
	}

	/**
	 * получить live по спортам
	 *
	 * @param sportIds
	 * @returns {*}
	 */
	static getLiveDataBySports(sportIds) {
		const xhr = new Xhr();
		return xhr.get('/event/live-auth', `sport=${sportIds}`);
	}

	/**
	 * получить баннеры
	 *
	 * @returns {*}
	 */
	static getBanners() {
		const xhr = new Xhr();
		return xhr.get('/banners/all');
	}

	/**
	 * получение линии
	 *
	 * @param leagues
	 * @param eventId
	 * @param sportId
	 * @param period
	 * @returns {*}
	 */
	static getLineData(leagues, eventId = null, sportId = null, period = 0) {
		const xhr = new Xhr();
		let params = [`period=${period}`];

		if ( sportId !== null ) {
			params.push(`sport=${sportId}`);
		}

		if ( leagues !== null ) {
			params.push(`league=${leagues}`)
		}

		if ( eventId !== null ) {
			params.push(`id=${eventId}`);
		}

		return xhr.get('/event/line-data', params.join('&'));
	}

	static getMobileLineData(eventId) {
		const xhr = new Xhr;
		const params = [];
		params.push(`eventId=${eventId}`);
		return xhr.get('/event/mobile-prematch-event', params.join('&'));
	}

	/**
	 * Получить популярные
	 *
	 * @param sportSlug
	 * @param popularSlug
	 * @param period
	 * @returns {*}
	 */
	static getPopularLineData(sportSlug, popularSlug = null, period = 0) {
		const xhr = new Xhr();
		return xhr.get('/popular/line-data', [`sportSlug=${sportSlug}`, `popularSlug=${popularSlug}`,
		                                          `period=${period}`].join('&'));
	}

	static getLineSports(sports = '', with_leagues = false) {
		const xhr = new Xhr();
		return xhr.get('/line/sports', `sports=${sports}&with_leagues=${with_leagues}`);
	}

	/**
	 * получить линию по спортам
	 *
	 * @returns {*}
	 * @param sport_id
	 */
	static getLineLeagues(sport_id) {
		const xhr = new Xhr();
		return xhr.get('/line/leagues', `sport_id=${sport_id}`);
	}

	static getLineEvents(league_id) {
		const xhr = new Xhr();
		return xhr.get('/line/events', `league_id=${league_id}`);
	}

	static getLineFactorByEvent(eventIds) {
		const xhr = new Xhr();
		return xhr.get(`/line/factors`, [`eventId=${eventIds}`]);
	}


	/**
	 * получение конкретной новости
	 *
	 * @param slug
	 * @returns {*}
	 */
	static getNewsOne(slug) {
		const xhr = new Xhr();
		return xhr.get(`/news/one/${slug}`);
	}

	/**
	 * получить купон
	 *
	 * @param type
	 * @returns {*}
	 */
	static getCoupon(type) {
		const xhr = new Xhr();
		return xhr.get('/coupon/is-fresh', [`type=${type === 'live' ? 1 : 0}`].join('&'), true);
	}

	static getCouponLine(type) {
		const xhr = new Xhr();
		return xhr.get('/coupon/get', [`type=${type === 'live' ? 1 : 0}`, 'system=1'].join('&'), true);
	}

	static couponAdd(eventId, hash) {
		const xhr = new Xhr();
		return xhr.get('/coupon/add', [`event_id=${eventId}`, `hash=${hash}`].join('&'), true);
	}

	static couponNext(type) {
		const xhr = new Xhr();
		return xhr.get('/coupon/next', [`type=${type === 'live' ? 1 : 0}`].join('&'), true);
	}

	static couponPrev(type) {
		const xhr = new Xhr();
		return xhr.get('/coupon/prev', [`type=${type === 'live' ? 1 : 0}`].join('&'), true);
	}

	static couponClear(type) {
		const xhr = new Xhr();
		return xhr.get('/coupon/clear', [`type=${type === 'live' ? 1 : 0}`].join('&'), true);
	}

	static couponDel(type, event_id) {
		const xhr = new Xhr();
		return xhr.get('/coupon/del', [`type=${type === 'live' ? 1 : 0}`, `event_id=${event_id}`].join('&'), true);
	}

	static setGoldBet(gold, type, system = 0) {
		const params = [];
		params.push(`type=${type === 'live' ? 1 : 0}`);
		params.push(`gold=${gold}`);
		params.push(`system=${system}`);

		const xhr = new Xhr();
		return xhr.get('/coupon/set-gold-bet', params.join('&'), true);
	}

	static setLiveOpt(option) {
		const xhr = new Xhr();
		return xhr.get('/user/live-opt', [`option=${option}`].join('&'), true);

	}

	/**
	 * история операций
	 *
	 * @param period
	 * @returns {*}
	 */
	static betHistory(period = 0) {
		const xhr = new Xhr();
		return xhr.get(`/user/bet-history`, [`period=${period}`].join('&'), true);
	}

	/**
	 * история платежей
	 *
	 * @param period
	 * @returns {*}
	 */
	static paymentHistory(period = 0) {
		const xhr = new Xhr();
		return xhr.get(`/payment/history`, [`period=${period}`].join('&'), true);
	}

	/**
	 * отмена выплаты
	 *
	 * @param payment_id
	 * @returns {*}
	 */
	static paymentCancel(payment_id) {
		const xhr = new Xhr();
		return xhr.get(`/payment/cancel`, [`id=${payment_id}`].join('&'), true);
	}

	/**
	 * вывод через банк
	 * @param data {amount,bank,mfo,unn,account,type,numberMail,bankId}
	 * @returns {*}
	 */
	static bankOut(data) {
		const xhr = new Xhr();
		return xhr.post('/payment/bank-out', data);
	}

	/**
	 * вывод через кассу
	 * @param data {amount,cash}
	 * @returns {*}
	 */
	static cashOut(data) {
		const xhr = new Xhr();
		return xhr.post('/payment/cash-out', data);
	}

	static payCashBack(data) {
		const xhr = new Xhr();
		return xhr.post('api/user/pay-cashback', data);
	}

	static getCashBack() {
		const xhr = new Xhr();
		return xhr.get('/user/get-cashback', [], true);
	}

	/**
	 * вывод через белинвестбанк
	 * @param data {amount, phone}
	 * @returns {*}
	 */
	static cashOutInvestbank(data) {
		const xhr = new Xhr();
		return xhr.post('/payment/belinvest-cash-out', data);
	}

	static cashOutMobile(data) {
		const xhr = new Xhr();
		return xhr.post('/payment/mobile-out', data);
	}


	static cashOutInvestbank(data) {
		const xhr = new Xhr();
		return xhr.post('/payment/belinvest-cash-out', data);
	}


	/**
	 * пополнение
	 * @param data
	 * @returns {*}
	 */
	static cashIn(data) {
		const xhr = new Xhr();
		return xhr.get('/payment/pay-in-by-3d', `amount=${data}`, true);
	}

	static forgotPassword(data) {
		const xhr = new Xhr();
		return xhr.post('/user/forgot', data);
	}

	static restorePassword(hash) {
		// /user/restore-password/VL6PDEqiGc2ujEugZzjZXNLpfwVYog22GUGshpKIs
		// GET
		const xhr = new Xhr();
		return xhr.get(`/user/restore-password/${hash}`);
	}

	static restorePasswordPost(hash, data) {
		const xhr = new Xhr();
		return xhr.post(`/user/restore-password/${hash}`, data);
	}

	static changePassword() {
		// /user/changePassword
		const xhr = new Xhr();
		return xhr.get('/user/changePassword', '', true);
	}

	static changePasswordPost(data) {
		const xhr = new Xhr();
		return xhr.post('/user/change-password', data);
	}

	static resultLive() {
		const xhr = new Xhr();
		return xhr.get('/result/live');
	}

	static resultLine(date) {
		const xhr = new Xhr();
		return xhr.get('/result/line', `date=${date}`);
	}

	static lineSettings() {
		const xhr = new Xhr();
		return xhr.get('/data/line-settings');
	}

	static localization() {
		const xhr = new Xhr();
		return xhr.get('/data/get-localization');
	}

	static getLiveMenu() {
		// http://maxline.by/event/live-now?menu
		// TODO: live widget
		const xhr = new Xhr();
		return xhr.get('/event/live-now', ['menu'].join('&'));
	}

	static search(data) {
		const xhr = new Xhr();
		return xhr.post('/search', data);
	}

	static makeBet(type, data) {
		const amount = data['amount'] || 0;
		const clear = data['clear'] || 1;
		const gold = data['gold'] || 1;

		const xhr = new Xhr();
		return xhr.get(`/bet/${type}`, [`amount=${amount}`, `clear=${clear}`, `gold=${gold}`].join('&'), true);
	}

	static makeLineBet(data) {
		const xhr = new Xhr();
		return xhr.post('/bet/line', data);
	}

	static getOpenedBets(type) {
		const xhr = new Xhr();
		return xhr.get('/bet/open', `type=${type}`, true);
	}

	static getCashOut(period) {
		const xhr = new Xhr();
		return xhr.get('/cashout/get', `period=${period}`, true);
	}

	static takeCashOut(bet_id, hash) {
		const xhr = new Xhr();
		return xhr.post('/user/get-cash-out', {
			bet_id   : bet_id,
			hash     : encodeURIComponent(hash),
			isMobile : 1
		});
	}

	static getCardsList() {
		const xhr = new Xhr();
		return xhr.get(`/payment/ipay-card-list`, '', true);
	}

	static cardOut(data) {
		const xhr = new Xhr();
		return xhr.post(`/payment/card-out`, data);
	}

	static getBetgamesData() {
		const xhr = new Xhr();
		return xhr.get(`/data/get-betgames-data`, '', true);
	}

	static getTVBetData() {
		const xhr = new Xhr();
		return xhr.get(`/data/get-tvbet-data`, '', true);
	}

	static getGoldenRace() {
		const xhr = new Xhr();
		return xhr.get(`/data/get-goldenrace-data`, '', true);
	}

	static getServiceWork() {
		const xhr = new Xhr();
		return xhr.get('/auth/service');
	}

	static getVideoID(event_id) {
		const xhr = new Xhr();
		return xhr.get(`/event/get-video-by-event/${event_id}`);
	}


	static getLastNews(type, limit = 50) {
		const catId = TypeNews.getIdByType(type);
		const xhr = new Xhr();
		return xhr.get('/news/last', [`catId=${catId}`, `limit=${limit}`].join('&'));
	}

	static getLiveFactorByEvent(eventIds) {
		const xhr = new Xhr();
		return xhr.get(`/live/factors`, [`eventId=${eventIds}`]);
	}

	static getResultsByEvent(eventIds) {
		const xhr = new Xhr();
		return xhr.get('/event/find-results-by-event-id', [`eventId=${eventIds}`])
	}

	static getResultLine(date, sports) {
		const xhr = new Xhr();
		return xhr.get(`/gameresult/get-new-result`, [`date=${date}&sportIds=${sports}`]);
	}
	
	static getSportsForResult() {
		const xhr = new Xhr();
		return xhr.get(`/sport/for-result`);
	}

	static getHistoryOperations(period) {
		const xhr = new Xhr();
		return xhr.get(`/user/bet-history`, [`period=${period}`].join('&'), true);
	}

	static getHistorySessions(period) {
		const xhr = new Xhr();
		return xhr.get(`/user/get-auth-history`,[], true);
	}

	static getHistoryBonus() {
		const xhr = new Xhr();
		return xhr.get(`/user/get-bonus-log`,[], true);
	}

	static getBonuses() {
		const xhr = new Xhr();
		return xhr.get(`/data/bonus`,[]);
	}
}

export default Xhr;
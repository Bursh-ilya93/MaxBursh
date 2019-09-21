import React, {Component, Fragment} from "react";
// import LiveWidget from "../LiveWidget/LiveWidget";
import {connect} from "react-redux";
import FactorsHelper from "../../../helpers/FactorsHelper";
import BetSingle from "./Line/BetSingle";
import BetExpress from "./Line/BetExpress";
import {clearCoupon, makeLineBet, setGoldbet} from "../../../redux/coupon/actions";
import BetSystem from "./Line/BetSystem";
// import EventFilter from "../../EventFilter";
// import LeftMenu from "../LeftMenu";
import AirLoader from "../AirLoader";
import _ from "lodash";
import Checkbox from "../Form/Checkbox";
import {Icon} from "semantic-ui-react";

class CouponLine extends Component {
	T_SINGLE = 1;
	T_EXPRESS = 2;
	T_SYSTEM = 3;

	state = {
		isVip         : false,
		activeBetType : this.T_SINGLE,
		single        : {},  // сумма одиночной ставки single[eventId]: amount (кол-во равно кол-ву событий)
		express       : '0', // сумма экспресса
		system        : {},  // сумма на систему system[] : amount
		gold          : 1,   // goldbet
		processing    : false
	};

	setActiveTab(index) {
		this.setState({
			activeBetType : index
		});
	}

	formatAmount(amount) {
		return amount.replace(',', '.');
	}

	changeSingle(eventId, amount) {
		amount = this.formatAmount(amount);
		const single = Object.assign({}, this.state.single);
		if ( amount === '0' && single.hasOwnProperty(eventId) ) {
			delete single[eventId];
		}

		single[eventId] = amount;

		this.setState({
			single : single
		});
	}

	changeExpress(e) {
		let amount = e.target.value;
		amount = this.formatAmount(amount);
		if ( amount === "" ) {
			amount = '0';
		}

		this.setState({
			express : amount
		});
	}

	changeSystem(systemType, amount) {
		amount = this.formatAmount(amount);
		const system = Object.assign({}, this.state.system);
		if ( amount === '0' && system.hasOwnProperty(systemType) ) {
			delete system[systemType];
		}

		system[systemType] = amount;

		this.setState({
			system : system
		});
	}

	changeVip(e) {
		this.setState({
			isVip : !this.state.isVip
		});
	}

	changeGoldBet(e) {
		this.props.onSetGoldbet(+e.target.checked, this.props.type);
	}

	componentWillReceiveProps(nextProps) {
		const {couponStorage, type} = nextProps;
		if ( (couponStorage.hasOwnProperty('auth') && couponStorage.auth === false) || couponStorage.isEmpty ) {
			return;
		}

		const {coupon} = couponStorage;
		const hasBets = coupon !== undefined && coupon.hasOwnProperty('bets');
		const betsCount = hasBets ? Object.keys(coupon.bets).length : 0;
		if ( betsCount === 0 ) {
			return;
		}

		// формируем одиночные
		const single = Object.assign({}, this.state.single);
		const couponSingles = [];
		Object.entries(coupon.bets).forEach(([eventId, item]) => {
			if ( !single.hasOwnProperty(eventId) ) {
				single[eventId] = '0';
			}

			couponSingles.push(eventId);
		});

		// удаляем одиночные, которых нет в купоне
		Object.keys(single).forEach((key) => {
			if ( couponSingles.indexOf(key) !== -1 ) {
				return;
			}

			delete single[key];
		});

		// формируем системы
		const system = Object.assign({}, this.state.system);
		const couponSystems = [];

		if ( coupon.hasOwnProperty('systems') ) {
			coupon.systems.forEach((item) => {
				if ( !system.hasOwnProperty(item.system) ) {
					system[item.system] = '0';
				}

				couponSystems.push(item.system);
			});
		}

		// удаляем системы, которых нет в купоне
		Object.keys(system).forEach((key) => {
			if ( couponSystems.indexOf(key) !== -1 ) {
				return;
			}

			delete system[key];
		});

		this.setState({
			single     : single,
			system     : system,
			processing : false
		});
	}

	// делаем ставку
	makeBet() {
		if ( !this.isMakeBet() ) {
			return false;
		}

		const {couponStorage} = this.props;
		if ( couponStorage.isEmpty ) {
			return false;
		}

		const {coupon} = couponStorage;

		const data = {};

		Object.keys(this.state.single).forEach((key) => {
			const sKey = `single[${key}]`;
			data[sKey] = +this.state.single[key] !== 0 ? +this.state.single[key] : '';
		});

		let i = 0;

		Object.keys(this.state.system).forEach((key) => {
			const d = +this.state.system[key] !== 0 ? +this.state.system[key] : '';
			data[`system[${i}]`] = d;
			i++;
		});

		data['express'] = this.state.express;
		data['gold'] = +coupon.isGoldBet;
		data['vip'] = +this.state.isVip;

		this.setState({
			processing : true
		}, () => {
			this.props.onMakeBet(data);
		});
	}

	isMakeBet() {
		const {couponStorage} = this.props;
		const {coupon} = couponStorage;
		if ( !coupon || (couponStorage.coupon.position === 0 && couponStorage.isEmpty) ) {
			return false;
		}

		let isMakeBet = false;
		switch ( this.state.activeBetType ) {
			case this.T_SINGLE:
				Object.keys(this.state.single).forEach((key) => {
					if ( this.state.single[key] !== '0' ) {
						isMakeBet = true;
					}
				});
				break;

			case this.T_EXPRESS:
				isMakeBet = !(this.state.express === '0');
				break;

			case this.T_SYSTEM:
				Object.keys(this.state.system).forEach((key) => {
					if ( this.state.system[key] !== '0' ) {
						isMakeBet = true;
					}
				});
				break;

			default:
				break;
		}

		if ( +this.totalAmount() > coupon.max && !this.state.isVip ) {
			isMakeBet = false;
		}

		return isMakeBet;
	}

	totalAmount() {
		const {single, express, system} = this.state;

		let totalAmount = 0;
		Object.keys(single).forEach((key) => {
			totalAmount += +single[key];
		});

		Object.keys(system).forEach((key) => {
			totalAmount += +system[key];
		});

		totalAmount += +express;

		return totalAmount.toFixed(2);
	}

	render() {
		const {couponStorage, lineSettings} = this.props;
		const {coupon} = couponStorage;

		if ( !coupon || (couponStorage.coupon.position === 0 && couponStorage.isEmpty) || _.isEmpty(lineSettings) ) {
			return null;
		}

		const messages = _.has(couponStorage, 'messages') ? couponStorage.messages : [];
		const hasBets = _.has(coupon, 'bets');

		if ( !hasBets ) {
			return null;
		}

		const betCount = hasBets ? Object.keys(coupon.bets).length : 0;

		const data = Object.entries(coupon.bets).map(([eventId, bet]) => {
			const event = {
				id       : eventId,
				sport_id : bet.sportId,
				team1    : bet.team1,
				team2    : bet.team2
			};

			const factorsHelper = new FactorsHelper(event, [], lineSettings);
			const parsedBet = factorsHelper.parseBet(bet);

			if ( this.state.activeBetType === this.T_SINGLE ) {
				return <BetSingle factorsHelper={factorsHelper}
				                  bet={bet}
				                  parsedBet={parsedBet}
				                  event={event}
				                  value={this.state.single[event.id] || '0'}
				                  changeSingleHandler={this.changeSingle.bind(this)}/>;
			}

			if ( this.state.activeBetType === this.T_EXPRESS ) {
				if ( betCount >= 2 ) {
					return <BetExpress factorsHelper={factorsHelper}
					                   bet={bet}
					                   parsedBet={parsedBet}
					                   event={event}/>;
				} else {
					return <span className={'coupon__content__bets-message'}>Нет ставок типа "Экспресс"</span>
				}
			}

		});

		let dataSystem = null;
		if ( this.state.activeBetType === this.T_SYSTEM ) {
			const systems = coupon.hasOwnProperty('systems') ? coupon.systems : [];

			dataSystem = systems.map((system) => {
				return <BetSystem system={system}
				                  value={this.state.system[system.system] || '0'}
				                  changeHandler={this.changeSystem.bind(this)}/>;
			});
		}

		return (
			<div className="coupon">
				<div className="coupon__header">
					<span className="coupon__header-title">Купон</span>
				</div>
				<div className="coupon__content">
					<div className="coupon__content-tabs">
						<div className={`coupon__content-tabs-tab ${this.state.activeBetType === this.T_SINGLE ? 'active' : ''}`} onClick={this.setActiveTab.bind(this, this.T_SINGLE)}>Одиночные</div>
						<div className={`coupon__content-tabs-tab ${this.state.activeBetType === this.T_EXPRESS ? 'active' : ''}`} onClick={this.setActiveTab.bind(this, this.T_EXPRESS)}>Экспресс</div>
						<div className={`coupon__content-tabs-tab ${this.state.activeBetType === this.T_SYSTEM ? 'active' : ''}`} onClick={this.setActiveTab.bind(this, this.T_SYSTEM)}>Система</div>
					</div>

					{this.state.processing &&
					<div className="coupon__content-processing animated fadeIn">
						<AirLoader/>
					</div>}

					{+this.totalAmount() > +coupon.max && !this.state.isVip &&
					<div className="coupon__content-messages">{`Превышен максимум - ${coupon.max}`}</div>}

					{messages.length > 0 && <div className="coupon__content-messages">{messages}</div>}

					{hasBets &&
					<div className="coupon__content__bets">
						{data}

						{betCount < 3 && this.state.activeBetType === this.T_SYSTEM ?
							<span className={'coupon__content__bets-message'}>Нет ставок типа "Система"</span> : dataSystem}
					</div>
					}

					{hasBets &&
					<div className="coupon__content__total">
						<div className={'coupon__content__total__row'}>
							<div>Общий коэффициент</div>
							<div><strong>{coupon.totalValue}</strong></div>
						</div>

						{betCount >= 2 && this.state.activeBetType === this.T_EXPRESS &&
						<div className={'coupon__content__total__row'}>
							<div>Сумма "Экспресс"</div>
							<div>
								<input type="text" onChange={this.changeExpress.bind(this)}
								       value={this.state.express === '0' ? '' : this.state.express}/>
							</div>
						</div>}

						<div className={'coupon__content__total__row'}>
							<div>Возм. выигрыш</div>
							<div><strong>{(this.state.express * coupon.totalValue).toFixed(2)}</strong></div>
						</div>

						<div className={'coupon__content__total__row'}>
							<div>Общ. сумма ставки</div>
							<div>
								<strong>{this.totalAmount()}</strong>
							</div>
						</div>

						<div className={'coupon__content__total__row'}>
							<div>Макс. ставка</div>
							<div>
								<span className="max-bet">{coupon.max}</span>
							</div>
						</div>

						<div className={'coupon__content__total__row'}>
							<div>Goldbet</div>
							<div className="checkbox">
								<Checkbox className={'light'}
								          onChange={this.changeGoldBet.bind(this)}
								          checked={coupon.isGoldBet}/>

								{/*<input type="checkbox"*/}
								{/*id="coupon-goldbet"*/}
								{/*onChange={this.changeGoldBet.bind(this)}*/}
								{/*checked={coupon.isGoldBet}/>*/}
								{/*<label htmlFor="coupon-goldbet"></label>*/}
							</div>
						</div>

						<div className={'coupon__content__total__row'}>
							<div>VIP</div>
							<div className="checkbox">
								<Checkbox className={'light'}
								          onChange={this.changeVip.bind(this)}
								          checked={this.state.isVip && +this.totalAmount() >= 50}/>

								{/*<input type="checkbox"*/}
								{/*id="coupon-vip"*/}
								{/*disabled={+this.totalAmount() < 50}*/}
								{/*onChange={this.changeVip.bind(this)}*/}
								{/*checked={this.state.isVip && +this.totalAmount() >= 50}/>*/}
								{/*<label htmlFor="coupon-vip"></label>*/}
							</div>
						</div>

						<div className={'coupon__content__total__row'}>
							<button className="button"
							        onClick={this.makeBet.bind(this)}
							        disabled={!this.isMakeBet()}>
								Сделать ставку
							</button>
							<button className="button clear" onClick={this.props.onClearCoupon.bind(this, 'line')}>
								<Icon name={'close'}/>
								<span>Очистить</span>
							</button>
						</div>
					</div>
					}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		lineSettings  : state.data.lineSettings,
		couponStorage : state.coupon
	}),
	dispatch => ({
		onClearCoupon : (type) => {
			dispatch(clearCoupon(type));
		},
		onSetGoldbet  : (gold, type, system = 0) => {
			dispatch(setGoldbet(gold, type, system));
		},
		onMakeBet     : (data) => {
			dispatch(makeLineBet(data));
		}
	})
)(CouponLine);
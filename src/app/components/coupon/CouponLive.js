import React, {Component} from "react";
import Bets from "./Bets";
import {
	clearCoupon, getCoupon, makeBet, nextCoupon, prevCoupon, setGoldbet,
	setLiveOpt
} from "../../../redux/coupon/actions";
import {connect} from "react-redux";
import AirLoader from "../AirLoader";
import _ from "lodash";
import {Icon} from "semantic-ui-react";
import {t} from "@lib/translate";
import Radio from "../Form/Radio";
import Checkbox from "../Form/Checkbox";

// import LiveWidget from "../LiveWidget/LiveWidget";

class CouponLive extends Component {
	state = {
		sum                 : null,
		saveAfterBet        : false,
		acceptChangesOpened : false,
		processing          : false
	};

	changeSum(e) {
		const {couponStorage} = this.props;
		const {coupon} = couponStorage;

		let amount = e.target.value;
		if ( +e.target.value >= coupon.max ) {
			amount = coupon.max;
		}

		if ( e.target.value === '' ) {
			amount = null;
		}

		this.setState({
			sum : amount
		});
	}

	setSum(amount) {
		this.setState({
			sum : amount
		});
	}

	next() {
		this.props.onNextCoupon(this.props.type);
	}

	prev() {
		this.props.onPrevCoupon(this.props.type);
	}

	changeGoldBet(e) {
		this.props.onSetGoldbet(+e.target.checked, this.props.type);
	}

	changeClearAfterBet(e) {
		this.setState({
			saveAfterBet : e.target.checked
		});
	}

	clearCoupon() {
		this.props.onClearCoupon(this.props.type);
		this.setState({
			sum : null
		});
	}

	acceptChangesToggle() {
		this.setState({
			acceptChangesOpened : !this.state.acceptChangesOpened
		});
	}

	changeLiveOpt(e) {
		this.props.onSetLiveopt(e.target.value);
	}

	makeBet() {
		const isMakeBet = !(this.state.sum === 0);

		if ( !isMakeBet ) {
			return false;
		}

		const {couponStorage} = this.props;
		if ( couponStorage.isEmpty ) {
			return false;
		}

		const {coupon} = couponStorage;

		this.setState({
			processing : true
		}, () => {
			this.props.onMakeBet(this.props.type, {
				amount : this.state.sum,
				clear  : +!this.state.saveAfterBet,
				gold   : parseInt(coupon.isGoldBet)
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		const {couponStorage} = nextProps;
		const {coupon} = couponStorage;

		if ( !coupon || (couponStorage.coupon.position === 0 && couponStorage.isEmpty) ) {
			return null;
		}

		if ( _.has(couponStorage, 'messages') ) {
			this.setState({
				processing : false
			});
		}
	}

	render() {
		const {couponStorage, oneclick} = this.props;
		const {coupon} = couponStorage;

		const messages = _.has(couponStorage, 'messages') ? couponStorage.messages : [];

		if ( oneclick.isOneClick || !coupon || (couponStorage.coupon.position === 0 && couponStorage.isEmpty) ) {
			// return <LiveWidget/>;
			return null;
		}

		const hasBets = _.has(coupon, 'bets');
		const couponPosition = coupon.position + 1;

		const acceptText = {
			1 : t('никогда'),
			2 : t('при повышении'),
			3 : t('всегда')
		};

		return (
			// Купон
			<div className="coupon">
				<div className="coupon__header">
					<span className="coupon__header-title">{t('Купон')}</span>
					<span className="coupon__number">
						{couponPosition > 1 &&
						<span className="coupon__number-left" onClick={this.prev.bind(this)}>
							<i className="fas fa-caret-left"></i>
						</span>}
						{!coupon.isLast &&
						<span className="coupon__number-right" onClick={this.next.bind(this)}>
							<i className="fas fa-caret-right"></i>
						</span>}
					</span>
				</div>
				<div className="coupon__content">
					{this.state.processing &&
					<div className="coupon__content-processing animated fadeIn">
						<AirLoader/>
					</div>}

					{messages.length > 0 && <div className={`coupon__content-messages ${couponStorage.isError ? 'error' : 'success'}`}>{messages}</div>}

					{hasBets && <Bets bets={coupon.bets}/>}

					{hasBets &&
					<div className="coupon__content__total">
						<div className="coupon__content__total__row">
							<div>{t('Общий коэффициент')}</div>
							<div><strong>{coupon.totalValue}</strong></div>
						</div>

						<div className="coupon__content__total__row">
							<div>{t('Сумма')}</div>
							<div>
								<input type="text" onChange={this.changeSum.bind(this)} value={this.state.sum || ''}/>
							</div>
						</div>

						<div className="coupon__content__total__row">
							<div>{t('Возм. выигрыш')}</div>
							<div><strong>{(this.state.sum * coupon.totalValue).toFixed(2)}</strong></div>
						</div>

						<div className="coupon__content__total__row">
							<div>{t('Макс. ставка')}</div>
							<div>
								<span className="max-bet" onClick={this.setSum.bind(this, coupon.max)}>{coupon.max}</span>
							</div>
						</div>

						<div className="coupon__content__total__row">
							<div>Goldbet</div>
							<div className="checkbox">
								<Checkbox className={'light'}
								          onChange={this.changeGoldBet.bind(this)}
								          checked={coupon.isGoldBet}
								/>

								{/*<input type="checkbox"*/}
								{/*id="coupon-goldbet"*/}
								{/*onChange={this.changeGoldBet.bind(this)}*/}
								{/*checked={coupon.isGoldBet}/>*/}
								{/**/}
								{/*<label htmlFor="coupon-goldbet"></label>*/}
							</div>
						</div>

						<div className="coupon__content__total__row">
							<button className="button" onClick={this.makeBet.bind(this)}>
								{t('Сделать ставку')}
							</button>
							<button className="button clear" onClick={this.clearCoupon.bind(this)}>
								<Icon name={'close'}/>
								<span>{t('Очистить')}</span>
							</button>
						</div>
					</div>
					}

					<div className="coupon__content-save_select">
						<div className="checkbox">
							<Checkbox text={t('Сохранить выборы в купоне после размещения ставки')}
							          onChange={this.changeClearAfterBet.bind(this)}
							          value={this.state.saveAfterBet}
							          checked={this.state.saveAfterBet}/>

							{/*<input type="checkbox"*/}
							{/*id="save_select"*/}
							{/*onChange={this.changeClearAfterBet.bind(this)}*/}
							{/*value={this.state.clearAfterBet}/>*/}
							{/*<label htmlFor="save_select">*/}
							{/*<div>{t('Сохранить выборы в купоне после размещения ставки')}</div>*/}
							{/*</label>*/}
						</div>
					</div>
					<div className="coupon__content-accept_changes" onClick={this.acceptChangesToggle.bind(this)}>
						<div>
							<Icon className={`coupon__content-accept_changes-toggle`} name={`angle ${this.state.acceptChangesOpened ? 'up' : 'down'}`}/>
						</div>
						<div>
							{t('Соглашаться с изменением')} — <span>{t(acceptText[couponStorage.liveOpt])}</span>
						</div>
					</div>

					{this.state.acceptChangesOpened &&
					<div className="coupon__content-accept_changes-data">
						<div>
							<Radio text={t('при повышении')} value={2} checked={couponStorage.liveOpt === 2} onChange={this.changeLiveOpt.bind(this)}/>
						</div>

						<div>
							<Radio text={t('всегда')} value={3} checked={couponStorage.liveOpt === 3} onChange={this.changeLiveOpt.bind(this)}/>
						</div>

						<div>
							<Radio text={t('никогда')} value={1} checked={couponStorage.liveOpt === 1} onChange={this.changeLiveOpt.bind(this)}/>
						</div>
					</div>}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		oneclick      : state.oneclick,
		couponStorage : state.coupon
	}),
	dispatch => ({
		onNextCoupon  : (type) => {
			dispatch(nextCoupon(type));
		},
		onPrevCoupon  : (type) => {
			dispatch(prevCoupon(type));
		},
		onClearCoupon : (type) => {
			dispatch(clearCoupon(type));
		},
		onSetGoldbet  : (gold, type, system = 0) => {
			dispatch(setGoldbet(gold, type, system));
		},
		onSetLiveopt  : (option) => {
			dispatch(setLiveOpt(option));
		},
		onMakeBet     : (type, data) => {
			dispatch(makeBet(type, data));
		}
	})
)(CouponLive);
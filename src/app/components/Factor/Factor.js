import React, {Component, Fragment} from "react";
import _ from "lodash";
import {connect} from "react-redux";
import {addToCoupon, addToCouponAndMakeBet, delCoupon} from "../../../redux/coupon/actions";

class Factor extends Component {
	state = {
		changeClass     : '',
		contentEditable : true,
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item) ||
			this.props.selected !== nextProps.selected;
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.item && this.props.item && nextProps.item.v !== this.props.item.v ) {
			let upDown = 'factor-colorize-up';
			if ( nextProps.item.v < this.props.item.v ) {
				upDown = 'factor-colorize-down';
			}

			this.setState({
				changeClass : `animated flash factor-colorize ${upDown}`
			});

			setTimeout(() => {
				this.setState({
					changeClass : ''
				})
			}, 3000);
		}
	}

	addToCoupon() {
		const {item, oneclick, type, user, needClick = true, selected} = this.props;

		if ( !needClick ) {
			return;
		}

		if (_.has(selected, `${item.e}_${item.f}`)) {
			return this.props.onDelCoupon(type, item.e);
		}

		if ( type === 'live' && oneclick.isOneClick ) {
			const data = {
				amount : oneclick.amount,
				clear  : 1,
				gold   : 1
			};

			this.props.onAddToCouponAndMakeBet(item.e, item.f, type, data);
		} else {
			this.props.onAddToCoupon(item.e, item.f);
		}
	}

	render() {
		const {item, className = '', onlyValue = false, isNeedActive = true, selected} = this.props;

		if ( !item ) {
			return <span className={`factor no-koeff`}>—</span>;
		}

		const isActive = _.has(item, 'f') && _.has(selected, `${item.e}_${item.f}`);

		return !item ? <span>&nbsp;</span> :
			<div className={`factor f-value ${isNeedActive && isActive ? 'active' : ''} ${this.state.changeClass} ${className}`}
			     onClick={this.addToCoupon.bind(this)}>
				{!onlyValue && _.has(item, 'pt') && <div>({item.pt})</div>}
				<div><b>{item.v}</b></div>
			</div>
	}
}

export default connect(
	state => ({
		selected : state.coupon.selected,
		oneclick : state.oneclick
	}),
	dispatch => ({
		onAddToCoupon           : (eventId, hash) => {
			dispatch(addToCoupon(eventId, hash));
		},
		onDelCoupon             : (type, eventId) => {
			dispatch(delCoupon(type, eventId));
		},
		onAddToCouponAndMakeBet : (eventId, hash, type, data) => {
			dispatch(addToCouponAndMakeBet(eventId, hash, type, data));
		}
	})
)(Factor);

import React, {Component} from "react";
import {connect} from "react-redux";
import {
	clearCoupon, getCoupon, getCouponLine, nextCoupon, prevCoupon, setGoldbet,
	setLiveOpt
} from "../../../redux/coupon/actions";
import CouponLive from "./CouponLive";
import CouponLine from "./CouponLine";

class Coupon extends Component {
	intervalId = 0;

	componentWillMount() {
		const {type} = this.props;

		switch ( type ) {
			case 'live':
				this.props.onGetCoupon(type);
				break;
			case 'line':
				this.props.onGetCouponLine(type);
				break;
		}

		this.intervalId = setInterval(this.loadCoupon.bind(this), 5000);
	}

	loadCoupon() {
		const {type} = this.props;
		if ( type === 'live' ) {
			this.props.onGetCoupon(this.props.type);
		}
		else {
			this.props.onGetCouponLine(this.props.type);
		}
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	render() {
		const {type} = this.props;

		if ( type === 'live' ) {
			return <CouponLive type={type}/>;
		} else {
			return <CouponLine type={type}/>;
		}
	}
}

export default connect(
	state => ({
		couponStorage : state.coupon
	}),
	dispatch => ({
		onGetCoupon     : (type) => {
			dispatch(getCoupon(type));
		},
		onGetCouponLine : (type) => {
			dispatch(getCouponLine(type));
		},
		onNextCoupon    : (type) => {
			dispatch(nextCoupon(type));
		},
		onPrevCoupon    : (type) => {
			dispatch(prevCoupon(type));
		},
		onClearCoupon   : (type) => {
			dispatch(clearCoupon(type));
		},
		onSetGoldbet    : (gold, type, system = 0) => {
			dispatch(setGoldbet(gold, type, system));
		},
		onSetLiveopt    : (option) => {
			dispatch(setLiveOpt(option));
		}
	})
)(Coupon);
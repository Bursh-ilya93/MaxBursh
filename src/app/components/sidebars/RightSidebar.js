import React, {Component} from "react";
import {Checkbox, Sidebar} from "semantic-ui-react";
import {Banner} from "../Banner";
import NewsGadget from "../news/NewsGadget";
import {Partners} from "../Partners";
import {TVGame} from "../TVGame";
import {connect} from "react-redux";
import Coupon from "../coupon/Coupon";

const BetOneClickComponent = () => {
	return (
		<section className={`sidebar-right__filters`}>
			<Checkbox label={"Ставки в один клик"} onChange={() => console.log('Категории')}/>
		</section>
	)
};

const BetOneClick = connect(
	state => ({}),
	dispatch => ({}),
)(BetOneClickComponent);

class RightSidebar extends Component {
	render() {
		const url = new URL(window.location);

		let type = '';
		if ( url.pathname === '/' || url.pathname.indexOf('/live') !== -1 ) {
			type = 'live';
		} else if ( url.pathname.indexOf('/line') !== -1 ) {
			type = 'line';
		}

		return (
			<Sidebar visible={true} className="sidebar-right">
				{type !== '' && <Coupon type={type}/>}
				{/*<BetOneClick/>*/}
				<section className="baners">
					<Banner type="cancel"/>
					<Banner type="pay"/>
					<Banner type="fast-pay"/>
				</section>
				<TVGame/>
				<NewsGadget type={0}/>
				<NewsGadget type={1}/>
				<Partners/>
				<iframe src="https://bookmaker-ratings.ru/review/obzor-bukmekerskoj-kontory-maxline/widget/rb-rating"
				        frameBorder="0"
				        scrolling="no"
				        width="306px"
				        height="160"/>
			</Sidebar>
		)
	}
}

export default RightSidebar;
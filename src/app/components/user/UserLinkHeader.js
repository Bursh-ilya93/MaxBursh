import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class UserLinkHeader extends Component {
	render() {
		return (
			<div className="news__header">
				<div className="news__header-links">
					<NavLink to={'/user/pay'}>Ввод средств</NavLink>
					<NavLink to={'/user/take-money'}>Вывод средств</NavLink>
				</div>
			</div>
		);
	}
}

export default UserLinkHeader;
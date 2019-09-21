import React, {Component} from "react";
import PropTypes from "prop-types";

class UserHeader extends Component {
	static defaultProps = {
		text : ''
	};

	static propTypes = {
		text : PropTypes.string.isRequired,
	};

	render() {

		return (
			<div className="page-title">
				<div>{this.props.text}</div>
			</div>
		);
	}
}

export default UserHeader;
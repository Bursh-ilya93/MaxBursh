import React, {Component} from "react";
import {withRouter} from "react-router";

class Logo extends Component {
	render() {
		const {accent_color = '#129A48', sub_accent_color = '#51BF7D'} = this.props;

		return (
			<div className="head__logo" onClick={() => this.props.history.push('/')}>
				<svg width="80" height="33" viewBox="0 0 80 33" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M28.1927 0H11.6513L0 32.9829H16.5414L28.1927 0Z" fill={accent_color}/>
					<path d="M47.4783 0H30.9245L19.2856 32.9829H35.827L47.4783 0Z" fill={accent_color}/>
					<path d="M66.7519 0H50.2106L38.5718 32.9829H55.1131L66.7519 0Z" fill={accent_color}/>
					<path d="M80.0002 16.4915H63.6709L57.8452 32.9829H74.1745L80.0002 16.4915Z" fill={sub_accent_color}/>
				</svg>
			</div>
		);
	}
}

export default withRouter(Logo);
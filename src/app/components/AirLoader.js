import React, {Component} from "react";
import {Loader} from "semantic-ui-react";

class AirLoader extends Component {
	render() {
		return (
			<div className={'air-loader'}>
				<Loader />
			</div>
		);
	}
}

export default AirLoader;
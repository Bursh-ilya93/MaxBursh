import React from 'react';

class BaseEvent extends React.Component {
	changeShowKoeff = () => {
		this.setState({
			isShowKoeff: !this.state.isShowKoeff
		});
	};

	render() {
		return (
			<div/>
		)
	}
}

export default BaseEvent;
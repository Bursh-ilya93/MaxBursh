import React, {Component} from "react";
import ReactSVG from "react-svg";

class Timer extends Component {
	state = {
		hours   : 0,
		minutes : 0,
		seconds : 0,
		offset  : 0
	};

	componentDidMount() {
		this.timerId = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	tick = () => {
		const date = new Date();
		this.setState({
			hours   : date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
			minutes : date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
			seconds : date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
			offset  : date.getTimezoneOffset() / 60,
		});
	};

	render() {
		const {hours, minutes, seconds, offset} = this.state;

		return (
			<div className="tools-timer">
				<ReactSVG src={require('../../assets/images/clock.svg')}/>
				<span>{hours}:{minutes}:{seconds} (GMT {offset})</span>
			</div>
		);
	}
}

export default Timer;
import React, {Component} from "react";
import MomentDate from "../MomentDate";

class EventTimer extends Component {
	intervalId = 0;

	state = {
		prevTime: this.props.time,
		time: this.props.time,
	};

	componentDidMount() {
		this.intervalId = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	componentWillReceiveProps(nextProps) {
		clearInterval(this.intervalId);

		if (nextProps.time !== this.state.prevTime) {
			this.intervalId = setInterval(this.tick.bind(this), 1000);
			this.setState({
				prevState: this.state.time
			})
		}

		this.setState({time : nextProps.time});
	}

	tick = () => {
		const time = this.state.time + 1;
		this.setState({time});
	};

	render() {
		if (isNaN(this.state.time)) {
			return null;
		}

		return (
			<MomentDate date={this.state.time.toString()} parseTimeFromSeconds={true}/>
		);
	}
}

export default EventTimer;
import React, {Component} from "react";

class Toggle extends Component {
	state = {
		isChecked : false
	};

	componentDidMount() {
		const {value} = this.props;

		this.setState({
			isChecked : value
		});
	}

	changeState = (e) => {
		const {action} = this.props;

		this.setState({
			isChecked : !this.state.isChecked
		}, () => {
			action();
		})
	};

	render() {
		const {isChecked} = this.state;
		const {title} = this.props;

		return (
			<div className="changer">
				<div className="changer-title">{title}</div>
				<div>
					<label style={{marginRight: "18px"}} className={`toggle color-green ${isChecked ? 'active' : ''}`}
					       onClick={this.changeState}>
						<span className="toggle-icon"></span>
					</label>
				</div>
			</div>

		);
	}
}

export default Toggle;
import React, {Component} from "react";

class Checkbox extends Component {
	render() {
		const {className = '', onChange, value, text = '', checked = false, textAlign = 'left'} = this.props;

		return (
			<label className={`air-checkbox ${className} ${textAlign}`}>
				<input type="checkbox"
				       onChange={onChange}
				       checked={checked}/>

				<span className={'air-checkbox__indicator'}></span>
				<span className={'air-checkbox__text'}>{text}</span>
			</label>
		);
	}
}

export default Checkbox;
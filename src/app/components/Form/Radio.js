import React, {Component} from "react";

class Radio extends Component {
	render() {
		const {text = '', className = '', value, checked = false, onChange} = this.props;

		return (
			<label className={`radio ${className}`}>
				<input name="group" type="radio" value={value} checked={checked} onChange={onChange}/>
				<span className={'radio__indicator'}></span>
				<span>{text}</span>
			</label>
		);
	}
}

export default Radio;
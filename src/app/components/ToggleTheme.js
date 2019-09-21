import React from 'react';
import Toggle from "./Toggle";
import sun from "../../assets/images/sun.svg";
import sun_light from "../../assets/images/sun_light.svg";
import moon from "../../assets/images/moon.svg";
import moon_light from "../../assets/images/moon_light.svg";

export default class ToggleTheme extends Toggle {
	render() {
		const {title} = this.props;
		const {isChecked} = this.state;

		const sun_img = isChecked ? <img src={sun} alt=""/> : <img className="sun" src={sun_light} alt=""/>;
		const moon_img = isChecked ? <img src={moon} alt=""/> : <img className="moon" src={moon_light} alt=""/>;

		return (
			<div className="changer theme-changer">
				<div className="changer-title">{title}</div>
				<div>
					{sun_img}
					<label className={`toggle color-green ${isChecked ? 'active' : ''}`}
					       onClick={this.changeState}>
						<span className="toggle-icon"></span>
					</label>
					{moon_img}
				</div>
			</div>

		);
	}
}
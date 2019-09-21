import React from "react";
import ReactSVG from "react-svg";

export const Banner = ({type}) => {
	return(
		<div className={`banner ${type}`}>
			<ReactSVG className="logo" src={require(`../../assets/images/banners/${type}-logo.svg`)}/>
		</div>
	)
};
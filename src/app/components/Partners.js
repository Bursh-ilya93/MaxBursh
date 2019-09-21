import React from "react";
import ReactSVG from "react-svg";
import {Segment, Header} from "semantic-ui-react";

export const Partners = () => {
	return(
		<Segment className={`gadget gadget-partners`}>
			<Header className="header-component"><span>Партнеры</span></Header>
			<div>
				<ReactSVG svgClassName="partner" src={require('../../assets/images/partners/fk_vitebsk.svg')}/>
				<ReactSVG svgClassName="partner" src={require('../../assets/images/partners/fk_slavia.svg')}/>
			</div>
		</Segment>
	)
};
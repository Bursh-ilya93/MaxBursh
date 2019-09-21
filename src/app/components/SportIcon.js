import React from 'react';
import ReactSVG from "react-svg";

export const SportIcon = ({id}) => {
	try {
		return (
			<ReactSVG className={'icon-sport'} src={require(`../../assets/images/sports/${id}.svg`)} />
		)
	} catch ( e ) {
		return (
			<ReactSVG className={'icon-sport'} src={require(`../../assets/images/sports/1.svg`)} />
		)
	}
};

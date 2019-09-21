import React from 'react';
import ReactSVG from "react-svg";

export const CortIcon = ({id}) => {
	try {
		return (
			<ReactSVG className={'icon-cort'} src={require(`../../assets/images/cort/${id}.svg`)} />
		)
	} catch ( e ) {
		return null;
	}
};
import React from "react";
import {Link} from "react-router-dom";

export const EventTeams = ({type, team1, team2, turn, sportId, eventId}) => {
	return (
		<Link className="teams" to={`/${type}/${eventId}`}>
			<div className={'teams__team'}>{turn && turn === 1 ?
				<span className={`turn sport-${sportId}`}></span> : null}
				<span>{team1}</span>
			</div>
			<div className={'teams__team'}>{turn && turn === 2 ?
				<span className={`turn sport-${sportId}`}></span> : null}
				<span>{team2}</span>
			</div>
		</Link>
	)
};
import React, {Component, Fragment} from "react";

class EventScores extends Component {
	render() {
		const {turn, score, points, sportId} = this.props;

		return (
			<div className="scores">
				<span>{score}&nbsp;</span>
				<span>
					{points &&
					<Fragment>
						{turn && turn === 1 ? <span className={`turn score sport-${sportId}`}></span> : null}
						{points.data}
						{turn && turn === 2 ? <span className={`turn score sport-${sportId}`}></span> : null}
					</Fragment>
					}
				</span>
			</div>
		);
	}
}

export default React.memo(EventScores);
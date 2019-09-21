import React, {Component, Fragment} from "react";
import EventTimer from "../EventTimer";

class EventTimerAndComment extends Component {
	render() {
		const {timer, commentData = '', periodComment = ''} = this.props;
		return (
			<Fragment>
				{commentData !== '' && <div className={'comment'} dangerouslySetInnerHTML={{__html : commentData}}></div>}
				<div className={'inline-group'}>
					{periodComment !== '' && <div className={'periods'}>{periodComment}</div>}
					{timer !== 0 && <div className="timeout"><EventTimer time={timer}/></div>}
				</div>
			</Fragment>
		);
	}
}

export default React.memo(EventTimerAndComment);
import React, {Component} from "react";
import EventHelper from "../../../../helpers/EventHelper";
import ReactSVG from "react-svg";

class LiveEventStat extends Component {
	openStatistic = (statistic) => {
		EventHelper.openStatistic(statistic);
	};

	render() {
		const {statistic} = this.props;
		const statExists = statistic !== '';

		return (
			<div className={`stat rect ${statExists ? '' : 'gray'}`} onClick={() => statExists && this.openStatistic.bind(this, statistic)}>
				<ReactSVG src={require('../../../../assets/images/stat.svg')}/>
			</div>
		)
	}
}

export default React.memo(LiveEventStat);

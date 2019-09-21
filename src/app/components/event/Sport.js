import React, {Component} from "react";
import Item from "../ItemOfList";

class Sport extends Component {
	render() {
		const {sport, defaultOpen = true, type = 'live'} = this.props;
		const {id, name} = sport;

		return (
			<Item
				key={`${type}-sport-component-${id}`}
				type={type}
				defaultOpen={defaultOpen}
				loading={false}
				link={`/${type}-sport/${sport.alias}`}
				item={{name : name, sport_id : id, id}}
				isPopular={true}>
				{this.props.children}
			</Item>
		)
	}
}

export default React.memo(Sport);

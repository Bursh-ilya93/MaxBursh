import React, {Component} from "react";
import Item from "../ItemOfList";
import {Table} from "semantic-ui-react";

class League extends Component {
	render() {
		const {league, type, action, defaultOpen = false} = this.props;

		return (
			<Item key={`league-${league.id}`}
			      // link={`/${type}-sport/${league.sport_id}/${league.id}`}
			      type={type}
			      defaultOpen={defaultOpen}
			      action={action}
			      item={{
				      id       : league.id,
				      name     : league.name,
				      sport_id : league.sport_id
			      }}>
				<Table className={`event event-table`}>
					{this.props.children}
				</Table>
			</Item>
		)
	}
}

export default React.memo(League);
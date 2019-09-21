import React, {Component} from "react";

class NewsList extends Component {
	render() {
		const {children} = this.props;
		return (
			<div className="news__list">
				{children}
			</div>
		);
	}
}

export default NewsList;
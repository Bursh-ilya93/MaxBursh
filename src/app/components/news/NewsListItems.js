import React, {Component} from "react";

class NewsListItems extends Component {
	countAdd = 6;

	state = {
		count: 9
	};

	render() {
		const {children} = this.props;
		const {count} = this.state;

		return (
			<React.Fragment>
				<div className="news__list__items">
					{children.slice(0, this.state.count)}
				</div>
				{count < children.length &&
					<button className={'button'} onClick={() => this.setState({count: count + this.countAdd})}>Загрузить ещё</button>}
			</React.Fragment>
		);
	}
}

export default NewsListItems;
import React, {Component} from "react";
import {Accordion} from "semantic-ui-react";
import {SportIcon} from "./SportIcon";
import ReactSVG from "react-svg";
import {Link} from "react-router-dom";
import AirLoader from "./AirLoader";

class Item extends Component {
	state = {
		show : false
	};

	change() {
		const {action} = this.props;
		this.setState({
			show : !this.state.show
		}, () => {
			if (this.state.show && action !== undefined) {
				action();
			}
		});
	}

	componentDidMount() {
		const {defaultOpen = false} = this.props;
		if ( defaultOpen ) {
			this.setState({show : defaultOpen});
		}
	}

	render() {
		const {item, children, isPopular, selected, action, type, className, link, loading = false} = this.props;
		const {show} = this.state;

		return (
			<Accordion className={`${className} sport sport-live sport-line ${isPopular ? "not-popular" : "popular"} ${show ? "open" : ""}`} styled>
				<Accordion.Title>
					{loading ? <AirLoader/> : <ReactSVG onClick={this.change.bind(this)} className={'icon-dropdown'} src={require(`../../assets/images/arrow.svg`)}/>}

					{/*{type === 'live' && <ReactSVG onClick={action}*/}
					                              {/*className={`icon-star ${selected && "active"}`}*/}
					                              {/*src={require(`../../assets/images/sport-star-no-select.svg`)}/>}*/}

					<span className="caption">
						<SportIcon id={item.sport_id}/>
						{link && <Link className="name" to={link}>{item.name}</Link> ||
						<span className="name">{item.name}</span>}
					</span>
				</Accordion.Title>

				<Accordion.Content active={show}>
					{show && children}
				</Accordion.Content>
			</Accordion>
		)
	}
}

export default Item;
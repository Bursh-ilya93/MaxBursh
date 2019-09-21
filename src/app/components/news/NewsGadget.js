import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchNews} from "../../../redux/news/gadget/actions";
import {Header, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";


const News = ({news, link}) => {
	return(
		<Link to={link}  className="gadget__element" onClick={() => console.log('click')}>
			<p><img src={`https://old.maxline.by/assets/images/news/${news.img}`} alt="maxline-news"/></p>
			<figcaption>{news.title}</figcaption>
		</Link>
	);
};


class NewsGadget extends Component{
	componentDidMount() {
		const {news, onfetchNews, fetching, type} = this.props;
		if (type &&  news.length === 0) {
			onfetchNews();
		}
	}

	render() {
		const {news, title, link, fetching} = this.props;

		return(
			<Segment className="gadget news">
				<Header className="header-component"><span>{title}</span><span><a href={`news/type${link}`}>Все новости</a></span></Header>
				{fetching && <Loader/>}
				{news.map(item => <News link={`news${link}/${item.url}`} key={item.id} news={item}/>)}
			</Segment>
		)
	}
}


export default connect(
	(state, props) => ({
		fetching : state.news.gadget.fetching,
		link : state.news.gadget.titles[props.type].link,
		title: state.news.gadget.titles[props.type].title,
		news : (props.type === 0) ?  state.news.gadget.news.slice(0, 2) : state.news.gadget.news.slice(3, 5)
	}),
	dispatch => ({
		onfetchNews: () => dispatch(fetchNews())
	}),
)(NewsGadget);
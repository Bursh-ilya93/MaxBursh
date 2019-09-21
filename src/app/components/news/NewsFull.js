import React, {Component} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import MomentDate from "../../components/MomentDate";
import {Loader} from "semantic-ui-react";
import Xhr from "../../../helpers/Xhr";
import moment from "moment";
import {connect} from "react-redux";
import {getNews} from "../../../redux/news/main/actions";

class NewsFull extends Component {
	state = {
		news     : [],
		fetching : false
	};

	componentDidMount() {
		const {slug, location : {search}} = this.props;

		if (this.props.news.length === 0) {
			this.props.onGetNews(this.props.type, 50);
		}

		Xhr.getNewsOne(slug, search).then((resp) => {
			this.setState({
				news     : resp.data.news ? resp.data.news : [],
				fetching : false
			});
		});
	}

	render() {
		const {slug, news, type} = this.props;
		const oneNews = this.state.news;

		const data = oneNews.length > 0 && oneNews[0];
		const month = moment(data.date).format('MMM');
		const day = moment(data.date).format('YY');

		const currNews = news.find(item => oneNews.find(c => c.id == item.id));

		const indexPrevNews = news.indexOf(currNews) - 1;
		const indexNextNews = news.indexOf(currNews) + 1;

		const prevNews = indexPrevNews >= 0 ? `/news/${type}/${news[indexPrevNews].url}` : false;
		const nextNews = indexNextNews > 0 && indexNextNews < news.length ? `/news/${type}/${news[indexNextNews].url}` : false;

		if ( !this.state.fetching && !data ) {
			return (
				<div className="body__container__side-right bg-news">
					<div className="news">
						<div className="news__content">
							<div className="news__content-top">
								<div className="news__content-title">Новость недоступна</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return this.state.fetching ? <Loader/> :
			<div className="news">
				<div className="news-data" dangerouslySetInnerHTML={{__html : data.text}}/>
				{/*<div className="news-header">*/}
				{/*	<div className="news-header__title">{data.title}</div>*/}
				{/*	<div className="news-header__data">*/}
				{/*		<p className="day">{day}</p>*/}
				{/*		<p className="month">{month}</p>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className='news-navigate'>
					{prevNews ?
						<Link to={prevNews} className="news-navigate__button prev">Предыдущая новость</Link>
						:
						<Link to={'/'} className="disabled news-navigate__button prev" onClick={ (e) => e.preventDefault() }>Предыдущая новость</Link>
					}
					{nextNews ?
						<Link to={nextNews} className="news-navigate__button next">Следующая новость</Link>
						:
						<Link to={'/'} className="disabled news-navigate__button next" onClick={ (e) => e.preventDefault() }>Следующая новость</Link>
					}
				</div>
			</div>
	}
}

export default withRouter(connect(
	(state, props) => ({
		news: state.news.main[props.type]
	}),
	dispatch => ({
		onGetNews : (type, limit) => dispatch(getNews(type, limit)),
	})
)(NewsFull));
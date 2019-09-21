import React, {Component} from "react";
import {Link} from "react-router-dom";
import ImageLoader from 'react-imageloader';
import {Loader} from "semantic-ui-react";

import moment from "moment";
import 'moment/locale/ru';

class NewsItem extends Component {

	preloader() {
		return <Loader/>;
	}

	render() {
		const {data, type} = this.props;
		const img = `http://old.maxline.by/assets/images/news/${data.img}`;
		const link = `/news/${type}/${data.url}`;

		const month = moment(data.date).format('MMM');
		const day = moment(data.date).format('YY');

		return (
			<div className={`news__list__items__item ${type === 'site'}`}>
				<div className="news__list__items__item-image">
					<Link to={link}>
						<ImageLoader src={img} preloader={this.preloader}/>
					</Link>
				</div>
				<div className="news__list__items__item-text">
					<div className="title">
						<Link to={link}>{data.title}</Link>
					</div>
					<div className="date">
						<p className="date__day">{day}</p>
						<p className="date__month">{month}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsItem;
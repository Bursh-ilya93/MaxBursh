import React, {Component} from "react";
import {connect} from "react-redux";
import {getNews} from "../../../redux/news/main/actions";
import Sort from "../../../helpers/Sort";
import {Loader} from "semantic-ui-react";
import NewsList from "./NewsList";
import NewsListItems from "./NewsListItems";
import NewsItem from "./NewsItem";
import SportsNews from "../../../constans/SportsNews";

class NewsContainer extends Component {
    componentDidMount() {
        if ( this.props.news[this.props.type].length === 0 ) {
            this.props.onGetNews(this.props.type, 50);
        }
    }

    render() {
        const {type, news} = this.props;

        const news_list = type === 'site' ? news[type].slice() : news[type].filter((item) => {return item.cat_id !== 5});
        news_list.sort(Sort.orderByTime).reverse();

        return (
            <div className="news-page__main">
                {news.fetching && <Loader/>}
                <NewsList>
                    <NewsListItems>
                        {news_list.map((item) =>
                            <NewsItem key={`news-${item.id}`} data={item} sports={SportsNews} type={type}/>)}
                    </NewsListItems>
                </NewsList>
            </div>
        );
    }
}

export default connect(
    state => ({
        news       : state.news.main,
    }),
    dispatch => ({
        onGetNews : (type, limit) => dispatch(getNews(type, limit)),
    })
)(NewsContainer);
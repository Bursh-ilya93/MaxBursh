import React, {Component, Fragment} from "react";
import {Route, IndexRoute} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import Live from "./components/live/Live";
import {Redirect, Switch, withRouter} from "react-router";
import {AppLayout} from "./layouts/app_layout";
import {connect} from "react-redux";
import {isAuth} from "../redux/auth/actions";
import {getLineSettings, pingPong} from "../redux/data/action";
import {MainLayout} from "./layouts/main_layout";
import Register from "./components/Register";
import Line from "./components/line/Line";
import LiveById from "./components/live/LiveById";
import ResultLine from "./components/result/line/ResultLine";
import ResultLive from "./components/result/live/ResultLive";
import AboutPage from "./components/about/About";
import UserArea from "./components/user/UserArea";
import NewsArea from "./components/news/NewsArea";
import PaymentsArea from "./components/payments/PaymentsArea";
import UserForgot from "./components/user/UserResetPassword";
import PageBonus from "./components/bonuses/PageBonus";
import PartnersArea from "./components/partner/PartnersArea";
import $ from "jquery";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LineLeaguesPage = ({match, location}) => (
	<Line leagues={match.params.leagues || null}
	      sports={match.params.sports || null}
	      selectSports={match.params.selectSports || null}
	      event_id={match.params.event_id || null}
	      sport_slug={match.params.sportSlug || null}
	      popular_slug={match.params.popularSlug || null}
	/>
);

const LiveLeaguesPage = ({match}) => (
	<Live isFullFormat={true}
	      leagueId={match.params.league || null}
	      sport_alias={match.params.sport_alias || null}/>
);

const LiveByIdPage = ({match}) => (<LiveById id={match.params.id}/>);

class AppComponent extends Component {
	isAuthTimerId = -1;

	componentDidMount() {
		const {onGetLineSettings, onIsAuth, onPing} = this.props;

		onGetLineSettings();
		onIsAuth();

		this.isAuthTimerId = setInterval(onIsAuth, 5000);

		// при смене роута скроллим старицу вверх
		this.unlisten = this.props.history.listen((location, action) => {
			const $pageContent = $(window);
			$pageContent.scrollTop(0);
		});

		// setInterval(this.props.onPingPong, 30000);
	}

	componentWillUnmount() {
		this.unlisten();
	}

	render() {
		const {isAuth} = this.props;

		return (
			<Fragment>
				<AppLayout>
					<Switch>
						<Route path={'/register'} component={Register}/>

						<Route path='/about/:details' component={AboutPage}/>
						<Route exact path='/about' component={AboutPage}/>

						<Route path={`/user/forgot`} component={UserForgot}/>
						{isAuth && <Route path='/user/:details' component={UserArea}/>}
						{isAuth && <Route exact path='/user' component={UserArea}/>}

						<Route path="/news/type/:type" component={NewsArea}/>
						<Route path="/news/:type/:slug" component={NewsArea}/>

						<Route path="/page/payments" component={PaymentsArea}/>
						<Route path="/page/bonus" component={PageBonus}/>

						<Route path='/page/:details' component={PartnersArea}/>
						<Route path="/page/partner" component={PartnersArea}/>

						<MainLayout>
							<Switch>
								<Route exact path='/' component={Live}/>

								<Route exact path='/live' component={Live}/>
								<Route exact path="/live/:id" component={LiveByIdPage}/>
								<Route exact path="/live-sport/:sport/:league" component={LiveLeaguesPage}/>
								<Route exact path="/live-sport/:sport_alias" component={LiveLeaguesPage}/>

								<Route exact path="/line-leagues/:leagues" component={LineLeaguesPage}/>
								<Route exact path="/line-leagues/:leagues/:event_id" component={LineLeaguesPage}/>
								<Route exact path="/popular/:definitely" component={LineLeaguesPage}/>
								<Route exact path="/popular/:sportSlug/:popularSlug" component={LineLeaguesPage}/>
								<Route exact path='/line-sport/:selectSports' component={LineLeaguesPage}/>

								<Route exact path='/result/line' component={ResultLine}/>
								<Route exact path='/result/live' component={ResultLive}/>

								<Redirect to={`/`}/>
							</Switch>
						</MainLayout>
					</Switch>
				</AppLayout>
				<ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT}/>
			</Fragment>
		)
	}
}

export const App = withRouter(
	connect(
		state => ({
			isAuth : state.auth.isAuth,
		}),
		dispatch => ({
			onIsAuth          : () => {
				dispatch(isAuth());
			},
			onGetLineSettings : () => {
				dispatch(getLineSettings());
			},
			onPingPong :() => {
				dispatch(pingPong())
			}
		})
	)(AppComponent)
);
import React, {Component} from "react";
import ReactSVG from "react-svg";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logIn} from "../../redux/user/main/actions";
import {SearchInput} from "./SearchInput";
import TimeWidget from "./TimeWidget";
import ToggleTheme from "./ToggleTheme";
import {changeTheme} from "../../redux/data/action";
import {LanguageWidget} from "./LanguageWidget";
import {Button, Dropdown} from "semantic-ui-react";
import {withRouter} from "react-router";
import {logOut} from "../../redux/user/main/actions";
import {t} from "@lib/translate";
import Logo from "./Logo";

const gameOptions = [
	{key : "betgames", value : "betgames", text : "BetGames"},
	{key : "tvbet", value : "tvbet", text : "TVBet"},
	{key : "goldenrace", value : "goldenrace", text : "GoldenRace"},
];

const resultsOptions = [
	{key : "/result/live", value : "result/live", text : "Live"},
	{key : "/result/line", value : "result/line", text : "Line"},
];

class Header extends Component {
	state = {
		login    : '',
		password : '',
	};

	onChange = (type, e) => {
		this.setState({
			[type] : e.target.value
		});
	};

	goLine(e) {
		e.preventDefault();
		const {sports} = this.props;
		const line = sports.map((sport) => sport.id).join('-');
		this.props.history.push(`/line-select/${line}`);
	}

	render() {
		const {isAuth, user} = this.props;
		const {onfetchLogin, onchangeTheme, onLogOut} = this.props;
		const {login, password} = this.state;

		return (
			<header className="head">
				<div className="head-top">
					{/*Логотип*/}
					<Logo />

					<nav className="head__main-menu" date-auth={isAuth.toString()}>
						<ul>
							{/*Линия*/}
							<Link to='/line' onClick={this.goLine.bind(this)} className={`head__main-menu-item ${this.props.location.pathname.includes('line') ? " active" : ""}`}>
								{t('Линия')}
							</Link>

							{/*Лайв*/}
							<Link to='/live' className={`head__main-menu-item ${this.props.location.pathname.includes('live') ? " active" : ""}`}>
								{t('LIVE')}
							</Link>

							{/*ТВ Игры*/}
							<Dropdown text={t('TV Игры')} className="head__main-menu-item" options={gameOptions} onChange={(e, data) => this.props.history.push(`/${data.value}`)}/>

							{/*Результаты*/}
							<Dropdown text={t('Результаты')} className="head__main-menu-item results" options={resultsOptions} onChange={(e, data) => this.props.history.push(`/${data.value}`)}/>

							{/*Статистика*/}
							<Link to='/live' className="head__main-menu-item">{t('Статистика')}</Link>
						</ul>
					</nav>

					{!isAuth &&
					<div className={'login-input'}>
						<input className="input" type="text" onChange={this.onChange.bind(this, 'login')} placeholder={t('Логин')}/>
						<input className="input" type="password" onChange={this.onChange.bind(this, 'password')} placeholder={t('Пароль')}/>
						<Link to={'/user/forgot'} className={'link'}>
							{t('Забыли пароль?')}
						</Link>
					</div> ||
					<div className="user-info">
						<Button onClick={() => {
							onLogOut();
							document.location.reload()
						}} className={'link link-logout'}>
							<span>{t('Выход')}</span>
							<ReactSVG src={require('../../assets/images/exit-arrow.svg')}/>
						</Button>
						<div className="user-info__name">
							<p>{t('Номер счёта')}: {user.id}</p>
							<p className='select'>{t('Здравствуйте')}, {user.first_name}</p>
						</div>
						<div className="user-info__money">
							<p>{t('Ваш баланс')}:&nbsp;<span className='select'>{user.money} {user.currency}</span></p>
							<p>{t('В игре')}:&nbsp;<span className='select'>0 BYN</span></p>
						</div>
					</div>}
				</div>

				<div className="head-bottom">
					<div>
						{/*Меню*/}
						<nav className="head__sub-menu">
							<ul>
								<Link to='/news/type/site' className="head__sub-menu-item">{t('Новости')}</Link>
								<Link to='/about' className="head__sub-menu-item">{t('О компании')}</Link>
								<Link to='/page/payments' className="head__sub-menu-item pay">{t('Платежи')}</Link>
								<Link to='/page/partner' className="head__sub-menu-item pay">{t('Партнеры')}</Link>
								<Link to='/page/bonus' className="head__sub-menu-item bonus">{t('Бонусы')}</Link>
								<Link to='/live' className="head__sub-menu-item chat">{t('Чат')}</Link>
								{/*<div className="head__sub-menu-item search">*/}
									{/*<span>Поиск</span>*/}
									{/*<SearchInput />*/}
								{/*</div>*/}
							</ul>
						</nav>
						<div>
							{/*<LanguageWidget/>*/}
							{/*<ToggleTheme action={onchangeTheme}/>*/}
							<TimeWidget/>
						</div>
					</div>
					<div className="user-button">
						{isAuth &&
						<React.Fragment>
							<button className="button" onClick={() => this.props.history.push('/user')}>{t('Ваш счёт')}</button>
							<button className="button" onClick={() => this.props.history.push('/user/take-money')}>{t('Пополнить счёт')}</button>
						</React.Fragment>
						||
						<React.Fragment>
							<button className="button" onClick={() => onfetchLogin(login, password)}>{t('Вход')}</button>
							<button className="button" onClick={() => this.props.history.push('/register')}>{t('Регистрация')}</button>
						</React.Fragment>}
					</div>
				</div>
			</header>
		)
	}
}

export default withRouter(connect(
	state => ({
		user   : state.user.main.info,
		isAuth : state.auth.isAuth,
		sports : state.line.menu.main.sports
	}),
	dispatch => ({
		onfetchLogin  : (login, password) => dispatch(logIn(login, password)),
		onLogOut      : () => dispatch(logOut()),
		onchangeTheme : () => dispatch(changeTheme())
	})
)(withRouter(Header)));
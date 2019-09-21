import React from 'react';
import {Link} from "react-router-dom";
import ReactSVG from "react-svg";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Logo from "./Logo";

 const Footer = ({sports}) => {
 	const linkToLine = `/line-select/${sports.map((sport) => sport.id).join('-')}`;

	return (
		<footer className={`footer`}>
			<section className={`navigation`}>
				<div>
					<div className="help">
						<h3>Помощь</h3>
						<ul>
							<li><Link to={"/"}>Maxline FAQ</Link></li>
							<li><Link to={"/"}>Условия</Link></li>
							<li><a href="https://maxline.by/assets/files/rules-new.pdf?4" target={"_blank"}>Правила приёма ставок</a></li>
							<li><Link to={"/"}>Техническая поддержка</Link></li>
						</ul>
					</div>
					<div className="links">
						<h3>Ссылки</h3>
						<ul>
							<li><Link to={"/about"}>О компании</Link></li>
							<li><Link to={"/news/type/sport"}>Новости</Link></li>
							<li><Link to={"/page/payments"}>Платежи</Link></li>
							<li><Link to={"/"}>Чат</Link></li>
						</ul>
					</div>
					<div className="site">
						<h3>Сайт</h3>
						<ul>
							<li><Link to={linkToLine}>Line</Link></li>
							<li><Link to={"/live"}>Live</Link></li>
							<li><Link to={"/statistic"}>Cтатистика</Link></li>
							<li><Link to={"/result/line"}>Результаты</Link></li>
							<li><a href="http://m.maxline.by/">Мобильная версия</a></li>
						</ul>
					</div>
					<div className="address">
						<h3>Допольнительные адреса</h3>
						<ul>
							<li><a href="https://bkmaxline.com/">Зеркало 1</a></li>
							<li><a href="https://bkmaxline.ru/">Зеркало 2</a></li>
							<li><a href="https://maxlinebk.net/">Зеркало 3</a></li>
						</ul>
					</div>
					<div className="pays">
						<h3>Счёт</h3>
						<ul>
							<li><Link to={"/register"}>Регистрация</Link></li>
							<li><Link to={"/"}>Вход</Link></li>
							<li><Link to={"/user/take-money"}>Пополнение счёта</Link></li>
							<li><Link to={"/user/take-money"}>Вывод средств</Link></li>
							<li><Link to={"/"}>Демо счет</Link></li>
						</ul>
					</div>
					<div className="games">
						<h3>TV Игры</h3>
						<ul>
							<li><Link to={"/betgames"}>BetGames</Link></li>
							<li><Link to={"/tvbet"}>TVBet</Link></li>
							<li><Link to={"/goldenrace"}>GoldenRace</Link></li>
						</ul>
					</div>
				</div>
			</section>
			<section className={`content`}>
				<div>
					{/*<Link to={`/`}><ReactSVG className={`logo`} src={require('../../assets/images/footer/logo.svg')}/></Link>*/}
					<Logo accent_color={'#ccc'} sub_accent_color={'#ddd'} />

					<div className={`name`}>
						<span>©</span><span>2019</span><span>Букмекерская компания Maxline</span><br/>
						<span>Все права защищены.</span>
					</div>
					<div className={`social`}>
						<a href={'https://vk.com/maxlineby'} target={"_blank"}><ReactSVG src={require('../../assets/images/footer/vk.svg')}/></a>
						<a href={'https://vk.com/maxlineby'} target={"_blank"}><ReactSVG src={require('../../assets/images/footer/insta.svg')}/></a>
					</div>
				</div>
				<div>
					<ReactSVG src={require('../../assets/images/footer/visa.svg')}/>
					<ReactSVG src={require('../../assets/images/footer/mastercard.svg')}/>
					<ReactSVG src={require('../../assets/images/footer/maestro.svg')}/>
					<ReactSVG src={require('../../assets/images/footer/iPay.svg')}/>
					<ReactSVG src={require('../../assets/images/footer/raschet.svg')}/>
				</div>
			</section>
		</footer>
	)
};

export default withRouter(connect(
	state => ({
		sports: state.line.menu.main.sports
	}),
	dispatch => ({})
)(withRouter(Footer)));
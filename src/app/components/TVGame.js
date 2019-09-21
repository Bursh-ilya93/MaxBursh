import React from "react";
import {Segment, Header} from "semantic-ui-react";
import CustomSlider from "./CustomSlider";

const Figure = ({img, logo, children}) => {
	return (
		<figure className="figure">
			<p>
				<img src={img} alt="tvgame-maxline"/>
				<img className="logo" src={logo} alt="tvgame-maxline"/>
			</p>
			<figcaption>
				<CustomSlider>
					{children}
				</CustomSlider>
			</figcaption>
		</figure>
	)
};


const Game = ({logo, text, className}) => {
	return (
		<div className={`game ${className}`}>
			<img src={logo} alt="tvgame-maxline"/>
			<div>
				<p className="text">{text}</p>
				<p className="live">live</p>
			</div>
		</div>
	)
};

export const TVGame = () => {
	return(
		<Segment className={`gadget gadget-tvgame`}>
			<Header className="header-component"><span>TV Игры</span><span><a href={'/'}>Все игры</a></span></Header>
			<Figure
				img={require("../../assets/images/tvgame/tvbet/img.png")}
				logo={require("../../assets/images/tvgame/tvbet/logo.svg")}>
				<Game
					className="vilbet"
					text={'ВИЛБЕТ'}
					logo={require(`../../assets/images/tvgame/tvbet/wilbet.svg`)}
				/>
				<Game
					className="pokerbet"
					text={'ПОКЕРБЭТ'}
					logo={require(`../../assets/images/tvgame/tvbet/pokerbet.svg`)}
				/>
			</Figure>
			<Figure
				img={require("../../assets/images/tvgame/betgames/img.png")}
				logo={require("../../assets/images/tvgame/betgames/logo.svg")}>
				<Game
					className="bitva-stavok"
					text={'БИТВА СТАВОК'}
					logo={require(`../../assets/images/tvgame/betgames/poker-cards.svg`)}
				/>
				<Game
					className="poker"
					text={'ПОКЕР'}
					logo={require(`../../assets/images/tvgame/betgames/poker-full.svg`)}
				/>
			</Figure>
			<Figure
				img={require("../../assets/images/tvgame/betgames/img.png")}
				logo={require("../../assets/images/tvgame/goldenrace/logo.svg")}>
				<Game
					className="run-dogs"
					text={'СОБАЧЬИ БЕГА'}
					logo={require(`../../assets/images/tvgame/goldenrace/running-dog.svg`)}
				/>
				<Game
					className="horses"
					text={'ЛОШАДИ'}
					logo={require(`../../assets/images/tvgame/goldenrace/jumping-horse.svg`)}
				/>
			</Figure>
		</Segment>
	)
};

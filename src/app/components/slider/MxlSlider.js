import React, {Component} from "react";
import _ from "lodash";

class MxlSlider extends Component {
	intervalSlide = null;

	state = {
		images : [
			{
				index : 0,
				image : 'http://st.betcity.by/img/banners/form_1_ru.jpg'
			},
			{
				index : 1,
				image : 'http://st.betcity.by/img/banners/MLB_ru.jpg'
			},
			{
				index : 2,
				image : 'http://st.betcity.by/img/banners/european_championship_italy_ru.jpg'
			},
			{
				index : 3,
				image : 'http://st.betcity.by/img/banners/bsk_fiba_ru.jpg'
			}
		]
	};

	stopTimer() {
		clearInterval(this.intervalSlide);
	}

	startTimer(timeout = 3000, selectedIndexValue = -1) {
		if ( selectedIndexValue !== -1 ) {
			this.slide(selectedIndexValue);
		}

		this.intervalSlide = setInterval(this.slide.bind(this, selectedIndexValue), timeout);
	}

	restartTimer() {
		this.stopTimer();
		this.startTimer();
	}

	slide(selectedIndexValue = -1) {
		const {images} = this.state;

		if ( selectedIndexValue !== -1 ) {
			if ( selectedIndexValue === images[0].index ) {
				this.restartTimer();
				return;
			}
		}

		this.next();
	}

	select(selectedIndexValue) {
		this.stopTimer();

		this.startTimer(300, selectedIndexValue);
	}

	next() {
		const {images} = this.state;

		const newImages = [...images, images[0]];

		this.setState({
			images : newImages
		}, () => {
			newImages.shift();

			this.setState({
				images : newImages
			});
		});
	}

	componentDidMount() {
		this.startTimer();
	}

	componentWillUnmount() {
		this.stopTimer();
	}

	render() {
		const {images} = this.state;
		const multiplier = 50 / (images.length - 1);
		console.log(images);

		return (
			<div className={'mxl-slider'}>
				{images.map((item, i) => {
						return (
							<div key={`${item.image}_${new Date().getTime()}`} className={`mxl-slider-item ${i === images.length - 1 ? 'animated fadeInRight' : ''}`}
							     style={{
								     left : i === 0 ? '0' : `${i === 1 ? 50 : (multiplier * (i - 1)) + 50}%`,
							     }}
							     onClick={this.select.bind(this, item.index)}>
								<img src={item.image}/>
							</div>
						)
					}
				)}
			</div>
		);
	}
}

export default MxlSlider;
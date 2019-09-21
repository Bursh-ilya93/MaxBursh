import React, {Component} from 'react';
import ImageLoader from 'react-imageloader';
import Carousel from "../../../scripts/carousel";
import ImageLoading from "../ImageLoading";

import closeWhite from "./../../../assets/images/pps/closeWhite.svg";

class PpsImages extends Component {

	componentDidMount() {
		Carousel.myCarousel('.pps-carousel');
	}

	preloader() {
		return <ImageLoading/>;
	}

	render() {
		const {images, close} = this.props;

		return (
			<div className={'popup'}>
				<div className="carousel">
					<div className={'carousel__close'} onClick={close}>
						<img src={closeWhite}/>
					</div>
					<div className="carousel__prev">
						{/*<img src={arrowLeft}/>*/}
					</div>

					<div className="pps-carousel">
						{images.map((image, index) =>
							<div key={index} className="carousel-element">
								{/*<img src={image}/>*/}
								<ImageLoader src={image} preloader={this.preloader}/>
							</div>
						)}
					</div>

					<div className="carousel__next">
						{/*<img src={arrowRight}/>*/}
					</div>
				</div>
			</div>
		)
	}
}

export default PpsImages;
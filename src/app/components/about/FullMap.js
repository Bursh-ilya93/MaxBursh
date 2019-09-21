import React, {Component} from 'react';
import ImageLoading from "./../ImageLoading";
import closeWhite from "./../../../assets/images/pps/closeWhite.svg";

class FullMap extends Component {

	preloader() {
		return <ImageLoading/>;
	}

	render() {
		const {mapLink, close} = this.props;

		return (
			<div className={'popup'}>
				<div className={'close'} onClick={close}>
					<img src={closeWhite}/>
				</div>}
				<iframe src={mapLink} frameBorder={0}> </iframe>
			</div>
		)
	}
}

export default FullMap;
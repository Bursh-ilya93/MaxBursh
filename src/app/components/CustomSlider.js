import React from 'react';
import "pure-react-carousel/dist/react-carousel.es.css";
import CarouselSlider from "react-carousel-slider";

const CustomSlider =  ({children}) => {
	return (
		<CarouselSlider slideCpnts={children}/>
	)
};

export default CustomSlider;
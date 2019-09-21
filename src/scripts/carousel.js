import $ from "jquery";
import "./owl-carousel/owl.carousel.css";
import "./owl-carousel/owl.carousel";

class Carousel {
	static myCarousel(element) {
		$(function () {
			const $carousel = $(element);
			const $carouselNext = $carousel.next('.carousel__next');
			const $carouselPrev = $carousel.prev('.carousel__prev');

			$carousel.owlCarousel({
				pagination : true,
				singleItem : true,
				mouseDrag  : false,
				touchDrag  : false,
				pullDrag   : false,
				freeDrag   : false
			});

			$carouselNext.bind('click', function () {
				$carousel.trigger('owl.next');
			});

			$carouselPrev.bind('click', function () {
				$carousel.trigger('owl.prev');
			});
		});
	}
}

export default Carousel;
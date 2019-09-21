import React from 'react';
import ReactDOM from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createStore, applyMiddleware} from "redux";
import reducer from './redux/reducer';
import {App} from "./app/App";
import './assets/style/main.css'
import './assets/style/animate.css'
import Xhr from "./helpers/Xhr";
import AppNoLocalization from "./app/AppNoLocalization";
import $ from "jquery";
import reduxWebsocket from 'react-redux-websocket';
import {toast} from "react-toastify";

require('./lib/translate');

let globalObject = (typeof window !== 'undefined') ? window : global;

const socket = new WebSocket('ws://192.168.88.189/socket/site');

socket.onopen = () => {
	console.log('Socket connection open.');
};

socket.onclose = (event) => {
	if ( event.wasClean ) {
		console.log('Соединение закрыто чисто');
	} else {
		console.log('Обрыв соединения');
	}
	toast.error('Обрыв соединения! Попробуйте обновить страницу');
	console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

// получаем локализацию
Xhr.localization().then((resp) => {
	globalObject['setTranslation'](resp.data || []);

	const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk, reduxWebsocket(socket))));
	store.subscribe(() => {});

	const topOffset = 100;
	const setFixed = (object) => {
		const $coupon = $('.main .coupon');
		const couponWidth = $coupon.width();
		const $baners = $('.baners');

		if ( $(object).scrollTop() >= topOffset ) {
			$coupon.addClass('fixed');
			$coupon.width(couponWidth);
			$baners.css('padding-top', $coupon.height());
		} else {
			$coupon.removeClass('fixed');
			$baners.css('padding-top', 7);
		}
	};

	if ( $(window).scrollTop() >= topOffset ) {
		setFixed(window);
	}

	$(window).scroll(function () {
		setFixed(this);
	});

	ReactDOM.render(
		<Provider store={store}>
			<Router history={createBrowserHistory()}>
				<App/>
			</Router>
		</Provider>, document.getElementById('root')
	);
}).catch((ex) => {
	console.error(ex);
	ReactDOM.render(<AppNoLocalization/>, document.getElementById('root'));
});
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

export const AppLayout = ({children}) => {
	return (
		<React.Fragment>
			<Header/>
			<main className="main">
				{children}
			</main>
			<Footer/>
		</React.Fragment>
	)
};
import React, {Fragment} from 'react';
import LeftSidebar from "../components/sidebars/LeftSidebar";
import RightSidebar from "../components/sidebars/RightSidebar";

export const MainLayout = ({children}) => {
	return (
		<Fragment>
			<LeftSidebar/>
			{children}
			<RightSidebar/>
		</Fragment>
	)
};
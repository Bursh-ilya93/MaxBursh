import React  from "react";
import {Link} from "react-router-dom";

const Breadcrumbs = ({data}) => {
    let key = 200;

    const breadcrumbs = data.reduce((arr, item, index) => {
        if (item.key) {
            arr.push(<Link className={'breadcrumbs__link'} key={key++} to={item.key}>{item.value}</Link>);
        } else {
            arr.push(<span key={key++}>{item.value}</span>);
        }
        arr.push(<span className={'breadcrumbs__deliver'} key={key++}>/</span>);

        return arr;
    }, []);

    breadcrumbs.pop();

    return (
        <div className={`breadcrumbs`}>
            {breadcrumbs}
        </div>
    );
};

export default Breadcrumbs;
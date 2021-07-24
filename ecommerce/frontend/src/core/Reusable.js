import React from 'react';
import './Reusable.css';

const Reusable = ({title = 'Title',description='Description', _margin= '30vh'}) => {

    return (
        <div className="jumbotron jumbotron-fluid " style={{ margin : `0 0 ${_margin} 0`}}>
            <div className="container text-center">
                <h1 className="display-4 bottom"> {title}</h1>
                <p class="lead">{description}</p>
            </div>
        </div>
    )
}

export default Reusable;
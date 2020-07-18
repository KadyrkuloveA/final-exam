import React from 'react';
import {apiURL} from "../../../constants";

const PostThumbnail = props => {
    if (props.image) {
        return <img className='card-img-top' src={apiURL + '/' + props.image} alt={props.image}/>
    }
};

export default PostThumbnail;
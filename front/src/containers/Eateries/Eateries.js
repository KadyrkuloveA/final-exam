import React, {useEffect} from 'react';
import {fetchEateries} from "../../store/actions/eateriesActions";
import {connect} from "react-redux";
import PostThumbnail from "../../components/UI/PostThumbnail/PostThumbnail";
import {NavLink} from "react-router-dom";

const Eateries = props => {

    useEffect(() => {
        props.fetchEateries();
        //eslint-disable-next-line
    }, []);


    return (
        <div className='container'>
            <h2>All Places</h2>
            <div className="card-columns">
                {props.eateries.map(eatery => (
                    <div className="card" key={eatery._id}>
                        {eatery.image ?
                            <PostThumbnail image={eatery.image}/>
                            : null}
                        <div className="card-body">
                            <h5 className="card-title">
                                <NavLink className="text-dark" to={'/eateries/' + eatery._id}>{eatery.title}</NavLink>
                            </h5>
                            <p className="card-text">
                                {eatery.rating}/5 ★
                                ({eatery.ratingsAmount} reviews)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    eateries: state.eateries.eateries,
});

const mapDispatchToProps = dispatch => ({
    fetchEateries: () => dispatch(fetchEateries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Eateries);
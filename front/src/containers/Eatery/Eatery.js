import React, {useEffect, useState} from 'react';
import {fetchEatery} from "../../store/actions/eateriesActions";
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import {fetchReviews, addReview} from "../../store/actions/reviewActions";


const Eatery = (props) => {
    const ReviewInf = {
        eatery: props.match.params.id,
        description: '',
        serviceScore: '',
        foodScore: '',
        interiorScore: ''
    };

    const [review, setReview] = useState(ReviewInf);

    const addReview = async e => {
        await props.addReview(review);
        fetchReviews().catch(error => {
            console.error(error);
        })
    };

    const Changer = (event) => {
        setReview({
            ...review,
            [event.target.name]: event.target.value
        });
    };

    const fetchEatery = async() => {
        await props.fetchEatery(props.match.params.id);
    };

    const fetchReviews = async() => {
        await props.fetchReviews(props.match.params.id);
    };

    useEffect(() => {
        fetchEatery().catch(error => {
            console.error(error);
        });
        fetchReviews().catch(error => {
            console.error(error);
        })
        //eslint-disable-next-line
    }, []);


    return (
        <div className="card shadow-sm bg-white rounded" style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div className="card-body">
                <div className='text-center mb-3'>
                    <h4>{props.eatery.title}</h4>
                </div>
                <div className="pt-3 row justify-content-around">
                    {props.eatery.image ?
                        <img src={apiURL + '/' + props.eatery.image} className='rounded mb-3' alt={props.eatery.image} style={{maxWidth: '300px', display: 'block'}}/>
                        : null}
                    <p className='card-text'>
                        {props.eatery.description} <br/> <br/>
                        Overall {props.eatery.rating} / 5 ★
                        ({props.eatery.ratingsAmount} reviews)<br/>
                        Service {props.eatery.service} / 5 ★<br/>
                        Food {props.eatery.food} / 5 ★<br/>
                        Interior {props.eatery.interior} / 5 ★<br/>
                    </p>
                </div>
                <div>
                    {
                        props.reviews.map(review => (
                            <div className='card mt-1 mb-1' key={review._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{review.sender.username}</h5>
                                    <p className='card-text'>{review.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h5 className='text-center mt-3 pb-3'>Add Review</h5>
                    <form onSubmit={addReview()}>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text" value={review.description} onChange={Changer} className="form-control" id="description" name='description'/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="serviceScore" className="col-sm-2 col-form-label">Service</label>
                            <div className="col-sm-2">
                                <select className="form-control" id="serviceScore" name='serviceScore' value={review.serviceScore} onChange={Changer}>
                                    <option value=''> </option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </div>
                            <label htmlFor="foodScore" className="col-sm-2 col-form-label">Food</label>
                            <div className="col-sm-2">
                                <select className="form-control" id="foodScore" name='foodScore' value={review.foodScore} onChange={Changer}>
                                    <option value=''> </option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </div>
                            <label htmlFor="interiorScore" className="col-sm-2 col-form-label">Interior</label>
                            <div className="col-sm-2">
                                <select className="form-control" id="interiorScore" name='interiorScore' value={review.interiorScore} onChange={Changer}>
                                    <option value=''> </option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    eatery: state.eateries.eatery,
    reviews: state.reviews.reviews
});

const mapDispatchToProps = dispatch => ({
    fetchEatery: (id) => dispatch(fetchEatery(id)),
    fetchReviews: (id) => dispatch(fetchReviews(id)),
    addReview: (reviewData) => dispatch(addReview(reviewData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Eatery);
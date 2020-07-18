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
        e.preventDefault();
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
                        {props.eatery.content}
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
                {/*<div>*/}
                {/*    <h5 className='text-center mt-3 pb-3'>Add Comment</h5>*/}
                {/*    <form onSubmit={addComment}>*/}
                {/*        <div className="form-group row">*/}
                {/*            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>*/}
                {/*            <div className="col-sm-10">*/}
                {/*                <input type="text" value={comment.author} onChange={Changer} className="form-control" id="name" name='author' placeholder="Anonymous"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="form-group row">*/}
                {/*            <label htmlFor="comment" className="col-sm-2 col-form-label">Comment</label>*/}
                {/*            <div className="col-sm-10">*/}
                {/*                <input type="text" value={comment.text} onChange={Changer} className="form-control" id="comment" name='text' required/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <button type="submit" className="btn btn-success">Add</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
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
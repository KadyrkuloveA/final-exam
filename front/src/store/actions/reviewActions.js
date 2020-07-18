import axiosApi from "../../axiosApi";

export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const fetchReviewsSuccess = reviews => ({type: FETCH_REVIEWS_SUCCESS, reviews});

export const fetchReviews = id => {
    return async dispatch => {
        const response = await axiosApi.get('/ratings/' + id);
        dispatch(fetchReviewsSuccess(response.data));
    }
};

export const addReview = reviewData => {
    return async (dispatch) => {
        await axiosApi.post('/ratings', reviewData);
    };
};

export const deleteReview = id => {
    return async dispatch => {
        await axiosApi.delete('/ratings/' + id);
    }
};


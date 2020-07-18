import {FETCH_REVIEWS_SUCCESS} from "../actions/reviewActions";

const initialState = {
    reviews: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS_SUCCESS:
            return {...state, reviews: action.reviews};
        default:
            return state;
    }
};

export default productsReducer;
import {FETCH_EATERY_SUCCESS, FETCH_EATERIES_SUCCESS} from "../actions/eateriesActions";

const initialState = {
    eateries: [],
    eatery: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EATERIES_SUCCESS:
            return {...state, eateries: action.eateries};
        case FETCH_EATERY_SUCCESS:
            return {...state, eatery: action.eatery};
        default:
            return state;
    }
};

export default productsReducer;
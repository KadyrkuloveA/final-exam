import axiosApi from "../../axiosApi";

export const FETCH_EATERIES_SUCCESS = 'FETCH_EATERIES_SUCCESS';
export const FETCH_EATERY_SUCCESS = 'FETCH_EATERY_SUCCESS';

export const fetchEateriesSuccess = eateries => ({type: FETCH_EATERIES_SUCCESS, eateries});
export const fetchEaterySuccess = eatery => ({type: FETCH_EATERY_SUCCESS, eatery});

export const fetchEateries = () => {
    return async (dispatch) => {
        let url = '/eateries';

        const response = await axiosApi.get(url);
        dispatch(fetchEateriesSuccess(response.data));
    };
};

export const fetchEatery = id => {
    return async dispatch => {
        const response = await axiosApi.get('/eateries/' + id);
        dispatch(fetchEaterySuccess(response.data));
    }
};

export const addEatery = eateryData => {
    return async (dispatch) => {
        await axiosApi.post('/eateries', eateryData);
    };
};

export const deleteEatery = id => {
    return async dispatch => {
        await axiosApi.delete('/eateries/' + id);
    }
};


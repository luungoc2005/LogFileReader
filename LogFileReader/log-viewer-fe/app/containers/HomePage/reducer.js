import { fromJS } from 'immutable';

import {
    CHANGE_DATE,
    CHANGE_SEARCH,
    CHANGE_FOCUSED,

    GET_SEARCH_RESULT,
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_FAILURE,
} from './constants';

import moment from 'moment';

const initialState = fromJS({
    startDate: moment().subtract(1, 'days'),
    endDate: moment(),
    searchText: '',
    focusedInput: null,
    isLoading: false,
    files: []
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DATE:
            return state
                .set('startDate', action.startDate)
                .set('endDate', action.endDate);
        
        case CHANGE_SEARCH:
            return state
                    .set('searchText', action.searchText);

        case CHANGE_FOCUSED:
            return state
                    .set('focusedInput', action.focusedInput);
        
        case GET_SEARCH_RESULT:
            return state
                    .set('isLoading', true)
                    .set('files', []);

        case GET_SEARCH_RESULT_SUCCESS:
            return state
                    .set('isLoading', false)
                    .set('files', action.files)

        case GET_SEARCH_RESULT_FAILURE:
            return state
                    .set('isLoading', false)
                    .set('error', action.error)

        default:
            return state;
    }
}

export default homePageReducer;
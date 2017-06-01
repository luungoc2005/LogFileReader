import {
    CHANGE_DATE,
    CHANGE_SEARCH,
    CHANGE_FOCUSED,

    GET_SEARCH_RESULT,
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_FAILURE,
} from './constants';

export function changeDates({ startDate, endDate }) {
    return {
        type: CHANGE_DATE,
        startDate,
        endDate
    }
}

export function changeFocused({ focusedInput }) {
    return {
        type: CHANGE_FOCUSED,
        focusedInput
    }
}

export function changeSearch({ searchText }) {
    return {
        type: CHANGE_SEARCH,
        searchText
    }
}

export function getSearchResult() {
    return {
        type: GET_SEARCH_RESULT,
    }
}

export function getSearchResultSuccess(files) {
    return {
        type: GET_SEARCH_RESULT_SUCCESS,
        files
    }
}

export function getSearchResultFailure(error) {
    return {
        type: GET_SEARCH_RESULT_FAILURE,
        error
    }
}
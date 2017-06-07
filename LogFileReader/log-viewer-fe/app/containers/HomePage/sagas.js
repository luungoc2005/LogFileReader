import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';

import { API_ROOT } from 'api/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_SEARCH_RESULT } from './constants';

import {
  makeStartDateSelector,
  makeEndDateSelector,
  makeSearchTextSelector,
} from './selectors';

import request from 'utils/request';
import makeParams from 'utils/requestParams';

import { 
    getSearchResult, 
    getSearchResultSuccess, 
    getSearchResultFailure 
} from './actions';

let fetchGetHeaders = new Headers();

fetchGetHeaders.append('Content-Type', 'application/json');
fetchGetHeaders.append('Access-Control-Allow-Origin', '*');

const fetchGetInit = { method: 'GET',
                        headers: fetchGetHeaders,
                        mode: 'no-cors',
                        cache: 'default' };

export function* getFiles() {
    const searchQuery = yield select(makeSearchTextSelector());
    const startDate = yield select(makeStartDateSelector());
    const endDate = yield select(makeEndDateSelector());

    const params = yield select(makeParams, [
        {
            key: 'filter',
            value: searchQuery
        },
        {
            key: 'start',
            value: startDate
        },
        {
            key: 'end',
            value: endDate
        }
    ]);

    const requestURL = `${API_ROOT}view_csv/?${params}`
    try {
        const files = yield call(request, requestURL, fetchGetInit);
        console.log(requestURL);
        yield put(getSearchResultSuccess(files));
    } catch (err) {
        console.log(err);
        yield put(getSearchResultFailure(err));
    }
}

export function* watchLastGetFiles() {
    const watcher = yield takeLatest(GET_SEARCH_RESULT, getFiles);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    watchLastGetFiles,
];
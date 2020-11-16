import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import axios from '../../pages/api/axios';

function getUserAPI() {
    return axios.get('/user');
}

function* getUserRequest() {
    try {
        const result = yield call(getUserAPI);
        const userData = result.data;
        console.log('getUserAPI()', userData)
        yield put(actions.loadUserSucssess(userData));
    } catch (err) {
        yield put(actions.loginRequestFailure(err.response.data));
    }
}

export function* onLoadUser() {
    yield takeLatest(actions.LOAD_USER_REQUEST, getUserRequest);
}

export default function* rootSaga() {
    yield all([
        call(onLoadUser),
    ]);
}

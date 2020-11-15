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

function* logoutRequest() {
    try {
        yield call(logoutAPI);
        yield call(logout);
        yield put(actions.logoutRequestSuccess());
    } catch (error) {
        yield put(actions.logoutRequestFailure(error));
    }
}

// export function* loginSuccess() {
//   yield takeLatest(actions.LOGIN_SUCCESS, function* (token) {
//     yield setCookie('id_token', token);
//   });
// }

// export function* loginError() {
//   yield takeLatest(actions.LOGIN_ERROR, function*() {});
// }

export function* onLoadUser() {
    yield takeLatest(actions.LOAD_USER_REQUEST, getUserRequest);
}
export function* onLogout() {
    yield takeLatest(actions.LOGOUT_REQUEST_START, logoutRequest);
}
export default function* rootSaga() {
    yield all([
        call(onLoadUser),

    ]);
}

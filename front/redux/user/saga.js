import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import axios from '../../pages/api/axios';
import actions from './actions';

function signupAPI(data) {
    return axios.post('/user', data);
}

export function* signUpRequest() {
    yield takeEvery(actions.SIGN_UP_REQUEST, function* ({ data }) {
        try {
            const result = yield call(signupAPI, data)
            yield put({
                type: actions.SIGN_UP_SUCCESS
            });
        } catch (err) {
            yield put({
                type: actions.SIGN_UP_FAILURE,
                data: err.response.data
            });
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(signUpRequest)
    ]);
}

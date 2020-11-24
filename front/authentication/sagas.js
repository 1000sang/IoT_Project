import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';

import { login, logout, setCookie, removeCookie } from './auth.utils';
import { notification } from '@iso/components';
import JwtAuthentication from './jwtAuthentication';
import actions from './actions';
import axios from '../pages/api/axios';

function loginAPI(payload) {
  return axios.post('/user/login', payload);
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* loginRequest({ payload }) {
  try {
    const result = yield call(loginAPI, payload);
    const userData = result.data;

    yield put(actions.loginRequestSuccess(userData));


  } catch (err) {
    yield put(actions.loginRequestFailure(err.response.data));
  }
}

export function* jwtLoginRequest() {
  // yield takeLatest(actions.JWT_LOGIN_REQUEST, function*({ payload }) {
  //   const result = yield call(JwtAuthentication.login, payload.userInfo);
  //   if (result.error) {
  //     notification('error', result.error);
  //     yield put(actions.loginRequestFailure(error));
  //   } else {
  //     payload.history.push('/dashboard');
  //     yield put({
  //       type: actions.LOGIN_REQUEST_SUCCESS,
  //       token: result.token,
  //       profile: result.profile,
  //     });
  //   }
  // });
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

export function* onLogin() {
  yield takeLatest(actions.LOGIN_REQUEST_START, loginRequest);
}
export function* onLogout() {
  yield takeLatest(actions.LOGOUT_REQUEST_START, logoutRequest);
}
export default function* rootSaga() {
  yield all([
    call(onLogin),
    call(jwtLoginRequest),
    call(onLogout)
  ]);
}

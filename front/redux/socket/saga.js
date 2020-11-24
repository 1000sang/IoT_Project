import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import axios from '../../pages/api/axios';
import io from 'socket.io-client';

function socketConnectAPI(payload) {
    return axios.post('/socket', payload);
}

function socketConnectRequest(payload) {
    const socketClient = io('https://elb.devfloors.com:443/deviceRoom', { transports: ['websocket'] });
    socketClient.on('connect', async () => {
        console.log('socket connected');
        await socketClient.emit('login', payload);
    })
    return socketClient;
}

function* socketConnect({ payload }) {
    try {
        const socketClient = yield call(socketConnectRequest, payload);
        yield put(actions.socketConnectSucssess(socketClient));

    } catch (err) {
        console.log('socketConnectRequest err', err)
        yield put(actions.socketConnectFailure(err.response.data));
    }
}

export function* onSocketConnect() {
    yield takeLatest(actions.SOCKET_CONNECT_REQUEST, socketConnect);
}

export default function* rootSaga() {
    yield all([
        call(onSocketConnect),
    ]);
}

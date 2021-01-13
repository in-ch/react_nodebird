import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
    return axios.post('/api/login', data);
}

function logOutAPI() {
    return axios.post('/api/logout');
}



function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);   나중에 서버에 요청을 보낼 것이다.
        yield delay(1000);
        yield put({   // put은 dispatch같은 거다.
            type: 'LOG_IN_SUCCESS',
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOG_OUT_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);  // LOG_IN_REQUEST가 실행될 때 까지 기다리겠다는 뜻이다. 실행되면 logIn함수가 호출된다.
}
function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);  // throttle 쓰면 몇 초에 한 번씩 보내라고 구현할 수 있음.
}

export default function* userSaga() {
    yield all([
        fort(watchLogIn),
        fort(watchLogOut),
    ])
}
import { all, fork, call, take, put } from 'redux-saga/effects';

function logInAPI() {
    //return axios.post('/api/login')
}

function* logIn() {
    try{
        const result = yield call(logInAPI)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        });
    } catch(err) {
        const result = yield call(logInAPI)
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        });
    }
    
}

function* watchLogIn() {
    yield take('LOG_IN_REQUEST');
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST');
}

function* watchAddPost() {
    yield take('ADD_POST_REQUEST');
}

export default function* rootSaga() {
    yield all([  //all은 아래것 모두 실행하는 것이다. fork는 함수를 실행한다는 것이다.
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}
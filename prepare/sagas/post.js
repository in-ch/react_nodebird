import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';

function addPostAPI(data) {
    return axios.post('/api/post', data);
}





function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: {
                id,
                content: action.data,
            },
        });
        yield put({
            type: 'ADD_POST_TO_ME',
            data: id,
        });
    } catch (err) {
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        });
    }
}





function* watchAddPost() {
    yield take('ADD_POST_REQUEST');   // ADD_POST_REQUEST가 실행될 때 까지 기다리겠다는 뜻이다.
}


export default function* postSaga() {
    yield all([
        fort(watchAddPost),
    ])
}
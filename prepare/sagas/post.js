import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';


function* watchAddPost() {
    yield take('ADD_POST_REQUEST');
}

function addPostAPI(data) {
    return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}
  

export default function* postSaga() {
    yield all([
        fort(watchAddPost),
    ])
}
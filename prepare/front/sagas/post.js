import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../reducers/post';

function addPostAPI(data) {
    return axios.post('/api/post', data);
}

function addCommentAPI(data) {
    return axios.post('/api/post', data);
}


function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                content: action.data,
            },
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_REQUEST,
            data: {
                id,
                content: action.data,
            },
        });
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: id,
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}





function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST,addPost);   // ADD_POST_REQUEST가 실행될 때 까지 기다리겠다는 뜻이다.
}

function* watchAddComment() {
    yield takeLatest(ADD_POST_REQUEST,addComment);   // ADD_POST_REQUEST가 실행될 때 까지 기다리겠다는 뜻이다.
}



export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}
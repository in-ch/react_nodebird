import { all, fork, call, take, put, delay } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';






export default function* rootSaga() {
    yield all([  //all은 아래것 모두 실행하는 것이다. fork는 함수를 실행한다는 것이다.
        fork(postSaga),
        fork(userSaga),
    ]);
}
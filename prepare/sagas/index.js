import { all, fork, call, take, put, delay } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';



export default function* rootSaga() {
    yield all([  //all은 아래것 모두 실행하는 것이다. fork는 함수를 실행한다는 것이다.
        fork(postSaga), // fork는 사가의 이펙트 중 하나로 함수를 실행하라는 뜻이다. call은 동기 함수 호출이고, fork는 비동기 함수 호출이다. 동기는 결과값을 기다리는 데, 비동기는 결과값을 안 기다리고 바로 다음 함수를 실행한다.   
        fork(userSaga),
    ]);
}
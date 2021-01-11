import { all, fork, call, take, put, delay } from 'redux-saga/effects';

function* logIn(action) {
    try {
      console.log('saga logIn');
      // const result = yield call(logInAPI);
      yield delay(1000);
      yield put({
        type: LOG_IN_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_IN_FAILURE,
        error: err.response.data,
      });
    }
  }
  
  function logOutAPI() {
    return axios.post('/api/logout');
  }
  
  function* logOut() {
    try {
      // const result = yield call(logOutAPI);
      yield delay(1000);
      yield put({
        type: LOG_OUT_SUCCESS,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_OUT_FAILURE,
        error: err.response.data,
      });
    }
  }

function* watchLogIn() {  // 이벤트 리스너 역활을 함. 
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
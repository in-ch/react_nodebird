import { createWrapper } from 'next-redux-wrapper';
import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
//import thunkMiddleware from 'redux-thunk';
import createSageMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';


 const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action);
    return next(action);
};   // 이렇게 미들웨어를 커스터마이징할 수 있음.  

const configureStore = () => {
    const sagaMiddleware = createSageMiddleware();
    const middelwares = [sagaMiddleware, loggerMiddleware];  // saga 미들웨어는 기능이 더 많다. 
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middelwares))
    : composeWithDevTools(applyMiddleware(...middelwares))
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);  //rootSaga는 이제 작성하면 된다.
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;
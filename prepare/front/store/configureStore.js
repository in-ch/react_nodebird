import { creteWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = () => {
    const store = createStore(reducer);
    store.dispatch({
        type: 'CHANGE_NICKNAME',
        data: 'dlscjf12'
    })
    return store;
};

const wrapper = createrapper(configureStore, {
    debug:precess.env.NODE_ENV==='development',
});

export default wrapper;
import { creteWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

const configureStore = () => {
    const store = createStore(reducer);
    return store;
};

const wrapper = creteWrapper(configureStore, {
    debug:precess.env.NODE_ENV==='development',
});

export default wrapper;
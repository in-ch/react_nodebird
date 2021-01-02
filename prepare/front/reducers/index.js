import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

/* const CHANGE_NICKNAME = {  // 이게 액션임
    type: 'CHANGE_NICKNAME',
    date: 'dlscjf12',
};

const CHANGE_NICKNAME = (data) => {  // 동적 액션임 
    return {
        type:'CHANGE_NICKNAME',
        data,
    }
}; */

//CHANGE_NICKNAME('dlscjf12');  // 동적 액션을 이렇게 사용하면 됨.
//store.dispatch(CHANGE_NICKNAME('dlscjf12')); // 이렇게 디스패치 보낼 수도 있음.
//나중에 비동기 동적 액션 크리에이터도 있음.

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type){
            case HYDRATE: 
                console.log(HYDRATE);
                return { ...state, ...action.payload};
            default:
                return state;
        }
    },
        user,
        post,
    });

export default rootReducer;
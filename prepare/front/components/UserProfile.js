import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = ({setIsLoggedIn}) => {
    /* const onLogOut = useCallback(()=>{
        setIsLoggedIn(false);
    },[]); */

    const dispatch = useDispatch();
    const onLogOut = useCallback(()=>{
        dispatch(logoutAction());
    },[]);
    return (
        <Card
            actions = {[
                <div key='twit'>짹짹<br/>0</div>,
                <div key='followings'>팔로잉<br/>0</div>,
                <div key='followers'>팔로워<br/>0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>IN</Avatar>}
                title='Inch'
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;
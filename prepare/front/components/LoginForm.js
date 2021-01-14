import React, { useState, useCallback } from 'react';
import { Button, Form } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.span`
    margin-top:10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginFrom = ({setIsLoggedIn}) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logInLoading } = useSelector((state)=> state.user);
    
    const onChangeEmail = useCallback((e)=>{
        setEmail(e.target.value);
    },[]);

    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value);
    },[]);

    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction({email, password}));
    },[email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <input name="user-email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <input name="user-password" value={password} onChange={onChangePassword} required />            
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" onClick={onSubmitForm} loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginFrom;
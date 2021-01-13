import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import { useCallback, useState } from 'react';
import useInput from '../hooks/useinput';
import styled from 'styled-components';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMessage = styled.div`
    color:red;
`;

const TermErrorMessage = styled.div`    
    color:red;
`;

const Signup = () => {
/*  const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangeId = useCallback(()=>{
        setId(e.target.value);
    }, []);
    const onChangeNickname = useCallback(()=>{
        setNickname(e.target.value);
    }, []);
    const onChangePassword = useCallback(()=>{
        setPassword(e.target.value);
    }, []);
    const onChangePasswordCheck = useCallback(()=>{
        setPasswordCheck(e.target.value);
    }, []); 
    const onChangePasswordError = useCallback(()=>{
    }, []); */
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');  // 여기는 다른 함수들과 좀 다르므로 hooks를 쓸 수가 없다. 
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(true);

    const onSubmit = useCallback(()=>{
        if(password !== passwordCheck) {
            return setPasswordError(true);
        } 
        if(!term){
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, password, nickname}
        });
    }, [password,passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);

    },[password]);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);

    },[password]);

    
    return(   
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>인치의 회원가입 페이지</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="user-email" value={email} required onChange={onChangeEmail}/>
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br/>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname}/>
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange = {onChangeTerm}>약관에 동의하시겠습니까?</Checkbox>
                    {termError&& <TermErrorMessage>약관에 동의하셔야 합니다.</TermErrorMessage>}
                </div>
                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>

            <AppLayout>회원가입 페이지</AppLayout>
        </>
    )
};

export default Signup;
import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import { useSelector } from 'react-redux';
import LoginFrom from '../components/LoginForm';

const AppLayout = ({children}) => {

    //const [isLoggedIn ,setIsLoggedIn] = useState(false); 리덕스쓸꺼니깐 필요없음
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>                
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>                    
                </Menu.Item>
            </Menu>

            <Row gutter={8}>
                <Col xs={24} md={6}>   
                    {//isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : /*<LoginForm setIsLoggedIn = {setIsLoggedIn} 이제 프롭스로 받을 필요 없음. />
                        isLoggedIn ? <UserProfile /> : <LoginForm /> 
                    }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    오른쪽 메뉴
                </Col>   
            </Row>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,  // 프롭스 검사하는 거임.
};

export default AppLayout;
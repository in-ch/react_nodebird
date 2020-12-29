import React , { useEffect } from 'react';
import { List, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';

const FollowList = ({header, data}) => {
    
    useEffect(() => {
        console.log(data);
    },[header]);  // 배열에 바뀌는 변수 적어줘야함

    return (
        <>
            <List 
                style={{marginBottom: 20}}
                grid={{gutter: 4, xd: 2, md: 3}}
                size="small"
                header={<div>{header}</div>}
                loadMore={<div style={{textAlign: 'center', margin: '10px 0'}}><Button>더보기</Button></div>}
                bordered
                dataSource= {data}
                renderitem={(item) => {
                    <List.Item style={{ marginTop: 20 }}>
                        <Card actions={[<StopOutlined key='stop' />]}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                }}
            />
        </>
    )
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default FollowList;
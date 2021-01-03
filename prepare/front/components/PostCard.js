import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined  } from '@ant-design/icons';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import Link from 'next/link';

const PostCard = ({post}) => {
    
    const { user } = useSelector((state)=> state.user);
    const id = user && user?.id;  // 아이디가 있으면 아이디가 들어가고 없으면 undefined로 들어가게 함 
    //const { user } = useSelector((state)=> state.user?.id);  // 이게 옵션얼 체이닝이라고 한다. 
    const [liked, setLiked] = useState(false);

    const onToggleLike = useCallback(() => {
      setLiked((prev) => !prev);
    }, []);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

     return (
        <>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={(
                        <Button.Group>
                            {id && post.User.id === id
                            ? (
                                <>
                                <Button>수정</Button>
                                <Button type="danger">삭제</Button>
                                </>
                            )
                            : <Button>신고</Button>}
                        </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <>
                <CommentForm post={post} />
                <List
                    header={`${post.Comments.length} 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                    <li>
                        <Comment
                        author={item.User.nickname}
                        avatar={(
                            <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                            </Link>
                        )}
                        content={item.content}
                        />
                    </li>
                    )}
                />
                </>
            )}
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
    }),
  };
  

export default PostCard;
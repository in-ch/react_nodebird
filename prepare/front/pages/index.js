import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading, retweetError  } = useSelector((state) => state.post);

  useEffect(()=>{
    if(retweetError){
      return alert(retweetError); // 리랜더링되면서 무한으로 뜨는데 마지막 강의에서 고칠 것이다. 
    }
  },[retweetError]);


  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostsLoading) {

          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1]?.id,  // 마지막 글의 게시글 
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePost, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((c) => {
        console.log(c);
        <PostCard key={c.id} post={c} />
      })}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context)=> {
  context.store.dispatch({
    type:LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type:LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sageTask.toPromise();
});

export default Home;

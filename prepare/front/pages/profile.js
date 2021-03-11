import React, { useEffect, Dispatch } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import {} from '../reducers/user';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST
    });
  }, []);
  
  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        data={me.Followings}
      />
      <FollowList
        header="팔로워 목록"
        data={me.Followers}
      />
    </AppLayout>
  );
};

export default Profile;

import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList = [{nickname: '인치1'},{nickname: '인치2'},{nickname: '인치3'}];
    const followingList = [{nickname: '인현1'},{nickname: '인현2'},{nickname: '인현3'}];

    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followerList} />
                <FollowList header="팔로워 목록" data={followingList} />
            </AppLayout>
        </>
    )
};

export default Profile;
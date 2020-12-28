import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>인치의 프로필 페이지</title>
            </Head>
            <AppLayout>프로필</AppLayout>
        </>
    )
};

export default Profile;
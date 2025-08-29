import apiClient from '@/lib/apiClients';
import Post from '@/components/Post';
import { PostType, UserType } from '@/types';
// import { GetServerSideProps } from 'next';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import React from 'react'
import { ParsedUrlQuery } from 'querystring';

type Props = {
    user: UserType;
};

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {

  
    // const { userId } = context.query;
     const { userId } = context.params!;

    try {
      // この単一のエンドポイントでユーザープロフィールと投稿が返されるはずです
      const response = await apiClient.get(`/users/profile/${userId}`);

      return {
        props: {
          user: response.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
};

const UserProfile = ({ user }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={user.profile?.profileImageUrl || '/default-profile.png'}
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">{user.username}</h2>
              <p className="text-gray-600">{user.profile?.bio}</p>
            </div>
          </div>
        </div>
        {/* Postコンポーネントを使って各投稿をレンダリングします */}
        {user.posts?.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
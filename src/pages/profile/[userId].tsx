import apiClient from '@/lib/apiClients';
import axios from 'axios';
import Post from '@/components/Post';
import { PostType, UserType } from '@/types';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { useAuth } from '@/context/auth';
import Link from 'next/link';

type Props = {
    user: UserType;
};

interface Params extends ParsedUrlQuery {
  userId: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    const { userId } = context.params!;

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASEURL || process.env.API_BASE_URL;
      if (!apiBase) {
        throw new Error('API base URL is not configured. Set NEXT_PUBLIC_API_BASEURL or API_BASE_URL.');
      }
      const response = await axios.get(`${apiBase}/users/profile/${userId}`);

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
  const { user: loggedInUser } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            {mounted && (
              <Image
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={user.profile?.profileImageUrl || '/default-profile.png'}
                width={80}
                height={80}
              />
            )}
            <div>
              <h2 className="text-2xl font-semibold mb-1">{user.username}</h2>
              <p className="text-gray-600">{user.profile?.bio}</p>
            </div>
          </div>
        </div>

        {/* マウント後に、ログインユーザー自身のプロフィールページの場合のみ編集ボタンを表示 */}
        {mounted && loggedInUser && loggedInUser.id === user.id && (
          <div className="text-right mb-4">
            <Link href="/profile/edit" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                プロフィールを編集
            </Link>
          </div>
        )}

        {user.posts?.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
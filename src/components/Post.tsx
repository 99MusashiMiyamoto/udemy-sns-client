import React from 'react';
import Link from 'next/link';

type PostProps = {
  post: {
    id: number;
    content: string;
    createdAt: string;
    author: {
      id: number;
      username: string;
      profile?: {
        profileImageUrl?: string;
      };
    };
  };
};

const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.author.id}`}>
            <img
              className="w-10 h-10 rounded-full mr-2 cursor-pointer"
              src={post.author.profile?.profileImageUrl || "/default-profile.png"}
              alt="User Avatar"
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;

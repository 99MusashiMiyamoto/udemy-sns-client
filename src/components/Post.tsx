import React, { useState } from 'react';
import Link from 'next/link';
import { PostType } from '@/types';
import apiClient from '@/lib/apiClients';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const [likesCount, setLikesCount] = useState<number>(post.likesCount ?? 0);
  const [liking, setLiking] = useState<boolean>(false);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      const res = await apiClient.post(`/posts/${post.id}/like`);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error(err);
      alert('ログインしてください。');
    } finally {
      setLiking(false);
    }
  };

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
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={liking}
          className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          いいね
        </button>
        <span className="text-sm text-gray-600">{likesCount}件</span>
      </div>
    </div>
  );
};

export default Post;

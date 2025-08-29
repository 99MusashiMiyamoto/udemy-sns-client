import React, { useState, useEffect } from 'react';
import Post from './Post';
import apiClient from '@/lib/apiClients';
import { PostType } from '@/types';

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  // 最新の投稿を取得する関数
  const fetchLatestPosts = async () => {
    try {
      const response = await apiClient.get("/posts/get_latest_post");
      setLatestPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // コンポーネントがマウントされた時に投稿を取得
  useEffect(() => {
    fetchLatestPosts();
  }, []);

  // 投稿ボタンが押された時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await apiClient.post("/posts", {
        content: postText,
      });
      // 新しい投稿をリストの先頭に追加
      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      setPostText("");
    } catch (err) {
      alert("ログインしてください。");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
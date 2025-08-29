import { useAuth } from '@/context/auth';
import apiClient from '@/lib/apiClients';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProfileEdit = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setBio(user.profile?.bio || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiClient.put("/users/profile", {
        username,
        bio,
      });

      // プロフィールページにリダイレクト
      router.push(`/profile/${user?.id}`);
    } catch (err) {
      console.error(err);
      alert("プロフィールの更新に失敗しました。");
    }
  };

  if (!user) {
    return <div>ログインしてください。</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
            自己紹介
          </label>
          <textarea
            id="bio"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;

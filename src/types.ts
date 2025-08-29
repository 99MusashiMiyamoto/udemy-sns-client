// export interface Profile {
//      id: number;
//   bio: String;
//   profileImageUrl: String;
//   userId: number;
//   user: UserType;
// }

// export interface UserType {
//      id: number;
//   username: String;
//   email: String;
//   password: String;
//   posts: PostType[];
//   profile: Profile[]
// }

// export interface PostType {
//     id: number;
//     content: string;
//     createdAt: string;
//     authorId: number;
//     author: UserType;
// }

// Postコンポーネントで必要となる投稿者の情報
export type PostAuthorType = {
  id: number;
  username: string;
  profile: {
    profileImageUrl: string | null;
  } | null;
};

// 1つの投稿を表す型
export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  author: PostAuthorType;
};

// プロフィールページで使うユーザー情報の型
export type UserType = {
  id: number;
  username: string;
  profile: {
    bio: string | null;
    profileImageUrl: string | null;
  } | null;
  posts: PostType[];
};
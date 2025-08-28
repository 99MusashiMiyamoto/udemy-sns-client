import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:5000/api/",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// リクエストインターセプターを追加
apiClient.interceptors.request.use((config) => {
    // ブラウザ環境でのみlocalStorageからトークンを取得する
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("auth_token");
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
});

// レスポンスインターセプターを追加（トークン期限切れの自動処理）
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // トークンが期限切れまたは無効な場合
            if (typeof window !== 'undefined') {
              localStorage.removeItem("auth_token");
              window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;

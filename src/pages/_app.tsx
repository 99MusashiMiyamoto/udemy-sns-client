import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth } from "@/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

// AuthProvider の子として、認証チェック完了後に描画するコンポーネント
const AppContent = ({ Component, pageProps }: { Component: any, pageProps: any }) => {
  const { isAuthChecked } = useAuth();

  // 認証チェックが完了するまで何も表示しない
  if (!isAuthChecked) {
    return null; // またはローディングスピナーなどを表示
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
};

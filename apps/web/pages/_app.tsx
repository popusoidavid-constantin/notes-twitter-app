import { useEffect, useState } from "react";
import { MainApp } from "../../../packages/app-main/src/MainApp";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken(undefined);
    }
    setToken(storedToken);
  }, [router]);

  if (token === undefined) {
    router.replace("/");
  }

  if (!token) {
    return <Component {...pageProps} />;
  }

  return (
    <MainApp>
      <Component {...pageProps} />
    </MainApp>
  );
}

export default MyApp;

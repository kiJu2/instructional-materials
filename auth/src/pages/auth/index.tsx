import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth.context";

const primaryBtnClasses =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
const warningBtnClasses =
  "focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900";
const successBtnClasses =
  "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
const errorBtnClasses =
  "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";

const DUMMY_ACCESS_TOKEN = "123456";

export default function SignIn() {
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [accessTokenFromCookie, setAccessTokenFromCookie] = useState<
    string | null
  >("");

  const { user, login, logout } = useAuth(); // useAuth 훅을 사용하여 user, login, logout을 가져옵니다.

  function handleGenerateToken() {
    localStorage.setItem("accessToken", DUMMY_ACCESS_TOKEN);
    setAccessToken(localStorage.getItem("accessToken"));
  }

  function handleRemoveToken() {
    localStorage.removeItem("accessToken");
    setAccessToken(localStorage.getItem("accessToken"));
  }

  function handleSetCookie() {
    document.cookie = `accessToken=${localStorage.getItem("accessToken")}`;
    setAccessTokenFromCookie(document.cookie);
  }

  function handleClearCookie() {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setAccessTokenFromCookie(document.cookie);
  }

  function handleClickLogin() {
    handleGenerateToken();
    handleSetCookie();
    login(DUMMY_ACCESS_TOKEN);
  }

  function handleClickLogout() {
    handleRemoveToken();
    handleClearCookie();
    logout();
  }

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    handleGenerateToken();
    handleSetCookie();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">Sign In</h1>
      <div className="mb-4 flex items-center flex-col gap-2">
        <button className={primaryBtnClasses} onClick={handleGenerateToken}>
          generate accessToken in local storage
        </button>
        <button className={warningBtnClasses} onClick={handleRemoveToken}>
          remove accessToken from local storage
        </button>
        <button className={primaryBtnClasses} onClick={handleSetCookie}>
          Add cookie from local storage accessToken
        </button>
        <button className={warningBtnClasses} onClick={handleClearCookie}>
          Clear cookie
        </button>
      </div>

      <hr className="my-2" />
      <div className="mb-4 flex items-center flex-col gap-2">
        <button className={successBtnClasses} onClick={handleClickLogin}>
          Login
        </button>
        <button className={errorBtnClasses} onClick={handleClickLogout}>
          Logout
        </button>
      </div>

      <hr className="my-2" />

      <Link className={primaryBtnClasses} href="/auth/permission">
        Go to permission page
      </Link>

      <hr className="my-2" />
      <div>
        <h2 className="text-2xl">LocalStorage data</h2>
        <ol>
          <li>accessToken: {accessToken}</li>
        </ol>
      </div>
      <hr className="my-2" />
      <div>
        <h2 className="text-2xl">Cookie data</h2>
        <ol>
          <li>accessToken: {accessTokenFromCookie}</li>
        </ol>
      </div>
    </div>
  );
}

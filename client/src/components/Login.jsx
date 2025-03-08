import React from "react";
import { auth, googleProvider, githubProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  // Google Sign-in
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // GitHub Sign-in
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("GitHub User:", result.user);
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleGithubLogin}>Sign in with GitHub</button>
    </div>
  );
};

export default Login;

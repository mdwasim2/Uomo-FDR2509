import { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "../../firebase.config";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router";
export default function SignIn() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const provider = new GoogleAuthProvider();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        toast.success("User Login Successfully!");
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        set(ref(db, "users/" + user.uid), {
          name: user.displayName,
          email: user.email,
          image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        }).then(() => {
          toast.success("User Login Successfully!");
          navigate('/')
        })
      }).catch((error) => {

        const errorCode = error.code;
        console.log(errorCode)
        toast.error(errorCode || "Google login failed");

      });
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-127.5 py-16">
        <div className="mb-10 flex items-center justify-center gap-10">
          <h2 className="pb-2 text-2xl font-bold tracking-wide transition-colors">
            Sign In
          </h2>
        </div>

        <div className="space-y-4 mb-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-gray/30 bg-white text-primary text-sm font-medium transition hover:bg-gray-50 hover:border-gray/50"
          >
            {/* Google Logo */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.4Z"
              />
              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.04H3.28v2.52A9.74 9.74 0 0 0 12 21.75Z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.64H3.28A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.36l3.25-2.52Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.12c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52C7.3 7.84 9.46 6.12 12 6.12Z"
              />
            </svg>

            Sign in with Google
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username / email */}
          <fieldset className="border-primary border px-4 pt-0">
            <legend className="text-primary px-1 text-sm">Email *</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address *"
              required
              className="text-primary w-full bg-transparent py-2 text-sm tracking-widest focus:outline-none"
            />
          </fieldset>

          {/* Password with notched legend label */}
          <fieldset className="border-primary border px-4 pt-0">
            <legend className="text-primary px-1 text-sm">Password *</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="text-primary w-full bg-transparent py-2 text-sm tracking-widest focus:outline-none"
            />
          </fieldset>

          {/* Remember me / Lost password */}
          <div className="flex items-center justify-between pt-1">
            <Link
              to="/forgotpassword"
              className="text-primary text-sm underline underline-offset-2"
            >
              Lost password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary w-full py-4 text-sm font-medium tracking-widest text-white transition-opacity hover:opacity-90"
          >
            LOG IN
          </button>

          {/* Footer */}
          <p className="text-gray pt-2 text-center text-sm">
            No account yet?{" "}
            <Link
              to="/signup"

              className="text-primary underline underline-offset-2"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

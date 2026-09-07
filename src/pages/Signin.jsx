import { useState } from "react";
import { Link } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase.config";
export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        toast.success("User Login Successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-127.5 py-16">
        <div className="mb-10 flex items-center justify-center gap-10">
          <h2 className="pb-2 text-2xl font-bold tracking-wide transition-colors">
            Sign In
          </h2>
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
            <a
              href="#"
              className="text-primary text-sm underline underline-offset-2"
            >
              Lost password?
            </a>
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

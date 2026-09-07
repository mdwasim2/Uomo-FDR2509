import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router";
import { auth, db } from "../../firebase.config";
import { ref, set } from "firebase/database";
export default function SignUp() {
  // login state
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
        })
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              const user = userCredential.user;
              console.log(user);
              toast.success("Account Created Successfully!");
              setLoading(false);

              set(ref(db, "users/" + user.uid), {
                name: name,
                email: email,
                image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original",
              });
            });
          })
          .catch((error) => {
            toast.error("Someting went wrong !");
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorcode = error.code;
        if (errorcode.includes("auth/email-already-in-use")) {
          toast.error("Email Already In use ");
        } else {
          toast.error("Someting went wrong !");
        }
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-127.5 py-16">
        <div className="mb-10 flex items-center justify-center gap-10">
          <h2 className="pb-2 text-2xl font-bold tracking-wide transition-colors">
            SignUp
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username / email */}
          <fieldset className="border-primary border px-4 pt-0">
            <legend className="text-primary px-1 text-sm">Name *</legend>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name *"
              required
              className="text-primary w-full bg-transparent py-2 text-sm tracking-widest focus:outline-none"
            />
          </fieldset>
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

          {/* Submit */}
          {loading ? (
            <button
              type="submit"
              className="w-full animate-spin bg-red-500 py-4 text-sm font-medium tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary w-full py-4 text-sm font-medium tracking-widest text-white transition-opacity hover:opacity-90"
            >
              SignUp
            </button>
          )}

          {/* Footer */}
          <p className="text-gray pt-2 text-center text-sm">
            Already Have an Account?
            <Link
              to="/signin"

              className="text-primary ml-2 underline underline-offset-2"
            >
              Signin
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

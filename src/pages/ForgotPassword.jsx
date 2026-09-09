import { useState } from "react";
import { Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("reset password link send successfull");
        navigate("/signin")
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });

  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 font-jost">
      <div className="w-full max-w-md">
        <Toaster position="top-center" reverseOrder={false} />
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-3">
            Forgot Password?
          </h1>

          <p className="text-gray text-sm sm:text-base leading-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-gray/20 rounded-xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full h-12 px-4 rounded-lg border border-gray/30 text-primary placeholder:text-gray/70 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-primary text-white text-sm font-medium transition hover:bg-primary/90 active:scale-[0.99]"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link
              to="/signin"
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router";
export default function Profile() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            console.log(user)
        } else {
            toast.error("user Logout")
        }
    });



    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert("logout successfull")
            navigate("/")

        }).catch((error) => {
            alert(error)
        });
    }
    return (
        <div className="min-h-screen bg-white font-jost">
            <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-5">
                <div className="w-full">
                    {/* Profile Photo */}
                    <div className="flex justify-center">
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>

                    {/* Name */}
                    <h1 className="mt-5 text-center text-2xl font-semibold text-primary">
                        {user?.displayName}
                    </h1>

                    {/* Email */}
                    <div className="mt-6">
                        <label className="mb-2 block text-sm font-medium text-primary">
                            Email
                        </label>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                            <span className="text-sm text-gray">
                                {user?.email}
                            </span>

                            {user?.emailVerified ? (
                                <span className="text-sm font-medium text-green-600">
                                    Verified
                                </span>
                            ) : (
                                <button className="text-sm font-medium text-primary underline underline-offset-2">
                                    Verify
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Logout */}
                    <button onClick={handleSignOut}
                        type="button"
                        className="mt-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

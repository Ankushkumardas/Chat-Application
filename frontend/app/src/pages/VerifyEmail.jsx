
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [tokenInput, setTokenInput] = useState("");
    const navigate = useNavigate();

    const handleManualVerify = async (e) => {
        e.preventDefault();
        if (!tokenInput) return;
        setLoading(true);
        setVerified(false);
        try {
            await axiosInstance.get(`/auth/verify-email?token=${tokenInput}`);
            setVerified(true);
            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch {
            setVerified(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700">Verifying your email...</p>
                    </div>
                ) : verified ? (
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-green-600 font-semibold">Email verified! Redirecting to login...</p>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4 text-red-500 text-center">
                            Enter your verification token below if you have it from your email:
                        </p>
                        <form onSubmit={handleManualVerify} className="flex flex-col gap-4">
                            <input
                                type="text"
                                className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Paste verification token"
                                value={tokenInput}
                                onChange={e => setTokenInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                            >
                                Verify
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;

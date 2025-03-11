import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/auth/verify-email", { token });
        if (response.data.success) {
          setStatus("success");
          setMessage("Email verified successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.data.message || "Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      <motion.div
        className="max-w-md w-full m-4 p-8 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          {status === "verifying" && (
            <motion.div
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {status === "success" && (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          )}
          {status === "error" && (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status === "verifying" && "Verifying Email"}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </motion.div>
    </div>
  );
} 
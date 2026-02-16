import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { UserRegister } from '../slice'
import { useNavigate } from "react-router-dom";

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleRegisterbtn = async(e) => {
        e.preventDefault();
        const registerBtn = await dispatch(UserRegister(form));

        if(UserRegister.fulfilled.match(registerBtn)){
            console.log("User Register Succesfully !");
            navigate('/login');
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create Account
            </h2>

            <form className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={handleRegisterbtn}
                >
                    Register
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                    Login
                </span>
            </p>
      </div>
    </div>
  );
}

// src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get("/user/profile")
            .then((res) => setProfile(res.data))
            .catch((err) => console.error("Failed to fetch profile", err));
    }, []);

    if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">User Profile</h2>
            <div className="space-y-3 text-gray-700">
                <p><strong>First Name:</strong> {profile.firstName}</p>
                <p><strong>Last Name:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
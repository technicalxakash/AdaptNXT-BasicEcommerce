// // components/Footer.jsx
// import React from "react";
// import { useAuth } from "../context/AuthContext";
//
// const Footer = () => {
//     const { isLoggedIn } = useAuth();
//
//     if (!isLoggedIn) return null;
//
//     return (
//         <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
//             © 2025 BasicEcom | All rights reserved.
//         </footer>
//     );
// };
//
// export default Footer;



import React from "react";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-3 text-white">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-white">Connect with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-white">Make Money with Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Sell on ShopZone</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-white">Let Us Help You</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Returns Centre</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs mt-8">
        © {new Date().getFullYear()} ShopZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
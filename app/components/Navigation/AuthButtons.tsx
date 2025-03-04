import Link from "next/link";
import React from "react";

export default function AuthButtons() {
  //   if (isAuthenticated) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <button
        //   onClick={logout}
        className="px-3 py-1.5 text-sm text-white bg-gray-800 hover:bg-gray-900 rounded"
      >
        Logout
      </button>
      <Link
        href="/upload"
        className="px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
      >
        Upload
      </Link>
    </div>
  );
}

// return (
//   <div className="hidden md:flex items-center space-x-2">
//     <Link
//       to="/login"
//       reloadDocument
//       className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
//     >
//       Log-in
//     </Link>
//     <Link
//       to="/signup"
//       reloadDocument
//       className="px-3 py-1.5 text-sm text-white bg-gray-800 hover:bg-gray-900 rounded"
//     >
//       Sign-up
//     </Link>
//     <Link
//       to="/login"
//       reloadDocument
//       className="px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
//     >
//       Upload
//     </Link>
//   </div>
// );
// }

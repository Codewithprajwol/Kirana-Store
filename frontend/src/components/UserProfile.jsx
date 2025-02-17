import React from 'react';

const UserProfile = ({ user }) => {
    console.log(user)
  return (
    <div className="min-h-screen bg-green-50 py-6 flex flex-col justify-center sm:py-12 px-3 ">
      <div className="relative py-3 sm:max-w-md sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-md transform -skew-y-3 sm:skew-y-0 sm:-rotate-3 sm:rounded-xl"></div>
        <div className="relative px-4 py-8 bg-white shadow-lg sm:rounded-xl sm:p-12">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-xl font-semibold text-green-700 text-center mb-4">
                User Profile
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-6 text-base leading-5 space-y-3 text-gray-700 sm:text-sm sm:leading-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600">Username:</span>
                  <span className="text-gray-800">{user.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600">Email:</span>
                  <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600">Role:</span>
                  <span className="text-gray-800">{user.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600">Created At:</span>
                  <span className="text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-600">Updated At:</span>
                  <span className="text-gray-800">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-green-600">Cart Items:</span>
                  {user.cartItems && user.cartItems.length > 0 ? (
                    <ul className="list-disc list-inside mt-2">
                      {user.cartItems.map((item, index) => (
                        <li key={index} className="text-sm">
                          Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No items in cart.</p>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 
'use client'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isClient, setIsClient] = useState(false)
  const { data, success } = useSelector((state) => state.userAuth)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading indicator
  }

  return (
    <>
      <div className="m-10 bg-gray-100 border rounded-lg p-10 w-auto h-96">
        <h1>Name : </h1>
        <h1>Email : </h1>
        <h1>Phone Number: </h1>

        <h2>Login Status: {success ? 'Logged In' : 'Not Logged In'}</h2>
      {data && (
        <>
          <p>Name: {data.fullName}</p>
          <p>Email: {data.email}</p>
        </>
      )}
      </div>
    </>
  );
};

export default Profile;

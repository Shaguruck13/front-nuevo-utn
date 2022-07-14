import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../context/userContext";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export function GetUserById() {
  const { getUserById, deleteUser } = useUsers();

  const navigate = useNavigate();

  const params = useParams();

  const [avatar, setavatar] = useState({});

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p>
          Do you want to delete user <strong>{avatar.name}</strong>, Id number{" "}
          <strong>{id}</strong>?
        </p>
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 px-3 py-2 text-white rounded-sm mx-2"
            onClick={() => {
              deleteUser(id);
              navigate("/users");
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
          <button
            className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    (async () => {
      const cualquiera = await getUserById(params.id);
      setavatar(cualquiera);
    })();
  }, [params.id, getUserById]);

  return (
    <div className="container">
      <div className="flex justify-evenly items-center pb-2">
        <h3 className="text-xl">Profile</h3>
        <Link to="/users" className="text-gray-700 text-sm hover:text-blue-600">
          Go back
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center mx-50 flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full h-96 px-2 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={avatar.IMG}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {avatar.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Id number: {avatar.id}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Email: {avatar.email}
            </p>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded my-3"
              onClick={() => navigate(`/edit/${avatar.id}`)}
            >
              Edit Profile
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(avatar.id)}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

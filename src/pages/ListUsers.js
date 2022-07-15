import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export function ListUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async()=>{const res =await axios.get("https://api-utn.herokuapp.com/users")
     setUsers(res.data)
    })()
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    //console.log(e.target.value);
  };
  //filtrado
  let result = [];

  if (!search) {
    console.log("post en el if",users);
    result = users;
  } else {
    result = users.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div>
      <div className="flex justify-evenly items-center pb-1">
        <h3 className="text-xl">Profiles</h3>
        <Link to="/" className="text-gray-700 text-sm hover:text-blue-600">
          Go back
        </Link>
      </div>
      <div className="flex justify-center py-10 px-10">
        <input
          className="bg-white w-96 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          value={search}
          onChange={searcher}
          placeholder="Search for Email @"
        ></input>
      </div>

      <div className="flex justify-center">
        <a onClick={() => navigate(`/register`)}>
          <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
            Add Profile
          </button>
        </a>
      </div>

      {/* map-cards */}
      <div className="container flex justify-around px-8 mx-10 mt-10">
        <div className="h-56 mw-auto grid grid-cols-3 gap-4 content-start container">
          {result.length > 0 && result
            .map(({ id, name, email, IMG }) => (
              <div key={id} className="text-center mx-2 my-2">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={IMG} alt={name} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Id number {id}</div>
                    <div className="font-bold text-xl mb-2">{name}</div>
                    <div className="font-bold text-xl mb-2">{email}</div>
                    <a
                      onClick={() => navigate(`/users/${id}`)}
                      className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      See Profile
                      <svg
                        className="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
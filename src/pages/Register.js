import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useUsers } from "../context/userContext";
import { useNavigate, useParams, Link } from "react-router-dom";

export function Register() {
  const { register, getUserById, updateUser } = useUsers();
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    IMG: "",
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getUserById(params.id);
        setUser(res);
      }
    })();
  }, []);

  const [error, setError] = useState([]);

  useEffect(() => {
    setError([]);
  }, []);

  return (
    <div className="container">
      <div className="container">
        <div className="flex justify-center">
          {error.length > 0 && (
            <div className="mt-20">
              {error.map((e) => (
                <div className="bg-transparent text-red-700 font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded mt-1">
                  <p key={e.msg}>
                    {e.param} {e.msg}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl">New/Edit User</h3>
            <Link
              to="/users"
              className="text-gray-700 text-sm hover:text-blue-600"
            >
              Go back
            </Link>
          </div>
          <Formik
            initialValues={user}
            onSubmit={async (values, actions) => {
            
              if (params.id) {
                const registerData = await updateUser(params.id, values);
                if (registerData) {
                  if (registerData.message) {
                    error.push({ msg: registerData.message });
                    navigate("/users");
                  }
                  if (registerData.error.length > 0) {
                    console.log(registerData);
                    setError(registerData.error);
                    
                    
                  }
                } else {
                  setError([]);
                }
              } else {
                const registerData = await register(values);
        
                if (registerData) {
                  if (registerData.message) {
                    error.push({ msg: registerData.message });
                    navigate("/users");
                  }
                  if (registerData.error.length > 0) {
                    setError(registerData.error);
                  }
                } else {
                  setError([]);
                }
              }
            }}
            enableReinitialize
          >
            {({ handleSubmit, setFieldValue }) => (
              <div className="container">
                <div className="flex justify-center">
                  <Form onSubmit={handleSubmit}>
                    <div className="mx-20 my-5 px-10 py-10 bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label htmlFor="" hidden>
                            Name
                          </label>
                          <Field
                            className="bg-white w-96 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            name="name"
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label htmlFor="" hidden>
                            Email
                          </label>
                          <Field
                            className="bg-white w-96 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            name="email"
                            type="email"
                            placeholder="Email"
                          />
                          </div>
                        </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label htmlFor="" hidden>
                            Password
                          </label>
                          <Field
                            className="bg-white w-96 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-5 bg-slate-200">
                          <label htmlFor="">IMG</label>
                          <input
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 w-full"
                            type="file"
                            name="IMG"
                            placeholder="Img"
                            onChange={(e) =>
                              setFieldValue("IMG", e.target.files[0])
                            }
                          />
                        </div>
                      </div>

                      <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="submit"
                      >
                        Save
                      </button>
                      <div></div>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

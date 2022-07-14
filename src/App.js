import "./App.css";
import {
  HomePage,
  ListUsers,
  NotFoundPage,
  NavBar,
  GetUserById,
  Register,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/* //navBar */}
      <div className="relative mt-8">
        <div className="absolute inset-x-0 top-0 mb-10">
          <NavBar />
        </div>
      </div>
      {/* //Body */}
      <div className=" min-h-screen flex items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Register />} />
          <Route path="/users/:id" element={<GetUserById />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;

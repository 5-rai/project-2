import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Post from "./pages/Post";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import Sidebar from "./layouts/Sidebar";
import Write from "./pages/Write";
import ModifyProfile from "./pages/ModifyProfile";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* 추후 삭제 */}
          <Route path="/write" element={<Write />}></Route>
          <Route path="/channels/:channelName" element={<Dashboard />}></Route>
          <Route
            path="/channels/:channelName/:postId"
            element={<Post />}
          ></Route>
          <Route path="/mypage" element={<MyProfile />}></Route>
          <Route path="/mypage/edit" element={<ModifyProfile />}></Route>
          <Route path="/user/:userId" element={<UserProfile />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

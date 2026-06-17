import { Button, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";

const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/:username"
          element={user ? <UserPage /> : <Navigate to="/auth" />}
        />

        <Route
          path="/:username/post/:pid"
          element={user ? <PostPage /> : <Navigate to="/auth" />}
        />
      </Routes>

      {user && <LogoutButton />}
      {user && <CreatePost />}
    </Container>
  );
};

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BoardList from "./pages/posts/BoardList";
import PostList from "./pages/posts/PostList";
import PostDetail from "./pages/posts/PostDetail";
import CreatePost from "./pages/posts/CreatePost";

export default function App() {
  return (
    <>
      <div className="maincontent">
        <Routes>
          <Route path="/" element={<Navigate to="/boardlist" replace />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boards/:boardId/posts" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/boards/:boardId/create-post" element={<CreatePost />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

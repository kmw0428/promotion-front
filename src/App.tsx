import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatBotIcon from "../public/chatbot.png";
import ChatBot from "./pages/ChatBot";
import MainPage from "./pages/MainPage";
import BoardList from "./pages/posts/BoardList";
import PostList from "./pages/posts/PostList";
import PostDetail from "./pages/posts/PostDetail";
import CreatePost from "./pages/posts/CreatePost";
import LocationList from "./pages/locations/LocationList";
import CreateLocation from "./pages/locations/CreateLocation";
import GameList from "./pages/games/GameList";
import CreateGame from "./pages/games/CreateGame";
import UnityContentList from "./pages/games/UnityContentList";
import CreateUnityContent from "./pages/games/CreateUnityContent";
import RollerRink from "./pages/locations/RollerRink";
import School from "./pages/locations/School";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handlechatbot = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <>
      <div className="maincontent">
        <div className="chatbot" onClick={handlechatbot}>
          <img src={ChatBotIcon} className="chatbotimg" alt="ChatBot Icon" />
        </div>
        {isChatOpen && <ChatBot />}
        <Routes>
          <Route path="/" element={<Navigate to="/rollerrink" replace />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/boardlist" element={<BoardList />} />
          <Route path="/boards/:boardId/posts" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/boards/:boardId/create-post" element={<CreatePost />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/locations/create" element={<CreateLocation />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<CreateGame />} />
          <Route path="/unitycontents" element={<UnityContentList />} />
          <Route path="/unitycontents/create" element={<CreateUnityContent />} />
          <Route path="/rollerrink" element={<RollerRink />} />
          <Route path="/school" element={<School />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

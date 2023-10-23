import TopBar from "./components/topBar/topBar";
import Home from "./pages/home/home";
import SinglePage from "./pages/singlePost/single";
import Write from "./pages/write/Write";
import WriteV2 from "./pages/write/WriteV2";
import Setting from "./pages/setting/setting";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import NotFound from "./pages/404/NotFound";
import CreatePost from "./pages/CreatePost/CreatePost";
import Footer from "./components/footer/Footer";
import Medium from "./pages/Medium/medium";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./app.scss";

function App() {
  // const currentUser = true;
  var currentUser = false;
  const user = useSelector((state: any) => state.user);
  if (user) {
    currentUser = true;
  } else {
    currentUser = false;
  }
  return (
    <>
      <Router>
        <TopBar login={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/medium" element={<Medium />} />
          <Route
            path="/register"
            element={currentUser ? <Home /> : <Register />}
          />
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />
          <Route path="/post/:id" element={<SinglePage />} />
          <Route path="/write" element={currentUser ? <Write /> : <Login />} />
          <Route
            path="/writev2"
            element={currentUser ? <WriteV2 /> : <Login />}
          />
          {/* <Route path="/createpost" element = {currentUser ? <CreatePost /> : <Login />} /> */}
          <Route
            path="/settings"
            element={currentUser ? <Setting /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;

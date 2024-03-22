import Profile from "./Profile";
import Navbar from "../../layouts/Navbar";
import CreatePost from "../Post/CreatePost";
import UserArticles from "./UserArticle";

function Dashboard() {
  return (
    <>
      <Navbar />

      <Profile />
      <CreatePost />
      <UserArticles />
    </>
  );
}

export default Dashboard;

import Profile from "./Profile";
import Navbar from "../../layouts/Navbar";
import CreatePost from "../Post/CreatePost";
import UserArticles from "./UserArticle";

function Dashboard() {
  return (
    <>
      <div className="profil-nav">
        <Navbar />
      </div>
      {/* <div className="info-cont">
        <Profile />
      </div>
 
      <UserArticles /> */}
    </>
  );
}

export default Dashboard;

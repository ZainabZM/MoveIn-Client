import Profile from "./Profile";
import Navbar from "../../layouts/Navbar";

function Dashboard() {
  return (
    <>
      {/* SECTION HEADER - START */}
      <Navbar />
      {/* SECTION HEADER - END */}

      {/* SECTION DASHBOARD - START */}
      <section className="sectionDashboard">
        <Profile />
      </section>
      <section></section>
      {/* SECTION DASHBOARD - END */}
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard;
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div>
          <img src={assets.dashboard_icon_1} alt="Dash" />

          <div>
            <p>{}das</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React from "react";

function Dashboard() {
  // Your array of recent activities
  const recentActivities = [
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    { content: "User John Doe registered.", time: "10 minutes ago" },
    { content: "Case #123 created.", time: "20 minutes ago" },
    // Add other activities as needed
  ];

  return (
    <>
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        <h3>Statistics</h3>
        <div className="live-static">
          <p>Total Users: 100</p>
          <p>Total Cases: 50</p>
          <p>Total Skins: 200</p>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="content">
            <table id="dtVerticalScrollExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th className="th-sm">Content</th>
                  <th className="th-sm">Time</th>
                </tr>
              </thead>
              <tbody className="scrollable-content">
                {recentActivities.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.content}</td>
                    <td>{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

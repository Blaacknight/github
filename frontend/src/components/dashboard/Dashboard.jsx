import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

   const fetchRepositories = async () => {
      // Add this check: Only fetch if userId is valid
      if (userId && userId !== 'undefined' && userId !== 'null') {
        try {
          const response = await fetch(
            `http://localhost:3002/repo/user/${userId}`
          );
          if (!response.ok) {
            // Handle cases where the response status is not OK (like 404)
            const errorData = await response.json();
            console.error("Error fetching repositories:", errorData.error || response.statusText);
            setRepositories([]); // Clear repositories or handle appropriately
            return; // Stop execution if fetch failed
          }
          const data = await response.json();
          // Check if data.repositories exists before setting state
          setRepositories(data.repositories || []);
        } catch (err) {
          console.error("Error while fetching repositories: ", err);
          setRepositories([]); // Set to empty array on error
        }
      } else {
        console.log("UserID not found, skipping fetchRepositories.");
        setRepositories([]); // Ensure repositories are empty if no user ID
      }
    };


    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
        console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;

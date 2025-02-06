//import React from 'react';
import { useContext } from "react";
import { UserContext } from "../context/user.context";

const Homepage = () => {
    const { user} = useContext(UserContext)
  return (

    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to the Homepage</h1>
        <div>{ JSON.stringify(user)}</div>
      </header>
      <main>
        <p>This is the homepage of our React app!</p>
      </main>
    </div>
  );
}

export default Homepage;

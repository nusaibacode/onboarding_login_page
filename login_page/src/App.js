import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as Database from "./constants/database.js";
import axios from "axios";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState({});


  const userDatabase = Database.userDatabase; 
  const errors = Database.errors;  


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = userDatabase.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setLoggedInUsername(userData.username);
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }

  };

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const loadPost = async () => {

          // Till the data is fetch using API 
          // the Loading page will show.
          setLoading(true);

          // Await make wait until that 
          // promise settles and return its result
          const response = await axios.get(
          // "https://jsonplaceholder.typicode.com/posts/");
          "http://numbersapi.com/random/math");


          // After fetching data stored it in posts state.
          setPosts(response.data);

          // Closed the loading page
          setLoading(false);
      }

      // Call the function
      loadPost();
  }, []);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

    // const data = (posts.map((item) =>
    // // Presently we only fetch 
    // // title from the API 
    // <h4>{item.title}</h4>))

    const data = (
    <h4>{posts}</h4>)


    // JSX code for User's profile, logged in
    const userProfile = (
      <div>
      <div>Welcome {loggedInUsername}! You're successfully logged in!</div>
      <div>Here's a fun math fact: </div>
      <h4>{data}</h4>
      </div>
    );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? 
        // (posts.map((item) =>
        //                 <h4>User logged in! {item.title}</h4>)
        //             ) 
        userProfile
                    : renderForm}
      </div>
    </div>

  );
}

export default App;
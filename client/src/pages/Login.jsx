import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth(); // store token in local storage

  // Handle input values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User credentials: ", user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("Response Data: ", res_data);

      if (response.ok) {
        // Store token in local storage
        storeTokenInLs(res_data.token);
        // console.log("...........",res_data.token);

        toast.success("Login Successfully");
    
        // Redirect to the homepage
        navigate("/");
      } else {
        toast.error(res_data.extraDetail ? res_data.extraDetail : res_data.message);
      }

    } catch (error) {
      console.error("Error during login: ", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registerImage">
              <img
                src="/images/login.png"
                width="500"
                height="500"
                alt="Login Illustration"
              />
            </div>

            <div className="registration-form">
              <h1 className="heading mb-3">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" placeholder="Email" id="email" required autoComplete="off"
                    value={user.email}
                    onChange={handleInput}/>
                </div>

                <div>
                  <label htmlFor="pass">Password:</label>
                  <input type="password" name="pass" placeholder="Password" id="pass" required autoComplete="off"
                    value={user.pass}
                    onChange={handleInput}/>
                </div>

                <button type="submit" className="btn btn-submit">
                  Login Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

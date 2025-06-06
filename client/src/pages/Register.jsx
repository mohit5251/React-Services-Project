import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {

    const [user,setuser] = useState({
        name : "",
        email : "",
        phone : "",
        pass : "",
    });

    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth(); //store token in local storage

    //handling the input values
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user,
            [name] : value,
        })
    };

    //handling form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(user),
            });

            //get json token from server
            const res_data = await response.json();
            console.log("res from server", res_data.extraDetail);

            if(response.ok)
            {   
                //store token in local storage
                storeTokenInLs(res_data.token);

                toast.success("Regestration Successfully");
                setuser({name : "", email : "", phone : "", pass : "",});
                navigate("/");
            }else{
                toast.error(res_data.extraDetail ? res_data.extraDetail : res_data.message);
            }
            console.log(response);
        } catch (error) {
            console.log("register ",error);
            
        }
    };


    return <>
    
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">

                    <div className="registerImage">
                        <img src="/images/register.png" width="500" height="500"></img>
                    </div>

                    <div className="registration-form">
                        <h1 className="heading mb-3">Registration Form</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="username">Name : </label>
                                <input type="text" name="name" placeholder="Username" id="name" required autoComplete="off"
                                value={user.name}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email : </label>
                                <input type="email" name="email" placeholder="Email" id="email" required autoComplete="off"
                                value={user.email}
                                onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="phone">Phone No : </label>
                                <input type="number" name="phone" placeholder="Phone No" id="phone" required autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="pass">Password : </label>
                                <input type="password" name="pass" placeholder="Password" id="pass" required autoComplete="off"
                                value={user.pass}
                                onChange={handleInput}/>
                            </div>

                            <br/>
                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section> 

    </>
};
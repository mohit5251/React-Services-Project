import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";   //to get id from backend
import { toast } from "react-toastify";

export const AdminUserUpdate = () =>{

    const [data,setData] = useState({
        name : "",
        email : "",
        phone : "",
    });

    const params = useParams();

    const {AuthorizationToken} = useAuth();

    // To display the data in text fields
    const getUserData = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/users/${params.id}`,{
                method : "GET",
                headers : {
                    Authorization: AuthorizationToken,
                }
            });
            const data = await response.json();
            //console.log("get single data", data);
            setData(data); 

        } catch (error) {
            console.log(error);
            
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    //to Update data 
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(data); 
        
        try {
            const response = await fetch(`http://localhost:5000/users/update/${params.id}`,{
                method : "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(data),
            });
            if(response.ok)
            {
                toast.success("Updated Successfully !!");
            }else{
                toast.error("Update Error !!");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    //useEffect to execute fuction with first page render
    useEffect(() => {
        getUserData();
    }, []);

    return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">

                    <div className="registration-form">
                        <h1 className="heading mb-3">Update User</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="username">Name : </label>
                                <input type="text" name="name" placeholder="Username" id="name" required autoComplete="off"
                                value={data.name}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email : </label>
                                <input type="email" name="email" placeholder="Email" id="email" required autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone No : </label>
                                <input type="number" name="phone" placeholder="Phone No" id="phone" required autoComplete="off"
                                value={data.phone}
                                 onChange={handleInput}
                                />
                            </div>

                            <br/>
                            <button type="submit" className="btn btn-submit">Update Now</button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section> 
    </>
};
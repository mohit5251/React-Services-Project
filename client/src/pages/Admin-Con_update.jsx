import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContactUpdate = () => {

    const [contact, setContact] = useState({
        name: "",
        email : "",
        message : "",
    });

    const params = useParams();

    const {AuthorizationToken} = useAuth();

    const getContact = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/contact/${params.id}`,{
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                }
            });
            const data = await response.json();
           // console.log("Contact data by id",data);
            setContact(data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = (e) => {
        const {name,value} = e.target;

        setContact({
            ...contact,
            [name] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);
        
        try {
            const response = await fetch(`http://localhost:5000/contact/update/${params.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(contact),
            });
            if(response.ok)
            {
                toast.success("Updated Successfully");
            }else{
                toast.error("Updated Error");
            }
            
        } catch (error) {
            console.log(error);
        }
     }


    useEffect(() => {
        getContact();
    }, []);

    return <>
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">

                    <div className="registration-form">
                        <h1 className="heading mb-3">Update Contacts</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="name">Name : </label>
                                <input type="text" name="name" placeholder="name" id="name" required autoComplete="off"
                                value={contact.name}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email : </label>
                                <input type="email" name="email" placeholder="Email" id="email" required autoComplete="off"
                                value={contact.email}
                                onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="message">Message : </label>
                                <textarea name="message" id="message" required autoComplete="off" cols="40" rows="4"
                                value={contact.message}
                                onChange={handleInput} ></textarea>
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
}

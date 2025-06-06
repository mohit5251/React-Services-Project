import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";

export const AdminContacts = () =>{

    const [contact,setContact] = useState([]);
    const {AuthorizationToken} = useAuth();

    const getAllcontact = async() =>{
        try {
            const response  = await fetch(`http://localhost:5000/getContact`,{
                method: "GET",
                headers : {
                    Authorization: AuthorizationToken,
                },
            });
            if(response.ok)
            {
                const data=await response.json();
                setContact(data);
                console.log(data);
            }
            // const data=await response.json();
            // toast.error(data.message);
            

        } catch (error) {
            console.log(error);
        }
    };

    const deleteContact = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/contact/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const data = await response.json();
            console.log("After contact deleted..", data);  
            
            if(response.ok)
            {
                getAllcontact();
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
       
        
    };

    useEffect(() => {
        getAllcontact();
    },[]);

    return <>
    
    <section className="admin-user-section">
            <div className="container">
                <h1 className="heading">Admin Contact Data</h1>
            </div>

            <center>
            <div className="admin-data">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Update</th>
                            <th>Delete</th> 
                        </tr>
                    </thead>
                    <tbody>
                            {contact.map((curEle, index)=>{
                                return (
                                <tr key={index}>
                                    <td>{curEle.name}</td>
                                    <td>{curEle.email}</td>
                                    <td>{curEle.message}</td>
                                    <td>
                                        <Link to={`/admin/contacts/${curEle._id}/edit1`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteContact(curEle._id) }>Delete</button>
                                    </td> 
                                </tr>
                                )
                            })}
                       
                    
                    </tbody>
                </table>
                
            </div>
            </center>

        </section>
    
    </>
}
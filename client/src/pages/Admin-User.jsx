import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//import "bootstrap/dist/css/bootstrap.min.css";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getAllUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if(response.ok)
      {
        const data = await response.json();
        setUsers(data); 
        console.log(data.message);
      }
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  //Delete user Logic
  const deleteUser = async (id) =>{
    try {
      const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      console.log("after user Deleted ",data);

      if(response.ok)  //to refresh the data lists after delete
      {
        getAllUser();
        toast.error("Deleted Successfully");
      }

    } catch (error) {
      console.error("Error Deleting users:", error);
    }
  };


  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
        <section className="admin-user-section">
            <div className="container">
                <h1 className="heading">Admin User Data</h1>
            </div>

            <center>
            <div className="admin-data">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                  
                    {users.map((curUser, index)=>{
                        return (
                        <tr key={index}>
                            <td>{curUser.name}</td>
                            <td>{curUser.email}</td>
                            <td>{curUser.phone}</td>
                            <td>
                                <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(curUser._id) }>Delete</button>
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
  );
};




// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth";
// import { NavLink } from "react-router-dom";
// //import "bootstrap/dist/css/bootstrap.min.css";

// export const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { AuthorizationToken } = useAuth();

//   const getAllUser = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/users`, {
//         method: "GET",
//         headers: {
//           Authorization: AuthorizationToken,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       const data = await response.json();
//       setUsers(data.message);
//       console.log(data.message);
//     } catch (error) {
//       setError(error.message);
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //=============================================================
//   //Delete user Logic
//   const deleteUser = async (id) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: AuthorizationToken,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }

//       const data = await response.json();
//       console.log("after user Deleted ", data);
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (error) {
//       setError(error.message);
//       console.error("Error Deleting users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllUser();
//   }, []);

//   return (
//     <>
//       <section className="admin-user-section">
//         <div className="container">
//           <h1 className="heading">Admin User Data</h1>
//         </div>

//         <center>
//           <div className="admin-data">
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p style={{ color: "red" }}>{error}</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Update</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((curUser, index) => (
//                     <tr key={index}>
//                       <td>{curUser.name}</td>
//                       <td>{curUser.email}</td>
//                       <td>{curUser.phone}</td>
//                       <td>
//                         <button>Edit</button>
//                       </td>
//                       <td>
//                         <button onClick={() => deleteUser(curUser._id)}>
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </center>
//       </section>
//     </>
//   );
// };

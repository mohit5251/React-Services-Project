import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 

    const [token,setToken] = useState(localStorage.getItem("token"));  //logout functionality getting token
    const [user,setUser] = useState("");          //store authetication data in state variable (jwt authentiation)
    const [services,setServices] = useState([]);     //to fetch services data from database
    
    const [isLoading, setIsLoading] = useState(true); //to wait until load (For /admin panel authentication)

    const AuthorizationToken = `Bearer ${token}`;

    //*** to store jwtToken in local storage ***//
    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);     //to solve problem of reloading to get logout in navbar
        return localStorage.setItem("token", serverToken);
    };

    //check for login token (logout function start)
    let isloggedin = !!token;
    console.log("isLoggedIn ", isloggedin);
    

    //tackle logout functionality
    const logoutUser =() =>{
        setToken("");
        return localStorage.removeItem("token");
    };
    //end of logout functonality


    //jwt authentiation -- currently loggedIn user data autofill
    const userAuthetication = async () =>{                //step 2
        try {
            setIsLoading(true);
            
            const response = await fetch(`http://localhost:5000/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,   //`Bearer ${token}`,  // Correct format: 'Bearer <token>'
                },
            });
            

            if(response.ok)
            {
                const data = await response.json();   //here we get data
                console.log("user data ", data.userData);  
                setUser(data.userData);      //store authetication data in state variable
                setIsLoading(false);
            }
            else{
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error fetching user data"); 
        }
    };
    // end of jwt authentiation --
    

    //to fetch services data from database
    const getservices = async() =>{
        try {
            const response = await fetch(`http://localhost:5000/services`,{
                method : "GET",
            });
            if(response.ok){
                const data = await response.json();
                //console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log("services ",error);
            
        }
    };

    useEffect(() => {     //step 1
        getservices();          //to fetch services data from database
        userAuthetication();
    }, [token]);

    


    return ( 
        <AuthContext.Provider value={{ isloggedin ,storeTokenInLs, logoutUser, user, services, AuthorizationToken, isLoading}}> 
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

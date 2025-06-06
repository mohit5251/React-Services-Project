import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Contact = () => {

    const [contact,setcontact] = useState({
        name : "",
        email : "",
        message : "",
    });

    //jwt authentiation -- currently loggedIn user data autofill
    const [userData, setuserData] = useState(true);

    const {user} = useAuth();

    if(userData && user)
    {
      setcontact({
        name : user.name,
        email : user.email,
        message : "",
      });

      setuserData(false);
    }
    //End jwt authentiation -- currently loggedIn user data autofill

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setcontact({
            ...contact,
            [name] : value,
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(contact);
        
        try {
          const response = await fetch(`http://localhost:5000/contactus`,{
            method : "POST",
            headers : {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(contact),
          });

          if(response.ok){
            setcontact({
              name: user.name || "",
              email: user.email || "",
              message: "",
            });
    
            toast.success("message send successfully");
          }
        } catch (error) {
          console.log("contactus ", error);
        }
    };


    return <>
    <section className="section-contact">
        <div className="contact-content container">
          <h1 className="heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">

            <form onSubmit={handleSubmit}>

              <div>
                <label htmlFor="name">username</label>
                <input type="text" name="name" id="name" autoComplete="off" required
                  value={contact.name}
                  onChange={handleInput}/>
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" autoComplete="off" required
                  value={contact.email}
                  onChange={handleInput}/>
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea name="message" id="message" autoComplete="off" required cols="30" rows="6"
                  value={contact.message}
                  onChange={handleInput} ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>

            </form>

          </section>
        </div>
        
        <section className="mb-3">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7171799041566!2d73.36084547474901!3d22.288700743316824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fda2400192473%3A0xc319c9237f2928e8!2sParul%20University!5e0!3m2!1sen!2sin!4v1737194734934!5m2!1sen!2sin" 
        width="100%" 
        height="450" 
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>


      </section>

    </>
};
import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {

    const {user} = useAuth(true);
    
    return <>
    <main>
    <section className="section-hero1">
            <div className="container grid grid-two-cols">
               
                <div className="hero-content">
                    {/* <p>hii, {user.name}</p> */}

                    <p>welcome, {user ? `${user.name} to our website` : `to our website`}</p>   {/* //ternary operator for if else */} 
                        <h1>Get Started Today</h1>
                    <p>
                        Ready to take the first step towards a more efficient and secure
                        IT infrastructure? Contact us today for a free consultation and
                        let's discuss how Thapa Technical can help your business thrive in
                        the digital age.
                    </p>
                    <p>
                        Ready to take the first step towards a more efficient and secure
                        IT infrastructure? Contact us today for a free consultation and
                        let's discuss how Thapa Technical can help your business thrive in
                        the digital age.
                    </p>
                    <p>
                        Ready to take the first step towards a more efficient and secure
                        IT infrastructure? Contact us today for a free consultation and
                        let's discuss how Thapa Technical can help your business thrive in
                        the digital age.
                    </p>
                    <div className="btn btn-group">
                        <NavLink to="/contact">
                            <button className="btn">connect now</button>
                        </NavLink>
                        <NavLink to="/services">
                            <button className="btn secondary-btn">learn more</button>
                        </NavLink>
                    </div>
                </div>

                 {/* hero images  */}
                 <div className="hero-image">
                    <img src="/images/about.png"alt="coding together" width="500" height="500" />
                </div>

            </div>
            <Analytics/>
        </section>

        </main>

    </>
};

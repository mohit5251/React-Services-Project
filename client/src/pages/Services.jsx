import { useAuth } from "../store/auth";

export const Services = () => {

    const {services} = useAuth();
    
    return<>
    <section className="section-services">

        <div className="container">
            <h1 className="heading">Services</h1>
        </div>   

            <div className="container grid grid-three-cols">

                {services.map((curElem, index)=>{
                    const {provider, price, service, description} = curElem;

                    return(
                    <div className="card" key={index}>
                    <div className="card-image">
                        <img src="images/design.png" alt="service image" width="300"/>
                    </div>
                    <div className="card-details">
                        <div className="grid grid-two-cols">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                );

                })}


            </div>


    </section>
    </>
}
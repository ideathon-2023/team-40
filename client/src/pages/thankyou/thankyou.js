import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import "./thankyou.css";
import Footer from "../../components/footer/footer";

const Thankyou = () => {
    const navigate = useNavigate();
    const navigateToExplore = () => {
        navigate('/explore')
    }
    return (
        <div>
            <Nav
                minimal={true}
                setShowModal={() => { }}
                showModal={false} />
            <div className="thank-you">
                <h1>Thank You!</h1>
                <p>Your assignment query has been successfully submitted. Our experts will review the details and get back to you soon.</p>
                <button className="primary-button" onClick={navigateToExplore}>Continue Exploring</button>
            </div>
            <Footer/>
        </div>
    );
}

export default Thankyou;

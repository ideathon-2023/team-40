import { useNavigate } from "react-router-dom";
import Nav from "../components/nav/Nav";

const Logout = () => {
    const navigate = useNavigate();
    const navigateToExplore = () => {
        navigate('/explore')
    }
    return (
        <div>
            <Nav
                showButton={false}
                minimal={false}
                setShowModal={() => { }}
                showModal={false} />
            <div className="thank-you">
                <h1>Logged Out Successfully!</h1>
                <button className="primary-button" onClick={navigateToExplore}>Sign In or Log In</button>
            </div>
        </div>
    );
}

export default Logout;

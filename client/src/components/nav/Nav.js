import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../../images/site-logo2.1.png'
import bars from '../../images/bars-solid.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './nav.css'

const Nav = ({ showButton = true, minimal, setShowModal, setIsSignUp }) => {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(['user'])
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    };
    const authToken = cookies.AuthToken;
    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            removeCookie('Email');
            removeCookie('UserId');
            removeCookie('AuthToken');
            navigate('/logout');
        } catch (err) {
            console.log('Error during logout: ', err)
        }

    };
    return (
        <nav className={`${minimal ? "minimal" : "not-minimal"} ${isActive ? "open" : ""}`}>
            <div className="logo-container">
                <img className="logo" onClick={() => navigate('/explore')} src={logo} alt='logo' />
                <div className="icon-img" onClick={() => setIsActive(!isActive)}> <img src={bars} /></div>
            </div>
            <div className={`right ${isActive ? "open" : ""}`}>
                {minimal &&
                    (<>
                        <div onClick={() => navigate('/explore')}>Explore</div>
                        <div className='assignment-div' onClick={() => navigate('/assignment')}>Assignment Service</div>
                    </>)}
                {!authToken && showButton !== false ? <button className='nav-button' onClick={handleClick}><span>Log in</span></button> : null}
                {authToken && <button className='nav-button' onClick={handleLogOut}><span>Log Out</span></button>}
            </div>
        </nav >
    );

}

export default Nav;

import logo from '../images/site-logo2.1.png'

const Nav = ({  authToken, minimal, setShowModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    return (
        <nav className={minimal ? "minimal" : "not-minimal"}>
            <div className="logo-container">
                <img className="logo" src={logo} alt='logo' />
            </div>

            {!authToken && <button className='nav-button' onClick={handleClick}><span>Log in</span></button>}
        </nav>
    );

}

export default Nav;

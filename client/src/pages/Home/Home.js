import Nav from "../../components/nav/Nav";
import AuthModal from "../../components/AuthModal";
import { useState, useEffect } from 'react';
import "./Home.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(true);
  }
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div className="overlay">
      <Nav minimal={false} setShowModal={setShowModal} setIsSignUp={setIsSignUp} />
      <div className="home">
        <h1 className="primary-title">PEC EXPLORER</h1>
        <button className="primary-button" onClick={handleClick}>
          Create Account
        </button>
        {isMobile && <>
          <p>Or</p> <button className="primary-button" onClick={() => {
            setShowModal(true);
            setIsSignUp(false);
          }}>
            Log In
          </button></>}
        {showModal && (
          <AuthModal setShowModal={setShowModal} showModal={showModal} isSignUp={isSignUp} />
        )}
      </div>
    </div >
  );
}

export default Home;

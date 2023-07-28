import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from 'react';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(true);
  }
  const [isSignUp, setIsSignUp] = useState(true);
  const authToken = false
  return (
    <div className="overlay">
      <Nav authToken={authToken} minimal="false" setShowModal={setShowModal} setIsSignUp={setIsSignUp} />
      <div className="home">
        <h1 className="primary-title">PEC EXPLORER</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>
        {showModal && (
          <AuthModal setShowModal={setShowModal} showModal={showModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
}

export default Home;

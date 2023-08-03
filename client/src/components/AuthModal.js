import closeIcon from '../images/close-icon.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('Email', response.data.email)
            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)

            const success = response.status === 201

            if (success) navigate('/explore') //make explore page
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="modal-background" onClick={handleClick} >
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="auth-modal">
                <div className="close-icon"><img onClick={handleClick} src={closeIcon} alt='close-icon' /></div>
                <h2>{isSignUp ? 'Create Account' : 'Log in'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='input-divs'><span>Email</span>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder='youremail@gmail.com'
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        /></div>
                    <div className='input-divs'>
                        <span>Password</span>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Password'
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        /></div>
                    {isSignUp && <div className='input-divs'>
                        <span>Confirm Password</span>
                        <input
                            type="password"
                            id='password-check'
                            name='password-check'
                            placeholder='Confirm Password'
                            required={true}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>}
                    <input className='primary-button secondary-button' value="Submit" type='submit' />
                    <p>{error}</p>
                </form>
                <hr />
            </div>
        </div>
    )
}

export default AuthModal;

import React, { useState } from 'react';
import './style.scss';
import linkedinIcon from '../../assets/images/linkedin.png'
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

const Login = () => {

    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const dispatch = useDispatch()

    const loginToApp = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(emailValue, passwordValue)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoURL: userAuth.user.photoURL
                }))
            }).catch(error => alert(error))
    }

    const registerNow = () => {
        if (!nameValue) {
            return alert('Please enter your name')
        }

        auth.createUserWithEmailAndPassword(emailValue, passwordValue)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: nameValue,
                    photoURL: profilePic
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: nameValue,
                            photoURL: profilePic
                        }))
                    })
            }).catch(error => alert(error))
    }

    return (
        <div className='login'>
            <div className="login__formWrapper">
                {/* <div className="login__linkedinWrapper">
                    <div className="login__linkedinText">Linkedin</div>
                    <img src={linkedinIcon} alt="linkedin" className='login__linkedinIcon' />
                </div> */}
                <form className="login__form">
                    <div className="login__formField">
                        <input
                            type="text"
                            placeholder='Name (required if registering)'
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                    </div>
                    <div className="login__formField">
                        <input
                            type="text"
                            placeholder='Profile Url (optional)'
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                        />
                    </div>
                    <div className="login__formField">
                        <input
                            type="text"
                            placeholder='Email Address'
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </div>
                    <div className="login__formField">
                        <input
                            type="password"
                            placeholder='Password'
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                    </div>
                    <div className="login__formField">
                        <button type='submit' onClick={loginToApp}>
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="login__noAccount">
                    Don't have account? <span onClick={registerNow}>Register Now</span>
                </div>
            </div>
        </div>
    )
}

export default Login
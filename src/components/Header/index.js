import React from 'react';
import './style.scss';
import linkedinIcon from '../../assets/images/linkedin.png'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
import { auth } from '../../firebase';

const Header = () => {

    const dispatch = useDispatch()

    const logoutApp = () => {
        dispatch(logout())
        auth.signOut()
    }

    return (
        <div className='header'>
            <div className="header__left">
                <img className='header__logo' src={linkedinIcon} alt="linkedin logo" />
                <div className="header__search">
                    <SearchIcon />
                    <input type="text" placeholder='Search' name="" id="" />
                </div>
            </div>
            <div className="header__right">
                <p onClick={logoutApp}>Logout</p>
            </div>
        </div>
    )
}

export default Header
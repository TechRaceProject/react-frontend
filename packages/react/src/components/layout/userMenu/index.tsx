import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import ApiAuth from '~/api/auth/auth.api';
import { FaUser, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import './style.css';
import ProfileDefault from '~/assets/images/profile-default.svg';

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state: RootState) => state.user);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const menuClass = isOpen
        ? 'UserMenu UserMenu-open'
        : 'UserMenu UserMenu-close';

    return (
        <>
            <img
                src={ProfileDefault}
                className="ImgProfile"
                alt="user photo"
                onClick={handleToggle}
            />
            <div className={menuClass}>
                <div className="UserMenu-top">
                    <p>
                        <FaUser /> {user.username}
                    </p>
                    <p>
                        <FaEnvelope />
                        {user.email}
                    </p>
                </div>
                <div className="UserMenu-bottom" onClick={ApiAuth.logout}>
                    <p>
                        <FaSignOutAlt />
                        Déconnection
                    </p>

                </div>
            </div>
        </>
    );
}

export default UserMenu;

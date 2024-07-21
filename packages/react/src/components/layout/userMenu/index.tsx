import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import ApiAuth from '~/api/auth/auth.api';
import './style.css';

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
                src={user.pp}
                className="ImgProfile"
                alt="user photo"
                onClick={handleToggle}
            />
            <div className={menuClass}>
                <div className="UserMenu-top">
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                </div>
                <div className="UserMenu-bottom" onClick={ApiAuth.logout}>
                    <p>Sign out</p>
                </div>
            </div>
        </>
    );
}

export default UserMenu;

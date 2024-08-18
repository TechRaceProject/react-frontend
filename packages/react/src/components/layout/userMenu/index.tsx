import { useContext, useState } from 'react';
import ApiAuthHandler from '~/api/auth/api.auth.handler';
import './style.css';
import { AuthContext } from '~/context/auth.context';
import ProfileDefault from '~/assets/images/profile-default.svg';

function UserMenu() {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

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
            {isOpen && (
                <div className={menuClass}>
                    <div className="UserMenu-top">
                        <h4>{user.username}</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className="UserMenu-bottom" onClick={ApiAuthHandler.logout}>
                        <p>Quitter</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMenu;

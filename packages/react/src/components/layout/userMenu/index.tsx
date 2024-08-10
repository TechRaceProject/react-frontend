import { useContext, useState } from 'react';
import ApiAuth from '~/api/auth/auth.api';
import './style.css';
import { AuthContext } from '~/context/auth.context';

function UserMenu() {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <img
                src="https://static1.squarespace.com/static/656f4e4dababbd7c042c4946/657236350931ee4538eea52c/65baf15103d8ad2826032a8a/1707422532886/how-to-stop-being-a-people-pleaser-1_1.jpg?format=1500w"
                className="ImgProfile"
                alt="user photo"
                onClick={handleToggle}
            />
            {isOpen && (
                <div className="UserMenu">
                    <div>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p onClick={ApiAuth.logout}>Quitter</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMenu;

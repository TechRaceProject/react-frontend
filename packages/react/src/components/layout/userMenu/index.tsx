import { useState } from 'react';
import ApiAuth from '~/api/auth/auth.api';
import './style.css';

function UserMenu() {
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
                        <p>Neil Sims</p>
                        <p>neil.sims@flowbite.com</p>
                    </div>
                    <div>
                        <p onClick={ApiAuth.logout}>Sign out</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMenu;

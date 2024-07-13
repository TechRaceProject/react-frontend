import { FaBars } from 'react-icons/fa';
import UserMenu from '~/components/layout/userMenu';
import { NavContext } from '~/context/nav.context';
import { useContext } from 'react';

import './style.css';

function TopBar() {
    const { setisOpen } = useContext(NavContext);

    return (
        <div className="TopBar">
            <button type="button" onClick={setisOpen}>
                <FaBars />
            </button>
            <UserMenu />
        </div>
    );
}

export default TopBar;

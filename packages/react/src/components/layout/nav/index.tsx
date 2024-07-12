import { FaTimes } from 'react-icons/fa';
import Logo from '~/assets/images/logo.png';
import NavItem from '~/components/layout/navItem';
import navData from '~/data/nav.data';
import useWindowSize from '~/hooks/useWindowSize';
import { NavContext } from '~/context/nav.context';
import { useContext } from 'react';
import './style.css';

function Navbar() {
    const { width } = useWindowSize();
    const { isOpen, setisOpen } = useContext(NavContext);

    const navbarClass = isOpen
        ? width > 720
            ? 'NavBar'
            : 'NavBar-Mobile'
        : 'NavBar-Close';

    const NavBarOverlay = isOpen
        ? width > 720
            ? 'NavBar-Overlay'
            : 'NavBar-Overlay-Mobile'
        : 'NavBar-Overlay-Close';

    return (
        <div className={NavBarOverlay}>
            <div className={navbarClass}>
                <img className="NavLogo" src={Logo} alt="Logo" />
                <div className="NavMenu">
                    {navData.map((item) => (
                        <NavItem
                            key={item.name}
                            icon={item.icon}
                            name={item.name}
                            label={item.label}
                            path={item.path}
                        />
                    ))}
                </div>
            </div>
            {width <= 720 && isOpen && (
                <button type="button" className="NavButton" onClick={setisOpen}>
                    <FaTimes />
                </button>
            )}
        </div>
    );
}

export default Navbar;

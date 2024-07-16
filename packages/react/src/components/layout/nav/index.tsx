import { FaTimes } from 'react-icons/fa';
import Logo from '~/assets/images/logo.png';
import NavItem from '~/components/layout/navItem';
import navData from '~/data/nav.data';
import { NavContext } from '~/context/nav.context';
import { useContext } from 'react';
import './style.css';

function Navbar() {
    const { isOpen, setisOpen } = useContext(NavContext);

    const navbarClass = isOpen ? 'NavBar' : 'NavBar-Close';

    const NavBarOverlay = isOpen ? 'NavBar-Overlay' : 'NavBar-Overlay-Close';

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
            {isOpen && (
                <button type="button" className="NavButton" onClick={setisOpen}>
                    <FaTimes />
                </button>
            )}
        </div>
    );
}

export default Navbar;

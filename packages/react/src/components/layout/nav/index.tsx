import Logo from '~/assets/images/logo.png';
import NavItem from '~/components/layout/navItem';
import navData from '~/data/nav.data';
import { NavContext } from '~/context/nav.context';
import { useContext } from 'react';
import './style.css';

function Navbar() {
    const { isOpen, setisOpen } = useContext(NavContext);

    const navbarClass = isOpen ? 'NavBar' : 'NavBar-Close';

    const navbarOverlayClass = isOpen
        ? 'NavBar-Overlay'
        : 'NavBar-Overlay-Close';

    return (
        <div className={navbarOverlayClass} onClick={setisOpen}>
            <div className={navbarClass} onClick={(e) => e.stopPropagation()}>
                <div className="NavLogo">
                    <img src={Logo} alt="Logo" />
                </div>
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
        </div>
    );
}

export default Navbar;

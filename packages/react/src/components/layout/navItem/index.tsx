import { Link, useLocation } from 'react-router-dom';
import { NavItemProps } from '~/interfaces/components/layout/nav.interface';
import './style.css';

function NavItem({ icon, path, label, name }: NavItemProps) {
    const location = useLocation();
    const Icon = icon;
    const pathSegments = location.pathname.split('/');
    const basePath = `/${pathSegments[1]}`;
    const isActive = basePath === path;

    return (
        <Link to={path} key={name}>
            <div className={isActive ? 'NavItem Selected' : 'NavItem'}>
                <Icon />
                <p>{label}</p>
            </div>
        </Link>
    );
}

export default NavItem;

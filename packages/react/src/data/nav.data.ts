import { FaHome, FaClipboardList, FaUser, FaTrophy } from 'react-icons/fa';
import { NavItemProps } from '~/interfaces/components/layout/nav.interface';

const navData: NavItemProps[] = [
    { path: '/', icon: FaHome, name: 'Home', label: 'Home' },
    {
        path: '/History',
        icon: FaClipboardList,
        name: 'History',
        label: 'History',
    },
    {
        path: '/Top',
        icon: FaTrophy,
        name: 'Top',
        label: 'Top',
    },
    { path: '/Profil', icon: FaUser, name: 'Profil', label: 'Profil' },
];

export default navData;

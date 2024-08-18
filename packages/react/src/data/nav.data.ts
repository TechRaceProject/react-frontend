import { FaHome, FaClipboardList, FaUser, FaTrophy } from 'react-icons/fa';
import { NavItemProps } from '~/interfaces/components/layout/nav.interface';

const navData: NavItemProps[] = [
    { path: '/', icon: FaHome, name: 'Home', label: 'Accueil' },
    {
        path: '/History',
        icon: FaClipboardList,
        name: 'History',
        label: 'Historique',
    },
    {
        path: '/Top',
        icon: FaTrophy,
        name: 'Top',
        label: 'Meilleurs scores',
    },
    { path: '/Profil', icon: FaUser, name: 'Profil', label: 'Profile' },

    {
        path: '/Graph',
        icon: FaTrophy,
        name: 'Graph',
        label: 'Graph',
    },
];

export default navData;

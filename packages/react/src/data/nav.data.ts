import {
    FaHome,
    FaClipboardList,
    FaUser,
    FaTrophy,
    FaCarAlt,
} from 'react-icons/fa';
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
        path: '/Leaderboard',
        icon: FaTrophy,
        name: 'Leaderboard',
        label: 'Meilleurs scores',
    },
    {
        path: '/Vehicle',
        icon: FaCarAlt,
        name: 'Vehicle',
        label: 'Vehicule',
    },
    { path: '/Profil', icon: FaUser, name: 'Profil', label: 'Profile' },
    {
        path: '/Vehicle',
        icon: FaCarAlt,
        name: 'Vehicle',
        label: 'Véhicule',
    },
];

export default navData;

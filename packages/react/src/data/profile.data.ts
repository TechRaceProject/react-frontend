import { FaEnvelope, FaUser, FaLock, FaCamera } from 'react-icons/fa';
import { Question } from '~/interfaces/other/question.interface';

export const profileUpdateQuestions: Question[] = [
    {
        id: 'username',
        label: "Nom d'utilisateur",
        name: 'username',
        type: 'text',
        placeholder: "Entrez votre nom d'utilisateur",
        required: true,
        icon: FaUser,
    },
    {
        id: 'email',
        label: 'Adresse e-mail',
        name: 'email',
        type: 'email',
        placeholder: 'Entrez votre adresse e-mail',
        required: true,
        icon: FaEnvelope,
    },
    {
        id: 'password',
        label: 'Nouveau mot de passe',
        name: 'password',
        type: 'password',
        placeholder: 'Entrez votre nouveau mot de passe',
        required: false,
        icon: FaLock,
    },
    {
        id: 'confirmPassword',
        label: 'Confirmez le mot de passe',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirmez votre nouveau mot de passe',
        required: false,
        icon: FaLock,
    },
    {
        id: 'profilePicture',
        label: 'Photo de profil',
        name: 'profilePicture',
        type: 'file',
        required: false,
        icon: FaCamera,
    },
];

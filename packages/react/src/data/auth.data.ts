import { Question } from '~/interfaces/other/question.interface';
import { FaEnvelope, FaLock, FaUser, FaCheck } from 'react-icons/fa';

export const loginFormQuestions: Question[] = [
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
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
        icon: FaLock,
    },
    {
        id: 'rememberMe',
        label: 'Se souvenir de moi',
        name: 'rememberMe',
        type: 'switch',
        required: false,
        icon: FaCheck,
    },
];

export const registrationFormQuestions: Question[] = [
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
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
        icon: FaLock,
    },
    {
        id: 'confirmPassword',
        label: 'Confirmez votre mot de passe',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirmez votre mot de passe',
        required: true,
        icon: FaLock,
    },
    {
        id: 'rememberMe',
        label: 'Se souvenir de moi',
        name: 'rememberMe',
        type: 'switch',
        required: false,
        icon: FaCheck,
    },
];

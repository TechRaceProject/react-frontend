import { useState } from 'react';
import { ApiReturn } from '@shared/interfaces/utils/api.interface';
import {
    authFormProps,
    authFormPropsApi,
} from '@shared/interfaces/other/auth.interface';
import ApiAuthHandler from '~/api/auth/api.auth.handler';
import { ExtendedAlertProps } from '~/interfaces/components/feedback/alert.interface';

export function useAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<authFormProps>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<ExtendedAlertProps>({
        type: '',
        message: '',
        key: Date.now(),
    });

    const toggleAuthMode = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
        setFormData({
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            rememberMe: false,
        });
        setAlert({ type: '', message: '', key: Date.now() });
    };

    const handleAuthFeedback = (message: string, isError: boolean = true) => {
        setAlert({
            type: isError ? 'error' : 'success',
            message,
            key: Date.now(),
        });
    };

    const authenticate = async (
        data: authFormPropsApi,
        apiMethod: (data: authFormPropsApi) => Promise<ApiReturn>
    ) => {
        setIsLoading(true);

        try {
            const response = await apiMethod(data);

            if (response.error) {
                handleAuthFeedback(response.error);
            } else {
                handleAuthFeedback('Connexion réussie!', false);
                if (formData.rememberMe) {
                    localStorage.setItem('authToken', response.data.token);
                } else {
                    sessionStorage.setItem('authToken', response.data.token);
                }
            }
        } catch (error) {
            handleAuthFeedback(
                error instanceof Error
                    ? error.message
                    : "Erreur d'authentification"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const authData = isLogin
            ? {
                  email: formData.email,
                  password: formData.password,
                  rememberMe: formData.rememberMe,
              }
            : {
                  email: formData.email,
                  username: formData.username,
                  password: formData.password,
                  rememberMe: formData.rememberMe,
              };

        if (!isLogin && formData.password !== formData.confirmPassword) {
            handleAuthFeedback('Les mots de passe ne correspondent pas!');
            return;
        }

        await authenticate(
            authData,
            isLogin ? ApiAuthHandler.login : ApiAuthHandler.register
        );
    };

    return {
        isLogin,
        formData,
        setFormData,
        isLoading,
        alert,
        toggleAuthMode,
        handleSubmit,
    };
}

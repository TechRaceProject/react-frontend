import {
    loginFormQuestions,
    registrationFormQuestions,
} from '~/data/auth.data';
import useWindowSize from '~/hooks/useWindowSize';
import Alert from '~/components/feedback/alert';
import Form from '~/components/common/form';
import Loader from '~/components/feedback/loader';
import AuthImg from '~/assets/images/Auth-Img.png';
import Logo from '~/assets/images/logo.png';
import { useAuth } from '~/hooks/useAuth';
import './style.css';

function Auth() {
    const {
        isLogin,
        formData,
        setFormData,
        isLoading,
        alert,
        toggleAuthMode,
        handleSubmit,
    } = useAuth();
    const { width } = useWindowSize();

    const message = isLogin ? (
        <div>
            <p>If you already have an account, </p>
            <p>
                you can{' '}
                <span
                    className="swap-auth"
                    role="button"
                    tabIndex={0}
                    onClick={toggleAuthMode}
                >
                    {' '}
                    Login here!{' '}
                </span>
            </p>
        </div>
    ) : (
        <div>
            <p>If you don’t have an account,</p>
            <p>
                you can{' '}
                <span
                    className="swap-auth"
                    role="button"
                    tabIndex={0}
                    onClick={toggleAuthMode}
                >
                    {' '}
                    Register here!{' '}
                </span>
            </p>
        </div>
    );

    return (
        <>
            {isLoading && <Loader />}
            {alert.message && (
                <Alert
                    key={alert.key.toString()}
                    type={alert.type}
                    message={alert.message}
                    duration={30000}
                />
            )}

            <div className="auth-container">
                <div className="auth-container-form">
                    <div className="sous-auth-container-form">
                        <h4>Welcome to TechRace !</h4>
                        {message}
                        <Form
                            dataQuestion={
                                isLogin
                                    ? loginFormQuestions
                                    : registrationFormQuestions
                            }
                            handleSubmit={handleSubmit}
                            dataArr={formData}
                            setDataArr={setFormData}
                            label={isLogin ? 'Se connecter' : "S'inscrire"}
                        />

                        <small>Mot de passe oublié ?</small>
                    </div>
                </div>
                <div className="auth-container-img">
                    <img src={Logo} alt="Authentification" />
                    {width >= 1024 && (
                        <img src={AuthImg} alt="Authentification" />
                    )}
                </div>
            </div>
        </>
    );
}

export default Auth;

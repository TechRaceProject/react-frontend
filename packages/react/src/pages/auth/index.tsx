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
            <p>Si vous n&apos;avez pas de compte,</p>
            <p>
                {' '}
                vous devez vous{' '}
                <span
                    className="swap-auth"
                    role="button"
                    tabIndex={0}
                    onClick={toggleAuthMode}
                >
                    {' '}
                    inscrire.{' '}
                </span>
            </p>
        </div>
    ) : (
        <div>
            <p>Si vous avez déjà un compte,</p>
            <p>
                vous pouvez vous{' '}
                <span
                    className="swap-auth"
                    role="button"
                    tabIndex={0}
                    onClick={toggleAuthMode}
                >
                    {' '}
                    connecter.{' '}
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
                        <h4>Bienvenue sur Techrace !</h4>
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
                            className="Form-Auth"
                        />
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

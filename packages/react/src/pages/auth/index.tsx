import {
    loginFormQuestions,
    registrationFormQuestions,
} from '~/data/auth.data';
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

            <div className="flex flex-col-reverse md:flex-row items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 gap-8">
                <div className="w-full">
                    <h4 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4">Sign in to your account</h4>
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
                            className="space-y-6"
                        />
                    <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Registrer</a>
                    </p>
                </div>
                <div className="w-full">
                    <img src={Logo} alt="Logo tech race" className='mb-10 w-max-10' />
                    <img src={AuthImg} alt="Illustration authentification" className='hidden md:block' />
                </div>
            </div>
        </>
    );
}

export default Auth;

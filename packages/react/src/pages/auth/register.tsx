import { useDispatch } from 'react-redux';
import { setLoginState } from '~/store/slice/auth.slice';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const handleRegister = () => {
        // Logique d'enregistrement ici
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <svg width="200" height="40" viewBox="0 0 900 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.17395 78.5H62.7826L78.4348 141.109H15.8261L0.17395 78.5Z" fill="#4338CA"/>
                    <path d="M47.1305 15.8913H109.739L125.391 78.5H62.7827L47.1305 15.8913Z" fill="#4338CA"/>
                    <path d="M194.511 127V56.3774H159.2V36.8435H249.357V56.3774H214.045V127H194.511ZM276.252 127C272.996 127 269.991 126.165 267.236 124.496C264.481 122.826 262.269 120.614 260.6 117.859C258.93 115.104 258.095 112.099 258.095 108.843V72.5304C258.095 69.2748 258.93 66.2696 260.6 63.5148C262.269 60.76 264.481 58.5478 267.236 56.8783C269.991 55.2087 272.996 54.3739 276.252 54.3739H313.567C316.906 54.3739 319.953 55.2087 322.708 56.8783C325.462 58.5478 327.633 60.76 329.219 63.5148C330.888 66.2696 331.723 69.2748 331.723 72.5304V100.329H277.254V107.842H331.723V127H276.252ZM277.254 83.5496H312.565V73.5322H277.254V83.5496ZM359.893 127C356.638 127 353.632 126.165 350.878 124.496C348.123 122.826 345.911 120.614 344.241 117.859C342.571 115.104 341.737 112.099 341.737 108.843V72.5304C341.737 69.2748 342.571 66.2696 344.241 63.5148C345.911 60.76 348.123 58.5478 350.878 56.8783C353.632 55.2087 356.638 54.3739 359.893 54.3739H415.239V73.5322H360.895V107.842H415.364V127H359.893ZM425.631 127V30.5826H444.79V54.3739H481.103C484.358 54.3739 487.364 55.2087 490.118 56.8783C492.873 58.5478 495.085 60.76 496.755 63.5148C498.424 66.2696 499.259 69.2748 499.259 72.5304V127H480.101V73.5322H444.79V127H425.631ZM619.873 127L593.702 95.8209H619.122L639.908 120.363V127H619.873ZM549.876 127V36.9687H621.375C624.798 36.9687 627.887 37.8035 630.642 39.473C633.48 41.1426 635.734 43.3965 637.403 46.2348C639.156 49.073 640.033 52.1617 640.033 55.5009V78.7913C640.033 82.1304 639.156 85.2191 637.403 88.0574C635.734 90.8957 633.48 93.1496 630.642 94.8191C627.887 96.4887 624.798 97.3235 621.375 97.3235L569.285 97.4487V127H549.876ZM569.285 77.7896H620.374V56.3774H569.285V77.7896ZM670.861 127C667.522 127 664.475 126.165 661.72 124.496C658.965 122.826 656.753 120.614 655.083 117.859C653.497 115.104 652.704 112.099 652.704 108.843V81.0452H707.174V73.5322H652.704V54.3739H708.176C711.515 54.3739 714.562 55.2087 717.316 56.8783C720.071 58.5478 722.242 60.76 723.828 63.5148C725.497 66.2696 726.332 69.2748 726.332 72.5304V127H670.861ZM671.863 107.842H707.174V97.8243H671.863V107.842ZM753.276 127C750.021 127 747.015 126.165 744.261 124.496C741.506 122.826 739.294 120.614 737.624 117.859C735.955 115.104 735.12 112.099 735.12 108.843V72.5304C735.12 69.2748 735.955 66.2696 737.624 63.5148C739.294 60.76 741.506 58.5478 744.261 56.8783C747.015 55.2087 750.021 54.3739 753.276 54.3739H808.622V73.5322H754.278V107.842H808.748V127H753.276ZM837.162 127C833.907 127 830.901 126.165 828.147 124.496C825.392 122.826 823.18 120.614 821.51 117.859C819.84 115.104 819.006 112.099 819.006 108.843V72.5304C819.006 69.2748 819.84 66.2696 821.51 63.5148C823.18 60.76 825.392 58.5478 828.147 56.8783C830.901 55.2087 833.907 54.3739 837.162 54.3739H874.477C877.816 54.3739 880.863 55.2087 883.618 56.8783C886.373 58.5478 888.543 60.76 890.129 63.5148C891.799 66.2696 892.633 69.2748 892.633 72.5304V100.329H838.164V107.842H892.633V127H837.162ZM838.164 83.5496H873.475V73.5322H838.164V83.5496Z" fill="#4338CA"/>
                </svg>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="new-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <div className="mt-2">
                            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <a href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

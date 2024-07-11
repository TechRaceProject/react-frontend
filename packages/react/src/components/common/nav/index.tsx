import Logo from '~/assets/images/logo.png';
import { HiBars3BottomLeft } from "react-icons/hi2";
import UserMenu from '~/components/common/userMenu';


const Navbar = () => {
  return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <HiBars3BottomLeft className="w-6 h-6" />
                        </button>
                        <a href="/" className="flex ms-2 md:me-24">
                            <img src={Logo} alt="Logo tech race" className='h-8'/>
                        </a>
                    </div>

                    {/* Profile */}
                    <UserMenu />
                </div>
            </div>
        </nav>
  );
};

export default Navbar;

import { useDispatch } from 'react-redux';
import { setLoginState } from '~/store/slice/auth.slice';
import Navbar from '~/components/common/nav';
import Sidebar from '~/components/common/sidebar';

import { HiMiniPlus } from "react-icons/hi2";

const LogoutPage = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLoginState(false));
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    {/* 1 ROW - 3 COL*/}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                    </div>

                    {/* 1 ROW - 1 COL*/}
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                    </div>

                    {/* 2 ROW - 2 COL*/}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <HiMiniPlus className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutPage;

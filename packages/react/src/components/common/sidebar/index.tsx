import SidebarItem from '~/components/common/sidebarItem';
import { FaTachometerAlt, FaTasks, FaInbox, FaUsers, FaBox, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <SidebarItem
                    icon={FaTachometerAlt}
                    label="Dashboard"
                />
                <SidebarItem
                    icon={FaTasks}
                    label="Race history"
                    badge="10"
                />
                <SidebarItem
                    icon={FaUsers}
                    label="Users"
                />
            </ul>
        </div>
    </aside>
  );
};

export default Sidebar;

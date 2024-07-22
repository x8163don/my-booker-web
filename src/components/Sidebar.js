import {useLocation} from 'react-router-dom';

const LINKS = [
    {
        name: '活動',
        href: '/activity'
    },
    {
        name: '行程',
        href: '/schedule'
    },
    {
        name: '帳戶',
        href: '/account'
    }
]
export default function Sidebar() {
    const location = useLocation()

    return (
        <div className="bg-gray-800 text-white w-52 flex-shrink-0 min-h-screen">
            <div className="p-4">
                {/*TODO*/}
                <h2 className="text-xl font-bold">側邊欄</h2>
            </div>
            <nav>
                <ul className="menu menu-vertical">
                    {LINKS.map((link) => (
                        <li key={link.name}>
                            <a className="block p-2 hover:bg-gray-700 text-md" href={link.href}>
                                {link.name}
                                {location.pathname.includes(link.href.substring(1)) && (
                                    <span className="ml-2 badge badge-xs badge-info"></span>
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
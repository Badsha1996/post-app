import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { TbLogin, TbLogout, TbNews } from "react-icons/tb"
import { FaUserCircle } from "react-icons/fa"
import { SiFeedly } from "react-icons/si"
import { ImHome } from "react-icons/im"

export const SideBar: React.FC = () => {
    const session = useSession()
    const user = session.data?.user

    return (
        <nav className="sticky top-0 px-10 py-4 ">
            <ul className="flex flex-col gap-4 whitespace-nowrap
        items-start">
                <li className="border rounded-full px-4 py-1  border-gray-600
            hover:bg-gray-600
            hover:border-gray-500  transition duration-150">
                    <Link href="/">
                        <div className="group flex items-center gap-1">
                            <ImHome className="text-2xl group-hover:fill-green-400" />
                            <span className="hidden md:inline hover:text-green-500">Home</span>
                        </div>
                    </Link>
                </li>
                <li className="border rounded-full px-4 py-1 border-gray-600
            hover:bg-gray-600
            hover:border-gray-500  transition duration-150">
                    <Link href="/"><div className="group flex items-center gap-1">
                        <TbNews className="text-2xl  group-hover:fill-green-400" />
                        <span className="hidden md:inline">News</span>
                    </div></Link>
                </li>
                <li className="border rounded-full px-4 py-1 border-gray-600
            hover:bg-gray-600
            hover:border-gray-500  transition duration-150">
                    <Link href="/"><div className="group flex items-center gap-1">
                        <SiFeedly className="text-2xl group-hover:fill-green-400" />
                        <span className="hidden md:inline">Feed</span>
                    </div></Link>
                </li>
                {
                    user != null && (
                        <li className="border rounded-full px-4 py-1 border-gray-600
            hover:bg-gray-600
            hover:border-gray-500  transition duration-150">
                            <Link href={`/profiles/${user?.id}`}><div className="group flex items-center gap-1">
                                <FaUserCircle className="text-2xl group-hover:fill-green-400" />
                                <span className="hidden md:inline hover:text-green-500">Profile</span>
                            </div></Link>
                        </li>
                    )
                }

                {
                    user == null ? (<li className="border rounded-full px-4 py-1 border-gray-600
                    hover:bg-gray-600
                    hover:border-gray-500  transition duration-150">
                        <button onClick={() => void signIn()} className="flex items-center gap-1">
                            <TbLogin className="text-2xl fill-green-500" />
                            <span className="hidden md:inline text-green-500">Login</span>
                        </button>
                    </li>) : <li className="border rounded-full px-4 py-1 border-gray-600
                    hover:bg-gray-600
                    hover:border-gray-500  transition duration-150">
                        <button onClick={() => void signOut()} className="group flex items-center gap-1">
                            <TbLogout className="text-2xl group-hover:fill-red-400" />
                            <span className="hidden md:inline hover:text-red-300">Logout</span>
                        </button>
                    </li>
                }

            </ul>
        </nav>
    )
}

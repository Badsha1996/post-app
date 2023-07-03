import { useSession } from 'next-auth/react'
import { LikeButtonProps } from '~/types/types'
import { RiUserHeartLine } from "react-icons/ri"

const LikeButton = ({onClick, isLoading, likedByUser, totalLikes }: LikeButtonProps) => {
    const session = useSession()
    if (session.status !== "authenticated") {
        return <div className='pt-2 flex items-center gap-1'>
            <RiUserHeartLine className='text-xl' />
            <span>{totalLikes}</span>
        </div>
    }
    return (
        <button 
        onClick={onClick}
        disabled={isLoading}
        className={`group pt-2 flex items-center gap-1 transition-colors duration-300
        ${likedByUser == true ? "text-green-500" : "hover:text-green-500 focus-visible:text-green-500"}`}>
            <RiUserHeartLine className={`text-xl
            ${likedByUser == true ? "fill-green-500" : "group-hover:fill-green-500 group-focus-visible:fill-green-500"}`} />
            <span>{totalLikes}</span>
        </button>
    )
}

export default LikeButton
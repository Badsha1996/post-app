import { Post } from "~/types/types"
import ProfilePicture from "./ProfilePicture"
import Link from "next/link"

const handleDateFormat = new Intl.DateTimeFormat(undefined, {dateStyle:'short'})

const PostCard = ({ id, user, content, createdAt, likedByUser, totalLikes }: Post) => {
    return(
        <li className="flex gap-10 border px-4 py-4 rounded-lg mb-4">
            <Link href={`/profiles/${user.id}`}>
                <ProfilePicture src={user.image}  className="rounded-none p-10"/>
            </Link>
            <div className="flex flex-col w-full">
                <Link href={`/profiles/${user.id}`}>
                    <div className="border-b-[0.09rem] text-gray-300 w-fit font-semibold">
                        {user.name}
                    </div>
                </Link>
                <div className="text-gray-400 italic  break-words whitespace-pre-wrap">
                    {content}
                </div>
                <div className="italic text-xs flex justify-end gap-1">
                    <span className="text-gray-400 not-italic">Posted at : </span>
                    <span className="text-gray-500">{handleDateFormat.format(createdAt)}</span>
                </div>
            </div>
        </li>)
}

export default PostCard

































import { Post } from "~/types/types"
import ProfilePicture from "./ProfilePicture"
import Link from "next/link"

const PostCard = ({ id, user, content, createdAt, likedByUser, totalLikes }: Post) => {
    return(
        <li className="flex gap-10 border px-4 py-4 rounded-lg mb-4">
            <Link href={`/profiles/${user.id}`}>
                <ProfilePicture src={user.image}  className="rounded-none p-10"/>
            </Link>
        </li>)
}

export default PostCard

































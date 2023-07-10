import { Post } from "~/types/types"
import ProfilePicture from "./ProfilePicture"
import Link from "next/link"
import LikeButton from "./LikeButton"
import { api } from "~/utils/api"

const handleDateFormat = new Intl.DateTimeFormat(undefined, {dateStyle:'short'})

const PostCard = ({ id, user, content, createdAt, likedByUser, totalLikes }: Post) => {
    const trpcUtils = api.useContext();

    const liked = api.post.liked.useMutation({
        onSuccess : ({addedLike}) =>{
            const updateData : Parameters<typeof trpcUtils.post.allPosts.setInfiniteData>[1] = (oldData) =>{
                if(oldData == null) return

                const addedCount = addedLike ? 1 : -1
                return {
                    ...oldData,
                    pages : oldData.pages.map(page => {
                        return {
                            ...page,
                            posts : page.posts.map(post =>{
                                if(post.id === id){
                                    return {
                                        ...post,
                                        totalLikes : post.totalLikes + addedCount,
                                        likedByUser : addedLike
                                    }
                                }
                                return post
                            })
                        }
                    })
                }
            }

            trpcUtils.post.allPosts.setInfiniteData({},updateData)
        }
    })

    const handleLike = () =>{
        liked.mutate({id})
    }
    return(
        <li key={id} className="flex gap-10 border px-4 py-4 rounded-lg mb-4">
            <div className="flex place-items-center flex-col" >
                <Link href={`/profiles/${user.id}`}>
                    <ProfilePicture src={user.image}  className="rounded-none p-10"/>
                </Link>
                <LikeButton onClick={handleLike} 
                isLoading = {liked.isLoading}
                likedByUser={likedByUser} 
                totalLikes={totalLikes}/>
            </div>
            <div className="flex flex-col w-full" >
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

































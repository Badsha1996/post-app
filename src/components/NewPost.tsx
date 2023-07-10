import { FormEvent, useState } from "react"
import Button from "./Button"
import { api } from "~/utils/api"
import { useSession } from "next-auth/react"



const NewPost = () => {
    const session = useSession()
    const trpcUtils = api.useContext()
    const [inputValue, setInputValue] = useState('')
    const createPost = api.post.create.useMutation({
        onSuccess: async() => {
            setInputValue('')
            if (session.status !== "authenticated"){
                return
            }
            // method => 2
            await trpcUtils.post.invalidate();

            /*
                method => 1 : error 
                for some reason it is not working. list key problem coming as 
                warning
              */

            // trpcUtils.post.allPosts.setInfiniteData({}, (oldData : any) => {
            //     if(oldData == null || oldData.pages[0] == null) return 
            //     const newSavedPost = {
            //         ...NewPost,
            //         totalLikes : 0,
            //         likedByUser : false,
            //         user : {
            //             id : session.data.user.id,
            //             name:session.data.user.name,
            //             image:session.data.user.image
            //         }
            //     }
            //     return {
            //         ...oldData,
            //         pages:[
            //             {
            //                 ...oldData.pages[0],
            //                 posts: [newSavedPost, ...oldData.pages[0].posts]
            //             },
            //             ...oldData.pages.slice(1)
            //         ]
            //     }
                
            // })
        }
    })

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        createPost.mutate({content: inputValue})
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4 py-2">
            <div className="flex gap-4  rounded-lg">
                <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className=" flex-grow overflow-hidden text-lg 
            py-4 px-10 outline-none resize-none bg-transparent" placeholder="Post Anything you want!!"></textarea>
            </div>
            <div className="flex items-center gap-2">
                <Button className="self-start mb-2" disabled={inputValue.length>200?true:false}>Send</Button>
                <p className={(inputValue.length>200) ? 'text-red-500':''}>{inputValue.length}</p>/ 200
            </div>

        </form>
    )
}

export default NewPost
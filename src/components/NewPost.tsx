import { FormEvent, useState } from "react"
import Button from "./Button"
import { api } from "~/utils/api"

const NewPost = () => {
    const [inputValue, setInputValue] = useState('')
    const createPost = api.post.create.useMutation({
        onSuccess:post => {
            setInputValue('')
        }
    })

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        createPost.mutate({content: inputValue})
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4 border border-gray-600 rounded-lg">
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
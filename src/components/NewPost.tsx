import Button from "./Button"

const NewPost = () => {
    return (
        <form action="" className="flex flex-col gap-2 border-b px-4 -y-2">
            <div className="flex gap-4">
                <textarea className=" flex-grow overflow-hidden text-lg 
            py-4 px-10 outline-none resize-none bg-transparent" placeholder="Post Anything you want!!"></textarea>
            </div>
            <Button className="self-start mb-2" >Post</Button>
        </form>
    )
}

export default NewPost
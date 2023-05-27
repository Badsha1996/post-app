import Image from "next/image"

type ProfilePictureProps = {
  src?:string | null
  className?: string
}
const ProfilePicture = ({src,className}:ProfilePictureProps) => {
  return <div className={`relative
   h-10 w-10 
   overflow-hidden 
   rounded-full ${className}`}>
      {src == null ? null : <Image src={src} alt="profile picture" quality={100} 
      fill 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>}
    </div>
  
}

export default ProfilePicture
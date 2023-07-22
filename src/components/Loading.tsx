import { LoadingProps } from "~/types/types"
import { VscRefresh } from 'react-icons/vsc'

const Loading = ({big = false}:LoadingProps) => {
    const size = big ? 'w-16 h-16' : 'w-10 h-10'
  return (
    <div className="flex justify-center p-2">
        <VscRefresh className={`animate-spin ${size}`}/>
    </div>
  )
}

export default Loading
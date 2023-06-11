import { ButtonProps } from "~/types/types"

const Button = ({ sm = false,
    gray = false,
    className = '',
    ...props }): ButtonProps & JSX.Element => {
    const sizeClass = sm ? 'px-2 py-1' : 'px-6 py-1 font-semibold'
    const colorClass = gray ? 'bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300' : 
    'bg-indigo-400 hover:bg-indigo-300 focus-visible:bg-indigo-300'

    return <button className={`rounded-full transition-colors duration-300
    disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400
    text-white ${sizeClass} ${colorClass} ${className}`}
        {...props}>
    </button>
}

export default Button
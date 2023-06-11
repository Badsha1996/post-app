import type{ DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export type ProfilePictureProps = {
    src?:string | null
    className?: string
}

export type Post = {
    id: string,
    content: string,
    createdAt: Date,
    totalLikes: number,
    likedByUser: boolean,
    user: {
        image: string | null;
        id: string;
        name: string | null;
    }
}

export type AllPostQueryProps = {
    isLoading: boolean,
    isError: boolean,
    hasMore: boolean | undefined,
    newPosts: () => Promise<any>
    posts: Post[] | undefined
}

export type ButtonProps = {
    sm?: boolean // s , m , l
    gray?: boolean
    className?: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>



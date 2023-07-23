import React from 'react'
import { AllPostQueryProps } from '~/types/types'
import Loading from './Loading'

const TrendCard = ({ posts, isError, newPosts, hasMore }: AllPostQueryProps) => {
    if (isError) return <h1>Error 404</h1>
    if (posts == null || posts.length === 0) {
        return null
    }
    return (
    <div>TrendCard</div>
  )
}

export default TrendCard
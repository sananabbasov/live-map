import React from 'react'
import LocalLocation from '../components/LocalLocation'
import NewsCard from '../components/NewsCard'

function NewsPage() {
    return (
        <div>
            <LocalLocation />
            <div className='max-w-6xl mx-auto py-16 px-4 flex flex-wrap'>
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </div>
        </div>
    )
}

export default NewsPage
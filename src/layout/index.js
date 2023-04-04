import React from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'

const HomeLayout = () => {
    return (
        <div className='homeLayout'>
            <Header />
            <Feed />
        </div>
    )
}

export default HomeLayout
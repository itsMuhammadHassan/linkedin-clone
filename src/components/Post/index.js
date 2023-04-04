import React, { forwardRef } from 'react'
import { Avatar } from '@mui/material'

// Style
import './style.scss';

const Post = forwardRef(({ name, description, message, photoUrl, nameImg, timeStamp }, ref) => {


    return (
        <div ref={ref} className='post'>
            <div className="post__head">
                <Avatar src={photoUrl} className='post__headAvatar'>
                    {nameImg}
                </Avatar>
                <div className="post__descWrapper">
                    <p className='post__name'>{name}</p>
                    <p className='post__desc'>{description}</p>
                    <p className='post__desc'>{timeStamp}</p>
                </div>
            </div>
            <div className="post__text">
                <p>{message}</p>
            </div>
        </div>
    )
})

export default Post
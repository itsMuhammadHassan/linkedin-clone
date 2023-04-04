import React, { useEffect, useState } from 'react';
import './style.scss';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import Post from '../Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move';
import moment from 'moment/moment';

const Feed = () => {

    const user = useSelector(selectUser)

    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        )
    }, [])


    const sendPost = (e) => {
        e.preventDefault();
        setInput('')

        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    return (
        <div className='feed'>
            <div className="feed__inputContainer">
                <form >
                    <div className="feed__inputSearch">
                        <input
                            type="text"
                            value={input}
                            placeholder='Create a Post'
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type='submit'
                            onClick={sendPost}
                            disabled={input.trim() === "" ? true : false}
                        >Post</button>
                    </div>
                </form>
            </div>
            <div className="post__wrapper">
                <FlipMove appearAnimation>
                    {posts.map(({ id, data: { name, description, message, photoURL, timestamp } }) => (
                        <Post
                            key={id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoURL}
                            timeStamp={moment(timestamp?.toDate()).fromNow()}
                            nameImg={description[0]}
                        />
                    ))}
                </FlipMove>
            </div>

        </div>
    )
}

export default Feed
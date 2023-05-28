import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../redux/actions/postAction'

function Posts () {

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userAuthData)
  const {posts, loading} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])

  return (
    <div className="Posts">
        {loading ? 'Loading...' : posts.map((post, id)=>{
            return <Post data={post} key={id} id={id}/>
        })}
    </div>
  )
}

export default Posts
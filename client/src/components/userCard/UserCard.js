import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../redux/actions/userAction'

const UserCard = ({person}) => {

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const user = useSelector(state => state.auth.userAuthData)

    const [following, setFollowing] = useState(person.followers.includes(user._id))

    const dispatch = useDispatch()

    const handleFollow = e => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user))
        setFollowing(prev => !prev)
    }

    return (
        <div className="follower" key={person.personname}>
            <div>
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + 'defaultProfile.png'} className='followerImage' alt="" />
                <div className="name">
                    <span>{person.firstname + ' ' + person.lastname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}

export default UserCard
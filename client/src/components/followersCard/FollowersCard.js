import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import { Followers } from '../../data/FollowersData'
import UserCard from '../userCard/UserCard'
import { useSelector } from 'react-redux'
import axios from 'axios'

const FollowersCard = () => {
    
    const [people, setPeople] = useState([])
    const user = useSelector(state => state.auth.userAuthData)

    useEffect(() => {
        axios.get('http://localhost:3001/users').then(res => setPeople(res.data.filter(i => i._id != user._id))).catch(error => console.log(error))
    }, [])

    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {people.map(person =>
                (
                    <UserCard person={person} key={person._id} />
                )
            )}
        </div>
  )
}

export default FollowersCard
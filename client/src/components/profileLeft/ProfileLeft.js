import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../infoCard/InfoCard'
import Search from '../search/Search'
const ProfileLeft = () => {
  return (
   <div className="ProfileSide">
       <Search/>
       <InfoCard/>
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft
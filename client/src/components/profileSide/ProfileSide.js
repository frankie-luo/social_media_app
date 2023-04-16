import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import ProfileCard from "../profileCard/ProfileCard";
import Search from "../search/Search";
import './ProfileSide.css'

function ProfileSide() {
    return (
        <div className="ProfileSide">
            <Search />
            <ProfileCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileSide
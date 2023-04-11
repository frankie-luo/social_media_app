import React from "react";
import ProfileCard from "../profileCard/ProfileCard";
import Search from "../search/Search";
import './ProfileSide.css'

function ProfileSide() {
    return (
        <div className="ProfileSide">
            <Search />
            <ProfileCard />
        </div>
    )
}

export default ProfileSide
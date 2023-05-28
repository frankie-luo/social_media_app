import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"
import "./ProfileCard.css"

function ProfileCard(props) {

    const user = useSelector(state => state.auth.userAuthData)
    const posts = useSelector(state => state.post.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + 'defaultCover.jpg'} alt="" />
          <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'} alt="" />
        </div>
  
        <div className="ProfileName">
          <span>{user.firstname} {user.lastname}</span>
          <span>{user.worksAt ? user.worksAt : 'Write aboute yourself'}</span>
        </div>
  
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following?.length}</span>
              <span>Followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers?.length}</span>
              <span>Followers</span>
            </div>
  
            {props.location === 'profilePage' && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts?.filter(i => i.userId === user._id)?.length}</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        {props.location !== 'profilePage' && <span><Link to={`/profile`} style={{textDecoration: 'none', color: 'inherit'}}>My Profile</Link></span>}
      </div>
    )
  }
  
export default ProfileCard
import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserAPI from '../../redux/APIs/userRequest'
import { logOut } from "../../redux/actions/authAction";

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch()
  const params = useParams()

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const user = useSelector(state => state.auth.userAuthData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      setProfileUser(user)
    }
    fetchProfileUser()
  }, [user])

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
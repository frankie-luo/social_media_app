import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/actions/uploadAction";


function PostShare () {
  const user = useSelector(state => state.auth.userAuthData)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const descRef = useRef()
  const loading = useSelector(state => state.post.loading)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = e => {
    e.preventDefault()

    const newPost = {
      userId: user._id,
      desc: descRef.current.value
    }

    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    try {
      dispatch(uploadPost(newPost))
      setImage(null)
      descRef.current.value = ''
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="PostShare">
      <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png'} alt="" />
      <div>
        <input type="text" placeholder="What's happening" ref={descRef} required />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Share'}</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              ref={imageRef}
              onChange={onImageChange}
              accept="image/*"
            />
          </div>
        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
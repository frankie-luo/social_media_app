import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/actions/uploadAction";
import { updateUser } from "../../redux/actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfiileImage] = useState()
  const [coverImage, setCoverImage] = useState()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.userAuthData)

  const handleChange = e => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      e.target.name === 'profileImage' ? setProfiileImage(img) : setCoverImage(img)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const userData = formData

    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name
      data.append('name', fileName)
      data.append('file', profileImage)
      userData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append('name', fileName)
      data.append('file', coverImage)
      userData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    dispatch(updateUser(user._id, userData))

    setModalOpened(false)
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div style={{height: 'fit-content'}}>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div style={{height: 'fit-content'}}>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div style={{height: 'fit-content'}}>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesIn}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div style={{height: 'fit-content'}}>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={handleImageChange} />
            Cover Image
            <input type="file" name="coverImage" onChange={handleImageChange} />
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
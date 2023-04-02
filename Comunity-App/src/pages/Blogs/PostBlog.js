import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import UploadImage from "../../uploadImage";

const PostBlog = ({ user, handleSubmitBlog, closeWindow }) => {
  const [Image, setImage] = useState("");
  const [NewpostDetails, setNewPostDetails] = useState({
    type: "",
    tittle: "",
    content: "",
    coverImageLink: "",
    userName: user.details.username,
    userId: user.details.userId,
    userImage:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    comment: [],
    Like: [],
  });

  const [PostbtnDisabled, setPostbtnDisabled] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy[name] = value;
    setNewPostDetails(NewpostDetailsCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPostbtnDisabled(true);
    handleSubmitBlog(NewpostDetails);
  };

  const editPost = async () => {
    const response = await axios.post(
      "http://localhost:5000/editPost",
      NewpostDetails
    );
  };

  const [imagePath, setimagePath] = useState("");

  const handleImageUpload = async (event) => {
    const ImagDetails = await UploadImage(event.target.files[0], "upload");
    setImage(event.target.files[0].name);
    setimagePath(ImagDetails.pathname);
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy.coverImageLink = ImagDetails.url;
    setNewPostDetails(NewpostDetailsCopy);
  };

  const handleImageDelete = async () => {
    const deleteImage = await UploadImage(imagePath, "delete");
    setImage("");
    setimagePath("");
    let NewpostDetailsCopy = { ...NewpostDetails };
    NewpostDetailsCopy.coverImageLink = "";
    setNewPostDetails(NewpostDetailsCopy);
  };

  return (
    <div className="postBlogPage">
      <AiFillCloseCircle
        className="close"
        onClick={() => {
          closeWindow();
        }}
      />

      <div className="CreatePostWIndow">
        <div>
          <label htmlFor="">
            Blog Type <span>(*optional)</span>
          </label>
          <input
            onChange={handleChange}
            name="type"
            placeholder="Enter Blog Type"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Tittle</label>
          <input
            onChange={handleChange}
            name="tittle"
            placeholder="Enter Tittle"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Content</label>
          <textarea
            placeholder="Enter the the Blog Content"
            onChange={handleChange}
            name="content"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="ImageUpload">
          <label>Upload Cover Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div>
            <img
              src="https://img.freepik.com/premium-vector/gallery-simple-icon-vector-image-picture-sign-neumorphism-style-mobile-app-web-ui-vector-eps-10_532800-801.jpg"
              alt=""
            />
            <button>Browse Cover Image</button>
            {NewpostDetails.coverImageLink !== "" && (
              <div className="UploadedBox">
                <img
                  className="UploadedImage"
                  src={NewpostDetails.coverImageLink}
                />
                <p>{Image}</p>
                <MdOutlineDeleteOutline
                  onClick={handleImageDelete}
                  className="dleteImage"
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="postBlogWindowBtn PostBtn"
          disabled={PostbtnDisabled}
          onClick={handleSubmit}
        >
          Post Blog
        </button>
      </div>
    </div>
  );
};

export default PostBlog;
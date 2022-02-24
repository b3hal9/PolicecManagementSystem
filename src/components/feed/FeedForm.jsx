import { useEffect, useState } from "react";
import { handle_createPost } from "../../store/actions/postActions";
import styles from "../styles/feed.module.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const FeedForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [privewimage, setPreviewimage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewimage(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreviewimage(null);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image !== null) {
      if (title.length < 15 && description.length <= 200) {
        const newData = new FormData();
        newData.append("title", title);
        newData.append("description", description);
        newData.append("file", image);
        dispatch(handle_createPost(newData, toast));
        setTitle("");
        setDescription("");
        setPreviewimage(null);
      } else {
        toast.error("Invalid title or description.");
      }
    } else {
      toast.error("Please select an image.!!");
    }
  };
  return (
    <div className={styles.box1}>
      <ToastContainer />
      <div className={styles.title}>
        <h3>Create a Post</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.textbox}>
          <input
            type="text"
            placeholder="Post Title"
            className={styles.titleInput}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.textbox}>
          <textarea
            name="description"
            cols="30"
            rows="6"
            placeholder="Create a Post"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {privewimage && (
            <div className={styles.formImage}>
              <img
                src={privewimage}
                alt="demo"
                height={500}
                width={1200}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className={styles.formbuttom}>
          <button type="submit" className={styles.btn}>
            Submit
          </button>
          <div className={styles.photoBox}>
            <label htmlFor="photo">
              Choose<i className="fas fa-images"></i>
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.substr(0, 5) === "image") {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedForm;

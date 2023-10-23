import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// @ts-ignore
import { Editor } from "../../components/Editor";
// import Slider from "@material-ui/core/Slider";
import "./singlePost.scss";
import "../../../editorbuble.scss";
export default function single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState<any>({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [theme, setTheme] = useState("");
  const [coverphoto, setCoverphoto] = useState<any>({});
  const [updateMode, setUpdateMode] = useState(false);

  const user = useSelector((state: any) => state.user);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      // console.log("click");
      var re = /<img[^>]+src="?([^"\s]+)"?\s*/g;
      var photo1: any = re.exec(desc);
      var photo;
      if (photo1) {
        photo = photo1[1];
      } else {
        photo = "";
      }
      await axios.put(`/api/post/${post._id}`, {
        username: user.username,
        title,
        photo,
        description: desc
        .slice(0, 400)
        .replace(/<[^>]+>/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .substring(1) + "..." ,
        content: desc,
        thread: post.thread,
        photofit: post.photofit,
      });

      try {
        const res2 = {
          img: images,
          post_id: post._id,
        };
        // console.log(res2);
        await axios.put("/api/imagecover", res2);
      } catch (err) {
        console.log(err);
      }
      setUpdateMode(false);
    } catch (err) {}
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/post/" + path);
      // console.log(res.data);
      setPost(res.data.post);
      setTitle(res.data.post.title);
      setDesc(res.data.post.content);
      setCoverphoto(res.data.CoverPhoto);
    };

    getPost();
  }, [path]);

  const [images, setImages] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var img: any = document.getElementById("blog-img");
        if (img) img.src = reader.result as string;
        setImages(reader.result as string);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  return (
    <>
      <div className="single-post">
        <input
          type="file"
          name="user[image]"
          accept="image/*"
          onChange={imageChange}
          id="cover-img"
          style={{ display: "none" }}
        />
        {updateMode ? (
          <label htmlFor="cover-img">
            <img
              src={
                coverphoto
                  ? coverphoto.img
                    ? coverphoto.img
                    : "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  : "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              className="blog-img"
              id="blog-img"
              style={{ objectPosition: post.photofit }}
            />
          </label>
        ) : (
          <img
            src={
              coverphoto
                ? coverphoto.img
                  ? coverphoto.img
                  : "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                : "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
            onError={(e: any) => {
              e.target.src =
                "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
            }}
            // src= "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="blog-img"
            style={{ objectPosition: post.photofit }}
          />
        )}

        <div className="single-blog">
          {/* {updateMode && (
            <Slider
              defaultValue={0}
              onChange={(e, val) => {
                setPost({ ...post, photofit: "center " + val + "%" });
              }}
              aria-label="Small"
              valueLabelDisplay="auto"
              style={{ maxWidth: "98%" }}
            />
          )} */}
          <div className="space-between Wrap-Post">
            {updateMode ? (
              <select
                className="single-post-tag"
                defaultValue={post.thread}
                onChange={(e) => {
                  setPost({ ...post, thread: e.target.value });
                }}
              >
                <option value="Chia sẻ kiến thức">Chia sẻ kiến thức</option>
                <option value="Chuyện trò - tâm sự">Chuyện trò - tâm sự</option>
                <option value="Thắc mắc">Thắc mắc</option>
                <option value="Thảo luận - tranh luận">
                  Thảo luận - tranh luận
                </option>
              </select>
            ) : (
              // <input className="single-post-tag" value={post.thread} />
              <p className="single-post-tag">{post.thread}</p>
            )}

            {post.username === user?.username && (
              <div className="Icon">
                <i
                  className="fa fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>{" "}
                <i className="fa-solid fa-trash-can" onClick={handleDelete}></i>
              </div>
            )}
          </div>

          {updateMode ? (
            <textarea
              id="title"
              value={title}
              style={{ marginBottom: "0px" }}
              onChange={
                (e: any) => {
                  e.preventDefault();
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                  setTitle(e.target.value);
                }
                // set style of this element to .style.height = 100%
              }
              placeholder="Title"
              className="single-post-title writeInput Wrap-Post "
            />
          ) : (
            <h1 className="Wrap-Post single-post-title">{title}</h1>
          )}
          <div className="Wrap-Post">
            <div className="single-post-info">
              <span className="single-post-author">
                Author:{" "}
                <Link to={"../../?user=" + post.username}>
                  <b>{post.username}</b>
                </Link>
              </span>
              <span className="single-post-date">
                Upload at: <b> {new Date(post.createdAt).toDateString()}</b>
              </span>
            </div>

            {updateMode ? (
              <Editor
                value={desc}
                onTextChange={(e: any) => {
                  setDesc(e.htmlValue);
                }}
                theme="bubble"
                style={{ minHeight: "200px", overflowY: "auto" }}
                className="BlogStyle CustomEditor"
              />
            ) : (
              <section
                className="BlogStyle CustomEditor"
                dangerouslySetInnerHTML={{ __html: desc }}
              ></section>
            )}
            {updateMode && (
              <button className="writeSubmit" onClick={handleUpdate}>
                Update
              </button>
            )}
            <div className="single-post-content"></div>
          </div>
        </div>
      </div>
    </>
  );
}

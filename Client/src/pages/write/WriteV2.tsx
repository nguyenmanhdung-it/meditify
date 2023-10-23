import "./write.scss";
//  @ts-ignore
import { Editor } from "../../components/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import Slider from "@/core/Slider";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Write() {
  const user = useSelector((state: any) => state.user);
  const [coverphoto, setCoverphoto] = useState<any>({});
  const [post, setPost] = useState<any>({});
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [theme, setTheme] = useState("snow");
  // get mediumData from session storage
  let mediumData = sessionStorage.getItem("mediumData");

  const data = {
    title: "",
    content: "",
    images: "",
    username: user.username,
    thread: "Chia sẻ kiến thức",
    photofit: "center 0%",
    CoverPhoto: null,
    tags: "",
    desc: "",
  };


  useEffect(() => {
    const getPost = async () => {
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      sessionStorage.setItem("mediumData", "");
      setDesc(data.desc);
      setCoverphoto(data.CoverPhoto);
      setTags(data.tags);
    };
    getPost();
  }, []);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title === "" || content === "") {
      alert("Bạn chưa nhập đủ thông tin");
      return;
    }
    var re = /<img[^>]+src="?([^"\s]+)"?\s*/g;
    var photo1: any = re.exec(content);
    console.log(photo1);
    var photo;
    if (photo1) {
      photo = photo1[1];
    } else {
      photo = "";
    }
    const newPost = {
      username: user.username,
      title: title,
      photo: photo,
      description:
        desc == ""
          ? content
              .slice(0, 400)
              .replace(/<[^>]+>/g, " ")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .substring(1) + "..."
          : desc,
      photofit: post.photofit,
      content: content,
      tags: tags.split(", "),
    };
    try {
      const res = await axios.post("/api/post", newPost);
      if (selectedImage) {
        const res2 = {
          img: images,
          post_id: res.data._id,
        };
        try {
          await axios.post("/api/imagecover", res2);
        } catch (err) {
          console.log(err);
        }
      }

      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  const popUp = document.getElementById("pop-up")!;
  const openPopUp = () => {
    popUp.style.display = "flex";
  };
  const closePopUp = () => {
    popUp.style.display = "none";
  };

  return (
    <div className="single-post">
      <div className="pop-up" id="pop-up">
        <div className="pop-up-bg">
          <strong> Mô tả bài viết</strong>
          <textarea
            style={{ padding: "5px" }}
            className="desc"
            placeholder="Không bắt buộc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <strong style={{ marginTop: "20px", marginBottom: "10px" }}>
            {" "}
            Thêm thẻ tags{" "}
          </strong>
          <input
            className="input-tag select"
            type="text"
            placeholder="Sự Nghiệp, Công Nghệ,..."
            onChange={(e) => setTags(e.target.value)}
          />
          <select
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              paddingLeft: "0px",
              border: "1px solid rgb(123,123,123)",
              borderRadius: "5px",
            }}
            className="single-post-tag select"
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
          <div className="center">
            <button
              className="summitbtn"
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #000",
              }}
              onClick={closePopUp}
            >
              Quay Lại
            </button>
            <button className="summitbtn" onClick={handleSubmit}>
              Tạo
            </button>
          </div>
        </div>
      </div>
      <input
        type="file"
        name="user[image]"
        accept="image/*"
        onChange={imageChange}
        id="cover-img"
        style={{ display: "none" }}
      />
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

      <div className="single-blog">
        {/* <Slider
          defaultValue={0}
          onChange={(e, val) => {
            setPost({ ...post, photofit: "center " + val + "%" });
          }}
          aria-label="Small"
          valueLabelDisplay="auto"
          style={{ maxWidth: "98%" }}
        /> */}
        <div className="Wrap-Post">
          <textarea
            id="title"
            required={true}
            value={title}
            style={{ marginBottom: "0px" }}
            onChange={(e: any) => {
              e.preventDefault();
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="single-post-title writeInput Wrap-Post "
          />
          <div className="Wrap-Post">
            <Editor
              required={true}
              value={mediumData}
              onTextChange={(e: any) => {
                setContent(e.htmlValue);
              }}
              placeholder="Type something..."
              theme={theme}
              style={{ minHeight: "200px", overflowY: "auto" }}
              className="BlogStyle CustomEditor"
            />
            <button className="writeSubmit" onClick={openPopUp}>
              Write
            </button>
            <div className="single-post-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

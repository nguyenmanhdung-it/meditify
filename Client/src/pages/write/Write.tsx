import "./write.scss";
import Editor from "../../components/editor/editor";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import Slider from "@material-ui/core/Slider";

export default function Write() {
  var theme: string = "bubble";
  var first: boolean = true;
  const [images, setImages] = useState("");
  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [fit, setFit] = useState("");
  var objPos: string = "center 0%";

  document.querySelectorAll(".ql-picker").forEach((tool) => {
    tool.addEventListener("mousedown", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
  });

  const user = useSelector((state: any) => state.user);
  const EditorRef = useRef<any>(null);
  var title: string, content: string;
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var img: any = document.getElementById("writeImg");
        if (img) img.src = reader.result as string;
        // console.log(reader.result);
        setImages(reader.result as string);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const getEditor = (data: any) => {
    title = data.name;
    content = data.content;
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
      photofit: fit,
      content: content,
    };
    console.log(newPost);
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

  return (
    <div
      className="write"
      style={selectedImage ? { marginTop: "60px" } : { marginTop: "150px" }}
    >
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <input
          type="file"
          name="user[image]"
          accept="image/*"
          onChange={imageChange}
          id="cover-img"
          style={{ display: "none" }}
        />

        {selectedImage && (
          <div>
            <img
              alt="Thumb"
              style={{ objectPosition: fit }}
              className="writeImg"
              id="writeImg"
            />
            <button onClick={removeSelectedImage}>Remove cover</button>
            <br />
          </div>
        )}
        {/* <form action="" className="writeForm"> */}
        <div className="writeFormGroup">
          <select
            className="single-post-tag"
            onChange={(e: any) => {
              setFit(e.target.value);
            }}
          >
            <option value="Chia sẻ kiến thức">Chia sẻ kiến thức</option>
            <option value="Chuyện trò - tâm sự">Chuyện trò - tâm sự</option>
            <option value="Thắc mắc">Thắc mắc</option>
            <option value="Thảo luận - tranh luận">
              Thảo luận - tranh luận
            </option>
          </select>
          <br />
          {/* <textarea
              placeholder="write something..."
              className="writeTextarea"
            ></textarea> */}
          {/* {selectedImage && (
            <Slider
              defaultValue={0}
              onChange={(e, val) => {
                objPos = "center " + val + "%";
                setFit(objPos);
                // console.log(images);
              }}
              aria-label="Small"
              valueLabelDisplay="auto"
              style={{ maxWidth: "98%" }}
            />
          )} */}
          {!selectedImage && (
            <label htmlFor="cover-img">
              <i className="fa-solid fa-image"></i>
              Add Cover
            </label>
          )}

          <Editor theme={theme} ref={EditorRef} getData={getEditor} />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

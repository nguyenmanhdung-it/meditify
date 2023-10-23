import "./MdpostItem.scss";
import { Link } from "react-router-dom";
export default function MdPostItem(props: any) {
  const tags = props.tags.map((tag: any) => {
    return (
      <a className="tags" key={tag} 
      href = {`http://localhost:3000/?cat=${tag}`}
      >
        <span className="Md-card-badge card-badge-blue">{tag}</span>
      </a>
    );
  });
  // console.log(props.post);

  return (
    <>
      <div className="MdItemPost">
        <div>
          <div className="item-flex">
            <div className="flex-content">
              <a
               href= {`http://localhost:3000/?user=${props.post.username}`}  
               style={{ fontSize: "10px" }}>
                {props.post.username}
              </a>
              <h3 className="item-title">
                <Link to={`/post/${props.post._id}`}>{props.post.title}</Link>
              </h3>

              <p className="MdItemdesc">
                {props.post.description}
              </p>
              <div className="space-between margin10">
                <div>{tags}</div>
                <div id="Uplike">
                  <i className="fa-solid fa-caret-up" id="View"></i>
                  {props.post.likes}{" "}
                  <i className="fa-solid fa-eye" id="View">
                    {" "}
                  </i>
                  {Math.round(props.post.views)}
                </div>
              </div>
            </div>
            <div className="item-image">
              <img
                src={
                  props.post.photo
                    ? props.post.photo
                    : "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
                }
                alt=""
                className="MdItemCardImg"
                onError={(e: any) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60";
                }}
              />
            </div>
          </div>

          <div className="border"></div>
        </div>
      </div>
    </>
  );
}

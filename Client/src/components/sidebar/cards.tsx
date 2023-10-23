import React from "react";
import "./cards.scss";

export default function cards(props: any) {
  return (
    <>
      <div className="small-card">
        <div className="small-flex">
          {/* <img src={props.author.img} className="image-small" /> */}
          <h5 className="author-name-small">{props.username}</h5>
        </div>
        <a href={`http://localhost:3000/post/${props.key}`}>
          <h4 className="title-small">{props.title}</h4>
        </a>
      </div>
    </>
  );
}

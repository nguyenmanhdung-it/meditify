import "./sideBar.scss";
import Cards from "./cards";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SideBar() {
  const [cats, setCats] = useState([]);
  const [views, setViews] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("api/category");
      setCats(res.data);
    };
    getCats();
  }, []);

  useEffect(() => {
    const getViews = async () => {
      const res = await axios.get("api/top/topview");
      setViews(res.data);
    };
    getViews();
  }, []);

  const tags = cats.map((tag: any) => {
    return (
      <a href={"/../../?cat=" + tag.name} id="SidebarTags" key={tag.name}>
        <span key={tag.name} className="Md-card-badge card-badge-blue">
          {tag.name}
        </span>
      </a>
    );
  });
  return (
    <>
      <div className="SideBar">
        <div className="sidebarItem">
          <h3 className="TopHead">Recommended topics</h3>
          <div className="SB-Mg">{tags}</div>
          <div className="border"></div>
          <h3 className="TopHead">⚫ Top read in day</h3>
          {views.map((post: any) => {
            return (
              <div key={post._id}>
                <Cards
                  post={post}
                  title={post.title}
                  username={post.username}
                />
              </div>
            );
          })}
          <a href="TopRead" className="DownHead">
            See the full list
          </a>
          <div className="border"></div>
          <h3 className="TopHead">⚫ Top Comment in day</h3>
          {views.map((post: any) => {
            return (
              <div key={post._id}>
                <Cards
                  title={post.title}
                  username={post.username}
                  date={post.date}
                />
              </div>
            );
          })}
          <a href="TopRead" className="DownHead">
            See the full list
          </a>
          <div className="border"></div>
          <h3 className="TopHead">⚫ Top like in day </h3>
          {views.map((post: any) => {
            return (
              <div key={post._id}>
                <Cards
                  title={post.title}
                  img={post.image}
                  author={post.author}
                  date={post.date}
                />
              </div>
            );
          })}
          <a href="TopRead" className="DownHead">
            See the full list
          </a>
        </div>
      </div>
    </>
  );
}

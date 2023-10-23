import "./Md-post.scss";
import MdPostItem from "./MdpostItem";
export default function MdPost(props: any) {

const Blog = props.props;
  return (
    <div className="MdPost">
        <div className="md-post-container">
            {Blog.map((item: any) => {
                return (
                    <MdPostItem
                    key={item._id}
                    tags={item.tags}
                    post={item}
                    />
                );
            }).reverse()}
        </div>
    </div>
  );
}

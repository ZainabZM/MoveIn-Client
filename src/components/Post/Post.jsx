import "./RenderPost.css";

function Post(props) {
  return (
    <div className="boxPlaces">
      <div className="image-place">
        <img src={props.file} alt="Place Image" />
      </div>
      <div className="content">
        <p>{props.brand}</p>
        <p>{props.price} € </p>
      </div>
    </div>
  );
}

export default Post;

import "./RenderPost.css";

function Post(props) {
  return (
    <div className="boxPlaces">
      <div className="image-place">
        <img src={props.file} alt="Place Image" />
      </div>
      <div className="content">
        <h3>{props.title}</h3>
        <p>{props.brand}</p>
        <p>{props.color}</p>
        <p>{props.state}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
      </div>
    </div>
  );
}

export default Post;

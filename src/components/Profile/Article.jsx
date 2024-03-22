import "./Profile.css";

function Article(props) {
  return (
    <div className="articleBox">
      <div className="articleImage">
        <img src={props.file} alt="Article Image" />
      </div>
      <div className="articleTitle">
        <h3>{props.title}</h3>
      </div>
    </div>
  );
}
export default Article;

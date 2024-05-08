// css
import "./Content.css";

function Content({ content }) {
  return (
    <div className="content">
      <p className="content__years">
        <span>{content.years}</span> years
      </p>
      <p className="content__months">
        <span>{content.months}</span> months
      </p>
      <p className="content__days">
        <span>{content.days}</span> days
      </p>
    </div>
  );
}

export default Content;

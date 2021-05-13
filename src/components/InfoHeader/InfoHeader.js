import "./InfoHeader.css"

function InfoHeader(props) {
  return (
    <div className="InfoHeader">
      <h2>{`${props.taskAmount} tasks todo`}</h2>
    </div>
  );
}

export default InfoHeader;
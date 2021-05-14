import "./InfoHeader.css"

function InfoHeader(props) {
  return (
    <div className="InfoHeader">
      <h1>{`${props.taskAmount} tasks todo`}</h1>
    </div>
  );
}

export default InfoHeader;
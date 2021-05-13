import "./TaskInfoInput.css";

function TaskInfoInput(props) {
  const categoriesRadio = props.categories.map(category =>
    <label key={category}>
      <input
        type="radio"
        name={`task_info_category_${props.inputIdentifier}`}
        value={category}
        onChange={event => props.onCategoryUpdate(event.currentTarget.value)}
        checked={category === props.currentCategory}
      />
      {category}
    </label>
  );

  return (
    <table className="TaskInfoInput">
      <tr>
        <th><label>Description:</label></th>
        <th>
          <input type="text" value={props.description}
                 onChange={element => props.onDescriptionUpdate(element.target.value)}/>
        </th>
      </tr>
      <tr>
        <th><label>Category:</label></th>
        <th>{categoriesRadio}</th>
      </tr>
    </table>
  );
}

export default TaskInfoInput;
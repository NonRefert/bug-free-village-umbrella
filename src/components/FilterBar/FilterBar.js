import "./FilterBar.css"

function FilterBar(props) {
  return (
    <div>
      <input type="text" className="input-group-prepend" placeholder="Search..." value={props.filteringValue}
             onChange={(element) => props.onFilter(element.target.value)}/>
    </div>
  )
}

export default FilterBar;
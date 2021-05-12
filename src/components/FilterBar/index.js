import "./index.css"

function FilterBar(props) {
  return (
    <div>
      <input type="text" placeholder="Search..." value={props.filteringValue}
             onChange={(element) => props.onFilter(element.target.value)}/>
    </div>
  )
}

export default FilterBar;
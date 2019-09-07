import { capWord } from '../../lib/utils';


const FilterList = (props) => {
  if (!props.list && !props.list.length) return;
  const { name, currentFilter } = props;
  return (
    <div className={`filter-show filter-show-${name}`}>
      {props.list.map((listItem, i) => (
        <button key={i} id={`${name}-${listItem}`} className={`undrln-btn ${!!props.circleHover && (listItem == currentFilter ? 'sample-selected' : 'sample-hover')}`}
          disabled={listItem == currentFilter}
          title={`Refine by ${name}: ${capWord(listItem)}`}
          name={name}
          value={listItem}
          onClick={props.updateFilter}
        >
          {(name == 'color') ? (
            <div className={`${name}-sphere-sample ${listItem}-${name}-sample`}></div>
          ) : (
            capWord(listItem)
          )}
        </button>
      ))}
    </div>
  )
};


export default FilterList;

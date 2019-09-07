import SvgIcon from '../SvgIcon';
import { capWord } from '../../lib/utils';


const FilterSection = (props) => {
  const { name, currentFilter } = props;
  return (
    <div id={`filter-${name}`} className="filter">
      <div className="filter-banner">
        <button id={`filter-${name}-label`}
          name={props.showName}
          onClick={props.toggleFilter}
        >
          <h4>
            {name.toUpperCase()}
          </h4>
        </button>

        <button id={`filter-clear-${name}-btn`} className='filter-clear-btn'
          disabled={!currentFilter}
          name={name}
          value={null}
          onClick={props.updateFilter}
        >
          {!!currentFilter && 'Clear'}
        </button>

        <button id={`filter-show-${name}-btn`} className='filter-show-btn'
          name={props.showName}
          onClick={props.toggleFilter}
        >
          <SvgIcon width={10} name={props.showFilter ? 'downArrow' : 'upArrow'} />
        </button>
      </div>

      {props.showFilter && (
        <div className={`filter-show filter-show-${name}`}>
          {!!props.list && !!props.list.length && props.list.map((listItem, i) => (
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
      )}
    </div>
  )
};


export default FilterSection;

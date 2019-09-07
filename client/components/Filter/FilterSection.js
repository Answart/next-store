import SvgIcon from '../SvgIcon';


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
      {props.children}
    </div>
  )
}


export default FilterSection;

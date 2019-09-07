import React, { useState } from 'react';


const FilterRange = (props) => {
  const { name, currentFilter } = props;
  const [min, setMin] = useState(props.price_gte || '10');
  const [max, setMax] = useState(props.price_lte || '350');
  const handleChange = e => {
    if (!!e.preventDefault) e.preventDefault();
    const { id, value } = e.currentTarget;
    if (id == 'price_gte' && min != value) setMin(value);
    if (id == 'price_lte' && max != value) setMax(value);
  }
  const handleMouseUp = e => {
    if (!!e.preventDefault) e.preventDefault();
    const { id, value } = e.currentTarget;
    if ((id == 'price_gte' && props.price_gte != value) || (id == 'price_lte' && props.price_lte != value)) {
      props.updateFilter(e);
    }
  }
  return (
    <div>
      <div className="filter-range">
        <input
          id="price_gte"
          name="price_gte"
          type="range"
          min="10" max="350"
          value={min}
          step='10'
          onChange={handleChange}
          onMouseUp={handleMouseUp}
        />
        <input
          id="price_lte"
          name="price_lte"
          type="range"
          min="10" max="350"
          value={max}
          step='10'
          onChange={handleChange}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className='filter-range-preview'>
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  )
};


export default FilterRange;

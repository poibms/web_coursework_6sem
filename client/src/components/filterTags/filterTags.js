import React, { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { getAllTags } from '../../services/tagsService';
import './filter.scss'

const FilterTags = observer(({filterHandler}) => {
  const [tagsState, setTagsState] = useState([]);
  const [tags, setTags] = useState([]);
  const [click, setClick] = useState(0);

  useEffect(() => {
    getAllTags().then((data) => setTagsState(data));
  }, [])
  
  const toggleTags = (e, text) => {
    !tags.includes(text) ? setTags([...tags, text]) : setTags(tags.filter((i) => i != text))
    console.log(e.target.checked)
  }
  console.log(tags);
  const submitHandler = () => {
    filterHandler(tags);
    setClick(click + 1);
  }

  const resetFilters = () => {
    filterHandler();
    setClick(0);
    setTags([]);
  }

  return (
    <div className='filter'>
      <h2 className='filter-title'>Filter</h2>
      <ul className='filter-list'>
        {tagsState.map((i) => (
          <li className='filter-list_item' key={i.id}>
            <input type='checkbox' checked={tags.includes(i.id)} onClick={(e) => toggleTags(e, i.id)} />
            <p>{i.text}</p>
          </li>
        ))}
      </ul>
      <input type="submit" value={'Filter'} disabled={tags.length === 0 } onClick={submitHandler} />
      {click !== 0 ? (
        <input type="button" value={'Reset Filters'} onClick={resetFilters} />
      ): null}
    </div>
  );
});

export default FilterTags;

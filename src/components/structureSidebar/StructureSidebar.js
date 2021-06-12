import React, { useState } from 'react';

import { checkLocalStorage } from '../../utils/utils';

import classes from './StructureSidebar.module.css';

const structureAmount = [1, 2, 3, 4, 5];

export const StructureSidebar = (props) => {
  const [selectedStructure, setSelectedStructure] = useState(0);

  const structureHandler = (event) => {
    setSelectedStructure(event.target.value - 1);

    const savedStructure = localStorage.getItem(
      `structure-${event.target.value - 1}`
    );
    props.onSelectStructure(savedStructure);
  };

  const saveButtonHandler = () => {
    localStorage.setItem(
      `structure-${selectedStructure}`,
      JSON.stringify({
        data: props.data,
        id: `structure-${selectedStructure}`,
      })
    );
  };

  const setLocalStorage = (i) => {
    if (!checkLocalStorage(`structure-${i}`)) {
      localStorage.setItem(
        `structure-${i}`,
        JSON.stringify({
          data: props.defaultData,
          id: `structure-${i}`,
        })
      );
    } else {
      return false;
    }
  };
  return (
    <div>
      <label htmlFor='selectElm' className={classes.label}>
        Select or Save current Data Structure
      </label>
      <select
        name='select'
        id='selectElm'
        className={classes.select}
        onChange={structureHandler}
      >
        {structureAmount.map((num, index) => {
          setLocalStorage(index);

          return (
            <option key={index} value={num}>
              {num}
            </option>
          );
        })}
      </select>
      <div className={classes.button}>
        <button onClick={saveButtonHandler}>Save</button>
      </div>
    </div>
  );
};

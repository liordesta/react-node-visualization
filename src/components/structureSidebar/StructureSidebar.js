import React from 'react';

import { checkLocalStorage } from '../../utils/utils';

import classes from './StructureSidebar.module.css';

const structureAmount = [1, 2, 3, 4, 5];

export const StructureSidebar = (props) => {
  const structureHandler = (event) => {
    const savedStructure = localStorage.getItem(
      `structure-${event.target.value - 1}`
    );
    props.onSelectStructure(savedStructure);
  };

  const saveButtonHandler = () => {
    localStorage.setItem(
      `${props.selectedStructureValue}`,
      JSON.stringify({
        data: props.data,
        id: `${props.selectedStructureValue}`,
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
      <div className={classes.buttonDiv}>
        <button className={classes.button} onClick={saveButtonHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

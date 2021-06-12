import React from 'react';

import classes from './ErrorMessage.module.css';

export const ErrorMessage = (props) => {
  return <p className={classes.error}>Error: {props.errorMsg}</p>;
};

import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/webpack-resolver';

import classes from './Editor.module.css';

export const Editor = (props) => {
  return (
    <AceEditor
      mode='json'
      theme='twilight'
      onChange={props.onChange}
      showPrintMargin={false}
      className={classes.editor}
      value={props.value}
    />
  );
};

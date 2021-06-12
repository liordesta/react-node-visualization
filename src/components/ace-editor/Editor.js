import React, { useRef, useEffect } from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/webpack-resolver';

import classes from './Editor.module.css';

export const Editor = (props) => {
  const editorRef = useRef();

  useEffect(() => {
    const editor = editorRef.current.editor;
    editor.setValue(props.value);
    editor.clearSelection();
  }, [props.structureID]);

  return (
    <AceEditor
      mode='json'
      theme='twilight'
      onChange={props.onChange}
      showPrintMargin={false}
      className={classes.editor}
      ref={editorRef}
    />
  );
};

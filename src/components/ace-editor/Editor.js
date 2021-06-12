import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/webpack-resolver';

export const Editor = (props) => {
  return (
    <AceEditor
      mode='json'
      theme='twilight'
      style={{ width: window.innerWidth, height: '400px' }}
      defaultValue={JSON.stringify(props.defaultValue, null, 4)}
      onChange={props.onChange}
      showPrintMargin={false}
    />
  );
};

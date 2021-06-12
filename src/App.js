import React, { useState } from 'react';

import { ErrorMessage } from './components/errorMessage/ErrorMessage';
import { Graph } from './components/cytoscape/Graph';
import { Editor } from './components/ace-editor/Editor';

import { validateGraphInput, isValidJson } from './utils/utils';
import initialData from './mockData.json';

function App() {
  const [nodesData, setNodesData] = useState(initialData);
  const [userInputIsValid, setUserInputIsValid] = useState({ isValid: true });

  const onChangeHandler = (newUserInput) => {
    if (isValidJson(newUserInput)) {
      let validationResult = validateGraphInput(JSON.parse(newUserInput));

      if (validationResult.isValid) {
        setNodesData(JSON.parse(newUserInput));
      }
      setUserInputIsValid(validationResult);
    }
  };

  return (
    <div className='App'>
      <Editor onChange={onChangeHandler} defaultValue={initialData} />
      {!userInputIsValid.isValid && (
        <ErrorMessage errorMsg={userInputIsValid.errorMessage} />
      )}
      <Graph data={nodesData} valid={userInputIsValid.isValid} />
    </div>
  );
}

export default App;

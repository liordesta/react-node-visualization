import React, { useState } from 'react';

import { ErrorMessage } from './components/errorMessage/ErrorMessage';
import { Graph } from './components/cytoscape/Graph';
import { Editor } from './components/ace-editor/Editor';
import { StructureSidebar } from './components/structureSidebar/StructureSidebar';

import { validateGraphInput, isValidJson, debounce } from './utils/utils';
import initialData from './mockData.json';
import classes from './App.module.css';

function App() {
  const [nodesData, setNodesData] = useState(initialData);
  const [userInputIsValid, setUserInputIsValid] = useState({ isValid: true });
  const [selectedStructure, setSelectedStructure] = useState(0);
  const [editorValue, setEditorValue] = useState(
    JSON.stringify(initialData, null, 4)
  );

  const onChangeHandler = debounce((newUserInput) => {
    setEditorValue(newUserInput);
    if (isValidJson(newUserInput)) {
      let validationResult = validateGraphInput(JSON.parse(newUserInput));

      if (validationResult.isValid) {
        setNodesData(JSON.parse(newUserInput));
      }
      setUserInputIsValid(validationResult);
    }
  }, 500);

  const getSelectedStructureValue = (structureData) => {
    const selectedStructureValue = JSON.parse(structureData);
    setNodesData(selectedStructureValue.data);
    setSelectedStructure(selectedStructureValue.id);
  };

  return (
    <div className='App'>
      <div className={classes.wrapper}>
        <Editor
          onChange={onChangeHandler}
          value={editorValue}
          structureID={selectedStructure}
        />
        <StructureSidebar
          data={nodesData}
          onSelectStructure={getSelectedStructureValue}
          setNodesData={setNodesData}
          setEditorData={setEditorValue}
          defaultData={initialData}
          selectedStructureValue={selectedStructure}
        />
      </div>
      {!userInputIsValid.isValid && (
        <ErrorMessage errorMsg={userInputIsValid.errorMessage} />
      )}
      <Graph data={nodesData} valid={userInputIsValid.isValid} />
    </div>
  );
}

export default App;

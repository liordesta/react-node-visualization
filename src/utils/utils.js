// Main function that checks the user data from the editor.
const validateGraphInput = (data) => {
  const nodesCheck = validateNodes(data.nodes);
  if (!nodesCheck.isValid) {
    return nodesCheck;
  }

  if (data.edges) {
    const edgesCheck = validateEdges(data.edges);
    if (!edgesCheck.isValid) {
      return edgesCheck;
    }
    const sourcesAndTargetCheck = checkSourcesAndTargets(
      data.nodes,
      data.edges
    );
    if (!sourcesAndTargetCheck.isValid) {
      return sourcesAndTargetCheck;
    }
  }
  return {
    isValid: true,
  };
};

// Checks that the user nodes are valid.
const validateNodes = (nodes) => {
  if (!Array.isArray(nodes)) {
    return {
      isValid: false,
      errorMessage: 'Nodes must be an array',
    };
  }
  if (nodes.length < 1) {
    return {
      isValid: false,
      errorMessage: 'No nodes found. nodes must contain items',
    };
  }
  for (let i = 0; i < nodes.length; i++) {
    const result = checkItemProperties(nodes[i], ['data', 'data.id'], 'nodes');
    if (!result.isValid) {
      return result;
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i !== j) {
        if (nodes[i].data.id === nodes[j].data.id) {
          return {
            isValid: false,
            errorMessage: `No duplicated IDs (id ${nodes[j].data.id} is already in use)`,
          };
        }
      }
    }
  }
  return {
    isValid: true,
  };
};

// Checks that the user edges are valid.
const validateEdges = (edges) => {
  if (!Array.isArray(edges)) {
    return {
      isValid: false,
      errorMessage: 'Edges must be an array',
    };
  }
  if (edges.length < 1) {
    return {
      isValid: false,
      errorMessage: 'Edges must contain items',
    };
  }

  for (let i = 0; i < edges.length; i++) {
    const item = edges[i];
    const result = checkItemProperties(
      item,
      ['data', 'data.source', 'data.target'],
      'edges'
    );
    if (!result.isValid) {
      return result;
    }
  }
  return {
    isValid: true,
  };
};

// Checks that there's no required properties missing.
const checkItemProperties = (item, properties, label) => {
  const missingProperties = [];
  for (let i = 0; i < properties.length; i++) {
    if (!getProperty(item, properties[i])) {
      missingProperties.push(properties[i]);
    }
  }
  if (missingProperties.length > 0) {
    return {
      isValid: false,
      errorMessage: `Missing the following properties in ${label}: ${missingProperties.toString()}`,
    };
  }
  return {
    isValid: true,
  };
};

// Checks that Source & Target are unique and that they match with an existing ID.
const checkSourcesAndTargets = (nodes, edges) => {
  for (let i = 0; i < edges.length; i++) {
    const edgeTarget = edges[i].data.target;
    const edgeSource = edges[i].data.source;
    let hasTarget = false;
    let hasSource = false;
    if (edgeTarget === edgeSource) {
      return {
        isValid: false,
        errorMessage: `Source and target cannot be the same: ${edgeTarget}`,
      };
    }

    for (let j = 0; j < nodes.length; j++) {
      const item = nodes[j];
      if (item.data.id === edgeSource) {
        hasSource = true;
      }
      if (item.data.id === edgeTarget) {
        hasTarget = true;
      }
    }
    if (!hasTarget && !hasSource) {
      return {
        isValid: false,
        errorMessage: `Source and Targets are not found: ${edgeSource}, ${edgeTarget}`,
      };
    }
    if (!hasSource) {
      return {
        isValid: false,
        errorMessage: `Source ID not found: ${edgeSource}`,
      };
    }
    if (!hasTarget) {
      return {
        isValid: false,
        errorMessage: `Target ID not found: ${edgeTarget}`,
      };
    }
  }
  return {
    isValid: true,
  };
};

// Gets the value of the object.
const getProperty = (object, property) => {
  const keys = Array.isArray(property) ? property : property.split('.');
  if (object[keys[0]] && keys.length > 1) {
    return getProperty(object[keys[0]], keys.slice(1));
  }
  return object[keys[0]];
};

// Checks that the JSON is valid.
const isValidJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Checks localStorage exists.
const checkLocalStorage = (key) => {
  return localStorage.getItem(key) !== null ? true : false;
};

// Implement debounce so the function will not fire after each key press
const debounce = (func, wait, immediate) => {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export { validateGraphInput, isValidJson, checkLocalStorage, debounce };

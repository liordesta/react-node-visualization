import { validateGraphInput } from './utils.js';

describe('Utils', () => {
  describe('Nodes', () => {
    test('Nodes should be an array', () => {
      const data = { nodes: 'string test', edges: [] };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Nodes must be an array',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Nodes should have at least 1 item', () => {
      const data = { nodes: [], edges: [] };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'No nodes found. nodes must contain items',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Nodes should have a data property', () => {
      const data = {
        nodes: [{ test: { id: 'one', label: 'Node 1' } }],
        edges: [],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Missing the following properties in nodes: data,data.id',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Nodes should have an ID property', () => {
      const data = {
        nodes: [{ data: { test: 'one', label: 'Node 1' } }],
        edges: [],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Missing the following properties in nodes: data.id',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Nodes should have a unique ID', () => {
      const data = {
        nodes: [
          { data: { id: 'one', label: 'Node 1' } },
          { data: { id: 'one', label: 'Node 1' } },
        ],
        edges: [],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'No duplicated IDs (id one is already in use)',
      };

      expect(result).toEqual(expectedValue);
    });
  });

  describe('Edges', () => {
    test('Edges should be an array', () => {
      const data = {
        nodes: [{ data: { id: 'one', label: 'Node 1' } }],
        edges: 'string test',
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Edges must be an array',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Edges should have an source property', () => {
      const data = {
        nodes: [
          { data: { id: 'one', label: 'Node 1' } },
          { data: { id: 'two', label: 'Node 2' } },
        ],
        edges: [
          {
            data: {
              test: 'one',
              target: 'two',
              label: 'Edge from Node1 to Node2',
            },
          },
        ],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Missing the following properties in edges: data.source',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Edges should have an target property', () => {
      const data = {
        nodes: [
          { data: { id: 'one', label: 'Node 1' } },
          { data: { id: 'two', label: 'Node 2' } },
        ],
        edges: [
          {
            data: {
              source: 'one',
              test: 'two',
              label: 'Edge from Node1 to Node2',
            },
          },
        ],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Missing the following properties in edges: data.target',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Edges source must have matching ID node', () => {
      const data = {
        nodes: [
          { data: { id: 'one', label: 'Node 1' } },
          { data: { id: 'two', label: 'Node 2' } },
        ],
        edges: [
          {
            data: {
              source: 'six',
              target: 'two',
              label: 'Edge from Node6 to Node2',
            },
          },
        ],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Source ID not found: six',
      };

      expect(result).toEqual(expectedValue);
    });
    test('Edges target must have matching ID node', () => {
      const data = {
        nodes: [
          { data: { id: 'one', label: 'Node 1' } },
          { data: { id: 'two', label: 'Node 2' } },
        ],
        edges: [
          {
            data: {
              source: 'one',
              target: 'six',
              label: 'Edge from Node1 to Node6',
            },
          },
        ],
      };
      const result = validateGraphInput(data);
      const expectedValue = {
        isValid: false,
        errorMessage: 'Target ID not found: six',
      };

      expect(result).toEqual(expectedValue);
    });
  });
});

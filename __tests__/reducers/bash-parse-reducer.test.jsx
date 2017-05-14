jest.mock('bash-parser');
const bashParser = require('bash-parser');

import {inputAction} from "../../src/actions";
import bashParseReducer from "../../src/reducers/bash-parse.jsx";

describe('BashParseReducer', () => {
  let state = {
    inputHistory: ['a simple\nmultiline script'],
    inputParseable: true,
    parseOutput: {},
    parseOutputInterpretable: false
  };

  let expectedParseOutput = {
    type: "Script",
    commands: [
      {
        type: "SimpleCommand",
        name: {
          text: "a",
          type: "Word"
        },
        suffix: [
          {
            text: "simple",
            type: "Word"
          }
        ]
      },
      {
        type: "SimpleCommand",
        name: {
          text: "multiline",
          type: "Word"
        },
        suffix: [
          {
            text: "script",
            type: "Word"
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    bashParser.mockClear();
    bashParser.mockImplementation(() => expectedParseOutput);
  });

  describe('given an input history, with new input present', () => {
    let newState = {};

    beforeEach(() => {
      newState = bashParseReducer(state, inputAction('does not matter'));
    });
    it('calls the bash parser and returns whatever AST json that provides', () => {
      expect(newState.parseOutput).toEqual(expectedParseOutput);
    });
    it('marks the parse output as interpretable', () => {
      expect(newState.parseOutputInterpretable).toEqual(true);
    });
  });
  describe('given an input history, with but no new input marked', () => {
    const originalState = {
      inputHistory: ['a simple\nmultiline script'],
      inputParseable: false,
      parseOutput: {},
      parseOutputInterpretable: false,
    };
    let newState = {};

    beforeEach(() => {
      newState = bashParseReducer(originalState, inputAction('does not matter'));
    });
    it('does not set any new parse output', () => {
      expect(newState).toEqual(originalState);
    });
    it('does not call the bash parser at all', () => {
      expect(bashParser).not.toBeCalledWith(originalState.inputHistory[0]);
    });
  });
});
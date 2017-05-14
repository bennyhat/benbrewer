jest.mock('bash-parser');
const bashParser = require('bash-parser');

import {inputAction} from "../../src/actions";
import bashParserReducer from "../../src/reducers/bash-parser.jsx";

describe('BashParserReducer', () => {
  let state = {
    inputHistory: ['a simple\nmultiline script'],
    inputParseable: true,
    parserOutput: {},
    parserOutputInterpretable: false
  };

  let expectedParserOutput = {
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
    bashParser.mockImplementation(() => expectedParserOutput);
  });

  describe('given an input history, with new input present', () => {
    let newState = {};

    beforeEach(() => {
      newState = bashParserReducer(state, inputAction('does not matter'));
    });
    it('calls the bash parser and returns whatever AST json that provides', () => {
      expect(newState.parserOutput).toEqual(expectedParserOutput);
    });
    it('marks the parse output as interpretable', () => {
      expect(newState.parserOutputInterpretable).toEqual(true);
    });
  });
  describe('given an input history, with but no new input marked', () => {
    const originalState = {
      inputHistory: ['a simple\nmultiline script'],
      inputParseable: false,
      parserOutput: {},
      parserOutputInterpretable: false,
    };
    let newState = {};

    beforeEach(() => {
      newState = bashParserReducer(originalState, inputAction('does not matter'));
    });
    it('does not set any new parse output', () => {
      expect(newState).toEqual(originalState);
    });
    it('does not call the bash parser at all', () => {
      expect(bashParser).not.toBeCalledWith(originalState.inputHistory[0]);
    });
  });
});
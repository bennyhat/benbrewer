jest.mock('../../src/modules/bash-interpreter.jsx');
const bashInterpreter = require('../../src/modules/bash-interpreter');

import {inputAction} from "../../src/actions";
import bashInterpreterReducer from "../../src/reducers/bash-interpreter";

describe('BashInterpreterReducer', () => {
  let state = {
    inputHistory: ['echo "a simple"\necho "multiline script"'],
    inputParseable: true,
    parserOutput: {
      type: "Script",
      commands: [
        {
          type: "SimpleCommand",
          name: {
            text: "echo",
            type: "Word"
          },
          suffix: [
            {
              text: "a simple",
              type: "Word"
            }
          ]
        },
        {
          type: "SimpleCommand",
          name: {
            text: "echo",
            type: "Word"
          },
          suffix: [
            {
              text: "multiline script",
              type: "Word"
            }
          ]
        }
      ]
    },
    parserOutputInterpretable: true,
    interpreterOutput: ''
  };


  beforeEach(() => {
    bashInterpreter.mockClear();
    bashInterpreter.mockImplementation(() => {
        return {
          interpreterOutput: 'a simple\nmultiline script'
        }
      }
    );
  });

  describe('given a parser output that is ready to be interpreted', () => {
    let newState = {};

    beforeEach(() => {
      newState = bashInterpreterReducer(state, inputAction('does not matter'));
    });
    it('calls the bash interpreter and returns whatever terminal output it returns', () => {
      expect(newState.interpreterOutput).toEqual('a simple\nmultiline script');
    });
  });
  describe('given a parser output that is not interpretable (for any reason)', () => {
    const originalState =  {
      inputHistory: ['echo "a simple"\necho "multiline script"'],
      inputParseable: true,
      parserOutput: {},
      parserOutputInterpretable: false,
      interpreterOutput: '',
      interpreterOutputPrintable: false
    };
    let newState = {};

    beforeEach(() => {
      newState = bashInterpreterReducer(originalState, inputAction('does not matter'));
    });
    it('does not set any new interpreter output', () => {
      expect(newState).toEqual(originalState);
    });
    it('does not call the bash parser at all', () => {
      expect(bashInterpreter).not.toBeCalledWith(originalState);
    });
  });
});
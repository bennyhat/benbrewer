const parse = require('bash-parser');

const bashParseReducer = (state, ignore) => {
  if (!state.inputParseable) {
    return Object.assign({}, state, {
      parseOutputInterpretable: false
    });
  }

  const lastInput = state.inputHistory[state.inputHistory.length - 1];
  return Object.assign({}, state, {
    parseOutput: parse(lastInput),
    parseOutputInterpretable: true
  });
};

export default bashParseReducer;
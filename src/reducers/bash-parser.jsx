const bashParse = require('bash-parser');

const bashParserReducer = (state, ignore) => {
  if (!state.inputParseable) {
    return Object.assign({}, state, {
      parserOutputInterpretable: false
    });
  }

  const lastInput = state.inputHistory[state.inputHistory.length - 1];
  return Object.assign({}, state, {
    parserOutput: bashParse(lastInput),
    parserOutputInterpretable: true
  });
};

export default bashParserReducer;
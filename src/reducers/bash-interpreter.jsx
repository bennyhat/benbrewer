const bashInterpreter = require('../modules/bash-interpreter');

const bashInterpreterReducer = (state, ignore) => {
  if (!state.parserOutputInterpretable) {
    return Object.assign({}, state, {
      interpreterOutputPrintable: false
    });
  }

  return bashInterpreter(state);
};

export default bashInterpreterReducer;
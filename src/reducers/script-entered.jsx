function scriptStillOpen(input) {
  let cleanedInput = input.replace(/\\\\/g, '');
  return unbalancedQuotesPresent(cleanedInput) || trailingBackslashPresent(cleanedInput);
}

function unbalancedQuotesPresent(cleanedInput) {
  return (cleanedInput.match(/(?:[^\\]|^)['"]/g) || []).length % 2 !== 0;
}
function trailingBackslashPresent(cleanedInput) {
  return (cleanedInput.match(/(?:[^\\]|^)\\$/g) || []).length > 0
}

const scriptEnteredReducer = (state, action) => {
  const input = action.value;

  let updatedState = {};
  if (scriptStillOpen(input)) {
    updatedState = Object.assign({}, state, {
      inputParseable: false
    });
  }
  else {
    updatedState = Object.assign({}, state, {
      inputHistory: state.inputHistory.concat(input),
      inputParseable: true
    });
  }
  return updatedState;
};

export default scriptEnteredReducer;
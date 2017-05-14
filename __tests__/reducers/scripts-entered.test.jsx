import {inputAction} from "../../src/actions";
import scriptEnteredReducer from "../../src/reducers/script-entered.jsx";

describe('ScriptEnteredReducer', () => {
  let state = {
    inputHistory: ['something there already'],
    inputParseable: false
  };

  describe('given a simple script', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction('simple script');
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('adds the simple script to the input history array, and indicates new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already',
          'simple script'
        ],
        inputParseable: true
      });
    });
  });
  describe('given a script with an unterminated double quote', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction('simple script"');
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with a unterminated single quote', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script'");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with an escape in the last position', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction('simple script\\');
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with a double quote that is escaped', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction('simple script\\\\\\"');
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('adds the script to the input history array, and indicates new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already',
          'simple script\\\\\\"' // this is really simple script\\\"
        ],
        inputParseable: true
      });
    });
  });
  describe('given a script with a single quote that is escaped', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\\\\\\'");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('adds the script to the input history array, and indicates new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already',
          "simple script\\\\\\'" // this is really simple script\\\'
        ],
        inputParseable: true
      });
    });
  });
  describe('given a trailing escape that is escaped', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\\\\");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('adds the script to the input history array, and indicates new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already',
          "simple script\\\\" // this is really simple script\\
        ],
        inputParseable: true
      });
    });
  });
  describe('given a script with a double quote that is part of a larger escape', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction('simple script\\\\\\\\"');
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with a single quote that is part of a larger escape', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\\\\\\\\'");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with an ending backlash that is part of a larger escape', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\\\\\\");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with a backlash in the last position for multiple lines', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\nnext line\\");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('does not add anything to the input history, and does not indicate new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already'
        ],
        inputParseable: false
      });
    });
  });
  describe('given a script with a backlash at the end of a line, but not at the last position for multiple lines', () => {
    let newState = {};
    beforeEach(() => {
      let simpleScriptInputAction = inputAction("simple script\\\nnext line");
      newState = scriptEnteredReducer(state, simpleScriptInputAction);
    });
    it('adds the script to the input history array, and indicates new input', () => {
      expect(newState).toEqual({
        inputHistory: [
          'something there already',
          'simple script\\\nnext line'
        ],
        inputParseable: true
      });
    });
  });
});
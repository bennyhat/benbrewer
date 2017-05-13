import ReactTestUtils from 'react-dom/test-utils'
import Terminal from '../../../src/components/terminal/component.jsx'

describe('Terminal component', () => {
  let inputSpy = jest.fn();

  beforeEach(() => {
    document.body.appendChild(document.createElement('main'));
    ReactDOM.render(<Terminal inputEvent={inputSpy}/>, $('main'));
  });

  test('fires the input handler on input', () => {
    ReactTestUtils.Simulate.input($('input'), {target : {value : 'some script'}});
    expect(inputSpy.mock.calls.length).toBe(1);
  });
});
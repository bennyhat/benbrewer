import ReactTestUtils from "react-dom/test-utils"
import { Provider } from "react-redux"
import { inputAction } from "../../../src/actions"
import TerminalContainer from "../../../src/components/terminal/container.jsx"

describe('Terminal container', () => {
	let store = createFakeStore({ });

	beforeEach(() => {
		document.body.appendChild(document.createElement("main"))
		ReactDOM.render(
			<Provider store={store}>
				<TerminalContainer />
			</Provider>,
			$('main')
		)
	});

	test("inputting into the input field dispatches the action (no state change yet)", () => {
		ReactTestUtils.Simulate.input($('input'), {target : {value : 'some more script'}});
		expect(dispatchSpy.mock.calls[0][0]).toEqual(inputAction('some more script'));
	});
});
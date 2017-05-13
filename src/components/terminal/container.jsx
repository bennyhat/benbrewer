import Terminal from "./component";
import { connect } from "react-redux";
import { inputAction } from "../../actions";

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => {
	return {
		inputEvent: (event) => {
			dispatch(inputAction(event.target.value));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
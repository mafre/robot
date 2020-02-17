import { html, Component, render } from './standalone.module.js';
import Room from './room.js';
import Robot from './robot.js';
import Controls from './controls.js';

class App extends Component {

	constructor() {

		super();

		this.myRoom = new Room();
		this.myRobot = new Robot(this.myRoom, this.onRobotUpdates);

		const report = this.myRobot.getReport();

		this.state = { report };
	}

	onRobotUpdates = () => {

		const report = this.myRobot.getReport();

		this.setState({ report })
	}

	render({}, { report }) {

		return html`
			<div class="root">
				<${ Controls } robot=${ this.myRobot } room=${ this.myRoom } />
				<div class="container">
					<div class="content">
						<div class="section">
							<h4>
								Robot position and direction
							</h4>
							<span>${ report }</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

(function(){

	render(html`<${ App } />`, document.body);

})();

export default App;

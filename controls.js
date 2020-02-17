import { html, Component, render } from './standalone.module.js';

class Controls extends Component {

	constructor(props) {

		super();

		const {
			robot,
			room
		} = props;

		this.myRobot = robot;
		this.myRoom = room;

		this.state = {
			startX: 0,
			startY: 0,
			direction: 'E',
			roomWidth: 5,
			roomHeight: 5
		};
	}

	setRoomWidth = aValue => {

		let roomWidth = parseInt(aValue);

		if (roomWidth < 1) {

			roomWidth = 1;
		}

		this.setState({ roomWidth });
	}

	setRoomHeight = aValue => {

		let roomHeight = parseInt(aValue);

		if (roomHeight < 1) {

			roomHeight = 1;
		}

		this.setState({ roomHeight });
	}

	setStartX = aValue => {

		let startX = parseInt(aValue);

		if (startX < 0) {

			startX = 0;
		}

		if (startX >= this.state.roomWidth) {

			startX = this.state.roomWidth - 1;
		}

		this.setState({ startX });
	}

	setStartY = aValue => {

		let startY = parseInt(aValue);

		if (startY < 0) {

			startY = 0;
		}

		if (startY >= this.state.roomHeight) {

			startY = this.state.roomHeight - 1;
		}

		this.setState({ startY });
	}

	setDirection = direction => {

		this.setState({ direction });
	}

	setInstructions = instructions => {

		this.setState({ instructions });
	}

	runInstructions() {

		const {
			startX,
			startY,
			direction,
			roomWidth,
			roomHeight,
			instructions = ''
		} = this.state;

		this.myRoom.setSize(roomWidth, roomHeight);

		this.myRobot.setStartValues(startX, startY, direction);
		this.myRobot.run(instructions);
	}

	render({},
		{
			instructions,
			startX,
			startY,
			direction,
			roomWidth,
			roomHeight
		}) {

		const directions = this.myRobot.getDirections();

		return html`
			<div class="container">
				<div class="content">
					<div class="section">
						<h4>
							Room size
						</h4>
						<div class="input_row">
							<label for="room_width">Width </label>
							<input
								id="room_width"
								type='number'
								onChange=${e => { this.setRoomWidth(e.target.value) }}
								value=${ roomWidth } />
						</div>
						<div class="input_row">
							<label for="room_height">Height </label>
							<input
								id="room_height"
								type='number'
								onChange=${e => { this.setRoomHeight(e.target.value) }}
								value=${ roomHeight } />
						</div>
					</div>
					<div class="section">
						<h4>
							Start values
						</h4>
						<div class="input_row">
							<label for="x_start_value">x </label>
							<input
								id="x_start_value"
								type='number'
								onChange=${e => { this.setStartX(e.target.value) }}
								value=${ startX } />
						</div>
						<div class="input_row">
							<label for="y_start_value">y </label>
							<input
								id="y_start_value"
								type='number'
								onChange=${e => { this.setStartY(e.target.value) }}
								value=${ startY } />
						</div>
						<div class="input_row">
							<label for="direction_start_value">Direction </label>
							<select
								onChange=${e => { this.setDirection(e.target.value) }}
								name="directions"
								id="directions-select">
								${ directions.map(aDirection => html`
									<option
										selected=${ direction === aDirection }
										value=${aDirection}>
										${aDirection}
									</option>
								`) }
							</select>
						</div>
					</div>
					<div class="section">
						<h4>
							Instructions
						</h4>
						<div class="input_row">
							<input
								onChange=${e => { this.setInstructions(e.target.value) }}
								value=${ instructions } />
							<button onClick=${() => this.runInstructions()}>Run</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

export default Controls;

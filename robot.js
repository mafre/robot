class Robot {

	constructor(aX, aY, aDirection, aRoom) {

		this.myX = aX;
		this.myY = aY;
		this.myRotation = this.getRotationFromDirection(aDirection);
		this.myRoom = aRoom;
	}

	getRotationFromDirection = direction => {

		let rotation = 0;

		switch (direction) {

			case 'E':

				rotation = 0;
				break;

			case 'S':

				rotation = 1;
				break;

			case 'W':

				rotation = 2;
				break;

			case 'N':

				rotation = 3;
				break;
		}

		return rotation;
	}

	setStartValues = (aX, aY, direction) => {

		this.myX = aX;
		this.myY = aY;
		this.myRotation = this.getRotationFromDirection(direction);
	}

	run = aInstructions => {

		this.next(aInstructions.split(''));

		return this.getReport();
	}

	next = aInstructions => {

		const instruction = aInstructions.shift();

		switch(instruction) {

			case 'L':

				this.turnLeft();
				break;

			case 'R':

				this.turnRight();
				break;

			case 'F':

				this.moveForward();
				break;
		}

		if (aInstructions.length > 0) {

			this.next(aInstructions);

		}
	}

	turnLeft = () => {

		this.myRotation--;

		if (this.myRotation < 0) {

			this.myRotation = 3;
		}
	}

	turnRight = () => {

		this.myRotation++;

		if (this.myRotation > 3) {

			this.myRotation = 0;
		}
	}

	moveForward = () => {

		const angle = (Math.PI / 180) * this.myRotation * 90;
		const dX = Math.round(Math.cos(angle));
		const dY = Math.round(Math.sin(angle));
		const x = this.myX + dX;
		const y = this.myY + dY;
		const point = this.myRoom.constrain({ x, y });

		this.myX = point.x;
		this.myY = point.y;
	}

	getDirections = () => {

		return ['E', 'S', 'W', 'N'];
	}

	isValidDirection = value => {

		return this.getDirections().find(value);
	}

	getStatus = () => {

		const directions = this.getDirections();
		const direction = directions[this.myRotation];

		return {
			x: this.myX,
			y: this.myY,
			direction
		}
	}

	getReport = () => {

		const status = this.getStatus();

		return status.x + ' ' + status.y + ' ' + status.direction;
	}
}

export default Robot;

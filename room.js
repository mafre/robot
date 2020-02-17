class Room {

	constructor() {

		this.myWidth = 0;
		this.myHeight = 0;
	}

	setSize = (aWidth, aHeight) => {

		this.myWidth = aWidth;
		this.myHeight = aHeight;
	}

	clamp = (aValue, aMax) => {

		return Math.min(Math.max(aValue, 0), aMax);
	}

	constrain = aPoint => {

		aPoint.x = this.clamp(aPoint.x, this.myWidth);
		aPoint.y = this.clamp(aPoint.y, this.myHeight);

		return aPoint;
	}
}

export default Room;

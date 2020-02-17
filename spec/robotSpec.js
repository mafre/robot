import Robot from './../robot.js';
import Room from './../room.js';

describe("A robot", function() {

	var robot;
	var room;

	beforeEach(function() {

		room = new Room();
		robot = new Robot(room, () => {});
	});

	it("should be able to set initial values", function() {

		robot.setStartValues(2, 2, "S");

		const status = robot.getStatus();

		expect(status.x).toEqual(2);
		expect(status.y).toEqual(2);
		expect(status.direction).toEqual("S");
		expect(robot.myRotation).toEqual(1);
	})

	it("should be able to get rotation from a direction", function() {

		var rotation = robot.getRotationFromDirection('R');

		expect(rotation).toEqual(0);
	});

	it("should be able to execute a string with instructions", function() {

		room.setSize(5, 5);
		robot.run('FFRFFF');

		const status = robot.getStatus();

		expect(status.x).toEqual(2);
		expect(status.y).toEqual(3);
		expect(status.direction).toEqual("S");
	});

	it("should return a report after all instructions are complete", function() {

		room.setSize(5, 5);

		const report = robot.run('FFRFFF');

		expect(report).toEqual("2 3 S");
	});
});

export default '';

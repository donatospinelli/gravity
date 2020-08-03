// two separate thing matter needs
// first thing: an engine -
// second thing: a renderer

const { Engine, Render, Bodies, World, MouseConstraint, Composites } = Matter;

//where matter being deployed
const sectionTag = document.querySelector('section.shapes');

//what is the widht ad the height of the page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Matter.Engine.create();
const renderer = Matter.Render.create({
	element: sectionTag,
	engine: engine,

	options: {
		height: h,
		width: w,
		background: '#000000',
		wireframes: false,
		pixelRatio: window.devicePixelRatio
	}
});

// here we go with the shape

const createShape = function(x, y) {
	return Bodies.circle(x, y, 25 + 25 * Math.random(), {
		render: {
			sprite: {
				texture: 'bg.png',
				xScale: 0.45,
				yScale: 0.45
			}
		}
	});
};

const bigBall = Bodies.circle(w / 2, h / 2, 200, {
	isStatic: true,
	render: {
		fillStyle: '#ffffff'
	}
});

const wallOptions = {
	isStatic: true,
	render: {
		visible: false
	}
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, 50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

const mouseControl = MouseConstraint.create(engine, {
	element: sectionTag,
	constraint: {
		render: {
			visible: false
		}
	}
});

const initialShape = Composites.stack(50, 50, 15, 5, 40, 40, function(x, y) {
	return createShape(x, y);
});

World.add(engine.world, [ bigBall, ground, ceiling, leftWall, rightWall, mouseControl, initialShape ]);

// when we click the page, add a new shape

document.addEventListener('click', function(event) {
	const shape = createShape(event.pageX, event.pageY);
	World.add(engine.world, shape);
});

// run both the engine, and the renderer

Engine.run(engine);
Render.run(renderer);

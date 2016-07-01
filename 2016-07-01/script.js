// beatdetektor stuff

let bd = new BeatDetektor(60, 140, {
	BD_DETECTION_RANGES: 128,  // How many ranges to quantize the FFT into
	BD_DETECTION_RATE: 12.0,   // Rate in 1.0 / BD_DETECTION_RATE seconds
	BD_DETECTION_FACTOR: 0.915, // Trigger ratio
	BD_QUALITY_DECAY: 0.6,     // range and contest decay
	BD_QUALITY_TOLERANCE: 0.96,// Use the top x % of contest results
	BD_QUALITY_REWARD: 10.0,    // Award weight
	BD_QUALITY_STEP: 0.1,     // Award step (roaming speed)
	BD_MINIMUM_CONTRIBUTIONS: 6,   // At least x ranges must agree to process a result
	BD_FINISH_LINE: 60.0,          // Contest values wil be normalized to this finish line
	// this is the 'funnel' that pulls ranges in / out of alignment based on trigger detection
	BD_REWARD_TOLERANCES: [0.001, 0.005, 0.01, 0.02, 0.04, 0.08, 0.10, 0.15, 0.30],  // .1%, .5%, 1%, 2%, 4%, 8%, 10%, 15%
	BD_REWARD_MULTIPLIERS: [20.0, 10.0, 8.0, 1.0, 1.0 / 2.0, 1.0 / 4.0, 1.0 / 8.0, 1 / 16.0, 1 / 32.0]
}, onBeat);

// vu = new BeatDetektor.modules.vis.VU();
// kick_det = new BeatDetektor.modules.vis.BassKick();

let mic, fft;
let startSeconds = (new Date).getTime() / 1000;

let pause = false;


/**** matter.js stuff ****/

// module aliases
/*var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var stage = document.getElementById('stage');
var render = Render.create({
    element: stage,
    engine: engine,
	options: {
		width: stage.offsetWidth,
		height: stage.offsetHeight
	}
});

var rest = .8;

// create two boxes and a ground
var ball = Bodies.circle(stage.offsetWidth / 2, 50, 30, { restitution: rest });
var ground = Bodies.rectangle(400, stage.offsetHeight - 10, stage.offsetWidth, 3, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ball, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);*/

let counter = 0;
function onBeat(){
	console.log('BEAT ' + counter++);
}


function setup(){
	createCanvas(710, 400);
	noFill();
	
	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT(0);
	fft.setInput(mic);
}

function draw(){
	background(200);
	
	let spectrum = fft.analyze();
	
	//draw frequency spectrum
	beginShape();
	for(i = 0; i < spectrum.length; i++){
		vertex(i, map(spectrum[i], 0, 255, 255, 0));
	}
	endShape();
	
	if(!pause){
		//calc beats per minute
		bd.process(((new Date).getTime() / 1000) - startSeconds, spectrum);
	}
}
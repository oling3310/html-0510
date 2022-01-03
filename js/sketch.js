let movers = [];
let colors = ['#ee2642', '#eda037', '#388da4', '#000000'];
let circles = [];

function setup() {
	//createCanvas(800, 800);
  var canvas = createCanvas(500, 500);
  canvas.parent('abc');
	let seg = 5;
	let w = width / seg;
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
			let x = i * w + w / 2;
			let y = j * w + w / 2;
			let d = random(0.5, 1)*w;
			let num = int(random(1, 4));
			let col = random(colors);
			for(let k=0; k<num; k++){
				circles.push({x:x, y:y, d:d*0.7, c:col});
				movers.push(new Mover(x, y, d*0.5));
			}
			}
	}
}

function draw() {
	translate(width / 2, height / 2);
	scale(0.8);
	translate(-width / 2, -height / 2);

	background(255);

	for(let c of circles){
		fill(c.c);
		circle(c.x, c.y, c.d);
	}

	for(let mv of movers){
		mv.show();
		mv.move();
	}
	noStroke();
	
}

class Mover{
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.cs = this.r * 0.4;
		this.cs0 = this.r * 0.4;
		this.t = random(100);
		this.off = 0;
		this.tStep = random(0.01, 0.05);
		this.ang = random(TAU);
		this.aStep = random(-1, 1)*0.01;
		this.col1 = random(colors);
		this.col2 = random(colors);
		while(this.col1 == this.col2){
			this.col1 = random(colors);
		}
	}

	show(){
		push();
		translate(this.x, this.y);
		rotate(this.ang);
		stroke(255);
		fill(this.col1);
		if(this.cs0*0.15 < this.cs){
			fill(this.col2);
			circle(this.off, 0, this.cs);
		}
		pop();
	}

	move(){
		this.off = map(sin(this.t), -1, 1, -1, 1)*this.r;
		this.cs = map(cos(this.t), -1, 1, this.cs0, 0);
		this.t += this.tStep;
		this.ang += this.aStep;
	}
}
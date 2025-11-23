

const svg = document.getElementById("svg");

var scene = new MainScene();
var renderer = new SvgRenderer(svg);
scene.init();
var loop = new Loop(scene,renderer);

loop.start()
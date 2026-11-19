/*
==================================================
1. INITIALIZATION
==================================================
*/
var PROJECT_FOLDER = new File($.fileName).parent.parent.parent;

// Load common functions
$.evalFile(new File(PROJECT_FOLDER + "/common/config.jsx"));
$.evalFile(new File(PROJECT_FOLDER + "/common/photoshop.jsx"));
$.evalFile(new File(PROJECT_FOLDER + "/common/utils.jsx"));

var PATHS = ConfigTools.getPaths(new File($.fileName));
var template = app.activeDocument;

/*
==================================================
2. GAME FUNCTIONS
==================================================
*/
function makeTauler(gemmes) {
	var taulerLayer = template.layerSets["Gemmes"];
	
	for (var gemma = 0; gemma < gemmes.length; gemma++) {
		var llosetaLayer = taulerLayer.layers["G" + (gemma+1)];
		
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + gemmes[gemma] + ".png", llosetaLayer);
		
		// Rotació aleatòria
		var rotation = Math.floor(Math.random() * 360) - 180; // de -180 a 180
		PhotoshopTools.rotateLayer(rotation, llosetaLayer);
		
		// Rotar també l'efecte de la solució
		var solutionLayer = template.layerSets["Solució"].layers["G" + (gemma+1)];
		PhotoshopTools.rotateLayer(rotation, solutionLayer);
		solutionLayer.visible = false;
		
		solutionLayer = template.layerSets["Solució"].layerSets["Inactives"].layers["G" + (gemma+1)];
		PhotoshopTools.rotateLayer(rotation, solutionLayer);
	}
}

/*
==================================================
3. MAIN
==================================================
*/
function main() {
    var TOTAL_NUM_TILES = 90;
    var NUM_TILES = 17;

    var gemmes = UtilsTools.generateUniqueRandomNumbers(TOTAL_NUM_TILES, NUM_TILES);
    makeTauler(gemmes);
}

main();
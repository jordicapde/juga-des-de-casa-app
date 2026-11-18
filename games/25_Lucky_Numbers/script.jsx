/*
==================================================
1. INITIALIZATION
==================================================
*/
var PROJECT_FOLDER = new File($.fileName).parent.parent.parent;

// Load common functions
$.evalFile(new File(PROJECT_FOLDER + "/common/config.jsx"));
$.evalFile(new File(PROJECT_FOLDER + "/common/photoshop.jsx"));

var PATHS = ConfigTools.getPaths(new File($.fileName));
var template = app.activeDocument;

/*
==================================================
2. GAME FUNCTIONS
==================================================
*/
function makeTauler(grid) {
	var taulerLayer = template.layerSets["Tauler"];
	
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			if (grid[row][col] !== " ") {
				var llosetaLayer = taulerLayer.layerSets[(row+1) + "_" + (col+1)];
				var llosetaContent = Math.random() < 0.5 ? "fulla_groga" : "fulla_vermella";
				
				PhotoshopTools.replaceSmartObjectContent(
					PATHS.assets + "/" + llosetaContent + ".png",
					llosetaLayer.layers["Fulla"]
				);
				
				llosetaLayer.layers["Número"].textItem.contents = grid[row][col];
				llosetaLayer.visible = true;
			}
		}
	}
}

function makeFulles(fulles) {
	var fullesLayer = template.layerSets["Fulles"];
	
	for (var f = 0; f < fulles.length; f++) {
		// FULLA
		PhotoshopTools.replaceSmartObjectContent(
			PATHS.assets + "/fulla_blava.png",
			fullesLayer.layerSets["F" + (f+1)].layers["Fulla"]
		);
		
		fullesLayer.layerSets["F" + (f+1)].layers["Número"].textItem.contents = fulles[f][0];
		
		// SOLUCIÓ
		if (fulles[f][1] !== "") {
			var solucioTaulerLayer = template.layerSets["Solució"].layerSets["Tauler"].layerSets[fulles[f][1]];
			var solucioFullaLayer = template.layerSets["Solució"].layerSets["Fulles"];
			
			PhotoshopTools.replaceSmartObjectContent(
				PATHS.assets + "/fulla_blava.png",
				solucioTaulerLayer.layers["Fulla"]
			);
				
			solucioTaulerLayer.layers["Número"].textItem.contents = fulles[f][0];
			solucioTaulerLayer.visible = true;
			
			solucioFullaLayer.layers["F" + (f+1)].visible = true;
		}
	}
}

/*
==================================================
3. MAIN
==================================================
// Configuration file example

// Deixar amb " " els espais buits
// - 2 forats: fàcil
// - 3 forats: complicat

{
	"grid": [
		["1", "2", " ", "12"],
		[" ", "5", "9", "15"],
		["7", " ", "14", "17"],
		["9", "12", "16", "18"]
	],

	// Número i posició del grid en cas que sigui part de la solució ("" si no)
	"fulles": [
		["8", "1_3"],
		["12", ""],
		["9", "3_2"],
		["4", "2_1"]
	]
}
*/
function main() {

    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var grid = config.grid;
    var fulles = config.fulles;

    makeTauler(grid);
    makeFulles(fulles);
}

main();
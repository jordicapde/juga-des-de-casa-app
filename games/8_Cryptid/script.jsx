/*
==================================================
1. INITIALIZATION
==================================================
*/
var PROJECT_FOLDER = new File($.fileName).parent.parent.parent;

// Load common functions
$.evalFile(new File(PROJECT_FOLDER + "/common/config.jsx"));

var PATHS = ConfigTools.getPaths(new File($.fileName));
var template = app.activeDocument;

/*
==================================================
2. GAME FUNCTIONS
==================================================
*/
var COLS = 7;
var ROWS = 5;
var GRID_TYPES = ["Aigua", "Bosc", "Desert", "Pantà", "Muntanya"];


function randomLandType(grid) {
	var gridLayer = template.layerSets["Caselles"].layerSets[grid];

	// Hide all layers
	// És molt lent
	/*for (var i = 0; i < gridLayer.layers.length; i++) {
		gridLayer.layers[i].visible = false;
	}*/

	// Show random land type layer
	var type = GRID_TYPES[Math.floor(Math.random() * GRID_TYPES.length)];
	gridLayer.layers[type].visible = true;
}

/*
==================================================
3. MAIN
==================================================

No hi ha configuració, simplement s'executa i genera un tauler aleatori.
*/
function main() {
    for (var col = 1; col <= COLS; col++) {
        for (var row = 1; row <= ROWS; row++) {
            randomLandType(col + "_" + row);
        }
    }
}

main();
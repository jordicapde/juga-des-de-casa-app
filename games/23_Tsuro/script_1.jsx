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
function makeTauler(grid, ma) {
	// TAULELL
	var taulerLayer = template.layerSets["Tauler"];
	
	for (var row = 1; row <= TILES_PER_ROW; row++) {
		for (var col = 1; col <= TILES_PER_ROW; col++) {
			var llosetaLayer = taulerLayer.layers[row + "_" + col];
			var llosetaContent = grid[(row - 1) * TILES_PER_ROW + (col - 1)];
			
			PhotoshopTools.replaceSmartObjectContent(PATHS.assets + llosetaContent + ".png", llosetaLayer);
			
			// Rotació aleatòria
			var rotation = Math.floor(Math.random() * 4); // de 0 a 3
			PhotoshopTools.rotateLayer(rotation, llosetaLayer);
			
			// Assignem el número de lloseta com a nom de capa
			llosetaLayer.name = llosetaLayer.name + "_" + llosetaContent;
		}
	}
	
	// MÀ LLOSETES
	var maLayer = template.layerSets["Mà llosetes"];
	
	for (var i = 1; i <= 3; i++) {
		var llosetaLayer = maLayer.layers["L" + i];
		var llosetaContent = ma[i - 1];
		
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + llosetaContent + ".png", llosetaLayer);
		
		// No rotem les llosetes de la mà per simplificar
		
		// Assignem el número de lloseta com a nom de capa
		llosetaLayer.name = llosetaLayer.name + "_" + llosetaContent;
	}
}

/*
==================================================
3. MAIN
==================================================
*/
function main() {

	var config = ConfigTools.loadConfig(PATHS.config);
	if (config == null) {
		return;
	}

	var TOTAL_NUM_TILES = 35;
	var TILES_PER_ROW = 4;

	// Generem conjuntament la llista de llosetes del grid i de la mà, per assegurar que són úniques
	var randomTiles = UtilsTools.generateUniqueRandomNumbers(
		TILES_PER_ROW * TILES_PER_ROW + 3,
		TOTAL_NUM_TILES
	);

	var grid = randomTiles.slice(0, TILES_PER_ROW * TILES_PER_ROW);
	// Les 3 últimes són les llosetes de la mà
	var ma = randomTiles.slice(TILES_PER_ROW * TILES_PER_ROW);

	makeTauler(grid, ma);
}

main();
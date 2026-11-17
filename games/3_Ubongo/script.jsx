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
	var taulerLayer = template.layerSets["Tauler"].layerSets["Caselles"];
	
	for (var row = 0; row < grid.length; row++) {
		for (var col = 0; col < grid[row].length; col++) {
			if (grid[row][col] !== " ")
				taulerLayer.layerSets[(row + 1) + "_" + (col + 1)].visible = true;
		}
	}
	
	taulerLayer.merge();
}

function makePeces(peces) {
	var pecesLayer = template.layerSets["Peces"];
	var solucioLayer = template.layerSets["Solució"];
	
	for (var p = 0; p < peces.length; p++) {
		var asset = ASSETS_NAMES[peces[p]];
		
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", pecesLayer.layers["P" + (p + 1)]);
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", solucioLayer.layerSets["P" + (p + 1)].layers["Peça"]);
	}
}

/*
==================================================
3. MAIN
==================================================
*/
var ASSETS_NAMES = {
    "L_GRE": "1",  // L Tetris
    "YEL": "2",    // T Tetris
    "BLU": "3",    // Cadira Tetris
    "L_ORA": "4",  // Z
    "PUR": "5",    // Línia 2
    "RED": "6",    // Quadrat
    "GRE": "7",    // Quadrat amb punta
    "CYA": "8",    // L curta
    "L_BLU": "9",  // Línia 3
    "BRO": "10",   // Línia 4
    "PIN": "11",   // L llarga
    "ORA": "12"    // Línia 4 amb punta
};

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var peces = config.peces;
    var grid = config.grid;

    makeTauler(grid);
    makePeces(peces);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// Primer:
// 	- mirar el PDF amb taulers i escollir-ne un
// 	- definir a sota el grid i les peces a utilitzar
// 	- executar aquest script
// Passos manuals després d'executar l'script:
// 	- copiar i enganxar l'estil a la capa "Caselles"
// 	- centrar la capa "Caselles"
// 	- combinar la capa "Caselles" amb el grup de "Peces" i executar la macro d'Ubongo

var peces = ["BRO", "GRE", "YEL"];

// Marcar amb una X les caselles que formin part del tauler
var grid = [
    ["X", "X", "X", " ", " "],
    ["X", "X", "X", "X", " "],
    ["X", "X", "X", "X", " "],
    ["X", " ", " ", "X", " "],
    [" ", " ", " ", " ", " "],
    // grid reset
    /*
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    * /
];

makeTauler(grid);
makePeces(peces);
*/
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
function makeTauler(cellContent, index) {
	var taulerLayer = template.layerSets["Tauler"];
	var cellLayer;
	var asset;
	
	if (cellContent[0] !== "-" && cellContent[1] !== "-") {
		// DAU
		cellLayer = taulerLayer.layerSets["Daus"].layers[index];
		asset = COLOR_NAMES[cellContent[0]] + cellContent[1];
	
		cellLayer.visible = true;
		
	} else if (cellContent[0] !== "-") {
		// BUIDA AMB COLOR
		cellLayer = taulerLayer.layerSets["Caselles buides"].layers[index];
		asset = COLOR_NAMES[cellContent[0]];
		
	} else {
		// BUIDA AMB NÚMERO
		cellLayer = taulerLayer.layerSets["Caselles buides"].layers[index];
		asset = cellContent[1];
	}
	
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", cellLayer);
}

function makeDaus(daus) {
	var dausLayer;

	if (daus.length === 2)
		dausLayer = template.layerSets["Daus"].layerSets["2 daus"];
	else
		dausLayer = template.layerSets["Daus"].layerSets["3 daus"];

	dausLayer.visible = true;

	for (var d = 0; d < daus.length; d++) {
		var asset = COLOR_NAMES[daus[d][0]] + daus[d][1];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", dausLayer.layers["D" + (d + 1)]);
	}
}

function makeReglaEspecial(regla_especial) {
	var reglaLayer = template.layerSets["Daus"].layerSets["Regla especial"];
	reglaLayer.visible = true;
	reglaLayer.layers["Contingut"].textItem.contents = regla_especial;
}

function makeSolucio(daus, solucio) {	
	for (var d = 0; d < daus.length; d++) {
		var asset = COLOR_NAMES[daus[d][0]] + daus[d][1];
		
		var solucioLayer = template.layerSets["Solució"].layerSets[solucio[d]];
		var dauLayer = solucioLayer.layers["Dau"];
		
		solucioLayer.visible = true;
		solucioLayer.layers["Text"].textItem.contents = (d + 1);
		
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", dauLayer);
	}
}

/*
==================================================
3. MAIN
==================================================
/*
// Configuration file example

{
	// Si la casella:
	//   - ja té un dau: {color}{número}
	//   - és buida: --
	//   - és buida però amb color: {color}-
	//   - és buida però amb número: -{número}
	"grid": [
		["Y5", "R3", "--", "G2", "B4"],
		["-6", "Y-", "-3", "R-", "-1"],
		["--", "P6", "G1", "-5", "B-"],
		["G1", "-4", "B5", "R2", "P6"]
	],

	// Poden ser només 2 (per fer-ho més fàcil) o 3 (solucio ha de tenir els mateixos elements)
	"daus": [
		"B6",
		"P4"
	],

	// L'element "n" de la solució correspon a la posició on ha d'anar el dau "n"
	"solucio": [
		"2_1",
		"1_3"
	],

	// - Buit si no es vol
	// - Possibles valors:
	//	No hi pot haver números repetits en la mateixa columna
	//	No hi pot haver colors repetits en la mateixa columna
	//	No hi pot haver números repetits en la mateixa fila
	//	No hi pot haver colors repetits en la mateixa fila
	"regla_especial": "No hi pot haver colors repetits en la mateixa fila"
}
*/
var COLOR_NAMES = {
    "R": "red",
    "Y": "yellow",
    "G": "green",
    "B": "blue",
    "P": "purple"
};

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var grid = config.grid;
    var daus = config.daus;
    var solucio = config.solucio;
    var regla_especial = config.regla_especial;

    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (grid[row][col] !== "--")
                makeTauler(grid[row][col], (row + 1) + "_" + (col + 1));
        }
    }

    makeDaus(daus);
    if (regla_especial !== "")
        makeReglaEspecial(regla_especial);
    makeSolucio(daus, solucio);
}

main();
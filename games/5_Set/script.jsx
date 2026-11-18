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
function makeTitle(set) {
	var titleLayer = template.layerSets["Títol"];
	
	// NÚMERO DE FIGURES
	if (set[0] === "X") {
		titleLayer.layers["Número"].textItem.contents = "número de figures diferent";
	} else {
		titleLayer.layers["Número"].textItem.contents = "mateix número de figures";
	}
	
	// FORMA
	if (set[1] === "X") {
		titleLayer.layers["Forma"].textItem.contents = "formes diferents";
	} else {
		titleLayer.layers["Forma"].textItem.contents = "mateixa forma";
	}
	
	// PATRÓ
	if (set[2] === "X") {
		titleLayer.layers["Patró"].textItem.contents = "patrons diferents";
	} else {
		titleLayer.layers["Patró"].textItem.contents = "mateix patró";
	}
}

function makeCell(index, content) {
	var cellLayer = template.layerSets["Cartes"].layerSets["C" + index].layers["Contingut"];
	
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + content + ".png", cellLayer);
}

function makeSolution(solution) {
	var solutionLayerSet = template.layerSets["Solució"];
	
	for (var s = 0; s < solution.length; s++) {
		solutionLayerSet.layers["C" + solution[s]].visible = true;
	}
}

/*
==================================================
3. MAIN
==================================================
// Configuration file example

// Conté 3 caràcters on cadascun representa:
// 	- 1r: número de figures
// 	- 2n: forma (diamant, oval, onada)
// 	- 3r: patró (sòlid, buit, ratllat)
//
// Si el caràcter = X, significa que la característica serà diferent
// Si el caràcter és un número, significa que la característica serà igual a aquell número
//
// Fixar 2 característiques per fer-ho més fàcil, o només 1 per complicar-ho més
{
	"set": "22X",

	// De forma manual, assignar les 3 cartes del SET i les 6 restants
	// S'ha de controlar de no fer cap altre SET en les 6 cartes restants
	// Un cop fet, barrejar de forma aleatòria les línies
	"grid": [
		"223", // SET
		"123",
		"222", // SET
		"233",
		"331",
		"211",
		"333",
		"221", // SET
		"231"
	],

	// Indexos de les cartes corresponents al SET (començant per 1)
	"solucio": [1, 3, 8]
}
*/
function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var set = config.set;
    var grid = config.grid;
    var solucio = config.solucio;

    makeTitle(set);

    for (var cell = 0; cell < grid.length; cell++) {
        makeCell(cell + 1, grid[cell]);
    }

    makeSolution(solucio);
}

main();
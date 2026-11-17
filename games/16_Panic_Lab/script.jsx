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
function makeInit(content) {
	var initLayerSet = template.layerSets["Daus"];
	
	if (content[0] == "E")
		initLayerSet.layerSets["Inici"].layers["Vermell negre"].visible = true;
	else
		initLayerSet.layerSets["Inici"].layers["Vermell blanc"].visible = true;
	
	if (content[1] == "C")
		initLayerSet.layers["Calamar"].visible = true;
	else
		initLayerSet.layers["Cargol"].visible = true;

	if (content[2] == "T")
		initLayerSet.layers["Taronja"].visible = true;
	else
		initLayerSet.layers["Lila"].visible = true;
	
	if (content[3] == "R")
		initLayerSet.layers["Ratlles"].visible = true;
	else
		initLayerSet.layers["Punts"].visible = true;
}

function makeCell(index, content) {
	var cellLayerSet = template.layerSets["Llosetes"].layerSets[index];

	// Hide all layers
	// (tarda moltíssim)
	/*
	for (var i = 0; i < cellLayerSet.layerSets["Bitxos"].layers.length; i++) {
		cellLayerSet.layerSets["Bitxos"].layers[i].visible = false;
	}
	for (var i = 0; i < cellLayerSet.layerSets["Laboratoris"].layers.length; i++) {
		cellLayerSet.layerSets["Laboratoris"].layers[i].visible = false;
	}
	for (var i = 0; i < cellLayerSet.layerSets["Extres"].layers.length; i++) {
		cellLayerSet.layerSets["Extres"].layers[i].visible = false;
	}
	*/

	var type = LAYER_NAMES[content];
	if (content == "G" || content == "B" || content == "V")
		cellLayerSet.layerSets["Laboratoris"].layers[type].visible = true;
	else if (content == "R" || content == "MC" || content == "MF" || content == "MP")
		cellLayerSet.layerSets["Extres"].layers[type].visible = true;
	else
		cellLayerSet.layerSets["Bitxos"].layers[type].visible = true;
}

function makeSolution(initContent, grid) {
	var solutionLayerSet = template.layerSets["Solució"];
	var direction = initContent[0];
	var solution = initContent.slice(1);
	var dinsReixeta = false;
	
	solutionLayerSet.layers["Out"].visible = true;
	solutionLayerSet.layers["In"].visible = true;
	
	makeSolutionCell(direction, 0, false, true, false, false);
	
	for (var i = 1; i < grid.length; i++) {
		var index, content;

		if (direction == "D") {
			index = i;
		} else {
			index = grid.length - i;
		}
		content = grid[index];
		
		// Hem arribat a la solució
		if (content == solution && !dinsReixeta) {
			makeSolutionCell(direction, index, true, false, false, false);
			solutionLayerSet.layerSets[index].layers["Solució"].visible = true;
			break;
		}
		
		// Reixeta
		if (content == "R") {
			if (dinsReixeta)
				makeSolutionCell(direction, index, false, true, true, false);
			else
				makeSolutionCell(direction, index, true, false, false, true);
			
			dinsReixeta = !dinsReixeta;
		}
		
		// Mutació
		if ((content == "MF" || content == "MC" || content == "MP") && !dinsReixeta) {
			makeSolutionCell(direction, index, true, true, false, false);
			
			if (content == "MF") {
				if (solution[0] == "C")
					solution = "G" + solution[1] + solution[2];
				else
					solution = "C" + solution[1] + solution[2];
			} else if (content == "MC") {
				if (solution[1] == "T")
					solution = solution[0] + "L" + solution[2];
				else
					solution = solution[0] + "T" + solution[2];
			} else {
				if (solution[2] == "R")
					solution = solution[0] + solution[1] + "P";
				else
					solution = solution[0] + solution[1] + "R";
			}
		}
	}
}

function makeSolutionCell(direction, index, outerIn, outerOut, innerIn, innerOut) {
	var solutionCellLayerSet = template.layerSets["Solució"].layerSets[index];
	
	if (innerIn) {
		if (direction == "E") {
			solutionCellLayerSet.layerSets["In_Dre"].visible = true;
			solutionCellLayerSet.layerSets["In_Dre"].layers["Fletxa"].visible = true;
		} else {
			solutionCellLayerSet.layerSets["In_Esq"].visible = true;
			solutionCellLayerSet.layerSets["In_Esq"].layers["Fletxa"].visible = true;
		}
	}
	if (innerOut) {
		if (direction == "E") {
			solutionCellLayerSet.layerSets["In_Esq"].visible = true;
			solutionCellLayerSet.layerSets["In_Esq"].layers["Fletxa"].visible = false;
		} else {
			solutionCellLayerSet.layerSets["In_Dre"].visible = true;
			solutionCellLayerSet.layerSets["In_Dre"].layers["Fletxa"].visible = false;
		}
	}
	
	if (outerIn) {
		if (direction == "E") {
			solutionCellLayerSet.layerSets["Out_Dre"].visible = true;
			solutionCellLayerSet.layerSets["Out_Dre"].layers["Fletxa"].visible = true;
		} else {
			solutionCellLayerSet.layerSets["Out_Esq"].visible = true;
			solutionCellLayerSet.layerSets["Out_Esq"].layers["Fletxa"].visible = true;
		}
	}
	if (outerOut) {
		if (direction == "E") {
			solutionCellLayerSet.layerSets["Out_Esq"].visible = true;
			solutionCellLayerSet.layerSets["Out_Esq"].layers["Fletxa"].visible = false;
		} else {
			solutionCellLayerSet.layerSets["Out_Dre"].visible = true;
			solutionCellLayerSet.layerSets["Out_Dre"].layers["Fletxa"].visible = false;
		}
	}
}

/*
==================================================
3. MAIN
==================================================
*/
var LAYER_NAMES = {
    "CLR": "Calamar lila ratlles",
    "CLP": "Calamar lila punts",
    "CTR": "Calamar taronja ratlles",
    "CTP": "Calamar taronja punts",
    "GLR": "Cargol lila ratlles",
    "GLP": "Cargol lila punts",
    "GTR": "Cargol taronja ratlles",
    "GTP": "Cargol taronja punts",
    "G": "Groc",
    "B": "Blau",
    "V": "Vermell",
    "R": "Reixeta",
    "MC": "Mutant color",
    "MF": "Mutant forma",
    "MP": "Mutant patró"
};

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var init = config.init;
    var grid = config.grid;

    makeInit(init);

    for (var cell = 0; cell < grid.length; cell++) {
        makeCell(cell + 1, grid[cell]);
    }

    makeSolution(init, grid);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// Direcció d'inici + ameba per trobar
// E (esquerra) o D (dreta) + tres caràcters per definir l'ameba
var init = "EGTP";

// Cercle de llosetes (E és de baix a dalt, D és de dalt a baix)
var grid = [
    "V",
    "CTP",
    "CLP",
    "GTP",
    "CTR",
    "GTR",
    "GLP",
    "MF",
    "GTP",
    "GLR",
    "MP",
    "R",
    "GTR",
    "CTR",
    "GTP",
    "R",
];

makeInit(init);

for (var cell = 0; cell < grid.length; cell++) {
    makeCell(cell + 1, grid[cell]);
}

makeSolution(init, grid);
*/
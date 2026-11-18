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
function makeInit(letters, solutionLength) {
	var lettersLayerSet;
	var lettersLength = letters.length;
	
	// Títol
	if (solutionLength > 1)
		template.layerSets["Cartes"].layerSets["Títol"].layers["Número"].textItem.contents = solutionLength + " paraules";
	else {
		template.layerSets["Cartes"].layerSets["Títol"].layers["Número"].textItem.contents = solutionLength + " paraula";
		template.layerSets["Cartes"].layerSets["Títol"].layers["Títol 1"].textItem.contents = "es pot formar:";
		template.layerSets["Cartes"].layerSets["Títol"].layers["Títol 2"].textItem.contents = "La saps trobar?";
	}
	
	// Grup de cartes
	if (lettersLength === 4) {
		lettersLayerSet = template.layerSets["Cartes"].layerSets["4 cartes"];
	} else if (lettersLength === 5) {
		lettersLayerSet = template.layerSets["Cartes"].layerSets["5 cartes"];
	} else {
		lettersLayerSet = template.layerSets["Cartes"].layerSets["6 cartes"];
	}
	lettersLayerSet.visible = true;
	
	// Contingut de les lletres
	for (var l = 0; l < lettersLength; l++) {
		var letter = letters[l];
		
		lettersLayerSet.layerSets["C" + (l + 1)].layers["Text"].textItem.contents = letter;
	}
}

function makeSolution(solutions) {
	
	if (solutions[0].length < 6) {
		var solutionLayerSet = template.layerSets["Solució"];
		
		for (var i = 0; i < solutions.length; i++) {
			var solution = solutions[i];
			
			solutionLayerSet.layerSets["F" + (i + 1)].visible = true;
			
			for (var j = 0; j < solution.length; j++) {
				solutionLayerSet.layerSets["F" + (i + 1)].layerSets["C" + (j + 1)].visible = true;
				solutionLayerSet.layerSets["F" + (i + 1)].layerSets["C" + (j + 1)].layers["Text"].textItem.contents = solution[j];
			}
		}
		
	} else {
		var solutionLayerSet = template.layerSets["Solució"].layerSets["6 cartes"];
		var solution = solutions[0];
		
		solutionLayerSet.visible = true;
		
		for (var j = 0; j < solution.length; j++) {
			solutionLayerSet.layerSets["C" + (j + 1)].layers["Text"].textItem.contents = solution[j];
		}
	}
}

/*
==================================================
3. MAIN
==================================================
// Configuration file example

{
	// Lletres inicials
	// Pot tenir entre 4 i 6 lletres
	"init": "ROMTE",

	// Solucions
	// Un màxim de 3 (només 1 si són 6 lletres)
	"solutions": [
		"METRO",
		"REMOT",
		"TEMOR"
	]
}
*/
function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var init = config.init;
    var solutions = config.solutions;

    makeInit(init, solutions.length);
    makeSolution(solutions);
}

main();
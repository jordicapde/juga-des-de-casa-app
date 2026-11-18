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
function makeGrid(grid, gridLayer) {
	for (var r = 0; r < grid.length; r++) {
		// Aplanem les dues llistes de la fila en una sola
		var row = grid[r][0].concat(grid[r][1]);
		
		for (var c = 0; c < row.length; c++) {
			if (row[c] === "B")
				PhotoshopTools.replaceSmartObjectContent(PATHS.assets + "/bola_blanca.png", gridLayer.layers[(r+1) + "_" + (c+1)]);
			else if (row[c] === "N")
				PhotoshopTools.replaceSmartObjectContent(PATHS.assets + "/bola_negra.png", gridLayer.layers[(r+1) + "_" + (c+1)]);
		}
	}
}

function makeSolution(grid, solution_1, solution_2) {
	// TAULER 1
	// Convertim l'índex fila_columna a l'estructura de llistes del tauler
	var row = solution_1[0] - 1;
	var quadrant = Math.floor((solution_1[2] - 1) / 3);
	var col = (solution_1[2] - 1) % 3;
	grid[row][quadrant][col] = "B";
	
	makeGrid(grid, template.layerSets["Solució"].layerSets["Tauler 1"].layerSets["Tauler"]);
	
	// Hint solució tauler 1
	template.layerSets["Solució"].layerSets["Tauler 1"].layerSets["Solució"].layers[solution_1].visible = true;
	
	// TAULER 2
	makeGrid(grid, template.layerSets["Solució"].layerSets["Tauler 2"].layerSets["Tauler"]);
	
	// Hint solució tauler 2
	template.layerSets["Solució"].layerSets["Tauler 2"].layerSets["Solució"].layers["Quadrant " + solution_2[0]].visible = true;
	if (solution_2[1] === "C")
		template.layerSets["Solució"].layerSets["Tauler 2"].layerSets["Solució"].layers["Quadrant " + solution_2[0]].resize(-100, undefined, AnchorPosition.MIDDLECENTER);
	
	// TAULER 3
	var quadrant;
	if (solution_2[0] === 1) {
		quadrant = [
			grid[0][0],
			grid[1][0],
			grid[2][0]
		];
	} else if (solution_2[0] === 2) {
		quadrant = [
			grid[0][1],
			grid[1][1],
			grid[2][1]
		];
	} else if (solution_2[0] === 3) {
		quadrant = [
			grid[3][0],
			grid[4][0],
			grid[5][0]
		];
	} else {
		quadrant = [
			grid[3][1],
			grid[4][1],
			grid[5][1]
		];
	}
	
	rotateQuadrant(quadrant, solution_2[1]);
	makeGrid(grid, template.layerSets["Solució"].layerSets["Tauler 3"].layerSets["Tauler"]);
}

function rotateQuadrant(grid, direction) {
	var original = [
		[" ", " ", " "],
		[" ", " ", " "],
		[" ", " ", " "],
	];
	// Fem una còpia de l'original
	for (var r = 0; r < grid.length; r++) {
		for (var c = 0; c < grid[r].length; c++) {
			original[r][c] = grid[r][c];
		}
	}
	
	if (direction === "H") {
		// Horari
		grid[0][0] = original[2][0];
		grid[0][1] = original[1][0];
		grid[0][2] = original[0][0];
		grid[1][0] = original[2][1];
		grid[1][1] = original[1][1];
		grid[1][2] = original[0][1];
		grid[2][0] = original[2][2];
		grid[2][1] = original[1][2];
		grid[2][2] = original[0][2];
	} else {
		// Contrahorari
		grid[0][0] = original[0][2];
		grid[0][1] = original[1][2];
		grid[0][2] = original[2][2];
		grid[1][0] = original[0][1];
		grid[1][1] = original[1][1];
		grid[1][2] = original[2][1];
		grid[2][0] = original[0][0];
		grid[2][1] = original[1][0];
		grid[2][2] = original[2][0];
	}
	
	return grid;
}

/*
==================================================
3. MAIN
==================================================
// Configuration file example

{
	"tauler": [
		[[" ", "N", " "], ["N", " ", " "]],
		[["B", " ", "B"], ["N", "N", "B"]],
		[[" ", " ", "B"], ["B", "B", " "]],

		[[" ", " ", "N"], [" ", " ", "N"]],
		[[" ", "N", "B"], ["B", "B", "N"]],
		[["N", " ", "B"], [" ", "N", " "]]
	],

	// Moviments necessaris per la solució
	// 1. On es coloca la nova bola blanca? (fila_columna, de 1 a 6)
	"solution_1": "1_3",

	// 2. Quin quadrant gira i cap a on?
	// Número de quadrant (1 a 4) i "H" per horari o "C" per contrahorari
	"solution_2": [1, "H"]
}
*/
function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var tauler = config.tauler;
    var solution_1 = config.solution_1;
    var solution_2 = config.solution_2;

    makeGrid(tauler, template.layerSets["Problema"].layerSets["Tauler"]);
    makeSolution(tauler, solution_1, solution_2);
}

main();
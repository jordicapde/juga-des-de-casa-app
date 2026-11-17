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
function makeGrid(grid, gridLayer) {
	
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			if (grid[row][col] == "B")
				gridLayer.layerSets[(row+1) + "_" + (col+1)].layers["Blanca"].visible = true;
			else if (grid[row][col] == "N")
				gridLayer.layerSets[(row+1) + "_" + (col+1)].layers["Negra"].visible = true;
		}
	}
}

function makeSolution(grid, solution_1, solution_2, solution_4) {
	// TAULER 1
	// Si es mou fitxa del contrincant
	if (solution_1.length > 0) {
		var old_move = indexToGrid(solution_1[0]);
		var new_move = indexToGrid(solution_1[1]);
		taulell[old_move[0]][old_move[1]] = " ";
		taulell[new_move[0]][new_move[1]] = "N";
		
		makeGrid(taulell, template.layerSets["Solució"].layerSets["Tauler 1"]);
		
		// Hint solució tauler 1
		solution_1 = indexToGrid(solution_1[0]);
		template.layerSets["Solució"].layerSets["Tauler 1"].layerSets["Solució"].layers[(solution_1[0]+1) + "_" + (solution_1[1]+1)].visible = true;
		template.layerSets["Solució"].layerSets["Tauler 1"].layerSets["Solució"].layers["Fletxa"].visible = true;
	} else {
		// Si no és necessari moure fitxa
		makeGrid(taulell, template.layerSets["Solució"].layerSets["Tauler 1"]);
		
		template.layerSets["Solució"].layerSets["Tauler 1"].layers["Text no necessari"].visible = true;
		template.layerSets["Solució"].layerSets["Tauler 1"].layers["Color no necessari"].visible = true;
	}
	
	// TAULER 2
	solution_2 = indexToGrid(solution_2);
	taulell[solution_2[0]][solution_2[1]] = "B";
	
	makeGrid(taulell, template.layerSets["Solució"].layerSets["Tauler 2"]);
	
	// Hint solució tauler 2
	template.layerSets["Solució"].layerSets["Tauler 2"].layerSets["Solució"].layers[(solution_2[0]+1) + "_" + (solution_2[1]+1)].visible = true;
	
	// TAULER 3
	makeGrid(taulell, template.layerSets["Solució"].layerSets["Tauler 3"]);
	
	// Hint solució tauler 3
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 4; col++) {
			if (grid[row][col] != " ")
				template.layerSets["Solució"].layerSets["Tauler 3"].layerSets["Solució"].layers[(row+1) + "_" + (col+1)].visible = true;
		}
	}
	
	// TAULER 4
	taulell = rotateGrid(taulell);
	makeGrid(taulell, template.layerSets["Solució"].layerSets["Tauler 4"]);
	
	// Hint solució tauler 4
	/*for (var solution = 0; solution < solution_4.length; solution++) {
		var moveGrid = indexToGrid(solution_4[solution]);
		template.layerSets["Solució"].layerSets["Tauler 4"].layerSets["Solució"].layers[(moveGrid[0]+1) + "_" + (moveGrid[1]+1)].visible = true;
	}*/
}

function indexToGrid(index) {
	return [Math.floor(index / 4), index % 4];
}

function rotateGrid(grid) {
	var rotated = [
		[" ", " ", " ", " "],
		[" ", " ", " ", " "],
		[" ", " ", " ", " "],
		[" ", " ", " ", " "]
	];
	rotated[0][0] = grid[0][1];
	rotated[0][1] = grid[0][2];
	rotated[0][2] = grid[0][3];
	rotated[0][3] = grid[1][3];
	rotated[1][0] = grid[0][0];
	rotated[1][1] = grid[1][2];
	rotated[1][2] = grid[2][2];
	rotated[1][3] = grid[2][3];
	rotated[2][0] = grid[1][0];
	rotated[2][1] = grid[1][1];
	rotated[2][2] = grid[2][1];
	rotated[2][3] = grid[3][3];
	rotated[3][0] = grid[2][0];
	rotated[3][1] = grid[3][0];
	rotated[3][2] = grid[3][1];
	rotated[3][3] = grid[3][2];
	
	return rotated;
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

    var taulell = config.taulell;
    var solution_1 = config.solution_1;
    var solution_2 = config.solution_2;
    var solution_4 = config.solution_4;

    makeGrid(taulell, template.layerSets["Problema"].layerSets["Tauler"]);
    makeSolution(taulell, solution_1, solution_2, solution_4);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
var taulell = [
    [" ", "B", "N", "B"],
    [" ", "B", " ", "B"],
    ["B", "N", "N", "N"],
    ["N", "N", " ", "B"]
];

// Moviments necessaris per la solució
// - s'especifica les posicions del tauler amb un índex de 0 a 15 (que després es transformarà a fila-columna)

// 1. Quina bola negra es mou i cap a on? (buit si el pas no és necessari)
var solution_1 = [10, 14];

// 2. On es coloca la nova bola blanca?
var solution_2 = [10];

// 4. Quines són les 4 boles blanques en línia?
var solution_4 = []; // (no s'utilitza)[3, 6, 9, 12];

makeGrid(taulell, template.layerSets["Problema"].layerSets["Tauler"]);
makeSolution(taulell, solution_1, solution_2, solution_4);
*/
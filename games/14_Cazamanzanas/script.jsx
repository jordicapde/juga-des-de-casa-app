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
function makeRow(index, content) {
	var gridLayer = template.layerSets["Caselles"].layerSets[index];

	// Hide all layers (triga molt)
	/*
	for (var i = 0; i < gridLayer.layers.length; i++) {
		gridLayer.layers[i].visible = false;
	}
	*/

	var type = LAYER_NAMES[content];
	if (type)
		gridLayer.layers[type].visible = true;
}

/*
==================================================
3. MAIN
==================================================
*/
var LAYER_NAMES = {
    "P": "Poma",
    "1": "Portal blau 1",
    "2": "Portal blau 2",
    "3": "Portal vermell 1",
    "4": "Portal vermell 2",
    "R": "Recte",
    "E": "Esquerre",
    "D": "Dreta",
    "B": "Buit",
    "X": "Destructor",
    "U": "Duplicador"
};

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var grid = config.grid;

    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            makeRow((row + 1) + "_" + (col + 1), grid[row][col]);
        }
    }
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// Grid reset
/*
  ["-", "-", "-", "-", "-"], // Línia només per la poma
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-"],
* /

var grid = [
    ["-", "-", "-", "-", "P"], // Línia només per la poma
    ["B", "-", "-", "-", "E"],
    ["R", "-", "R", "R", "2"],
    ["-", "U", "-", "-", "B"],
    ["-", "-", "D", "-", "3"],
    ["X", "B", "4", "1", "-"],
];

for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
        makeRow((row + 1) + "_" + (col + 1), grid[row][col]);
    }
}
*/
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
	var llosetaLayer = taulerLayer.layers[index];
	var content = cellContent.slice(0, 2);
	var rotacio = cellContent.slice(-1);
	var asset = ASSETS_NAMES[content];
	
	llosetaLayer.visible = true;
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", llosetaLayer);
	
	// ROTACIÓ
	PhotoshopTools.rotateLayer(rotacio, llosetaLayer);
}

function makeSortides(sortides) {
	var sortidesLayer = template.layerSets["Tauler"].layerSets["Sortides"];
	
	for (var s = 0; s < sortides.length; s++) {
		sortidesLayer.layers["S" + sortides[s]].visible = true;
	}
}

function makeDaus(daus) {
	var dausLayer = template.layerSets["Daus"];
	
	for (var d = 0; d < daus.length; d++) {
		var asset = ASSETS_NAMES[daus[d]];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", dausLayer.layerSets["D" + (d + 1)].layers["Contingut"]);
	}
}

function makeSolucio(daus, solucio) {	
	for (var d = 0; d < daus.length; d++) {
		var asset = ASSETS_NAMES[daus[d]];
		var indexSolucio = solucio[d][0];
		var rotacio = solucio[d][1];
		
		var solucioLayer = template.layerSets["Solució"].layerSets[indexSolucio];
		var llosetaLayer = solucioLayer.layers["Contingut"];
		
		solucioLayer.visible = true;
		
		solucioLayer.layers["Text"].textItem.contents = (d + 1);
		
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + asset + ".png", llosetaLayer);
		
		// ROTACIÓ
		PhotoshopTools.rotateLayer(rotacio, llosetaLayer);
	}
}

/*
==================================================
3. MAIN
==================================================
*/
var ASSETS_NAMES = {
    "TC": "tren_corba",
    "TR": "tren_recta",
    "TT": "tren_t",
    "TX": "tren_creu",
    "CC": "carretera_corba",
    "CR": "carretera_recta",
    "CT": "carretera_t",
    "CX": "carretera_creu",
    "EC": "estacio_corba",
    "ER": "estacio_recta",
    "X0": "creu0", // l'única creu sense estació
    "X1": "creu1", // 1 carretera
    "X2": "creu2", // 2 carreteres
    "X3": "creu3", // 3 carreteres
    "X4": "creu4"  // igual que creu0 però amb estació
};

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var grid = config.grid;
    var sortides = config.sortides;
    var daus = config.daus;
    var solucio = config.solucio;

    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (grid[row][col] !== "    ")
                makeTauler(grid[row][col], (row + 1) + "_" + (col + 1));
        }
    }

    makeSortides(sortides);
    makeDaus(daus);
    makeSolucio(daus, solucio);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// Les cel·les tenen el següent contingut:
// 	{asset_name}-{rotacio}
//
// on rotacio pot ser:
// 	0: sense rotació
// 	1: 90º
// 	2: 180º
// 	3: 270º
// 	4: com 0 però flip sobre eix vertical
// 	5: com 1 però flip sobre eix vertical
// 	6: com 2 però flip sobre eix vertical
// 	7: com 3 però flip sobre eix vertical
//
// Originalment:
// 	- les corbes estan orientades a l'esquerra-amunt
// 	- les rectes estan orientades verticalment
// 	- les T apunten cap a amunt
// 	- les estacions comencen amb la carretera amunt
// 	- les creus que són combinació de carretera i tren, comencen amb les carreteres apuntant amunt i a l'esquerra

var grid = [
    ["    ", "    ", "    ", "TT-3", "    "],
    ["    ", "    ", "    ", "TR-0", "TC-2"],
    ["    ", "    ", "    ", "    ", "EC-5"],
    ["    ", "    ", "CT-1", "    ", "    "],
    ["    ", "CC-2", "    ", "    ", "    "]
    // grid reset
    /*
    ["    ", "    ", "    ", "    ", "    "],
    ["    ", "    ", "    ", "    ", "    "],
    ["    ", "    ", "    ", "    ", "    "],
    ["    ", "    ", "    ", "    ", "    "],
    ["    ", "    ", "    ", "    ", "    "]
    * /
];

// Les sortides estan numerades de l'1 al 8, començant per dalt i en sentit horari
var sortides = ["2", "3", "6"];

var daus = [
    "X2",
    "EC",
    "CC"
];

// L'element "n" de la solució correspon al dau "n"
// Cada element té posició de la solució i rotació
var solucio = [
    ["3_4", 2],
    ["3_3", 2],
    ["5_3", 0]
];

for (var row = 0; row < grid.length; row++) {
    for (var col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== "    ")
            makeTauler(grid[row][col], (row + 1) + "_" + (col + 1));
    }
}

makeSortides(sortides);
makeDaus(daus);
makeSolucio(daus, solucio);
*/
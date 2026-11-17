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
function makeCarta(index, carta) {
	var cartaLayer = template.layerSets["Cartes"].layerSets["C" + index];
	
	_makeCarta(carta, cartaLayer);
}

function makeSolucio(index, carta) {
	var solucioLayer = template.layerSets["Solució"].layerSets["C" + index];
	
	_makeCarta(carta, solucioLayer);
	
	// Solució
	solucioLayer.layers["Solució"].textItem.contents = carta["solucio"];
}

function _makeCarta(carta, cartaLayer) {
	// Lletra
	cartaLayer.layers["Lletra"].textItem.contents = carta["lletra"];
	
	// Títol
	cartaLayer.layers["Títol"].textItem.contents = carta["titol"];
	
	// Imatge
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + carta["imatge"] + ".png", cartaLayer.layers["Imatge"]);
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

    var cartes = config.cartes;

    for (var carta = 0; carta < cartes.length; carta++) {
        makeCarta(carta + 1, cartes[carta]);
    }

    // Ordenar segons solució
    cartes.sort(function(a, b) {
        return a.solucio - b.solucio;
    });

    for (var carta = 0; carta < cartes.length; carta++) {
        makeSolucio(carta + 1, cartes[carta]);
    }
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================

var cartes = [
    {"lletra": "A", "titol": "La impremta", "imatge": "impremta", "solucio": 1437},
    {"lletra": "B", "titol": "El paper", "imatge": "paper", "solucio": -200},
    {"lletra": "C", "titol": "El diari de paper", "imatge": "diari", "solucio": 1605},
    {"lletra": "D", "titol": "L'enciclopèdia", "imatge": "enciclopedia", "solucio": 1751},
];

for (var carta = 0; carta < cartes.length; carta++) {
    makeCarta(carta + 1, cartes[carta]);
}

// Ordenar segons solució
cartes.sort(function(a, b) {
    return a.solucio - b.solucio;
});

for (var carta = 0; carta < cartes.length; carta++) {
    makeSolucio(carta + 1, cartes[carta]);
}
*/
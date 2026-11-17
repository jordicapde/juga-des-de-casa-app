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
function makePista(pistaLayer, pista) {
	
	var textPista = TEXT_PISTES[pista["pista_index"]];
	
	if (pista["OP"]) {
		textPista = textPista.replace(/{OP}/i, pista["OP"]);
	}
	if (pista["OP1"]) {
		textPista = textPista.replace(/{OP1}/i, pista["OP1"]);
	}
	if (pista["OP2"]) {
		textPista = textPista.replace(/{OP2}/i, pista["OP2"]);
	}
	if (pista["N"]) {
		textPista = textPista.replace(/{N}/i, pista["N"]);
	}
	if (pista["N1"]) {
		textPista = textPista.replace(/{N1}/i, pista["N1"]);
	}
	
	
	var pistaSubLayer;
	if (pista["pista_index"] <= 2) {
		// 1 símbol
		pistaSubLayer = pistaLayer.layerSets["1 símbol"];
		
		// SÍMBOLS
		var simbolLayer = pistaSubLayer.layers["S1"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["X"] + ".png", simbolLayer);
		
		// TEXT (treure el text dels símbols)
		textPista = textPista.replace(/{X} /i, "");
		
	} else if (pista["pista_index"] <= 3) {
		// 2 símbols
		pistaSubLayer = pistaLayer.layerSets["2 símbols"];

		// SÍMBOLS
		var simbolLayer = pistaSubLayer.layers["S1"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["X"] + ".png", simbolLayer);
		simbolLayer = pistaSubLayer.layers["S2"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["Y"] + ".png", simbolLayer);
		
		// TEXT (treure el text dels símbols)
		textPista = textPista.replace(/{X} /i, "");
		textPista = textPista.replace(/ {Y}/i, "");
	
	} else if (pista["pista_index"] <= 4) {
		// 2 símbols suma
		pistaSubLayer = pistaLayer.layerSets["2 símbols suma"];
		
		// SÍMBOLS
		var simbolLayer = pistaSubLayer.layers["S1"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["X"] + ".png", simbolLayer);
		simbolLayer = pistaSubLayer.layers["S2"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["Y"] + ".png", simbolLayer);
		
		// TEXT (treure el text dels símbols)
		textPista = textPista.replace(/{X} \+ {Y} /i, "");
	
	} else if (pista["pista_index"] <= 6) {
		// 3 símbols suma
		pistaSubLayer = pistaLayer.layerSets["3 símbols suma"];
		
		// SÍMBOLS
		/*var simbolLayer = pistaSubLayer.layers["S1"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["X"] + ".png", simbolLayer);
		simbolLayer = pistaSubLayer.layers["S2"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["Y"] + ".png", simbolLayer);
		simbolLayer = pistaSubLayer.layers["S3"];
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + pista["Z"] + ".png", simbolLayer);*/
		
		// TEXT (treure el text dels símbols)
		textPista = textPista.replace(/{X} \+ {Y} \+ {Z} /i, "");
	
	} else {
		// Només text
		pistaSubLayer = pistaLayer.layerSets["Només text"];		
	}
	
	pistaLayer.visible = true;
	pistaSubLayer.visible = true;
	pistaSubLayer.layers["Text"].textItem.contents = textPista.toLowerCase();
}

function makeSolution(codi) {
	template.layerSets["Solució"].layers["Triangle"].textItem.contents = codi[0];
	template.layerSets["Solució"].layers["Quadrat"].textItem.contents = codi[1];
	template.layerSets["Solució"].layers["Rodona"].textItem.contents = codi[2];
}

var TEXT_PISTES = [
	// X, Y i Z són triangle, quadrat o rodona
	// N és un número
	// OP s'especifica en cada cas

// 1 símbol
/* 0 */		"{X} {OP} {N}",			// OP: <, =, >
/* 1 */		"{X} és {OP}",			// OP: senar, parell
/* 2 */		"{X} és {OP} que els altres",	// OP: menor, major

// 2 símbols
/* 3 */		"{X} {OP} {Y}",				// OP: <, =, >
// 2 símbols suma
/* 4 */		"{X} + {Y} {OP} {N}",		// OP: <, =, >
// 3 símbols suma
/* 5 */		"{X} + {Y} + {Z} {OP} {N}",	// OP: <, =, > (no cal especificar X, Y, Z, estan hardcoded)
/* 6 */		"{X} + {Y} + {Z} és {OP}",	// OP: senar, parell (no cal especificar X, Y, Z, estan hardcoded)

// Només text
/* 7 */		"Hi ha més {OP1} que {OP2}",	// OP1/OP2: senars, parells
/* 8 */		"No hi ha cap {OP}",	// OP: senar, parell
/* 9 */		"Hi ha un {OP}",		// OP: senar, parell
/* 10 */	"Hi ha {N} {OP}",		// N: dos, tres OP: senars, parells

/* 11 */	"No hi ha cap {N}",
/* 12 */	"Hi ha {N1} {N}",		// N: un, dos, tres

/* 13 */	"Hi ha un nombre repetit",
/* 14 */	"No hi ha cap nombre repetit",
/* 15 */	"Els nombres estan en ordre {OP}",	// OP: ascendent, descendent
/* 16 */	"Els nombres no tenen ordre",
];

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

    var codi = config.codi;
    var pistes_correctes = config.pistes_correctes;
    var pistes_incorrectes = config.pistes_incorrectes;

    for (var i = 0; i < pistes_correctes.length; i++) {
        var pistaLayer = template.layerSets["Pistes"].layerSets["Correctes"];
        makePista(pistaLayer.layerSets["P" + (i + 1)], pistes_correctes[i]);
    }

    for (var i = 0; i < pistes_incorrectes.length; i++) {
        var pistaLayer = template.layerSets["Pistes"].layerSets["Incorrectes"];
        makePista(pistaLayer.layerSets["P" + (i + 1)], pistes_incorrectes[i]);
    }

    makeSolution(codi);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
var codi = "541";

// Màxim 3 pistes per banda
var pistes_correctes = [
    {"pista_index": 15, "OP": "descendent"},
    {"pista_index": 4, "X": "triangle", "Y": "quadrat", "OP": "=", "N": "9"},
];

var pistes_incorrectes = [
    {"pista_index": 7, "OP1": "parells", "OP2": "senars"},
    {"pista_index": 1, "X": "rodona", "OP": ">", "N": "1"},
];


for (var i = 0; i < pistes_correctes.length; i++) {
    var pistaLayer = template.layerSets["Pistes"].layerSets["Correctes"];
    makePista(pistaLayer.layerSets["P" + (i + 1)], pistes_correctes[i]);
}

for (var i = 0; i < pistes_incorrectes.length; i++) {
    var pistaLayer = template.layerSets["Pistes"].layerSets["Incorrectes"];
    makePista(pistaLayer.layerSets["P" + (i + 1)], pistes_incorrectes[i]);
}

makeSolution(codi);
*/
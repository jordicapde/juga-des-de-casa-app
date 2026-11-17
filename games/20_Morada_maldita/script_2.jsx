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
function makeCarta(cartaContent, cartaIndex) {
	var cartaLayer = template.layerSets["Cartes"].layerSets["C" + (cartaIndex+1)];
	
	var titol;
	switch (cartaContent["tipus"]) {
		case "forma":
			cartaLayer.layerSets["Forma"].visible = true;
			var color = cartaContent["param"][0];
			var forma = FORMA_ASSET[cartaContent["param"][1]];
			
			if (color == "multi") {
				// FORMA I MULTICOLOR
				cartaLayer.layerSets["Forma"].layerSets["Multicolor"].visible = true;
				titol = "Forma";
				
			} else {
				// FORMA I COLOR CONCRET
				cartaLayer.layerSets["Forma"].layerSets["Un color"].visible = true;
				color = COLOR_NAMES[color];
				cartaLayer.layerSets["Forma"].layerSets["Un color"].layers[color].visible = true;
				titol = "Forma i color";
			}
			
			PhotoshopTools.replaceSmartObjectContent(PATHS.assets + forma + ".png", cartaLayer.layerSets["Forma"].layers["Forma"]);
			break;
			
		case "color":
			cartaLayer.layerSets["Color"].visible = true;
			
			var colorSup, colorInf;
			if (cartaContent["param"].length == 1) {
				// UN COLOR
				titol = "Un color";
				
				colorSup = COLOR_NAMES[cartaContent["param"][0]];
				colorInf = colorSup;
				
			} else {
				// DOS COLORS
				titol = "Dos colors";
				
				colorSup = COLOR_NAMES[cartaContent["param"][0]];
				colorInf = COLOR_NAMES[cartaContent["param"][1]];
			}
			
			cartaLayer.layerSets["Color"].layerSets["Superior"].layers[colorSup].visible = true;
			cartaLayer.layerSets["Color"].layerSets["Inferior"].layers[colorInf].visible = true;
			break;
			
		case "costats":
			cartaLayer.layerSets["Nombre costats"].visible = true;
			titol = "Nombre costats";
			var costats = cartaContent["param"][0];
			
			if (costats.length == 1) {
				// NÚMERO
				cartaLayer.layerSets["Nombre costats"].layers["Número"].visible = true;
				cartaLayer.layerSets["Nombre costats"].layers["Número"].textItem.contents = costats;
			} else {
				// OPERACIÓ
				cartaLayer.layerSets["Nombre costats"].layers["Operació 1"].visible = true;
				cartaLayer.layerSets["Nombre costats"].layers["Operació 1"].textItem.contents = costats[0];
				cartaLayer.layerSets["Nombre costats"].layers["Operació 2"].visible = true;
				cartaLayer.layerSets["Nombre costats"].layers["Operació 2"].textItem.contents = costats[1];
				cartaLayer.layerSets["Nombre costats"].layers["Operació 3"].visible = true;
				cartaLayer.layerSets["Nombre costats"].layers["Operació 3"].textItem.contents = costats[2];
			}
			break;
	}
	cartaLayer.layers["Títol"].textItem.contents = titol;
	
	// SOLUCIÓ
	template.layerSets["Solució"].layers["G" + cartaContent["solucio"]].visible = true;
	template.layerSets["Solució"].layerSets["Inactives"].layers["G" + cartaContent["solucio"]].visible = false;
}

var COLOR_NAMES = {
	"R": "Vermell",
	"Y": "Groc",
	"G": "Verd",
	"B": "Blau",
	"P": "Rosa",
	"M": "Lila"
};
var FORMA_ASSET = {
	// Nom del primer asset amb la forma corresponent
	"4L": "1", // Rombe allargat
	"4": "7",
	"5": "13",
	"5L": "19", // Diamant de 5
	"6": "25",
	"6L": "31", // Hexàgon allargat
	"7": "37",
	"7L": "43", // Diamant de 7
	"8": "49",
	"8L": "55" // Octògon allargat
};

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
        makeCarta(cartes[carta], carta);
    }
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================

// Exemple de configuració de les cartes
var cartes = [
    {
        // pot ser "forma", "color" o "costats"
        "tipus": "costats",

        // si és forma: definir primer si és "multi" (qualsevol color) o bé un COLOR_NAMES en concret, després definir el FORMA_ASSET
        // si és color: definir els dos COLOR_NAMES (pot ser només un si es vol només un color)
        // si és costats: definir el text pel número o bé l'operació en un sol element ("3+2" / "4-1" / "5" / ...)
        "param": ["5+1"],

        // índex de la gemma solució (començant per 1)
        "solucio": "14"
    },
    {
        "tipus": "costats",
        "param": ["7"],
        "solucio": "17"
    },
];

for (var carta = 0; carta < cartes.length; carta++) {
    makeCarta(cartes[carta], carta);
}
*/
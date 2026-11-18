/*
==================================================
1. INITIALIZATION
==================================================
*/
var PROJECT_FOLDER = new File($.fileName).parent.parent.parent;

// Load common functions
$.evalFile(new File(PROJECT_FOLDER + "/common/config.jsx"));
$.evalFile(new File(PROJECT_FOLDER + "/common/photoshop.jsx"));
$.evalFile(new File(PROJECT_FOLDER + "/common/utils.jsx"));

var PATHS = ConfigTools.getPaths(new File($.fileName));
var template = app.activeDocument;

/*
==================================================
2. GAME FUNCTIONS
==================================================
*/
function makeCarta(index, carta) {
	var cartaLayer = template.layerSets["Cartes"].layers["C" + index];
	cartaLayer.name = index + "_" + carta;
	
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + carta + ".png", cartaLayer);
	PhotoshopTools.randomRotation(cartaLayer);
}

/*
==================================================
3. MAIN
==================================================
No s'ha de canviar res, simplement seleccionem 3 cartes a l'atzar

Per les solucions:
   - s'ha de fer seleccions rodones a cada objecte (en la capa de solució corresponent)
   - contornejar cada selecció amb 2px
   - a Trazados, hi ha les línies per unir els objectes
   - s'ha de modificar el traçat i contornejar amb 2px cadascun
*/
function main() {
    var TOTAL_NUM_TILES = 16;

    var cartes = UtilsTools.generateUniqueRandomNumbers(3, TOTAL_NUM_TILES);
    for (var carta = 0; carta < cartes.length; carta++)
        makeCarta(carta + 1, cartes[carta]);
}

main();
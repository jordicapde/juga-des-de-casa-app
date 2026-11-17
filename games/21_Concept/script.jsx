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
function makeRow(index, row) {
	var rowLayer = row.length < 5 ? template.layerSets["Icones"].layerSets[(index + 1) + "_4"] : template.layerSets["Icones"].layerSets[(index + 1) + "_5"];
	rowLayer.visible = true;
	
	for (var col = 0; col < row.length; col++) {
		var iconaLayer = rowLayer.layerSets.getByName(col + 1).layers["Icona"];
		var textLayer = rowLayer.layerSets.getByName(col + 1).layers["Text"];
		
		// Icona
		iconaLayer.visible = true;
		PhotoshopTools.replaceSmartObjectContent(PATHS.assets + row[col].icon + ".png", iconaLayer);
		
		// Text (visible si té valor)
		textLayer.visible = row[col].text !== "";
		textLayer.textItem.contents = row[col].text;
	}
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

    var concept = config.concept;

    for (var row = 0; row < concept.length; row++) {
        var conceptRow = concept[row];

        if (conceptRow.length > 0)
            makeRow(row, conceptRow);
    }
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// Cada concept pot tenir:
// - un màxim de 3 files
// - un màxim de 5 elements per fila
var concept = [
    // DOBBY
    //[{"icon": "persona", "text": "Personatge"}, {"icon": "ficció", "text": "Ficció"}, {"icon": "baix", "text": "Baix"}],
    //[{"icon": "orella", "text": ""}, {"icon": "ull", "text": ""}, {"icon": "gros", "text": "Gran"}],
    //[{"icon": "roba", "text": "Roba"}, {"icon": "dintre", "text": "Dintre"}, {"icon": "literatura", "text": "Llibre"}],
    // HAGRID
    //[{"icon": "home", "text": ""}, {"icon": "adult", "text": "Adult"}, {"icon": "alt", "text": "Alt"}, {"icon": "gros", "text": "Gran"}],
    //[{"icon": "vida", "text": ""}, {"icon": "animal", "text": ""}],
    //[{"icon": "vehicle_terrestre", "text": "Moto"}, {"icon": "artefacte_volador", "text": "Volador"}],
    // MCGONAGALL
    //[{"icon": "dona", "text": ""}, {"icon": "adult", "text": "Adult"}],
    //[{"icon": "feina", "text": "Feina"}, {"icon": "literatura", "text": "Professor"}],
    //[{"icon": "persona", "text": "Persona"}, {"icon": "oposat", "text": ""}, {"icon": "animal", "text": "Gat"}],
    // VOLDEMORT
    [{"icon": "home", "text": ""}, {"icon": "adult", "text": "Adult"}, {"icon": "prim", "text": "Prim"}],
    [{"icon": "cap", "text": "Pell"}, {"icon": "gris", "text": ""}, {"icon": "verd", "text": ""}, {"icon": "transparent", "text": ""}],
    [{"icon": "mort", "text": ""}, {"icon": "conflicte", "text": ""}, {"icon": "trist", "text": ""}],
];

var template = app.activeDocument;

for (var row = 0; row < concept.length; row++) {
    var conceptRow = concept[row];

    if (conceptRow.length > 0)
        makeRow(row, conceptRow);
}
*/
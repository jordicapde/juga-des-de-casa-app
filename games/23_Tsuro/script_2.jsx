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
function makeSolucio(forat, foratContent, solucioLloseta, solucioContent) {
	// MARCAR LLOSETA SOLUCIÓ AL TAULELL
	var solucioLayer = template.layerSets["Solucio 1"];
	solucioLayer.layers[forat].visible = true;
	
	solucioLayer = template.layerSets["Tauler"].layerSets["Forats"];
	solucioLayer.layers[forat].visible = false;
	
	solucioLayer = template.layerSets["Tauler"].layers[forat + "_" + foratContent];
	solucioLayer.visible = true;
	PhotoshopTools.replaceSmartObjectContent(PATHS.assets + solucioContent + ".png", solucioLayer);
	PhotoshopTools.resetRotateLayer(solucioLayer);
	
	// MARCAR LLOSETA SOLUCIÓ DE LA MÀ
	solucioLayer = template.layerSets["Solucio 2"];
	solucioLayer.layers["L" + solucioLloseta].visible = true;
}

/*
==================================================
3. MAIN
==================================================
// Configuration file example

// S'ha de deixar la imatge a punt amb el forat buit i la imatge d'interrogant en aquest.
// De fet, abans d'executar aquest script per obtenir la solució s'ha de guardar la imatge del problema.

{
	// fila_columna on hi ha el forat al taulell
	"forat": "3_4",

	// Número del contingut de la lloseta del forat (només per poder trobar la capa pel nom)
	"foratContent": "2",

	// Índex de la lloseta que és la solució
	"solucioLloseta": "3",

	// Número del contingut de la lloseta solució
	"solucioContent": "27"
}
*/
function main() {

	var config = ConfigTools.loadConfig(PATHS.config);
	if (config == null) {
		return;
	}

	var forat = config.forat;
	var foratContent = config.forat_content;
	var solucioLloseta = config.solucio_lloseta;
	var solucioContent = config.solucio_content;

	makeSolucio(forat, foratContent, solucioLloseta, solucioContent);
}

main();
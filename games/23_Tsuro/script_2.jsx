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

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
	// S'ha de deixar la imatge a punt amb el forat buit i la imatge d'interrogant en aquest.
	// De fet, abans d'executar aquest script s'ha de guardar la imatge del problema.
	//
	// Paràmetres:
	// 	- forat: fila_columna on hi ha el forat al taulell
	// 	- foratContent: número del contingut de la lloseta del forat (només per poder trobar la capa pel nom)
	// 	- solucioLloseta: índex de la lloseta que és la solució
	// 	- solucioContent: número del contingut de la lloseta solució

	var forat = "3_4";
	var foratContent = "2";
	var solucioLloseta = "3";
	var solucioContent = "27";

	makeSolucio(forat, foratContent, solucioLloseta, solucioContent);
*/
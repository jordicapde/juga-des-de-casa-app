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
function makeMissio(missio, missioLayer) {
	var textMissio = missio["text"];
	
	if (missio["color"]) {
		textMissio = textMissio.replace(/( )?{color}( )?/i, "\r\r");
		
		var color = missio["color"];
		
		if (color == "R")
			missioLayer.layerSets["Text"].layers["Vermell"].visible = true;
		else if (color == "B")
			missioLayer.layerSets["Text"].layers["Blau"].visible = true;
		else if (color == "G")
			missioLayer.layerSets["Text"].layers["Verd"].visible = true;
		else
			missioLayer.layerSets["Text"].layers["Groc"].visible = true;
	}
	if (missio["color1"]) {
		textMissio = textMissio.replace(/( )?{color1}( )?/i, "\r\r");
		
		var color = missio["color1"];
		
		if (color == "R")
			missioLayer.layerSets["Text"].layers["Vermell"].visible = true;
		else if (color == "B")
			missioLayer.layerSets["Text"].layers["Blau"].visible = true;
		else if (color == "G")
			missioLayer.layerSets["Text"].layers["Verd"].visible = true;
		else
			missioLayer.layerSets["Text"].layers["Groc"].visible = true;
	}
	if (missio["color2"]) {
		textMissio = textMissio.replace(/( )?{color2}( )?/i, "\r\r");
		
		var color = missio["color2"];
		
		if (color == "R")
			missioLayer.layerSets["Text"].layers["Vermell"].visible = true;
		else if (color == "B")
			missioLayer.layerSets["Text"].layers["Blau"].visible = true;
		else if (color == "G")
			missioLayer.layerSets["Text"].layers["Verd"].visible = true;
		else
			missioLayer.layerSets["Text"].layers["Groc"].visible = true;
	}
	if (missio["numero"]) {
		textMissio = textMissio.replace("{numero}", missio["numero"]);
	}

	missioLayer.layerSets["Text"].layers["Text"].textItem.contents = textMissio;
}

function makeCarta(carta, cartaLayer) {
	var numero = carta[0];
	var color = carta[1];
	
	cartaLayer.layers["Número"].textItem.contents = numero;
	if (color == "R")
		cartaLayer.layers["Vermell"].visible = true;
	else if (color == "B")
		cartaLayer.layers["Blau"].visible = true;
	else if (color == "G")
		cartaLayer.layers["Verd"].visible = true;
	else
		cartaLayer.layers["Groc"].visible = true;
}

function makeSolution(solution_missio, solution_fletxa) {
	// MISSIÓ	
	template.layerSets["Solució"].layerSets["Missions"].layers["M" + solution_missio].visible = true;
	
	// FLETXA
	template.layerSets["Solució"].layerSets["Fletxes"].layers[solution_fletxa].visible = true;
	
	// CARTA EN JOC
	template.layerSets["Solució"].layerSets["Cartes en joc"].layers["C" + solution_fletxa[2]].visible = true;
}

/*
==================================================
3. MAIN
==================================================
*/
var TEXT_MISSIONS = [
    /* 0 */  "Les cartes {color1} sumen el doble que les {color2}",
    /* 1 */  "Les cartes {color1} sumen igual que les {color2}",

    /* 2 */  "Les cartes {color} sumen {numero}",
    /* 3 */  "Totes les cartes sumen {numero}",

    /* 4 */  "Totes les cartes són majors de {numero}",
    /* 5 */  "Totes les cartes són menors de {numero}",
    /* 6 */  "Totes les cartes són {color1} i/o {color2}",
    /* 7 */  "Totes les cartes són senars",
    /* 8 */  "Totes les cartes són\rparells",

    /* 9 */  "Dues cartes alternes són parells i dues senars",
    /* 10 */ "Dues cartes alternes són {color}",
    /* 11 */ "Hi ha {numero} cartes {color}",
    /* 12 */ "Hi ha dues cartes {color} adjacents",
    /* 13 */ "Hi ha dues cartes {color} no adjacents",

    /* 14 */ "Hi ha una escala de 4 cartes en qualsevol ordre",
    /* 15 */ "Hi ha una escala de 3 cartes seguides",
    /* 16 */ "Cap número\rni color està\rrepetit",
    /* 17 */ "Cap color\restà repetit",
    /* 18 */ "Cap número està repetit"
];

function main() {
    var config = ConfigTools.loadConfig(PATHS.config);
    if (config == null) {
        return;
    }

    var missions = config.missions;
    var cartes_joc = config.cartes_joc;
    var cartes_ma = config.cartes_ma;
    var solution_missio = config.solution_missio;
    var solution_fletxa = config.solution_fletxa;

    // Substituir els índexs de text de les missions pels textos corresponents
    for (var i = 0; i < missions.length; i++) {
        missions[i].text = TEXT_MISSIONS[missions[i].text];
    }

    for (var i = 0; i < missions.length; i++) {
        makeMissio(missions[i], template.layerSets["Missions"].layerSets["M" + (i + 1)]);
    }

    for (var i = 0; i < cartes_joc.length; i++) {
        makeCarta(cartes_joc[i], template.layerSets["Cartes en joc"].layerSets["C" + (i + 1)]);
    }

    for (var i = 0; i < cartes_ma.length; i++) {
        makeCarta(cartes_ma[i], template.layerSets["Mà"].layerSets["C" + (i + 1)]);
    }

    makeSolution(solution_missio, solution_fletxa);
}

main();

/*
==================================================
4. MAIN MANUAL INPUT (OLD VERSION)
==================================================
// 3 missions (veure textos anteriors)
var missions = [
    {"text": TEXT_MISSIONS[17]},
    {"text": TEXT_MISSIONS[12], "color": "R"},
    {"text": TEXT_MISSIONS[7]},
];

// 4 cartes en joc (número de l'1 al 7 + R/B/G/Y)
var cartes_joc = [
    "4R",
    "1Y",
    "2B",
    "7R"
];

// 3 cartes a la mà
var cartes_ma = [
    "4Y",
    "3B",
    "7G"
];

// Solució (número de missió complerta + fletxa de la carta en mà que entra)
var solution_missio = 1; // número de 1 a 3
var solution_fletxa = "3_4"; // número de carta en mà (1 a 3) + número de carta en joc substituida (1 a 4)

for (var i = 0; i < missions.length; i++) {
    makeMissio(missions[i], template.layerSets["Missions"].layerSets["M" + (i + 1)]);
}

for (var i = 0; i < cartes_joc.length; i++) {
    makeCarta(cartes_joc[i], template.layerSets["Cartes en joc"].layerSets["C" + (i + 1)]);
}

for (var i = 0; i < cartes_ma.length; i++) {
    makeCarta(cartes_ma[i], template.layerSets["Mà"].layerSets["C" + (i + 1)]);
}

makeSolution(solution_missio, solution_fletxa);
*/
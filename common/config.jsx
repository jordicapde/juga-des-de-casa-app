var ConfigTools = ConfigTools || {};

/*
--------------------------------------------------
PATHS
--------------------------------------------------
*/

ConfigTools.getPaths = function(scriptFile) {

    var gameFolder = scriptFile.parent;
    var projectFolder = gameFolder.parent.parent;

    return {
        project: projectFolder,
        game: gameFolder,
        common: new Folder(projectFolder + "/common"),
        config: new Folder(gameFolder + "/config"),
        assets: new Folder(gameFolder + "/assets"),
        out: new Folder(gameFolder + "/out")
    };
};


/*
--------------------------------------------------
CONFIGURATION
--------------------------------------------------
*/

ConfigTools.selectConfigFile = function(configFolder) {

    var files = configFolder.getFiles("*.json");

    if (files.length == 0) {
        alert("No s'han trobat fitxers JSON a la carpeta config.");
        return null;
    }

    // Sort by modification date (newest first)
    files.sort(function(a, b) {
        return b.modified.getTime() - a.modified.getTime();
    });

    var dialog = new Window("dialog", "Selecciona una configuració");
    dialog.orientation = "column";
    dialog.alignChildren = "fill";

    dialog.add("statictext", undefined,
        "Selecciona el fitxer JSON que vols utilitzar:");

    var dropdown = dialog.add("dropdownlist", undefined, []);

    for (var i = 0; i < files.length; i++) {
        dropdown.add("item", files[i].name);
    }

    dropdown.selection = 0;

    var buttons = dialog.add("group");
    buttons.alignment = "right";

    var cancelButton = buttons.add("button", undefined, "Cancel·lar");
    var okButton = buttons.add("button", undefined, "Executar");

    var selectedFile = null;

    okButton.onClick = function() {
        selectedFile = files[dropdown.selection.index];
        dialog.close(1);
    };

    cancelButton.onClick = function() {
        dialog.close(0);
    };

    if (dialog.show() != 1) {
        return null;
    }

    return selectedFile;
};

ConfigTools.loadConfig = function(configFolder) {

    var configFile = ConfigTools.selectConfigFile(configFolder);

    if (configFile == null) {
        return null;
    }

    try {
        return ConfigTools.loadJSON(configFile);
    } catch (e) {
        alert(e.message);
        return null;
    }
};

ConfigTools.loadJSON = function(file) {

    if (!file.exists) {
        throw new Error("El fitxer no existeix: " + file.fsName);
    }

    if (!file.open("r")) {
        throw new Error("No s'ha pogut obrir el fitxer JSON.");
    }

    var content = file.read();
    file.close();

    try {
        return eval("(" + content + ")");
    } catch (e) {
        throw new Error("Error interpretant el JSON: " + e.message);
    }
};
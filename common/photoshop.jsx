var PhotoshopTools = PhotoshopTools || {};


PhotoshopTools.replaceSmartObjectContent = function(content, smartObject) {
    // Select smart object
    app.activeDocument.activeLayer = smartObject;

    // Replace contents
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");

    var desc = new ActionDescriptor();

    var idnull = charIDToTypeID("null");
    desc.putPath(idnull, new File(content));

    var idPgNm = charIDToTypeID("PgNm");
    desc.putInteger(idPgNm, 1);

    executeAction(
        idplacedLayerReplaceContents,
        desc,
        DialogModes.NO
    );
};

PhotoshopTools.rotateLayer = function(rotation, rotatedLayer) {
    /*
	rotation pot ser:
		0: sense rotació
		1: 90º
		2: 180º
		3: 270º
		4: com 0 però flip horitzontal
		5: com 1 però flip horitzontal
		6: com 2 però flip horitzontal
		7: com 3 però flip horitzontal
	*/
	if (rotation === 1 || rotation === 5)
		rotatedLayer.rotate(90, AnchorPosition.MIDDLECENTER);
	if (rotation === 2 || rotation === 6)
		rotatedLayer.rotate(180, AnchorPosition.MIDDLECENTER);
	if (rotation === 3 || rotation === 7)
		rotatedLayer.rotate(270, AnchorPosition.MIDDLECENTER);

	if (rotation >= 4)
		rotatedLayer.resize(-100, undefined, AnchorPosition.MIDDLECENTER);
};

PhotoshopTools.resetRotateLayer = function(rotatedLayer) {
    rotatedLayer.rotate(0, AnchorPosition.MIDDLECENTER);
};

PhotoshopTools.randomRotation = function(rotatedLayer) {
    var rotation = Math.floor(Math.random() * 360);
    rotatedLayer.rotate(rotation, AnchorPosition.MIDDLECENTER);
};
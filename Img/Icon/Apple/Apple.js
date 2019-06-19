var folder = Folder.selectDialog();
var document = app.activeDocument;

if (document && folder) {
    $.writeln(document.width);
    var sizes = [40,58,60,80,87,120,152,167,180,1024];
    for (var i = 0; i < sizes.length; i++) {
        saveToRes(sizes[i]);
    }
}

function saveToRes(scaleTo) {
    var num = scaleTo;

    scaleTo = scaleTo/document.width*100.0;
     $.writeln(scaleTo);
     $.writeln((scaleTo*document.width)/100.0);

    var i, layer, file, options;

    for (i = document.layers.length - 1; i >= 0; i--) {
        layer = document.layers[i];
        if (!layer.locked && layer.name.indexOf("!") === -1) {
            hideAllLayers();
            layer.visible = true;

            file = new File(folder.fsName+ "/" + layer.name + "-" + num + ".png");
            $.writeln(folder.fsName);
            $.writeln(file.fsName);
            $.writeln(layer.name);

            options = new ExportOptionsPNG24();
            options.antiAliasing = true;
            options.transparency = true;
            options.artBoardClipping = true;
            options.verticalScale = scaleTo;
            options.horizontalScale = scaleTo;

            document.exportFile(file, ExportType.PNG24, options);
        }
    }
}

function hideAllLayers() {
    var i, layer;
    for (i = document.layers.length - 1; i >= 0; i--) {
        layer = document.layers[i];
        if (!layer.locked && layer.name.indexOf("!") === -1) {
            layer.visible = false;
        }
    }
}
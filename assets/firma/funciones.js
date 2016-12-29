var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var title;
var color;
var stroke;

function firma_init() {
    
    canvas = document.getElementById("firma_myCanvas");

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    drawingCanvas = new createjs.Shape();

    stage.addEventListener("stagemousedown", firma_handleMouseDown);
    stage.addEventListener("stagemouseup", firma_handleMouseUp);

    title = new createjs.Text("Firma", "36px Arial", "#777777");
    title.x = 300;
    title.y = 200;
    stage.addChild(title);

    stage.addChild(drawingCanvas);
    stage.update();
}

function firma_stop() {
    stage.update();
}

function firma_handleMouseDown(event) {
    if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
    
    color = "#000000";
                    
    //stroke = Math.random()*30 + 10 | 0;
    stroke = 3;
    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt;
    stage.addEventListener("stagemousemove" , firma_handleMouseMove);
}

function firma_handleMouseMove(event) {
    var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;

    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;

    stage.update();
}

function firma_handleMouseUp(event) {
    stage.removeEventListener("stagemousemove" , firma_handleMouseMove);
}


	function borrarFirma(evento)
    {
        evento.preventDefault();
        var alto = $("#firma_myCanvas").css("height").replace("px", "");
        var ancho = $("#firma_myCanvas").css("width").replace("px", "");

        var objCanvas = document.getElementById("firma_myCanvas");

        var ctx = objCanvas.getContext("2d");
        ctx.clearRect(0,0,ancho,alto);
        firma_init();                
    }

	function guardarFirma()
    {
        //evento.preventDefault();
       
        var objCanvas = document.getElementById("firma_myCanvas");
        var Prefijo = $("#txtPrefijo").val();
        var imageData = objCanvas.toDataURL().replace(/data:image\/png;base64,/,'');
        return cordova.exec(
            function(msg) 
            {
                ejecutarInsert("INSERT INTO Fotos (idFoto, Ruta, Proceso, Prefijo, Estado) VALUES (?, ?, ?, ?)", ["Firma_" + Prefijo, msg, "Distribucion", Prefijo, "Sin Enviar"]);
            },
            function(err) {
                alert("No se ha podido guardar la Firma");
            }, "Canvas2ImagePlugin","saveImageDataToLibrary",[imageData]);

       
    }


var canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#f3f3f3',
    width: 1000,
    height: 600
});

var backgroundImage = null;

document
    .getElementById('upload-image')
    .addEventListener('change', function (e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                var image = new fabric.Image(imgObj);

                var canvasWidth = canvas.width;
                var canvasHeight = canvas.height;
                var imgWidth = imgObj.width;
                var imgHeight = imgObj.height;

                if (imgWidth > canvasWidth || imgHeight > canvasHeight) {
                    var scaleFactor = Math.min(
                        canvasWidth / imgWidth,
                        canvasHeight / imgHeight
                    );
                    image.scale(scaleFactor);
                }

                image.set({
                    left: canvasWidth / 2 - image.getScaledWidth() / 2,
                    top: canvasHeight / 2 - image.getScaledHeight() / 2,
                    selectable: false,
                    hasControls: false,
                    hasBorders: false,
                    evented: false
                });

                canvas.add(image);
                backgroundImage = image;
                canvas.sendToBack(image);
            };
        };
        reader.readAsDataURL(e.target.files[0]);
    });

// Add Circle to Canvas
function addCircle() {
    var circle = new fabric.Circle({
        radius: 50,
        fill: 'red',
        left: 100,
        top: 100
    });
    canvas.add(circle);
}

// Add Text to Canvas
function addText() {
    var text = new fabric.Text('Hello World', {
        left: 200,
        top: 200,
        fontFamily: 'Arial',
        fontSize: 30,
        fill: '#000'
    });
    canvas.add(text);
}

function downloadCanvas() {
    var dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 1.0
    });

    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited_image.png';

    link.click();
}

function addChair() {
    var chairImageUrl = 'pngwing.com.png';

    fabric.Image.fromURL(chairImageUrl, function (chairIgm) {
        chairIgm.scale(0.1);

        chairIgm.set({
            left: 200,
            top: 200
        });

        canvas.add(chairIgm);
        canvas.setActiveObject(chairImg);

        canvas.renderAll();
    });
}

function addRectangle() {
    var rect = new fabric.Rect({
        left: 150,
        top: 150,
        fill: 'blue',
        width: 100,
        height: 60,
    });
    canvas.add(rect);
}

function removeSelectedObject() {
    var activeObject = canvas.getActiveObject();  
    if (activeObject) {
        canvas.remove(activeObject);              
        canvas.discardActiveObject();             
    }
}

function clearCanvas() {
    canvas.getObjects().forEach(function (obj) {
        if (obj !== backgroundImage) {
            canvas.remove(obj);
        }
    });
}
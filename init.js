
var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    model=null;
    const MODELPATH = "/src/model.json";
    tf.loadLayersModel(MODELPATH).then(function (model_) {
        model = model_;

    }).catch(error=>console.log(error));
    
    var skinID = 0;
    var finishedTasks = 0;
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');  


var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    model=null;
    const MODELPATH = "/src/model.json";
    tf.loadLayersModel(MODELPATH).then(function (model_) {
        console.log("KURWA")
         model = model_;

    }).catch(error=>console.log(error));
    
    var skinID = 0; // golonka | doktor | pyra | bob
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');  
console.log("odpala się")

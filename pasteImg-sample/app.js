window.onload = function(){
    var buf = document.querySelector('#target');
    Tesseract.recognize(
        buf,
        'eng',
        { 
            logger: function(m) {
                document.querySelector('#progress').textContent = m.status;
            }
        }
    )
    .then(function(result){
        document.querySelector('#result').textContent = result.data.text;
    });
};
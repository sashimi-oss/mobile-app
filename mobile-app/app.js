let selFile = document.getElementById('selectFile'); // input type="file"の要素取得
let parent = document.getElementById('canvas-container');
let canvas = document.getElementById('canvas'); // canvasの要素取得
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

selFile.addEventListener("change", function(evt){
 let file = evt.target.files; // fileの取得
 let reader = new FileReader();

 reader.readAsDataURL(file[0]); // fileの要素をdataURL形式で読み込む

 // ファイルを読み込んだ時に実行する
 reader.onload = function(){
  let dataUrl = reader.result; // 読み込んだファイルURL
  let img = new Image(); // 画像

  img.src = dataUrl;

  // 画像が読み込んだ時に実行する
  img.onload = function() {
      // canvasに画像ソースを設定する
      //  ctx.drawImage(img, 0, 0);

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      console.log(imgWidth, imgHeight);

      canvas.width = imgWidth/3;
      canvas.height = imgHeight/3;

      // 画像のサイズを設定する場合
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth/3, imgHeight/3); //heightとwidthも合わせて設定可能



      
      /*recognizeメソッドでOCR開始*/
      Tesseract.recognize(
          img,
          /*日本語テキストを認識*/
          'jpn',
          { 
              /*進捗情報を取得、どちらでもよいがあった方が親切*/
              logger: function(m) {
                  document.getElementById("progress").textContent = m.status;
              }
          }
      )
      /*OCR(recognize)終了後、結果を渡す*/
      /*非同期処理のため.then */
      .then(function(result){
          document.getElementById("result").textContent = result.data.text;
      });
   }
  }
}, false);

function OnButtonRead(){
  /*Web Speech API機能 */
  /*読み上げるテキストを取得*/
  let textRead = document.getElementById("result").textContent;
  /*speechSynthesisインターフェイスにアクセス*/
  let synth = window.speechSynthesis;

  /*新しいインスタンス生成*/
  let utterance = new SpeechSynthesisUtterance(textRead);

  utterance.lang ="ja-JP";
  /*WebSpeechAPIに指定されたテキストを読み上げさせる*/
  synth.speak(utterance);
}




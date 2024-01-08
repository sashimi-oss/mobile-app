window.onload = function(){
  /*対象の画像を取得 */
  let ocr = document.getElementById("target");
  /*recognizeメソッドでOCR開始*/
  Tesseract.recognize(
      ocr,
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

  
};

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

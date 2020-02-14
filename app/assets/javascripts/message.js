$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      //メッセージに画像が含まれる場合のHTMLを作る

      var html = `<div class="message-list__message-info" data-message-id=${message.id}>
                   <div class="message-list__message-info__upper-info">
                   <div class="message-list__message-info__upper-info__talker">
                   ${message.user_name}
                   </div>
                   <div class="message-list__message-info__upper-info__date">
                   ${message.created_at}
                   </div>
                 <div class="message-list__message-info__message-text">
                 ${message.content}
                 </div>
                   </div>
                   <img src=${message.image} >
                   </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      //メッセージに画像が含まれない場合のHTMLを作る
      var html = `<div class="message-list__message-info" data-message-id=${message.id}>
                   <div class="message-list__message-info__upper-info">
                   <div class="message-list__message-info__upper-info__talker">
                   ${message.user_name}
                   </div>
                   <div class="message-list__message-info__upper-info__date">
                   ${message.created_at}
                   </div>
                   </div>
                   <div class="message-list__message-info__message-text">
                   ${message.content}
                   </div>
                   </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      //メッセージに画像しか含まれない場合のHTMLを作る
      var html = `<div class="message-list__message-info" data-message-id=${message.id}>
                   <div class="message-list__message-info__upper-info">
                     <div class="message-list__message-info__upper-info__talker">
                     ${message.user_name}
                     </div>
                     <div class="message-list__message-info__upper-info__date">
                     ${message.created_at}
                     </div>
                   </div>
                   <img src=${message.image} >
                   </div>`
    };
    return html;
  };
  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.new_message')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.message-form__new-message__submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message-list__message-info:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }});

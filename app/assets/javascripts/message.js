$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      //メッセージに画像が含まれる場合のHTMLを作る
      var html = `<div class="message-list__message-info">
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
    } else {
      //メッセージに画像が含まれない場合のHTMLを作る
      var html = `<div class="message-list__message-info">
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
    }
    return html;
  }
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
});

$(function(){
  function addUser(user) {
    //メッセージに画像が含まれる場合のHTMLを作る
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $("#user-search-result").append(html)
  }
  function addNoUser() {
    //メッセージに画像が含まれない場合のHTMLを作る
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    $("#user-search-result").append(html)
  }

  function addDeleteUser(id, name) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(id){
  //この記述によりuserがDBに保存される
  let html = `<input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />`;
  $(`#${id}`).append(html);
}

  $("#user-search-field").on("keyup", function(){
    //フォームの値を取得して変数に代入する
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',              //HTTPメソッド
      url: "/users",            //users_controllerの、indexアクションにリクエストの送信先を設定する
      data: {keyword: input},   //テキストフィールドに入力された文字を設定する  
      dataType: 'json',
    })
    .done(function(users){
      //emptyメソッドで一度検索結果を空にする
      $("#user-search-result").empty();
      //usersが空かどうかで条件分岐
      if (users.length !== 0){
      //配列オブジェクト１つ１つに対する処理
        users.forEach(function(user){
          addUser(user)
        })
      } else if (users.length == 0){
        return false;
      } else {
        addNouser()
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  })
  $(document).on('click', ".chat-group-user__btn--add",function(){
    // console.log()
    const id = $(this).attr("data-user-id")
    const name = $(this).attr("data-user-name")
    $(this).parent().remove();
    addDeleteUser(id,name);
    addMember(id)
  })
  $(document).on('click', ".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  })
})

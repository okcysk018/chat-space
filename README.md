# README

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many    :groups        , through:  :groups-users
- has_many    :chats
- has_many    :groups-users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
### Association
- has_many    :chats
- has_many    :users        ,through:  :groups-users
- has_many    :groups_users

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|message|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups
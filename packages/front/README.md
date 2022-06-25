# Dnd Todos Front
## 実行環境
- Node.js: v16.8.0
- React.js(TypeScript)

## 実行手順
※dnd-todos-backのサーバーをあらかじめ起動してください。
1. 環境変数を設定します。
```
cp .env.example .env
```
2. パッケージをインストールします。
```
yarn
```
3. 起動します。
```
yarn start
```
## アプリ説明
### TODOページ
TODO一覧を確認、作成、編集、アーカイブ、達成、順番入れ替えを行うことができるページです。
- 右下のボタンを押すことでTODO作成モーダルが開き、TODOを作成することができます。
- TODOには複数のタグをつけることができ、すでに追加されているタグの中から選択することができます。
- 編集アイコンをクリックすることによってTDOOを編集することも可能です。
- ゴミ箱アイコンをクリックすることでTODOをアーカイブすることができます。アーカイブされたTODOはゴミ箱ページで確認することができます。
- チェックボックスをクリックすることにより、TODOを完了することができます。なお、チェックを入れてから一定時間変更可能な時間を設けており、その時間内にチェックを外すことでTODOの完了をキャンセルすることが可能となっています。また、TODOはドラッグにより順番を入れ替えることが可能となっています。変更された順番はデータベースに反映されるため、アプリを閉じた後でも順番は保持されるようになっております。

<img width="1792" alt="image" src="https://user-images.githubusercontent.com/82492270/167989642-c081a2a7-2716-467d-ad38-2e697ecb026f.png">

TODO作成、編集
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/167989750-9bf1ef2a-c028-4bde-b284-7a36d764416a.png">

### タグページ
タグ一覧を確認、作成、編集、削除を行うことができるページです。
- タグページでタグの一覧を確認することができます。タグは紐づいているTODOが多い順にソートされて表示されます。
- 右下のボタンをクリックすることでタグ作成モーダルが開き、新しいタグを作成することができます。
- タグはカラーピッカーを使用して自由な色を選択することができます。
- また、即座にプレビューが表示されるので、自分が納得するまで色を変更し確認することが可能です。
- 各タグカードをクリックすることで編集を行うことが可能で、削除することもできます。

タグ一覧
<img width="1787" alt="image" src="https://user-images.githubusercontent.com/82492270/167989823-35bcabe8-3c53-4617-ab07-665a176f75f0.png">

タグ作成
<img width="1786" alt="image" src="https://user-images.githubusercontent.com/82492270/167989860-06210364-7cec-49ed-b3a6-c138f5ffd9e2.png">

タグ編集
<img width="1783" alt="image" src="https://user-images.githubusercontent.com/82492270/167989899-c38455d5-f63f-4b54-83a1-87a5435776a4.png">

### 履歴ページ
履歴ページでは、達成したTODOの一覧を見ることができます。また、間違えて達成しにしてまったTODOを戻すことも可能です。
<img width="1784" alt="image" src="https://user-images.githubusercontent.com/82492270/167989958-d9ef8520-5345-4ebf-a9c1-0584e53d0d22.png">

### ゴミ箱ページ
ゴミ箱ページでは、アーカイブされたTODOの一覧を確認することができます。アーカイブされたTODOを戻すことも可能です。アーカイブされたTODOを完全に削除する場合には警告ダイアログが表示されます。

アーカイブされたTODO一覧
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/167989999-6f747168-f5ac-4b8f-95f5-cb1534fcb81c.png">

アラートダイアログ
<img width="1783" alt="image" src="https://user-images.githubusercontent.com/82492270/167990018-6e1d48c1-d01c-4685-a83d-084bc1c89e9e.png">


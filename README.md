# Dnd Todos

モノリポに変更しました。

## 実行環境

- Node.js: v17.0.0
- React.js(TypeScript)
- Fastify, Prisma, PostgresQL, Docker

## 実行手順

1. 各環境変数を設定します。

```
cp .env.example .env
cp packages/front/.env.example packages/front/.env
cp packages/back/.env.example packages/back/.env
```

2. postgresQL の Docker コンテナを立ち上げ、マイグレートします。

```
docker-compose up -d
npx prisma migrate dev
```

3. パッケージをインストールします。

```
yarn
```

4. 各アプリを起動します。

```
yarn front
yarn back
```

## アプリ説明

### TODO ページ

TODO 一覧を確認、作成、編集、アーカイブ、達成、順番入れ替えを行うことができるページです。

- 右下のボタンを押すことで TODO 作成モーダルが開き、TODO を作成することができます。
- TODO には複数のタグをつけることができ、すでに追加されているタグの中から選択することができます。
- 編集アイコンをクリックすることによって TDOO を編集することも可能です。
- ゴミ箱アイコンをクリックすることで TODO をアーカイブすることができます。アーカイブされた TODO はゴミ箱ページで確認することができます。
- チェックボックスをクリックすることにより、TODO を完了することができます。なお、チェックを入れてから一定時間変更可能な時間を設けており、その時間内にチェックを外すことで TODO の完了をキャンセルすることが可能となっています。また、TODO はドラッグにより順番を入れ替えることが可能となっています。変更された順番はデータベースに反映されるため、アプリを閉じた後でも順番は保持されるようになっております。

<img width="1792" alt="image" src="https://user-images.githubusercontent.com/82492270/167989642-c081a2a7-2716-467d-ad38-2e697ecb026f.png">

TODO 作成、編集
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/167989750-9bf1ef2a-c028-4bde-b284-7a36d764416a.png">

### タグページ

タグ一覧を確認、作成、編集、削除を行うことができるページです。

- タグページでタグの一覧を確認することができます。タグは紐づいている TODO が多い順にソートされて表示されます。
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

履歴ページでは、達成した TODO の一覧を見ることができます。また、間違えて達成しにしてまった TODO を戻すことも可能です。
<img width="1784" alt="image" src="https://user-images.githubusercontent.com/82492270/167989958-d9ef8520-5345-4ebf-a9c1-0584e53d0d22.png">

### ゴミ箱ページ

ゴミ箱ページでは、アーカイブされた TODO の一覧を確認することができます。アーカイブされた TODO を戻すことも可能です。アーカイブされた TODO を完全に削除する場合には警告ダイアログが表示されます。

アーカイブされた TODO 一覧
<img width="1778" alt="image" src="https://user-images.githubusercontent.com/82492270/167989999-6f747168-f5ac-4b8f-95f5-cb1534fcb81c.png">

アラートダイアログ
<img width="1783" alt="image" src="https://user-images.githubusercontent.com/82492270/167990018-6e1d48c1-d01c-4685-a83d-084bc1c89e9e.png">

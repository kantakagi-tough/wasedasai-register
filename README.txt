大判焼きレジ（PWA版）セットアップ手順

1. GitHubで新しいリポジトリを作る（Public）。名前は例：obanyaki-register
2. 「Add file」→「Upload files」で、このフォルダの中身6つ（index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, icon-maskable-512.png）をそのままアップして「Commit changes」
   ※フォルダごとではなく、中身をリポジトリの一番上に置くこと
3. 「Settings」→「Pages」→ Branch を「main」「/(root)」にして「Save」
4. 1〜2分待つと https://（GitHubのユーザー名）.github.io/obanyaki-register/ で開ける
5. タブレットのChromeでそのURLを開き、メニュー（︙）→「アプリをインストール」（または「ホーム画面に追加」）
6. ホーム画面のアイコンから開く。以後はこのアイコンからだけ開くこと（Chromeのタブで開くと別扱いになる場合がある）

更新するとき
- index.html を差し替えたら、sw.js 1行目の v1 を v2 に変えて一緒にアップする
- アプリを一度閉じて開き直すと新しい版になる（2回開き直しが必要なこともある）
- 会計データと設定は、更新しても消えない

注意
- 会計データはタブレットの中だけに保存される。閉店後に必ず「全会計ログCSVを保存」を押す（ダウンロードフォルダに入る）
- Chromeの閲覧履歴・サイトデータを消すと記録も消える

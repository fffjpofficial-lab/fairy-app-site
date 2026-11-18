# Fairy 出演者アプリ 公式サイト（`https://app.fff-inc.com/`）

- 作成: 2026-10-28（Claude Code）。同じ日に公開した（GitHub Pages: repository `fffjpofficial-lab/fairy-app-site` の `main` / ルートから配信、
  独自ドメイン `app.fff-inc.com`、HTTPS 強制）
- 公開の方式: GitHub Pages（静的な HTML・CSS・JavaScript、ビルドの工程なし）。既存のプライバシーポリシー
  （`https://privacy.fff-inc.com/`、repository `fffjpofficial-lab/fairy-privacy`）とは**別の repository** にする
- **APK はこの repository に置かない**（GitHub Pages の repository は公開。置いたものは誰でも取れる）。
  APK は repository の外の配信先から直接ダウンロードする方式で、その URL を `assets/js/release.js` の `android.downloadUrl` に入れている

## ファイル

| パス | 内容 |
|---|---|
| `index.html` | トップ: アプリの紹介・ダウンロード（Android・iPhone）・インストールの手順・安全の注意・サポート |
| `404.html` | GitHub Pages の「見つからない」ページ |
| `assets/js/release.js` | **版・SHA-256・配布の URL・App Store の URL・将来のページの表示**を書く唯一の場所 |
| `assets/js/site.js` | `release.js` をページに当てはめる。JavaScript が無くても、ダウンロードは「準備中」の表示のまま読める |
| `assets/css/site.css` | 白ベース・ピンク（`#F5579B`）・水色（`#3FA9E6`）。色はアプリの `fairy_theme.dart` に合わせた |
| `assets/img/` | アイコン（アプリの 1024px のアイコンから縮小）、画面イメージ（App Store 用のスクリーンショット、架空のデータ） |
| `CNAME` | `app.fff-inc.com` |
| `.nojekyll` | GitHub Pages に Jekyll を使わせない |

外部の読み込み（Web フォント・解析・広告）はありません。リンクは同じサイトの中と `privacy.fff-inc.com`（と、設定した後の
配布の URL・App Store）だけです。検索エンジンに載せない指定（`noindex`）を全ページに付けています（載せる場合は外す）。

## 版・配布の URL を変えるとき

`assets/js/release.js` だけを直します。

- Android の新しい版: `versionName`・`versionCode`・`fileName`・`fileSize`・`apkSha256`・`certSha256`（鍵は変えないので通常は同じ値）
- Android の配布の URL が決まったら `downloadUrl` に `https://…` を入れる。入れるまで、ボタンは「準備中」
- iPhone: App Store で公開された後に、App Store Connect の実際の URL（`https://apps.apple.com/…`）を `appStoreUrl` に入れる。
  推測で入れない。`apps.apple.com` 以外の URL は `site.js` が受け付けない。
  2026-11-18 に `https://apps.apple.com/jp/app/fairy-performer/id6826759700` を設定した（Unlisted で配布。App Store の検索には出ない）

`index.html` は `release.js` の値どおりの状態で書いてあります（版・SHA-256・ボタンのリンク先と文言・「準備中」の案内の表示/非表示）。
JavaScript が無いときはこの表示のまま読めます。`site.js` は `release.js` を両方向に当てはめる（URL があればリンク、`null` なら「準備中」に戻す）ので、
`release.js` を変えたら `index.html` の同じ箇所も同じ状態に直してください。

## 操作ガイド（`/guide/`、2026-10-29 作成・2026-10-30 公開、2026-11-19 Build 3 版に改訂）

- 対象: 出演者アプリ 1.0.0（Build 3、ソース `b2380b8`）。チャット・ベル・お知らせ・Push 通知・通知設定は、本番で使える前提で載せている
  （2026-11-19 の方針）。イベントはアプリに表示されないので載せていない
- ページ: `guide/index.html`（トップ）と `guide/<login|home|rooms|calendar|performance|makeup|chat|notifications|account|faq>/index.html`。
  ヘッダー・フッターは全ページで同じ形。ページの最後の目次・前後のページ・ガイドのトップの目次は、11ページの一覧から作り直す
  （作り直しの道具はこのリポジトリに置いていない。ページを足したら全ページの目次と前後のリンクを同じに直す）
- 見た目: `assets/css/site.css` の部品（`steps`・`notice`・`card`・`feature-icon` 等）をそのまま使い、
  ガイドだけの部品は `assets/css/guide.css`（ガイドのページだけが読む。トップの見た目は変わらない）
- 画像: `assets/img/guide/s-*.jpg`（48枚、すべて 600×1304）。出演者アプリの画面を、架空のデータだけを表示するプレビューで
  iOS Simulator に表示して撮影し、幅 600px に縮小したもの（Build 1 の画面は iPhone 18 Pro、Build 3 で撮り直した16枚は iPhone 17・iOS 27.0。
  どちらも時刻 9:41）。Build 3 の撮影は FMS の `4c9b552`（`b2380b8` との差はプレビューだけ）のプレビューの撮影モード
  （`--dart-define=FAIRY_PREVIEW_STORE_SCREENSHOT=true` と v1.1 の5機能の定義、FMS の `docs/release/app-store-screenshots/README.md`）。表示名「サンプル」・店舗「デモ店舗」・
  ログインID `12345678`・サイト名「サイトA〜E」は架空の値。画面の文字・ボタン・配置は加工していない
  - 差し替えるときは同じ名前・同じ大きさで置き換える（ピンクの枠の位置は画像に対する % で HTML に書いてあるため、画面の構成が
    変わったら枠の位置も直す）
  - 実在の人・店舗の情報、審査用のアカウント、設定コード・再設定コード・パスワード、DEBUG の帯、プレビューだけの文言が写った画像は
    使わない。画像生成で画面を作らない。管理者向けの画面は載せない（初回設定・パスワードの再設定の Web ページも、画像なしで手順を文章で書く）
  - 2026-11-19 に足した8枚（s-chat-image-preview・s-chat-image-sent・s-chat-received・s-chat-viewer・s-chat-expired・s-ann-detail・
    s-notif-settings・s-cal-makeup）は、FMS のプレビューに足したガイド用の撮影モード（`lib/src/preview/preview_guide_screenshot.dart`、
    `--dart-define=FAIRY_PREVIEW_GUIDE_SCREENSHOT=true` と `FAIRY_PREVIEW_GUIDE_IMAGE_BASE=http://127.0.0.1:<port>/`）で撮った。チャット・お知らせの
    画像は、Mac の中のサーバーが出す架空の絵（案内図・持ち物・休業のお知らせ・模様）。通知設定の「端末の通知: オン」は、何も登録・送信しない
    プレビュー用の Push の代わり。s-cal-makeup はプレビューの中で補填日を登録した後のカレンダー
  - 撮れず、文章だけで説明している画面: 端末の通知の許可の確認（OS の画面）と Push 通知の表示。プレビューは Firebase を使わず、
    シミュレーターでは通知の許可を外から与えられないため、本物の OS の画面を出せない。合成画像は作らない
- トップの「アプリでできること」の画像（`assets/img/screen-0[1-6]-*.jpg`、640×1391）は、App Store の v1.1 のスクリーンショット（FMS の
  `docs/release/app-store-screenshots/iphone-6.3/`）を幅 640px に縮小したもの
- 操作の手順と画像: `<ol class="steps shot-steps">` の各 `<li class="has-shot">` が本文と画像（`figure.step-shot`）を並べる。
  単独の画像は `figure.screen-shot`（`guide-split` の中、スマートフォンでは本文の下）、並べるときは `.screen-row`
- ピンクの枠: `<span class="mark" style="left:…%;top:…%;width:…%;height:…%">`（画像に重ねる HTML。画像そのものは加工しない）。
  番号は `.mark-label`
- 拡大表示: 画像は `<button class="zoom">` の中にあり、`assets/js/guide.js` が押されたときに `<dialog class="lightbox">` で大きく表示する
  （閉じるボタン・背景のクリック・Esc で閉じる）。JavaScript が無くても画像はそのまま見える
- 「よくある質問」は `/guide/faq/`（`<details>`、`#q-…` のリンクでその質問が開く）。トップの `pages.faq` が指す `faq/` とは別
- `release.js` の `pages.guide` は `true`（2026-10-30。トップのヘッダーのメニューとサポートの欄に「操作ガイド」が出る）。
  `index.html` も同じ状態（ガイドへのリンクは表示、`faq`・`updates` は `hidden`）で書いてあり、`site.js` は `pages` を両方向に当てはめる。
  `pages.faq` は `false` のまま（ガイドのよくある質問は `/guide/faq/` にあり、トップの `faq/` のページは無い）

## 将来のページ（よくある質問・更新情報）

1. フォルダーを作る: `faq/index.html`・`updates/index.html`（`404.html` の形を写し、`.page` の中に本文を書く。
   アセットは `/assets/...` の絶対パスで参照する）
2. `assets/js/release.js` の `pages` の該当する項目を `true` にする → ヘッダーのメニューとサポートの欄にリンクが出る
3. まだ無いページへのリンクは出さない（`pages` が `false` の間は隠れている）

## 公開の手順（2026-10-28 に実施済み。記録として残す。外部への操作はすべて本人の承認の後）

1. GitHub に公開の repository を作る（例 `fffjpofficial-lab/fairy-app-site`、README なし）
2. このフォルダーを `git init` → commit → push（APK・設定のファイルが入っていないことを確かめてから）
3. repository の Settings > Pages: Source = Deploy from a branch、`main` / `(root)`、Custom domain = `app.fff-inc.com`
4. DNS（Squarespace Domains > `fff-inc.com`）: `app` の CNAME = `fffjpofficial-lab.github.io`（既存の MX・SPF・DKIM・`privacy` は変えない）。
   GitHub の Verified domains は `fff-inc.com` で済んでいれば追加は不要（済んでいなければ先に行う）
5. 証明書の発行の後、Enforce HTTPS をオン
6. 確かめる: `https://app.fff-inc.com/` が 200、`/assets/...` が読める、`https://privacy.fff-inc.com/` と `/support/` が変わらず 200

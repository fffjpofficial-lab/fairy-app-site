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
  推測で入れない。`apps.apple.com` 以外の URL は `site.js` が受け付けない

`index.html` に書いてある値（版・SHA-256）は JavaScript が無いときの表示です。版を変えたら同じ値に直してください。

## 操作ガイド（`/guide/`、2026-10-29 作成・2026-10-30 公開）

- 対象: 出演者アプリ 1.0（Build 1）。このビルドで表示されないチャット・通知・お知らせ・イベント・通知設定は載せていない
- ページ: `guide/index.html`（トップ）と `guide/<login|home|rooms|calendar|performance|makeup|account|faq>/index.html`。
  ヘッダー・フッター・ページの最後の目次は9ページで同じ形。どれかを変えたら全ページを同じに直す
- 見た目: `assets/css/site.css` の部品（`steps`・`notice`・`card`・`feature-icon` 等）をそのまま使い、
  ガイドだけの部品は `assets/css/guide.css`（ガイドのページだけが読む。トップの見た目は変わらない）
- 画像: `assets/img/guide/s-*.jpg`（34枚、すべて 600×1304）。出演者アプリの画面を、架空のデータだけを表示するプレビューで
  iOS Simulator（iPhone 18 Pro、時刻 9:41）に表示して撮影し、幅 600px に縮小したもの。表示名「サンプル」・店舗「デモ店舗」・
  ログインID `12345678`・サイト名「サイトA〜E」は架空の値。画面の文字・ボタン・配置は加工していない
  - 差し替えるときは同じ名前・同じ大きさで置き換える（ピンクの枠の位置は画像に対する % で HTML に書いてあるため、画面の構成が
    変わったら枠の位置も直す）
  - 実在の人・店舗の情報、審査用のアカウント、設定コード・再設定コード・パスワード、DEBUG の帯、プレビューだけの文言が写った画像は
    使わない。画像生成で画面を作らない。管理者向けの画面は載せない（初回設定・パスワードの再設定の Web ページも、画像なしで手順を文章で書く）
- 操作の手順と画像: `<ol class="steps shot-steps">` の各 `<li class="has-shot">` が本文と画像（`figure.step-shot`）を並べる。
  単独の画像は `figure.screen-shot`（`guide-split` の中、スマートフォンでは本文の下）、並べるときは `.screen-row`
- ピンクの枠: `<span class="mark" style="left:…%;top:…%;width:…%;height:…%">`（画像に重ねる HTML。画像そのものは加工しない）。
  番号は `.mark-label`
- 拡大表示: 画像は `<button class="zoom">` の中にあり、`assets/js/guide.js` が押されたときに `<dialog class="lightbox">` で大きく表示する
  （閉じるボタン・背景のクリック・Esc で閉じる）。JavaScript が無くても画像はそのまま見える
- 「よくある質問」は `/guide/faq/`（`<details>`、`#q-…` のリンクでその質問が開く）。トップの `pages.faq` が指す `faq/` とは別
- 公開まで `release.js` の `pages.guide` は `false` のまま（トップのメニューにガイドへのリンクは出ない。`/guide/` に直接アクセスすれば見える）

## 将来のページ（操作ガイド・よくある質問・更新情報）

1. フォルダーを作る: `guide/index.html`・`faq/index.html`・`updates/index.html`（`404.html` の形を写し、`.page` の中に本文を書く。
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

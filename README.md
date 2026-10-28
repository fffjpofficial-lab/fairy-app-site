# Fairy 出演者アプリ 公式サイト（`https://app.fff-inc.com/`）

- 作成: 2026-10-28（Claude Code）。**まだ公開していない**（GitHub の repository・DNS・GitHub Pages は未設定）
- 公開の方式: GitHub Pages（静的な HTML・CSS・JavaScript、ビルドの工程なし）。既存のプライバシーポリシー
  （`https://privacy.fff-inc.com/`、repository `fffjpofficial-lab/fairy-privacy`）とは**別の repository** にする
- **APK はこの repository に置かない**（GitHub Pages の repository は公開。置いたものは誰でも取れる）。
  APK の配信の方式は別に決め、決まったら `assets/js/release.js` の `android.downloadUrl` に入れる

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

## 将来のページ（操作ガイド・よくある質問・更新情報）

1. フォルダーを作る: `guide/index.html`・`faq/index.html`・`updates/index.html`（`404.html` の形を写し、`.page` の中に本文を書く。
   アセットは `/assets/...` の絶対パスで参照する）
2. `assets/js/release.js` の `pages` の該当する項目を `true` にする → ヘッダーのメニューとサポートの欄にリンクが出る
3. まだ無いページへのリンクは出さない（`pages` が `false` の間は隠れている）

## 公開の手順（未実施。外部への操作はすべて本人の承認の後）

1. GitHub に公開の repository を作る（例 `fffjpofficial-lab/fairy-app-site`、README なし）
2. このフォルダーを `git init` → commit → push（APK・設定のファイルが入っていないことを確かめてから）
3. repository の Settings > Pages: Source = Deploy from a branch、`main` / `(root)`、Custom domain = `app.fff-inc.com`
4. DNS（Squarespace Domains > `fff-inc.com`）: `app` の CNAME = `fffjpofficial-lab.github.io`（既存の MX・SPF・DKIM・`privacy` は変えない）。
   GitHub の Verified domains は `fff-inc.com` で済んでいれば追加は不要（済んでいなければ先に行う）
5. 証明書の発行の後、Enforce HTTPS をオン
6. 確かめる: `https://app.fff-inc.com/` が 200、`/assets/...` が読める、`https://privacy.fff-inc.com/` と `/support/` が変わらず 200

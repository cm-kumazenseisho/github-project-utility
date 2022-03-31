# GitHub Project Utility
レーン内のCardとIssueのタイトルから、 `[*h]` フォーマットで書かれた時間を検索し、合計時間をレーンのタイトル部分に表示します。

## Prepare
jqueryライブラリをプロジェクト直下にダウンロードします。バージョンは `manifest.json` を参照してください。
（zipファイル利用時はこの作業不要）
```
$ wget https://code.jquery.com/jquery-3.3.1.min.js
```

## Install
- Google Chrome で `chrome://extensions/` を開きます。
- デベロッパーモードを有効にします。
- パッケージ化されていない拡張機能を読み込むボタンを押し、プロジェクトのディレクトリを読み込みます。

## Usage
- GitHubのProjectページの右上に「集計」ボタンが表示されるので、クリックします。

## For developers
https://github.com/cm-igarashi-ryosuke/github-project-utility


## Additional Future for myself by kumazen.seisho
### 2021/11/10 ver1.1.8
- ラベルがプロジェクトの列をはみ出さないように修正

### 2021/06/29 ver1.1.7
- メニューのスタイルを修正

### 2021/02/22 ver1.1.6
- textareaの改行時の挙動を修正
    - https://zenn.dev/catnose99/articles/e0d42812c7588c 参照

### 2020/07/21 ver1.1.5.2
- Pdocuct Backlog画面以外でもテンプレート適用になる問題対応
    - Pathマッチのロジックの誤り対応

### 2020/07/19 ver1.1.5
- Product Backlog画面で「Convert to Issue」時にPBI用テンプレート表示を追加

### 2020/04/03 ver1.1.4
- Pull request/Issueの表示幅を広めに調整

### 2019/11/22 ver1.1.3
- GitHubのProjectsのHTMLの変更対応
    - レーンタイトルが h4 → h3に変更されたためタイトルを取得できなくなったのを対応　

### 2019/11/15 ver1.1.2
- カードのメニューに「Copy issue title」を追加
    - Issueのタイトルをクリップボードにコピーする
- カードのメニューに「Copy issue link」を追加
    - IssueのURLをクリップボードにコピーする
- 画面キャプチャに対応
    - title-yyyymmddhhmmss.pngファイル名でカンバン部分を保存
- その他
    - アロー関数に書き換え

### 2019/11/07 ver1.1.1
- レーンの時間をクリップボードにコピー（不具合修正）
    - タスク数が0の場合にコピーされない不具合対応
- レーンのスクロールを展開しブラウザのスクロールで表示するためのボタンを追加
    - 戻す場合のためにトグルボタンとしている

### 2019/10/23 ver1.1.0
- フィルタに対応
    - 表示されているタスクのみ時間算出に使用する対応
- 小数点対応
    - 小数点がある時間も計算対象とする対応
        - オリジナル版では小数点がある場合は計算対象としていない
    - 最終的にはparseInt()して丸め処理を行っている
- レーンの時間をクリップボードにコピー
    - TODO, Doing, InReview, Doneの時間をタブ区切りでクリップボードにコピーする
- ボタンUI変更
    - 集計ボタンの見た目を他のGitHubの機能に揃える対応
- 機能拡張アイコン追加
    - Chromeの機能拡張ページ用のアイコンを追加
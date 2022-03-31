$(() => {
  // 各種ボタンを追加
  const header = $('div.project-header-controls');
  header.append(
    '<div class="pl-4 hide-sm"><button class="btn-link Link--primary project-header-link v-align-middle no-underline no-wrap d-flex flex-items-center" type="button" id="sumBtn"><svg class="octicon octicon-clock" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 8h3v2H7c-.55 0-1-.45-1-1V4h2v4zM7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"></path></svg><span class="hide-md ml-1">集計</span></button></div>'
  );
  header.append(
    '<div class="pl-4 hide-sm"><button class="btn-link Link--primary project-header-link v-align-middle no-underline no-wrap d-flex flex-items-center" type="button" id="expandBtn"><svg class="octicon octicon-unfold" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.5 7.5L14 10c0 .55-.45 1-1 1H9v-1h3.5l-2-2h-7l-2 2H5v1H1c-.55 0-1-.45-1-1l2.5-2.5L0 5c0-.55.45-1 1-1h4v1H1.5l2 2h7l2-2H9V4h4c.55 0 1 .45 1 1l-2.5 2.5zM6 6h2V3h2L7 0 4 3h2v3zm2 3H6v3H4l3 3 3-3H8V9z"></path></svg><span class="hide-md ml-1">展開</span></button></div>'
  );
  header.append(
    '<div class="pl-4 hide-sm" hidden><button class="btn-link Link--primary project-header-link v-align-middle no-underline no-wrap d-flex flex-items-center" type="button" id="shrinkBtn"><svg class="octicon octicon-fold" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7 9l3 3H8v3H6v-3H4l3-3zm3-6H8V0H6v3H4l3 3 3-3zm4 2c0-.55-.45-1-1-1h-2.5l-1 1h3l-2 2h-7l-2-2h3l-1-1H1c-.55 0-1 .45-1 1l2.5 2.5L0 10c0 .55.45 1 1 1h2.5l1-1h-3l2-2h7l2 2h-3l1 1H13c.55 0 1-.45 1-1l-2.5-2.5L14 5z"></path></svg><span class="hide-md ml-1">固定</span></button></div>'
  );
  header.append(
    '<div class="pl-4 hide-sm"><button class="btn-link Link--primary project-header-link v-align-middle no-underline no-wrap d-flex flex-items-center" type="button" id="caputureBtn"><svg class="octicon octicon-device-camera" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M15 3H7c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM6 5H2V4h4v1zm4.5 7C8.56 12 7 10.44 7 8.5S8.56 5 10.5 5 14 6.56 14 8.5 12.44 12 10.5 12zM13 8.5c0 1.38-1.13 2.5-2.5 2.5S8 9.87 8 8.5 9.13 6 10.5 6 13 7.13 13 8.5z"></path></svg><span class="hide-md ml-1">画面保存</span></button></div><a hidden href="" id="download"></a>'
  );

  const countDisplayOnly = true; // 表示しているタスクのみカウントする場合はtrueにする
  // ボタンを押したときの処理
  $(document).on('click', '#sumBtn', () => {
    const burnuppoint = [];
    // レーンごとに時間を集計
    $('div.project-column').each((index, el) => {　
      let total = 0;
      // Issue, Card
      $(el)
        .find('a.js-project-card-issue-link, div.js-comment-body > p')
        .each((i, el) => {
          total += countDisplayOnly ? $(el).is(':visible') ? extractHours($(el).text()) : 0 : extractHours($(el).text());
        });
      const title = $(el).find('span.js-project-column-name');
      const addText = total > 0 ? `[${total}h]` : '';
      const newTitle = title
        .text()
        .replace(/\[(.*)h\]$/, '')
        .concat(addText);
      title.text(newTitle);
      total > 0 ? burnuppoint.push(total) : $('span.js-project-column-name')[0].innerHTML == $('.js-project-column-name',el).text() ? '' : burnuppoint.push(0);
    });
    navigator.clipboard.writeText(burnuppoint.join('\t'))// レーンの数字をクリップボードにコピー
      .then(() => {})
      .catch(err => {});
  });
});
$(document).on('click', '#expandBtn', () => {
  $('div:has(button#expandBtn)').attr('hidden', 'hidden');
  $('div:has(button#shrinkBtn)').removeAttr('hidden');
  $('.project-columns-container').addClass('expandLane');
})
$(document).on('click', '#shrinkBtn', () => {
  $('div:has(button#shrinkBtn)').attr('hidden', 'hidden');
  $('div:has(button#expandBtn)').removeAttr('hidden');
  $('.project-columns-container').removeClass('expandLane');
})
$(document).on('click', '#caputureBtn', () => {
  $('.project-columns-container').addClass('expandLane');
  $('.project-columns-container').scrollTop(0);
  $('.project-columns-container').scrollLeft(0);
  const laneWidth = $('div.project-column').outerWidth(); // レーンの幅
  const marginWidth = parseInt($('div.project-column').css('margin-right')); // レーンのマージン
  const laneCount = $('div.project-column').length; // レーン数
  const capWidth = laneWidth * laneCount + marginWidth * (laneCount+1); // キャプチャー幅
  const capHeight = document.getElementsByTagName('body')[0].scrollHeight; // キャプチャー高さ
  html2canvas(document.querySelector(".project-columns"),{
    windowWidth: capWidth,
    windowHeight: capHeight,
    width: capWidth
  }).then(canvas=>{
    canvas.toBlob(blob => {
      let dlname = dayjs().format('YYYYMMDDHHmmss');
      $("#download").attr("download", `${document.title}-${dlname}.png`).attr("href", window.URL.createObjectURL(blob));
      $('a#download')[0].click();
    })
  })
  if ($('div:has(button#shrinkBtn)').is('[hidden]')){
    $('.project-columns-container').removeClass('expandLane');
  }
})
$(document).on('click', 'summary.btn-octicon', event => {
  if ($(event.currentTarget).next().children('clipboard-copy').length > 1){
    return; // 追加するのは1つのみ
  }

  const issueTitle = $(event.currentTarget).parent().next().next('a').text();
  const issueURL = `${window.location.protocol}//${window.location.hostname}${$(event.currentTarget).parent().next().next('a').attr('href')}`;
  const issueNo = () => {
    let s = issueURL.split('/');
    return s[s.length-1];
  }
  if (issueTitle == ''){
    // Product BacklogのConvert to Issueであればテンプレートを挿入する
    if (location.pathname == "/smartexterior/smartexterior-kanban/projects/3"){
      let temp = document.querySelectorAll("template[id^='convert-to-issue-']");
      temp.forEach(element => {
        if (element.content.querySelector("#convert-card-body").value.length == 0)
        {
          element.content.querySelector("#convert-card-body").value =  
`## ストーリー
**<Who>**として
**<What>**したい
なぜなら**<Why>**だから

## 詳細
- 

## 関連
- 

## メモ
- 

## Ready条件
- `;
        }
      })
    }
    // Issueでない場合は追加しない
    return;
  }

  const copyIssue = `<clipboard-copy class="dropdown-item text-left btn-link" value="${issueTitle}" role="menuitem" tabindex="0">
      Copy issue title
    </clipboard-copy>
    <clipboard-copy class="dropdown-item text-left btn-link" value="${issueURL}" role="menuitem" tabindex="0">
      Copy issue url
    </clipboard-copy>
    <clipboard-copy class="dropdown-item text-left btn-link" value="[${issueTitle} #${issueNo()}](${issueURL})" role="menuitem" tabindex="0">
      Copy issue link
    </clipboard-copy>`;
  $(event.currentTarget).next().prepend(copyIssue);
})

$(document).on('click', 'button', event => {
  console.log("Convert to Issue!!")
})

const extractHours = str => {
  const regexp = /^\[(.*)h\]/g;
  let value = 0;
  while ((matches = regexp.exec(str)) !== null) {
    value = parseInt(matches[1]); // 最後にマッチした文字を返すようにする
  }
  return value;
}
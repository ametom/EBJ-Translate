// ==UserScript==
// @name        Ebook Japan Translation
// @namespace   haishin.ebookjapan.jp
// @description tries to translate ebook japan
// @include     /.*ebookjapan\.jp/.*/
// @require     http://code.jquery.com/jquery-1.11.2.min.js
// @version     0.1.0
// @grant       GM_info
// @run-at      document-start
// ==/UserScript==

var dict = [
    //long
    ['まだレビューはありません。最初のレビューを書いてみませんか？', "Nobody has written a review yet. Would you like to write the first review?"],
    ["ブラウザ”楽読み”版はストリーミングでの閲覧のみとなります。無料期間終了後はお読みいただけなくなりますのでご注意ください。", "Only the Online Reader may be used to view the following books. Please note that you will be unable to read them after the free period."],
    ["一部の作品の閲覧には会員登録が必要となります。", "You will be required to \"Sign In\" in order to view certain works."],
    ["ブラウザ”楽読み”サービスについての詳細はこちら", "Details about the online reader can be found here."],
    ["今週の「無料で全ページ立読」の本", "Weekly \"Free Online\" Books"],
    ["今週の無料で読めるダウンロード本", "Weekly \"Free Downloadable\" Books"],
    ["0円で読める本", "Completely Free Books"],
    ["現在お客様の買い物カゴに商品はありません。", "There are currently no items in your Shopping Cart."],
    ["買い物カゴに商品を入れるには、その商品の詳細ページやリストにある","To add an item to your shopping cart, please visit the Details Page of the product"],
    ["「購入」ボタンをクリックしてください。", "Then click the button \"Purchase\""],
     
    //regex
    [/(\d+)\/(\d+)～(\d+)発売！\s(\d+)冊/, "$4 books on sale! $1/$2 ~ $1/$3"],
    [/電子書籍ならeBookJapan！([\d,]+)冊\s配信中！毎日更新！/, "$1 books and counting! Updated daily!"],
    [/(\d+)冊\s\/\s(\d+)冊表示/, "Showing $1 / $2 books"],
    [/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3"],
    [/(\d+)巻分/, "$1 vol."],
    [/原作：(\S+)\s作画：(\S+)/, "Story: $1 / Art: $2"],
    [/原作：(\S+)/, "Story: $1"],
    [/作画：(\S+)/, "Art: $1"],
    [/(.+)の作品/, "Work of $1"],
    [/ようこそ\s(.*)さん/, "Welcome, $1"],
    [/(\d+)～(\d+)件\/(\d+)件\sを表示/, "$1~$2 books / $3 total"],
    
    //shorter
    ['カゴへ追加した作品の続刊', "Additional Publications Related To Your Basket"],
    ["最近チェックした作品", "Recently Viewed Publications"],
    ['お気に入りレビュアー登録', "Register as favourite reviewer"],
    ['書店員のレビュー', "Bookseller Reviews"],
    ['ユーザーのレビュー', "User Reviews"],
    ['スペシャルレビュー', "Special Review"],
    ['書籍の解説', "Book Description"],
    ['書籍の詳細', "Book Details"],
    ['新刊お知らせ管理画面', "Manage Book Notifications"],
    ['新刊お知らせ', "Book Notifications"],
    ["欲しい本リスト", "Manage Wishlist"],
    ["トップページへ戻る", "Return to Homepage"],
    ["買い物カゴの書籍", "Books in your Shopping Cart"],
    
    ['オススメ特集', "Special Promotions"],
    ['ここもチェック！', "Check this out too!"],
    ['コンテンツについて', "Additional Information"],
    ['人気の連載誌・レーベル', "Popular Serializations"],
    ['人気の著者', "Popular Authors"],

    ['シリーズ作品', "Series Anthology"],
    
    ['一覧を見る', "View Listing"],
    ['続きを読む', "Read More"],
    ['参考になった', "I found this helpful"],
    ['無料の本コーナー', "Free Books Corner"],
    
    ['書籍名昇順', "Title (Ascending)"],
    ['書籍名降順', "Title (Descending)"],
    ['著者名昇順', "Author (Ascending)"],
    ['著者名降順', "Author (Descending)"],
    ['購入日昇順', "Purchase Date (Ascending)"],
    ['購入日降順', "Purchase Date (Descending)"],
    
    ['ランキング', " Rankings"],
    
    ['無料の本', "Free Books"],
    ['全ページ立読', "All Pages Free"],
    
    ['検索結果', "Search Results"],
    ['全てを見る', "View Everything"],
    ['レビューを書く', "Write a review"],
    
    ['ログイン／会員登録', "Login / Join"],
    ['立読ページ数', "Preview Pages"],

    ['ファイルサイズ', "File Size"],
    ['対応デバイス', "Available On"],
    ['関連ジャンル', "Relevant Genre"],
    ['連載誌・レーベル', "Seralization"],

    ['電子書籍のタイプ', "E-Book Type"],
    ['画像型', "Image Type"],
    
    ["ブラウザで読む", "Read Online"],
    ["アプリで読む", "Read in App"],
    ["アプリをダウンロード", "Download App"],
    
    ["まで割引！", " Discount Ends!"],
    
    ['詳細はこちら', "More Details"],
    ['ブラウザ楽読み', "Online Reader"],
    
    ['絞込み条件', "Refine Search"],
    ['キーワード検索', "Keyword Search"],
    ['作品解説を含まない', "No Commentary"],
    ['作品解説を含む', "Work Commentary"],
    ['カテゴリで絞込む', "Filter Category"],
    ['すべてのカテゴリ', "All Categories"],
    ['出版社で絞込む', "Filter Publisher"],
    ['シリーズ・雑誌で絞込む', "Filter Magazine"],
    ['著者で絞込む', "Filter Author"],
    ['ジャンルで絞込む', "Filter Genre"],
    ['価格で絞込む', "Filter Price"],
    
    ['表示形式', "Display Format"],
    ['表示件数', "Amount to Display"],
    ['表示順', "Display Order"],
    
    ['eBookJapan発売日', "eBookJapan List Date"],
    ['セット一覧', "Bulk Set Listing"],
    ['書籍一覧', "Volume Listing"],
    ['全巻セット', "Whole Volume Set"],
    
    ["新刊", "New Books"],
    
    ["マイページTOP", "My Page"],
    ["ご利用案内", "Usage Guide"],
    ["お問い合わせ", "Contact Us"],
    ['ログアウト', "Logout"],
    
    ['男性マンガ誌', "Men's Magazines"],
    ['女性マンガ誌', "Women's Magazines"],
    ['男性マンガ', "Men's Manga"],
    ['青年マンガ', "Seinen Manga"],
    ['少年マンガ', "Shounen Manga"],
    ['女性マンガ', "Women's Manga"],
    ['少女マンガ', "Shoujo Manga"],
    ['ＴＬ・レディコミ', "TL - Ladies' Harem"],
    ['ハーレクイン', "Harlequin"],
    ['ボーイズラブ', "Boy's Love"],
    ['ライトノベル', "Light Novel"],
    ['文芸', "Literature"],
    ['ビジネス・実用', "Practical"],
    ['ビジネス', "Business"],
    ['趣味・実用', "Hobby / Utility"],
    ['学術・学芸', "Academic / Cultural"],
    ['キッズ', "For Kids"],
    ['マンガ雑誌', "Magazines"],
    ['雑誌・写真集', "Photography"],
    ['アダルト写真集', "Adult Photographs"],
    ['アダルトコミック', "Adult Comics"],
    ['アダルト', "Adult"],
    ['官能小説', "Pornographic Novel"],
    
    ['税別', "excl. tax"],
    
    ['書籍名', "Book Title"],
    ['著者名', "Author"],
    ["eBookJapanについて", "About eBookJapan"],
    ["サービスについて", "About Service"],
    ["以前のサイトを利用する", "Use the Classic Interface"],
    ["無料あり", "Free of Charge"],
    ["無料で読む", "Read for Free"],
    ["セット割", "Set Discounted"],
    ["通常価格", "Normal Price"],
    ["並び替え", "Sort By"],
    ["登録日", "Registration Date"],
    ["書籍名", "Book Name"],
    ["著者名", "Author Name"],
    
    //single words
    ['書籍', "Series"],
    ['著者', "Author"],
    ['著', "Author"],
    ['価格', "Price"],
    ['ポイント', "Points"],
    ['レビュー', "Review"],
    ['一覧', "List"],    
    ['メニュー', "Menu"],
    ['整理', "Rearrange"],
    ['ストア', "Store"],
    ['書籍名', "Title"],
    ['著者名', "Author"],
    ['購入日', "Date"],
    ['初めての方へ', "Guide"],
    ['買い物カゴ', "Cart"],
    ['本棚', "Bookshelf"],
    ['マイページ', "Profile"],
    ['立読', "Preview"],
    ['カゴに追加', "Purchase"],
    ['購入', "Buy"],
    ['欲しい本', "Wishlist"],
    ['ページ数', "Pages"],
    ['ページ', "Page"],
    ['出版社', "Publisher"],
    ['完結', "Serial Complete"],
    ['雑誌', "Magazine"],
    ['グラビア', "Gravure"],
    ['写真集', "Photoalbums"],
    ["投稿日：", "Posted: "],
    ["お知らせ", "Announcements"],
    ["週別", "Weekly"],
    ["日別", "Daily"],
    ["削除", "Delete"],
    ["昇順", "Ascending"],
    ["降順", "Descending"],
    
    ["冊", " books"],
    ["円", "¥"],
];

var shitToRegex = [
    //search results
    [".sectionContent p:first-of-type", [/(\d+)\D*(\d+)\D*(\d+)\D*/, "Entries $1~$2 / $3 Total"]],
    //sidebar
    ["", [/\w+\((\d+)\)/, ""]]
];

function replaceRegex(nodes, arr){

    var reg = arr[0];
    var replace = arr[1];

    nodes.each(function(){
        this.textContent = this.textContent.replace(reg, replace);
    });
}


//-- Internet explorer doesn't define DOM2 constants!
if (typeof Node != "undefined") {
    TEXT_NODE       = Node.TEXT_NODE;
    ELEMENT_NODE    = Node.ELEMENT_NODE;
}
else {
    TEXT_NODE       = 3;
    ELEMENT_NODE    = 1;
}

function replaceTextValues (nodelist) {
    for(var node in nodelist){
        if (nodelist.hasOwnProperty(node)) {
            if(nodelist[node].nodeType === TEXT_NODE){
                for(var i = 0; i < dict.length; i++){
                    nodelist[node].nodeValue = nodelist[node].nodeValue.replace(dict[i][0], dict[i][1]);
                }
            }
        }
    }
}

function init(){
       //replaceTextValues(document.body, dict[i][0], dict[i][1]);

    for(var i = 0; i < shitToRegex.length; i++){
       replaceRegex($(shitToRegex[i][0]), shitToRegex[i][1]);
    }
}

function observeShit(){
    // select the target node
    //var target = document.querySelector('#some-id');
    var target = document;

    
    if(typeof target !== 'undefined' && target != null){
        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            //console.log(mutation.addedNodes);
            replaceTextValues(mutation.addedNodes);
          });    
        });
         
        // configuration of the observer:
        var config = { childList: true, subtree: true };
         
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
         
        // later, you can stop observing
        //observer.disconnect();
    } else {
        setTimeout(observeShit, 10);
    }
}

try {
    observeShit();
    
    /*document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
          init();
        }
    }*/

} catch (e){
    console.error(e);
}
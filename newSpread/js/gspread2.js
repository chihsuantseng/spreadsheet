//使用localstorage儲存資料
var gsavecalculate = document.getElementById('g_save');
gsavecalculate.addEventListener('click', function () {
    // var rows = document.getElementById('_table2').rows;
    var data = [];
    //登入儲存 設key=g+會員id
    var userid = "gid";

    //儲存G碼的資料
    var gData = {
        gcms: document.querySelector('.g_ranged').selectedIndex,
        gcmsName: document.querySelector('.g_ranged').selectedOptions[0].text,
        ghousetype: document.querySelector('.g_typepay').value,
        gallprice: document.querySelector('.g_allprice').innerText,
        gquantity: document.querySelector('.g_quantity').value,
        gsubtotal: document.querySelector('.g_subtotal').innerText,
        gservice: document.getElementById('g_service').innerText,
        gseven: document.getElementById('g_seven').innerText
    };
    data.push(gData);

    console.log(data);

    localStorage.setItem(userid, JSON.stringify(data));

    alert("資料已儲存");
}
)

function gimportsp() {
    var userid = "gid";
    var sadata = localStorage.getItem(userid);

    if (sadata) {
        var data = JSON.parse(sadata);
        // console.log(data);

        document.querySelector('.g_ranged').selectedIndex = data[0].gcms;
        document.querySelector('.g_typepay').value = data[0].ghousetype;
        document.querySelector('.g_allprice').innerText = data[0].gallprice;
        document.querySelector('.g_realpay').innerText = data[0].ghousetype;
        document.querySelector('.g_quantity').value = data[0].gquantity;
        document.querySelector('.g_subtotal').innerText = data[0].gsubtotal;
        GcalculateTotal()

        var gsave = document.getElementById('g_save');
        var gapply = document.getElementById('g_apply');
        var gupdate = document.getElementById('g_update');
        gapply.style.display = 'block';
        gupdate.style.display = 'block';
        gsave.style.display = 'none';

        // 找到所有的輸入元素和選擇元素
        var inputs = document.getElementsByTagName('input');
        var selects = document.getElementsByTagName('select');

        // 鎖住所有的輸入元素
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }

        // 鎖住所有的選擇元素
        for (var i = 0; i < selects.length; i++) {
            selects[i].disabled = true;
        }
    }

    var username = "gname";
    var sabal = localStorage.getItem(username);
    if (sabal) {
        var bal = JSON.parse(sabal);
        var addown = Math.floor(bal[1].ownexp);
        document.getElementById('g_addown').innerText = '前次累計自費額：' + addown;
    }

}

window.onload = function () {
    gimportsp();
    GcalculateTotal();
    //判斷年份是否相同，不同則清除累計資料
    var curdate = document.getElementById('g_date').value;
    var curyear = new Date(curdate).getFullYear();
    
    var username = "gname";
    var sabal = localStorage.getItem(username);
    if (sabal) {
        var bal = JSON.parse(sabal);
        if (bal[0].year != curyear) {
            localStorage.removeItem(username);
            window.location.reload();
        }
    }
};

//當使用者按下儲存鍵時，顯示申請服務按鈕
var gsave = document.getElementById('g_save');
var gapply = document.getElementById('g_apply');
var gupdate = document.getElementById('g_update');
gsave.addEventListener('click', () => {
    gapply.style.display = 'block';
    gupdate.style.display = 'block';
    gsave.style.display = 'none';
    // 找到所有的輸入元素和選擇元素
    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');

    // 鎖住所有的輸入元素
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

    // 鎖住所有的選擇元素
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
    }

});

//按下更新按鈕打開封印
function gupdatecalu() {
    var gsave = document.getElementById('g_save');
    var gapply = document.getElementById('g_apply');
    var gupdate = document.getElementById('g_update');
    gupdate.style.display = 'none';
    gapply.style.display = 'none';
    gsave.style.display = 'block';

    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
    }

}


function gapplyservice() {
    //儲存累計使用金額與月份
    var username = "gname";
    var balance = [];
    //第0陣列
    var date = document.getElementById('g_date').value;
    var year = new Date(date).getFullYear();
    var baltext = document.getElementById('g_alltotal').innerText;
    var bal = document.getElementById('g_alltotal').innerText.match(/\d+/);
    var balnum = bal ? parseInt(bal) : 0;
    var alance = {
        date: date,
        year: year,
        baltext: baltext,
        balnum: balnum,
        cms: document.querySelector('.g_ranged').selectedIndex,
        allprice: document.querySelector('.g_allprice').innerText
    }
    console.log(alance);
    balance.push(alance);

    //第1陣列
    var addtext = document.getElementById('g_addtotal').innerText;
    var add = document.getElementById('g_addtotal').innerText.match(/\d+/);
    var addtotal = add ? parseInt(add) : 0;
    //要儲存的是累計自費額
    var owntext = document.getElementById('g_ownexp').innerText;
    var own = document.getElementById('g_ownexp').innerText.match(/\d+/);
    var ownexp = own ? parseInt(own) : 0;
    //如果之前有資料，則取出上次的自費額相加變成累計自費額
    var sabal = localStorage.getItem(username);
    if (sabal) {
        var bal = JSON.parse(sabal);
        var ownexp = ownexp + bal[1].ownexp;
    }

    var amount = {
        //取_addtotal字串中的數字
        addtext: addtext,
        addtotal: addtotal,
        owntext: owntext,
        ownexp: ownexp
    }
    balance.push(amount);
    console.log(balance);

    localStorage.setItem(username, JSON.stringify(balance));
    
    // 轉至下一步
    window.location.href = 'gspread.html';

    //進資料庫後才清除
    var userid = "gid";
    localStorage.removeItem(userid);
}



function gdeleted() {
    var userid = "gid";
    localStorage.removeItem(userid);
    var username = "gname";
    localStorage.removeItem(username);

    window.location.reload();
}

//檢查鍵是否存在
function gchecked() {
    // var userid = "gid";
    // var data = localStorage.getItem(userid);
    var username = "gname";
    var data = localStorage.getItem(username);
    if (data === null) {
        alert("鍵 'id' 不存在");
    } else {
        alert("鍵 'id' 存在");
    }
}

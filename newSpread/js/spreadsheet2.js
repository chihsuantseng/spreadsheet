var savecalculate = document.getElementById('save_calculate');
savecalculate.addEventListener('click', function () {
    var rows = document.getElementById('_table').rows;
    var data = [];
    //登入儲存 設key=會員id
    var userid = "id";

    //儲存第0列的資料
    var firstRowData = {
        cmsLevel: document.querySelector('._ranged').selectedIndex,
        cmsLevelName: document.querySelector('._ranged').selectedOptions[0].text,
        householdType: document.querySelector('._typepay').selectedIndex,
        allprice: document.querySelector('._allprice').innerText
    };
    data.push(firstRowData);
    // 儲存B碼其他列的資料
    for (let i = 2; i < rows.length; i++) {
        let rowData = {
            product: rows[i].cells[1].querySelector('._product').selectedIndex,
            productName: rows[i].cells[1].querySelector('._product').selectedOptions[0].text,
            price: rows[i].cells[2].querySelector('._price').innerText,
            realpay: rows[i].cells[3].querySelector('._realpay').innerText,
            quantity: rows[i].cells[4].querySelector('._quantity').value,
            subtotal: rows[i].cells[5].querySelector('._subtotal').innerText
        };
        data.push(rowData);
    }
    

    console.log(data);

    localStorage.setItem(userid, JSON.stringify(data));

    alert("資料已儲存");
});


function importsp() {
    addRow();
    var userid = "id";
    var sadata = localStorage.getItem(userid);

    if (sadata) {
        var data = JSON.parse(sadata);
        // console.log(data);
        document.querySelector('._ranged').selectedIndex = data[0].cmsLevel;
        document.querySelector('._typepay').selectedIndex = data[0].householdType;
        document.querySelector('._allprice').innerText = data[0].allprice;
        var rows = document.getElementById('_table').rows;
        for (var i = 2; i < data.length + 1; i++) {
            rows[i].cells[1].querySelector('._product').selectedIndex = data[i - 1].product;
            rows[i].cells[2].querySelector('._price').innerText = data[i - 1].price;
            rows[i].cells[3].querySelector('._realpay').innerText = data[i - 1].realpay;
            rows[i].cells[4].querySelector('._quantity').value = data[i - 1].quantity;
            rows[i].cells[5].querySelector('._subtotal').innerText = data[i - 1].subtotal;
            if (i != data.length) {
                addRow();
            }
        }
        calculateTotal(); // 重新計算總金額

        

        var save_calculate = document.getElementById('save_calculate');
        var apply_service = document.getElementById('apply_service');
        var update_calculate = document.getElementById('update_calculate');
        apply_service.style.display = 'block';
        update_calculate.style.display = 'block';
        save_calculate.style.display = 'none';


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
        var _newbtn = document.getElementById('_newbtn');
        _newbtn.style.display = 'none';
        var _delbtn = document.getElementById('_delbtn');
        _delbtn.style.display = 'none';

    }

    var username = "name";
    var sabal = localStorage.getItem(username);
    if (sabal) {
        var bal = JSON.parse(sabal);
        var addown = Math.floor(bal[1].ownexp);
        document.getElementById('_addown').innerText = '當月前次累計自費額：' + addown;
    }
    
}

window.onload = function () {
    importsp();
     //判斷月份是否相同，不同則清除累計資料
    var curdate = document.getElementById('spr_date').value;
    var curmonth = new Date(curdate).getMonth() + 1;
    console.log(curmonth)
    var username = "name";
    var sabal = localStorage.getItem(username);
    if (sabal) {
        var bal = JSON.parse(sabal);
        console.log(bal[0].month)
        if (bal[0].month != curmonth) {
            localStorage.removeItem(username);
            window.location.reload();
        }

    }
    
};


//當使用者按下儲存鍵時，顯示申請服務按鈕
var save_calculate = document.getElementById('save_calculate');
var apply_service = document.getElementById('apply_service');
var update_calculate = document.getElementById('update_calculate');
save_calculate.addEventListener('click', () => {
    apply_service.style.display = 'block';
    update_calculate.style.display = 'block';
    save_calculate.style.display = 'none';
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
    var _newbtn = document.getElementById('_newbtn');
    _newbtn.style.display = 'none';
    var _delbtn = document.getElementById('_delbtn');
    _delbtn.style.display = 'none';
});

//按下更新按鈕打開封印
function updatecalu() {
    var save_calculate = document.getElementById('save_calculate');
    var update_calculate = document.getElementById('update_calculate');
    var apply_service = document.getElementById('apply_service');
    update_calculate.style.display = 'none';
    apply_service.style.display = 'none';
    save_calculate.style.display = 'block';

    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
    }
    var _newbtn = document.getElementById('_newbtn');
    _newbtn.style.display = 'block';
    var _delbtn = document.getElementById('_delbtn');
    _delbtn.style.display = 'block';

}



function applyservice() {
    //儲存累計使用金額與月份
    var username = "name";
    var balance = [];
    var date = document.getElementById('spr_date').value;
    var month = new Date(date).getMonth() + 1;
    var baltext = document.getElementById('_alltotal').innerText;
    var bal = document.getElementById('_alltotal').innerText.match(/\d+/);
    var balnum = bal ? parseInt(bal) : 0;
    var alance = {
        date: date,
        month: month,
        baltext: baltext,
        balnum: balnum,
        cms: document.querySelector('._ranged').selectedIndex,
        allprice: document.querySelector('._allprice').innerText
    }

    balance.push(alance);

    var addtext = document.getElementById('_addtotal').innerText;
    var add = document.getElementById('_addtotal').innerText.match(/\d+/);
    var addtotal = add ? parseInt(add) : 0;
    //要儲存的是累計自費額
    var owntext = document.getElementById('_ownexp').innerText;
    var own = document.getElementById('_ownexp').innerText.match(/\d+/);
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

    localStorage.setItem(username, JSON.stringify(balance));
    console.log(balance);
    // 轉至下一步
    window.location.href = 'spreadsheet.html';

    //進資料庫後才清除
    var userid = "id";
    localStorage.removeItem(userid);
}

function deleted() {
    var userid = "id";
    localStorage.removeItem(userid);
    var username = "name";
    localStorage.removeItem(username);

    window.location.reload();
}

//檢查鍵是否存在
function checked() {
    var userid = "id";
    var data = localStorage.getItem(userid);
    if (data === null) {
        alert("鍵 'id' 不存在");
    } else {
        alert("鍵 'id' 存在");
    }
}



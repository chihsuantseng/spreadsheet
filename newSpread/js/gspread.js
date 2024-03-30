//G碼
function Gallowance(element) {
    let allp = element.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    allp.innerText = element.value;
    GcalculateTotal();
}

document.addEventListener('DOMContentLoaded', function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('g_date').value = today;
});

function Gupdatetwo(element) {
    let rows = document.getElementById('_table2').rows;
    rows[2].cells[3].innerText = element.value;
    let quantity = rows[2].cells[4].firstElementChild;
    GupdateSubtotal(quantity);
    GcalculateTotal();
}

function GupdateSubtotal(element) {
    let rows = document.getElementById('_table2').rows;
    let y = parseInt(rows[2].cells[2].innerText) * parseFloat(rows[2].cells[3].innerText) * rows[2].cells[4].firstElementChild.value;
    rows[2].cells[5].innerText = Math.floor(y);
    GcalculateTotal();
}

function GcalculateTotal() {
    let rows = document.getElementById('_table2').rows;

    var username = "gname";
    var sabal = localStorage.getItem(username);
    //第二次以後申請，剩餘額度更新為lastuse-a
    if (sabal) {
        var bal = JSON.parse(sabal);
        var lastuse = parseInt(bal[0].balnum);
        
        var a = parseFloat(rows[2].cells[2].innerText) * parseInt(rows[2].cells[4].firstElementChild.value);
        //獲取前次累計金額
        var addlast = parseInt(bal[1].addtotal);
        document.getElementById('g_addtotal').innerText = '累計總額(單價*次數)：' + (addlast + a );

        if (a <= lastuse) {
            //自動帶上級別
            document.querySelector('.g_ranged').selectedIndex = parseInt(bal[0].cms);
            var rangedSelects = document.getElementsByClassName('g_ranged');
            for (var c = 0; c < rangedSelects.length; c++) {
                rangedSelects[c].disabled = true;
            }
            document.querySelector('.g_allprice').innerText = bal[0].allprice;

            document.getElementById('g_alltotal').innerText = '補助剩餘額度：' + (lastuse - a);
            document.getElementById('g_ownexp').innerText = '超出額度應自費額：' + 0;
            document.getElementById('g_totalpay').innerText = '總支付金額：NT$' + Math.floor(parseInt(rows[2].cells[5].innerText)).toLocaleString();
        } else {
            //自動帶上級別
            document.querySelector('.g_ranged').selectedIndex = parseInt(bal[0].cms);
            var rangedSelects = document.getElementsByClassName('g_ranged');
            for (var c = 0; c < rangedSelects.length; c++) {
                rangedSelects[c].disabled = true;
            }

            document.getElementById('g_alltotal').innerText = '補助剩餘額度：' + 0;

            //全部金額-補助額=全自費額   裡面有16%已經算了，剩下84%
            var b = document.getElementById('g_addtotal').innerText.match(/\d+/);
            var y = b - parseInt(rows[0].cells[5].innerText);
            var z = y * (1 - parseFloat(rows[2].cells[3].innerText));

            var addown = Math.floor(bal[1].ownexp);
            document.getElementById('g_addown').innerText = '前次累計自費額：'+addown ;
            document.getElementById('g_ownexp').innerText = '超出額度應自費額：' +(Math.floor(z)-addown) ;
            //小計+自費
            var own = document.getElementById('g_ownexp').innerText.match(/\d+/);
            document.getElementById('g_totalpay').innerText = '總支付金額：NT$' + Math.floor(parseInt(rows[2].cells[5].innerText)+parseInt(own));
            }
        //前次累計使用額度
        if (lastuse ==0) {
            document.getElementById('g_usetotal').innerText = '前次累計使用額度：' + parseInt(rows[0].cells[5].innerText)+'(額度已滿)'
        } else {
            document.getElementById('g_usetotal').innerText = '前次累計使用額度：' + (parseInt(rows[0].cells[5].innerText)-lastuse);
        }

    }
    //首次申請
    else{
        var x = parseFloat(rows[2].cells[2].innerText) * parseInt(rows[2].cells[4].firstElementChild.value);
        
        document.getElementById('g_addtotal').innerText = '累計總額(單價*次數)：' + x;
        
        if (x <= rows[0].cells[5].innerText) {
        document.getElementById('g_alltotal').innerText = '補助剩餘額度：' + (parseInt(rows[0].cells[5].innerText) - x);
        document.getElementById('g_ownexp').innerText = '超出額度應自費額：' + 0;
        document.getElementById('g_totalpay').innerText = '總支付金額：NT$' + rows[2].cells[5].innerText;
        } 
        else {
        document.getElementById('g_alltotal').innerText = '補助剩餘額度：' + 0;
        //全部金額-補助額=全自費額   裡面有16%已經算了，剩下84%
        var y = x - parseInt(rows[0].cells[5].innerText);
        var z = y * (1 - parseFloat(rows[2].cells[3].innerText));
        document.getElementById('g_ownexp').innerText = '超出額度應自費額：' + Math.floor(z);
        //補助額度*比率   + 全自費額
        var ztot = parseInt(rows[0].cells[5].innerText) * parseFloat(rows[2].cells[3].innerText) + y;
        document.getElementById('g_totalpay').innerText = '總支付金額：NT$' + Math.floor(ztot).toLocaleString();
        }
    }
    
}





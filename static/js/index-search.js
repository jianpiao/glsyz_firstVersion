var orderWait = []
var orderSent = []
var orderHis = []
var orderFin = []
function search(val) {
    // var x = window.document.getElementById("main.html")
    //  待处理
    orderWait = document.getElementsByClassName('order')
    for (let index = 0; index < orderWait.length; index++) {
        // console.log(orderWait[index].innerText);
        orderWait[index].innerText.indexOf(val) != -1 ? orderWait[index].style.display = 'block' : orderWait[index].style.display = 'none'
    }

    //  配送中
    orderSent = document.getElementsByClassName('send')
    for (let index = 0; index < orderSent.length; index++) {
        // console.log(orderSent[index].innerText);
            orderSent[index].innerText.indexOf(val) != -1 ? orderSent[index].style.display = 'block' : orderSent[index].style.display = 'none'
    }

    //  历史
    orderHis = document.getElementsByClassName('history-order')
    for (let index = 0; index < orderHis.length; index++) {
        // console.log(orderHis[index].innerText);
            orderHis[index].innerText.indexOf(val) != -1 ? orderHis[index].style.display = 'block' : orderHis[index].style.display = 'none'
    }

    //  完成
    orderFin = document.getElementsByClassName('finish')
    for (let index = 0; index < orderFin.length; index++) {
        console.log(orderFin[index].innerText);
            orderFin[index].innerText.indexOf(val) != -1 ? orderFin[index].style.display = 'block' : orderFin[index].style.display = 'none'
    }

}

function cleanSearch() {
    document.getElementById('searchInput').value = ''
    document.getElementsByClassName('deleteSearch')[0].style.display = 'none'
    search('')
}


function showSearch() {  
    document.getElementsByClassName('search')[0].style.display = 'block'
}

function hideSearch() {  
    document.getElementsByClassName('search')[0].style.display = 'none'
}
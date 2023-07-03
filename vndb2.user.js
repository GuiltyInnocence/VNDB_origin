// ==UserScript==
// @name         vndb2
// @match        *://vndb.org/*
// ==/UserScript==

/* tc1 ----> VNs
   tc4, vn ----> producer
   tc2 ----> characters & trait
   tc_t ----> tag
   tc_title ----> my list
   tco4 ----> options
*/

window.addEventListener("load",(event)=>{

//var t = document.querySelectorAll(".tc1 a[title], .tc4 a[title], .vn a[title], .tc2 a[title], .tc_t a[title], .tc_title a[title], .vndetails a[title], .anime abbr[title], .mainbox a[title] , .tc4[title]")
let t = document.querySelectorAll("a[title][lang=ja-Latn], .anime abbr[title], .tc4[title]")
//console.log(t)

if (t.length != 0){
    for(var i=0; i<t.length; i++){
        if (t[i].innerText != "" && t[i].getAttribute("title") != ""){
            var b = t[i].innerText
            t[i].innerText = t[i].getAttribute("title")
            t[i].setAttribute("title", b)
        }
    }
}

var c = document.querySelectorAll(".ulist .tc1")

if (c.length != 0){
    for(var j=0; j<c.length; j++){
        c[j].addEventListener("click", event =>{
            var o = document.querySelectorAll(".tco4 a[title]")
            for(var k=0; k<o.length; k++){
                if (o[k].innerText != "" && o[k].getAttribute("title") != ""){
                    o[k].innerText = o[k].getAttribute("title")
                }
            }
        })
    }
}

var r = document.querySelectorAll(".graph")
var d = document.querySelector(".votegraph tfoot td")

if (d){
    var x = []
    for(var l=0; l<=9; l++){
        var y = Array(parseInt(r[l].innerText)).fill(10-l)
        x.push(...y)
    }
}

if (d){
    const f = a => a.reduce((b, z) => b + z)
    var n = x.length
    var s = Math.sqrt(f(x.map(z => (z - f(x)/n) ** 2))/(n - 1)).toFixed(4)
    }

const g = s =>{
    switch (true){
        case s>=0 && s<=0.9999:
            return " (异口同声)"
        case s>=1 && s<=1.1499:
            return " (基本一致)"
        case s>=1.15 && s<=1.2999:
            return " (略有分歧)"
        case s>=1.3 && s<=1.4499:
            return " (莫衷一是)"
        case s>=1.45 && s<=1.5999:
            return " (各执一词)"
        case s>=1.6 && s<=1.7499:
            return " (你死我活)"
        case s>=1.75:
            return " (厨黑大战)"
    }
}

if (d){
    for(var p=0; p<10; p++){
        r[p].setAttribute("title", (parseInt(r[p].innerText)/n * 100).toFixed(2) + "%")
    }
    d.innerHTML += "<br>standard deviation " + s + g(s)
}

});
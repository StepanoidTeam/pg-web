(this["webpackJsonppg-web"]=this["webpackJsonppg-web"]||[]).push([[0],[,,,,,,function(e,n,t){e.exports=t.p+"static/media/pg-icon.e035a70d.svg"},function(e,n,t){e.exports=t(15)},,,,,function(e,n,t){},function(e,n,t){},,function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(4),o=t.n(r),i=(t(12),t(1)),s=t(5),u=t.n(s),l=t(6),p=t.n(l),f=(t(13),t(2)),h=t.n(f);function m(){return h.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat("https://pg-api.azurewebsites.net/api/","/version")).then((function(e){return e.json()})).then((function(e){return e.data.version})));case 1:case"end":return e.stop()}}))}function d(){var e=Object(a.useState)(!1),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(!1),s=Object(i.a)(o,2),u=s[0],l=s[1];return Object(a.useEffect)((function(){h.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:m().then((function(e){return l(e)})).catch((function(e){return r(e)}));case 1:case"end":return e.stop()}}))})),m(),c.a.createElement("div",{style:{color:"white"}},u?c.a.createElement("span",null,"api ver: ",u):"loading...",t?c.a.createElement("span",null,"Has error: ",JSON.stringify(t)):null)}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement((function(){var e=Object(a.useState)(!1),n=Object(i.a)(e,2),t=n[0],r=n[1];return Object(a.useEffect)((function(){m().then((function(){return r(!0)}))})),c.a.createElement("div",{className:u()("app",{"is-online":t})},c.a.createElement("img",{src:p.a,className:"app-logo",alt:"logo"}),c.a.createElement(d,null))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[7,1,2]]]);
//# sourceMappingURL=main.1c3b7020.chunk.js.map
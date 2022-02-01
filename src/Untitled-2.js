const __html__ = "<!DOCTYPE HTML>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n</head>\n<body>\n<script>\nvar ui=function(){\"use strict\";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function i(e){return\"function\"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&\"object\"==typeof e||\"function\"==typeof e}let s,a= false;function l(e,t,n,o){for(;e<t;){const i=e+(t-e>>1);n(i)<=o?e=i+1:t=i}return e}function c(e,t){a?(!function(e){if(e.hydrate_init)return;e.hydrate_init= true;const t=e.childNodes,n=new Int32Array(t.length+1),o=new Int32Array(t.length);n[0]=-1;let i=0;for(let e=0;e<t.length;e++){const r=l(1,i+1,(e=>t[n[e]].claim_order),t[e].claim_order)-1;o[e]=n[r]+1;const s=r+1;n[s]=e,i=Math.max(s,i)}const r=[],s=[];let a=t.length-1;for(let e=n[i]+1;0!=e;e=o[e-1]){for(r.push(t[e-1]);a>=e;a--)s.push(t[a]);a--}for(;a>=0;a--)s.push(t[a]);r.reverse(),s.sort(((e,t)=>e.claim_order-t.claim_order));for(let t=0,n=0;t<s.length;t++){for(;n<r.length&&s[t].claim_order>=r[n].claim_order;)n++;const o=n<r.length?r[n]:null;e.insertBefore(s[t],o)}}(e),(void 0===e.actual_end_child||null!==e.actual_end_child&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild),t!==e.actual_end_child?e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling):t.parentNode!==e&&e.appendChild(t)}function d(e,t,n){a&&!n?c(e,t):(t.parentNode!==e||n&&t.nextSibling!==n)&&e.insertBefore(t,n||null)}function u(e){e.parentNode.removeChild(e)}function f(e){return document.createElement(e)}function p(e){return document.createTextNode(e)}function g(){return p(\" \")}function h(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function m(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function b(e,t,n,o){e.style.setProperty(t,n,o?\"important\":\"\")}function $(e,t,n){e.classList[n?\"add\":\"remove\"](t)}function y(e){s=e}const x=[],v=[],w=[],k=[],_=Promise.resolve();let L= false;function C(e){w.push(e)}let E= false;const A=new Set;function T(){if(!E){E= true;do{for(let e=0;e<x.length;e+=1){const t=x[e];y(t),M(t.$$)}for(y(null),x.length=0;v.length;)v.pop()();for(let e=0;e<w.length;e+=1){const t=w[e];A.has(t)||(A.add(t),t())}w.length=0}while(x.length);for(;k.length;)k.pop()();L= false,E= false,A.clear()}}function M(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(C)}}const R=new Set;function I(e,t){e&&e.i&&(R.delete(e),e.i(t))}function S(e,t,n,o){if(e&&e.o){if(R.has(e))return;R.add(e),undefined.c.push((()=>{R.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}function O(e){e&&e.c()}function N(e,n,r,s){const{fragment:a,on_mount:l,on_destroy:c,after_update:d}=e.$$;a&&a.m(n,r),s||C((()=>{const n=l.map(t).filter(i);c?c.push(...n):o(n),e.$$.on_mount=[]})),d.forEach(C)}function z(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function j(e,t){-1===e.$$.dirty[0]&&(x.push(e),L||(L= true,_.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function H(t,i,r,l,c,d,f=[-1]){const p=s;y(t);const g=t.$$={fragment:null,ctx:null,props:d,update:e,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:i.context||[]),callbacks:n(),dirty:f,skip_bound: false};let h= false;if(g.ctx=r?r(t,i.props||{},((e,n,...o)=>{const i=o.length?o[0]:n;return g.ctx&&c(g.ctx[e],g.ctx[e]=i)&&(!g.skip_bound&&g.bound[e]&&g.bound[e](i),h&&j(t,e)),n})):[],g.update(),h= true,o(g.before_update),g.fragment=!!l&&l(g.ctx),i.target){if(i.hydrate){a= true;const e=function(e){return Array.from(e.childNodes)}(i.target);g.fragment&&g.fragment.l(e),e.forEach(u)}else g.fragment&&g.fragment.c();i.intro&&I(t.$$.fragment),N(t,i.target,i.anchor,i.customElement),a= false,T()}y(p)}class P{$destroy(){z(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound= true,this.$$set(e),this.$$.skip_bound= false)}}function q(e){const t=[],n={},o=e=>{if(!e.hasOwnProperty(\"name\")||!e.hasOwnProperty(\"data\"))return console.error(\"Incorrect message\",e);if(!t[e.name])return console.error(\"No listener for message\",e.name);for(let n=0;n<t[e.name].length;n++){const o=t[e.name][n];\"function\"==typeof o&&o(e.data)}};return e?window.onmessage=e=>o(e.data.pluginMessage):figma.ui.onmessage=e=>o(e),n.on=(e,n)=>{Array.isArray(t[e])||(t[e]=[]),t[e].push(n)},n.off=e=>{delete t[e]},n.once=(e,o)=>{Array.isArray(t[e])||(t[e]=[]);const i=t[e].length;n.on(e,(n=>{o(n),t[e].splice(i,1)}))},n.async=e=>new Promise((t=>{n.once(e,t)})),n.send=(t,n)=>{if(\"string\"!=typeof t)throw new Error(\"Expected name to be string\");const o={name:t,data:n};e?window.parent.postMessage({pluginMessage:o},\"*\"):figma.ui.postMessage(o)},n}const B=\"undefined\"==typeof figma,F=B?q( true):void 0;B||q();const D=\"0\",G=\"1\",K=\"2\",V=\"3\",W=\"4\",J=\"5\",U=\"7\",Y=\"10\",Z=\"11\",Q=\"12\",X=\"14\";function ee(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&\"undefined\"!=typeof document){var o=document.head||document.getElementsByTagName(\"head\")[0],i=document.createElement(\"style\");i.type=\"text/css\",\"top\"===n&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}function te(t){let n;return{c(){n=f(\"span\"),b(n,\"width\",t[0]+\"px\"),b(n,\"height\",t[1]+\"px\"),m(n,\"class\",\"svelte-31ot3v\")},m(e,t){d(e,n,t)},p(e,[t]){1&t&&b(n,\"width\",e[0]+\"px\"),2&t&&b(n,\"height\",e[1]+\"px\")},i:e,o:e,d(e){e&&u(n)}}}function ne(e,t,n){let{width:o=0}=t,{height:i=0}=t;return e.$$set=e=>{\"width\"in e&&n(0,o=e.width),\"height\"in e&&n(1,i=e.height)},[o,i]}ee(\"span.svelte-31ot3v{display:block;flex-grow:0;flex-shrink:0}\");class oe extends P{constructor(e){super(),H(this,e,ne,te,r,{width:0,height:1})}}function ie(t){let n,i,r,s,a,l,b,$,y,x,v,w,k,_,L,C,E,A,T,M,R,j,H,P,q,B,F,D,G,K,V,W,J,U,Y,Z,Q,X,ee,te,ne,ie,re,se,ae,le,ce,de,ue,fe,pe,ge,he,me;return s=new oe({props:{height:5}}),$=new oe({props:{height:5}}),w=new oe({props:{height:6}}),P=new oe({props:{height:6}}),D=new oe({props:{height:6}}),W=new oe({props:{height:12}}),Z=new oe({props:{height:6}}),re=new oe({props:{height:6}}),ce=new oe({props:{height:12}}),ue=new oe({props:{height:12}}),{c(){n=f(\"section\"),i=f(\"div\"),i.textContent=\"Already have a license? Nice! Enter your key here:\",r=g(),O(s.$$.fragment),a=g(),l=f(\"input\"),b=g(),O($.$$.fragment),y=g(),x=f(\"button\"),x.textContent=\"Activate license\",v=g(),O(w.$$.fragment),k=g(),_=f(\"div\"),L=f(\"span\"),L.textContent=\"Error:\",C=g(),E=f(\"span\"),E.textContent=\"There has been an error! Try again please.\",A=g(),T=f(\"section\"),M=f(\"div\"),R=p(\"Free uses left in this file:\\n    \"),j=f(\"span\"),j.textContent=\"5\",H=g(),O(P.$$.fragment),q=g(),B=f(\"a\"),B.textContent=\"Get unlimited license\",F=g(),O(D.$$.fragment),G=g(),K=f(\"button\"),K.textContent=\"Activate license\",V=g(),O(W.$$.fragment),J=g(),U=f(\"div\"),U.innerHTML='Learn:\\n    <a href=\"https://dominate.design/guide?r=20\" target=\"_blank\" class=\"black-link\">Master interactive guide</a>',Y=g(),O(Z.$$.fragment),Q=g(),X=f(\"div\"),X.innerHTML='Support:\\n    <a href=\"mailto:gleb@dominate.design\" target=\"_blank\" class=\"black-link\">gleb@dominate.design</a>',ee=g(),te=f(\"section\"),ne=f(\"div\"),ne.textContent=\"Thanks for purchasing Master!\",ie=g(),O(re.$$.fragment),se=g(),ae=f(\"div\"),ae.innerHTML='<div class=\"type text-regular single-line\">Send questions and feedback:</div> \\n    <div class=\"type text-regular single-line\"><span class=\"type--purple\">•</span>\\n      Twitter DM\\n      <a href=\"https://twitter.com/zyumbik\" target=\"_blank\" class=\"black-link\">@zyumbik</a></div> \\n    <div class=\"type text-regular single-line\"><span class=\"type--purple\">•</span>\\n      Email\\n      <a href=\"mailto:gleb@dominate.design\" target=\"_blank\" class=\"black-link\">gleb@dominate.design</a></div>',le=g(),O(ce.$$.fragment),de=g(),O(ue.$$.fragment),fe=g(),pe=f(\"div\"),pe.innerHTML='<svg id=\"heart-logo\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M28 10.2001L22 5.6L16 10.2001L10 5.6L4 10.2001V17.0001L10 21.6001L16\\n        26.2001L22 21.6001L28 17.0001V10.2001Z\" fill=\"#FF5387\"></path></svg>',m(i,\"class\",\"type text-regular\"),m(l,\"id\",\"input-license\"),m(l,\"class\",\"input\"),m(l,\"type\",\"text\"),m(l,\"placeholder\",\"License key\"),m(x,\"id\",\"button-activate\"),m(x,\"class\",\"button button--primary\"),x.disabled= true,m(L,\"class\",\"type text-bold type--red\"),m(E,\"id\",\"error-text\"),m(E,\"class\",\"svelte-s2f0de\"),m(_,\"class\",\"type text-regular invis\"),m(_,\"id\",\"license-activate-error\"),m(n,\"id\",\"license-activate\"),m(n,\"class\",\"block invis\"),m(j,\"id\",\"free-uses-left-num\"),m(M,\"class\",\"type text-medium\"),m(B,\"id\",\"button-buy\"),m(B,\"class\",\"button button--primary\"),m(B,\"href\",\"https://dominate.design/buy?r=21\"),m(B,\"target\",\"_blank\"),m(K,\"id\",\"button-open-activate\"),m(K,\"class\",\"button button--secondary\"),m(U,\"id\",\"learn-master-1\"),m(U,\"class\",\"type text-regular single-line\"),m(X,\"class\",\"type text-regular single-line\"),m(T,\"id\",\"license-trial\"),m(T,\"class\",\"block invis\"),m(ne,\"class\",\"type text-medium\"),m(ne,\"id\",\"thank-you-header\"),m(ae,\"id\",\"support-contacts\"),m(pe,\"id\",\"heart-container\"),m(pe,\"class\",\"svelte-s2f0de\"),m(te,\"id\",\"license-thank-you\"),m(te,\"class\",\"block invis\")},m(e,o){d(e,n,o),c(n,i),c(n,r),N(s,n,null),c(n,a),c(n,l),t[12](l),c(n,b),N($,n,null),c(n,y),c(n,x),t[13](x),c(n,v),N(w,n,null),c(n,k),c(n,_),c(_,L),c(_,C),c(_,E),t[14](E),t[15](_),t[16](n),d(e,A,o),d(e,T,o),c(T,M),c(M,R),c(M,j),t[17](j),c(T,H),N(P,T,null),c(T,q),c(T,B),c(T,F),N(D,T,null),c(T,G),c(T,K),t[18](K),c(T,V),N(W,T,null),c(T,J),c(T,U),c(T,Y),N(Z,T,null),c(T,Q),c(T,X),t[19](T),d(e,ee,o),d(e,te,o),c(te,ne),c(te,ie),N(re,te,null),c(te,se),c(te,ae),c(te,le),N(ce,te,null),c(te,de),N(ue,te,null),c(te,fe),c(te,pe),t[20](te),ge= true,he||(me=[h(l,\"input\",t[10]),h(x,\"click\",t[11]),h(K,\"click\",t[9])],he= true)},p:e,i(e){ge||(I(s.$$.fragment,e),I($.$$.fragment,e),I(w.$$.fragment,e),I(P.$$.fragment,e),I(D.$$.fragment,e),I(W.$$.fragment,e),I(Z.$$.fragment,e),I(re.$$.fragment,e),I(ce.$$.fragment,e),I(ue.$$.fragment,e),ge= true)},o(e){S(s.$$.fragment,e),S($.$$.fragment,e),S(w.$$.fragment,e),S(P.$$.fragment,e),S(D.$$.fragment,e),S(W.$$.fragment,e),S(Z.$$.fragment,e),S(re.$$.fragment,e),S(ce.$$.fragment,e),S(ue.$$.fragment,e),ge= false},d(e){e&&u(n),z(s),t[12](null),z($),t[13](null),z(w),t[14](null),t[15](null),t[16](null),e&&u(A),e&&u(T),t[17](null),z(P),z(D),t[18](null),z(W),z(Z),t[19](null),e&&u(ee),e&&u(te),z(re),z(ce),z(ue),t[20](null),he= false,o(me)}}}ee(\"#heart-container.svelte-s2f0de{display:flex;justify-content:center}#error-text.svelte-s2f0de{white-space:pre-wrap}\");function re(e,t,n){async function o(e,t,n,o=i){const r=new AbortController,s=r.signal,a={method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(t),signal:s};let l={status:0,code:0,body:\"\"},c=setTimeout((()=>{console.log(\"Fetch took too long!\"),l.body=\"Request took too long. Try again a couple of times.\",r.abort()}),6e3);await fetch(\"https://master-server.glitch.me/plugin/\"+e,a).then((e=>(e.ok||(console.log(\"ERROR: Response not OK. Status:\",e.status),l.status=e.status,l.code=1),e.text()))).then((e=>{l.body=e,console.log(e);let t=JSON.parse(e);void 0!==t.error&&null!==t.error?(console.log(\"ERROR fetchFromServer:\",t.error),console.log(\"RESPONSE:\",t),l.body=t.error,l.code=2):n(t)})).catch((e=>{console.log(\"ERROR in fetch\",e),l.code=3,\"Failed to fetch\"===e.message?l.body='<a href=\"https://dominate.design/open-console?r=20\" class=\"black-link\" target=\"_blank\">Open console</a> and send to gleb@dominate.design':\"\"===l.body&&(l.body=e)})),clearTimeout(c),0!==l.code&&o(l)}function i(e){F.send(D,\"Error \"+e.code+\": \"+e.body)}let r,s,a,l,c,d,u,f,p,g;function h(e){n(7,p.innerHTML=e,p),f.classList.remove(\"invis\")}function m(){f.classList.add(\"invis\")}function b(e,t){n(4,d.value=e.trim(),d),t?g.classList.remove(\"invis\"):(c.classList.remove(\"invis\"),h(\"Your license was refunded and can't be used.\"))}return F.on(K,(e=>{o(\"createUser\",{},(e=>{e.userId?F.send(K,e.userId):F.send(K,0)}),(e=>{i(e),F.send(K,0)}))})),F.on(V,(e=>{b(e.key,e.isValid),r=e.id})),F.on(W,(e=>{var t;t=e.usesLeft,s.classList.remove(\"invis\"),n(2,l.innerHTML=t+\"\",l),r=e.id})),F.on(J,(e=>{o(\"activate\",{licenseKey:e.key,userId:e.id,statistics:e.statistics},(e=>{F.send(J,e)}),(e=>{F.send(J,e)}))})),[s,a,l,c,d,u,f,p,g,function(){s.classList.add(\"invis\"),c.classList.remove(\"invis\"),m(),d.focus()},function(){d.value.length>1?n(5,u.disabled= false,u):n(5,u.disabled= true,u)},function(){const e=d.value.trim();\"\"!==e&&(m(),n(5,u.disabled= true,u),n(4,d.disabled= true,d),o(\"activate\",{licenseKey:e,userId:r},(t=>{!0===t.isActivated||t.isAlreadyActivated?(F.send(J,e),c.classList.add(\"invis\"),b(e, true)):(t.isAlreadyActivated?h(\"License is already activated in another app.\"):t.isRefunded?h(\"Your license was refunded and can't be used.\"):t.isInvalid?h(\"Entered license number is invalid.\"):(h(\"Weird. Unknown error! Contact me: gleb@dominate.design\"),n(5,u.disabled= false,u)),n(4,d.disabled= false,d),d.focus())}),(e=>{h(e.body),n(5,u.disabled= false,u),n(4,d.disabled= false,d)})))},function(e){v[e?\"unshift\":\"push\"]((()=>{d=e,n(4,d)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{u=e,n(5,u)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{p=e,n(7,p)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{f=e,n(6,f)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{c=e,n(3,c)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{l=e,n(2,l)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{a=e,n(1,a)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{s=e,n(0,s)}))},function(e){v[e?\"unshift\":\"push\"]((()=>{g=e,n(8,g)}))}]}class se extends P{constructor(e){super(),H(this,e,re,ie,r,{})}}function ae(e){let t,n,o,i,r,s,a,l,p,h,b,y,x,v,w;return i=new oe({props:{height:6}}),l=new oe({props:{height:12}}),y=new oe({props:{height:6}}),{c(){t=f(\"section\"),n=f(\"div\"),n.textContent=\"Link objects to component?\",o=g(),O(i.$$.fragment),r=g(),s=f(\"div\"),s.textContent=\"Learn how to turn any objects into instances of a component\",a=g(),O(l.$$.fragment),p=g(),h=f(\"a\"),h.textContent=\"Watch the video\",b=g(),O(y.$$.fragment),x=g(),v=f(\"a\"),v.textContent=\"Get the free guide\",m(n,\"class\",\"type text-medium\"),m(s,\"id\",\"learn-master-1\"),m(s,\"class\",\"type text-regular\"),m(h,\"class\",\"button button--primary\"),m(h,\"href\",\"https://dominate.design/video?r=22\"),m(h,\"target\",\"_blank\"),m(v,\"class\",\"button button--secondary\"),m(v,\"href\",\"https://dominate.design/guide?r=23\"),m(v,\"target\",\"_blank\"),m(t,\"id\",\"learn-master\"),m(t,\"class\",\"block\"),$(t,\"invis\",!e[0])},m(e,u){d(e,t,u),c(t,n),c(t,o),N(i,t,null),c(t,r),c(t,s),c(t,a),N(l,t,null),c(t,p),c(t,h),c(t,b),N(y,t,null),c(t,x),c(t,v),w= true},p(e,[n]){1&n&&$(t,\"invis\",!e[0])},i(e){w||(I(i.$$.fragment,e),I(l.$$.fragment,e),I(y.$$.fragment,e),w= true)},o(e){S(i.$$.fragment,e),S(l.$$.fragment,e),S(y.$$.fragment,e),w= false},d(e){e&&u(t),z(i),z(l),z(y)}}}function le(e,t,n){let o= false;return F.on(Y,(()=>{n(0,o= true),window.focus()})),window.addEventListener(\"keyup\",(e=>{\"Escape\"===e.key&&F.send(X, true)})),[o]}class ce extends P{constructor(e){super(),H(this,e,le,ae,r,{})}}function de(e){let t,n,o,i,r,s,a,l,p,b,y,x,v,w,k,_,L;return i=new oe({props:{height:6}}),l=new oe({props:{height:10}}),x=new oe({props:{height:12}}),{c(){t=f(\"section\"),n=f(\"div\"),n.textContent=\"Diligent learning pays off!\",o=g(),O(i.$$.fragment),r=g(),s=f(\"div\"),s.textContent=\"Congrats, you completed the Master guide! I’d love to reward you for that\\n    with a discount!\",a=g(),O(l.$$.fragment),p=g(),b=f(\"a\"),b.textContent=\"Get the discount!\",y=g(),O(x.$$.fragment),v=g(),w=f(\"div\"),w.textContent=\"Don’t show this again\",m(n,\"class\",\"type text-medium\"),m(s,\"class\",\"type text-regular\"),m(b,\"class\",\"button button--primary\"),m(b,\"href\",\"https://dominate.design/buy?r=25&code=masterguide\"),m(b,\"target\",\"_blank\"),m(w,\"class\",\"type text-regular text-secondary svelte-9iiqfb\"),m(t,\"id\",\"launch-section\"),m(t,\"class\",\"block\"),$(t,\"invis\",!e[0])},m(u,f){d(u,t,f),c(t,n),c(t,o),N(i,t,null),c(t,r),c(t,s),c(t,a),N(l,t,null),c(t,p),c(t,b),c(t,y),N(x,t,null),c(t,v),c(t,w),k= true,_||(L=h(w,\"click\",e[1]),_= true)},p(e,[n]){1&n&&$(t,\"invis\",!e[0])},i(e){k||(I(i.$$.fragment,e),I(l.$$.fragment,e),I(x.$$.fragment,e),k= true)},o(e){S(i.$$.fragment,e),S(l.$$.fragment,e),S(x.$$.fragment,e),k= false},d(e){e&&u(t),z(i),z(l),z(x),_= false,L()}}}function ue(e,t,n){let o= false;return F.on(Z,(()=>{n(0,o= true),window.focus()})),[o,function(){F.send(Q,\"true\")}]}ee(\".text-secondary.svelte-9iiqfb{cursor:pointer;text-decoration:underline}.text-secondary.svelte-9iiqfb:hover{color:rgba(0,0,0,.8)}\");class fe extends P{constructor(e){super(),H(this,e,ue,de,r,{})}}function pe(t){let n,o,i,r,s,a;return n=new se({}),i=new ce({}),s=new fe({}),{c(){O(n.$$.fragment),o=g(),O(i.$$.fragment),r=g(),O(s.$$.fragment)},m(e,t){N(n,e,t),d(e,o,t),N(i,e,t),d(e,r,t),N(s,e,t),a= true},p:e,i(e){a||(I(n.$$.fragment,e),I(i.$$.fragment,e),I(s.$$.fragment,e),a= true)},o(e){S(n.$$.fragment,e),S(i.$$.fragment,e),S(s.$$.fragment,e),a= false},d(e){z(n,e),e&&u(o),z(i,e),e&&u(r),z(s,e)}}}function ge(e){let t=window.outerWidth,n=window.outerHeight;return F.send(G,{w:t,h:n}),F.on(U,(()=>{window.focus()})),[]}ee('@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\");body,html{border-radius:0 0 3px 3px;height:100%;margin:0;overflow:hidden;padding:0;width:100%}body{-webkit-font-smoothing:antialiased;color:rgba(0,0,0,.8);display:flex;flex-direction:column;font-family:Inter,Roboto,sans-serif;font-size:11px;font-style:normal;font-weight:400;line-height:16px}*{-webkit-box-sizing:border-box;box-sizing:border-box}.type{color:rgba(0,0,0,.8);font-family:Inter,Roboto,sans-serif;font-size:11px;letter-spacing:.005em;line-height:16px;margin:0;padding:0}.text-regular,.type{font-weight:400}.text-medium{font-weight:500}.text-bold{font-weight:600}.text-secondary{color:rgba(0,0,0,.3)}.invis{display:none}section{display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;height:159px;overflow:hidden;padding:10px 16px;width:200px}section.block>*{width:100%}.black-link{color:rgba(0,0,0,.8)}.black-link:active,.black-link:focus,.black-link:hover{color:#ff5387}.type.type--red{color:#ef492e;opacity:1}.type--purple{color:#7b61ff}button:not(:disabled){cursor:pointer}.button{text-align:center;text-decoration:none}.single-line{white-space:nowrap}.button{-ms-flex-negative:0;border:2px solid transparent;border-radius:6px;display:inline-block;flex-shrink:0;line-height:16px;margin:1px 0;outline:none;padding:5px 16px}.button--primary{background-color:#7b61ff;color:#fff;font-family:Inter,sans-serif;font-size:11px;font-weight:500;letter-spacing:.01em}.button--primary:active,.button--primary:focus{border:2px solid rgba(0,0,0,.3)}.button--primary:disabled{background-color:rgba(0,0,0,.3)}.button--secondary{background-color:#fff;border:1px solid #7b61ff;color:rgba(0,0,0,.8);font-family:Inter,sans-serif;font-size:11px;font-weight:500;letter-spacing:.005em;line-height:16px;margin:1px;padding:6px 16px}.button--secondary:active,.button--secondary:focus{border:2px solid #7b61ff;padding:5px 16px}.button--secondary:disabled{border:1px solid rgba(0,0,0,.3);color:rgba(0,0,0,.3)}.input{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;border:1px solid transparent;border-radius:2px;display:-webkit-box;display:-ms-flexbox;display:flex;font-family:Inter,Roboto,sans-serif;font-size:11px;font-weight:400;height:30px;letter-spacing:.005em;line-height:16px;margin:1px 0;outline:none;padding:8px 4px 8px 7px;width:100%}.input,.input:hover{color:rgba(0,0,0,.8)}.input:hover{border:1px solid rgba(0,0,0,.1)}.input:active,.input:focus{border:2px solid #7b61ff;border-radius:2px;color:#000;padding:8px 4px 8px 6px}.input::-moz-selection{background-color:rgba(24,145,251,.3);color:#000}.input::selection{background-color:rgba(24,145,251,.3);color:#000}.input::-webkit-input-placeholder{color:rgba(0,0,0,.3)}.input:-ms-input-placeholder{color:rgba(0,0,0,.3)}.input::-ms-input-placeholder{color:rgba(0,0,0,.3)}.input::placeholder{color:rgba(0,0,0,.3)}.input:disabled{color:rgba(0,0,0,.3)}');return new class extends P{constructor(e){super(),H(this,e,ge,pe,r,{})}}({target:document.body})}();\n</script>\n</body>\n</html>";
"use strict";
var e = function (n, t) {
    return (e = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function (e, n) {
            e.__proto__ = n
        } || function (e, n) {
            for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
        })(n, t)
};

function n(n, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

    function r() {
        this.constructor = n
    }
    e(n, t), n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
}

function t(e, n, t, r) {
    return new(t || (t = Promise))((function (i, o) {
        function s(e) {
            try {
                c(r.next(e))
            } catch (e) {
                o(e)
            }
        }

        function a(e) {
            try {
                c(r.throw(e))
            } catch (e) {
                o(e)
            }
        }

        function c(e) {
            var n;
            e.done ? i(e.value) : (n = e.value, n instanceof t ? n : new t((function (e) {
                e(n)
            }))).then(s, a)
        }
        c((r = r.apply(e, n || [])).next())
    }))
}

function r(e, n) {
    var t, r, i, o, s = {
        label: 0,
        sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1]
        },
        trys: [],
        ops: []
    };
    return o = {
        next: a(0),
        throw: a(1),
        return: a(2)
    }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
        return this
    }), o;

    function a(o) {
        return function (a) {
            return function (o) {
                if (t) throw new TypeError("Generator is already executing.");
                for (; s;) try {
                    if (t = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                    switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                    case 0:
                    case 1:
                        i = o;
                        break;
                    case 4:
                        return s.label++, {
                            value: o[1],
                            done: false
                        };
                    case 5:
                        s.label++, r = o[1], o = [0];
                        continue;
                    case 7:
                        o = s.ops.pop(), s.trys.pop();
                        continue;
                    default:
                        if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                            s = 0;
                            continue
                        }
                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                            s.label = o[1];
                            break
                        }
                        if (6 === o[0] && s.label < i[1]) {
                            s.label = i[1], i = o;
                            break
                        }
                        if (i && s.label < i[2]) {
                            s.label = i[2], s.ops.push(o);
                            break
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue
                    }
                    o = n.call(e, s)
                } catch (e) {
                    o = [6, e], r = 0
                } finally {
                    t = i = 0
                }
                if (5 & o[0]) throw o[1];
                return {
                    value: o[0] ? o[1] : void 0,
                    done: true
                }
            }([o, a])
        }
    }
}

function i(e) {
    const n = [],
        t = {},
        r = e => {
            if (!e.hasOwnProperty("name") || !e.hasOwnProperty("data")) return console.error("Incorrect message", e);
            if (!n[e.name]) return console.error("No listener for message", e.name);
            for (let t = 0; t < n[e.name].length; t++) {
                const r = n[e.name][t];
                "function" == typeof r && r(e.data)
            }
        };
    return e ? window.onmessage = e => r(e.data.pluginMessage) : figma.ui.onmessage = e => r(e), t.on = (e, t) => {
        Array.isArray(n[e]) || (n[e] = []), n[e].push(t)
    }, t.off = e => {
        delete n[e]
    }, t.once = (e, r) => {
        Array.isArray(n[e]) || (n[e] = []);
        const i = n[e].length;
        t.on(e, (t => {
            r(t), n[e].splice(i, 1)
        }))
    }, t.async = e => new Promise((n => {
        t.once(e, n)
    })), t.send = (n, t) => {
        if ("string" != typeof n) throw new Error("Expected name to be string");
        const r = {
            name: n,
            data: t
        };
        e ? window.parent.postMessage({
            pluginMessage: r
        }, "*") : figma.ui.postMessage(r)
    }, t
}
const o = "undefined" == typeof figma;
o && i(true);
const s = o ? void 0 : i(),
    a = "0",
    c = "1",
    u = "2",
    l = "3",
    d = "4",
    h = "5",
    f = "10",
    p = "11",
    m = "12",
    v = "14";
var g = {
        ID: "USER_ID",
        SUCCESSES: "USER_SUCCESS_COUNT",
        LAUNCHES: "USER_LAUNCH_COUNT",
        SAVE_LAUNCHES: "USER_COUNT_SAVE",
        LICENSE_KEY: "LICENSE_KEY",
        LICENSE_VALID: "LICENSE_VALID"
    },
    y = "STATISTICS",
    C = {
        detachedNodeName: "",
        nodesDetached: 0,
        instancesToCreate: 0,
        nodesSkipped: 0,
        componentsSkipped: 0,
        nodesProcessed: 0,
        libraryComponents: 0,
        nodesChecked: 0,
        propertiesOverriden: 0,
        instancesOverriden: 0,
        minProcessingTime: -1,
        maxProcessingTime: -1,
        searchNodesTotal: 0,
        command: "",
        timeTotal: 0,
        timeStamp: Date.now()
    };

function b() {
    return t(this, void 0, void 0, (function () {
        var e;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return "SAVE" === C.command ? [2] : [4, S()];
            case 1:
                return e = n.sent(), C.instancesToCreate > 0 && e.push(C), [4, figma.clientStorage.setAsync(y, e)];
            case 2:
                return n.sent(), [2]
            }
        }))
    }))
}

function S() {
    return t(this, void 0, void 0, (function () {
        var e;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return [4, figma.clientStorage.getAsync(y)];
            case 1:
                return (e = n.sent()) || (e = []), [2, e]
            }
        }))
    }))
}

function E() {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (e) {
            switch (e.label) {
            case 0:
                return [4, figma.clientStorage.setAsync(y, [])];
            case 1:
                return e.sent(), [2]
            }
        }))
    }))
}
var A, w = "mg-k",
    T = "mg-v",
    N = "mg-page-complete",
    I = "REWARD_SILENCED",
    O = null;

function x() {
    if ("boolean" == typeof O) return console.log("Already checked if is guide!"), O;
    var e = "dHTv58eJ" === figma.root.getPluginData(w),
        n = figma.root.name.includes("Master Plugin Guide"),
        t = parseInt(figma.root.getPluginData(T));
    return (O = e || n) && (C.guideInfo = {
        isFileGuide: e,
        isFileNameGuide: n,
        fileGuideVersion: isNaN(t) ? t : 0,
        isGuideComplete: false,
        fileName: figma.root.name
    }), O
}

function k() {
    return t(this, void 0, void 0, (function () {
        var e = this;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return O ? (figma.currentPage.setPluginData(N, "true"), function () {
                    for (var e = figma.root.children, n = 0; n < e.length; n++) {
                        var t = e[n],
                            r = t.name.includes("——") || t.name.includes("✔"),
                            i = "true" === t.getPluginData(N);
                        if (!r && !i) return false
                    }
                    return true
                }() ? (C.guideInfo.isGuideComplete = true, console.log("Yeah, this guide is complete!"), [4, figma.clientStorage.getAsync(I)]) : [3, 2]) : [2, true];
            case 1:
                return n.sent() ? [2, true] : (console.log("Opening reward!"), s.send(p, "true"), figma.ui.show(), s.on(m, (function () {
                    return t(e, void 0, void 0, (function () {
                        return r(this, (function (e) {
                            switch (e.label) {
                            case 0:
                                return [4, figma.clientStorage.setAsync(I, true)];
                            case 1:
                                return e.sent(), figma.closePlugin(), [2]
                            }
                        }))
                    }))
                })), [2, false]);
            case 2:
                return [2, true]
            }
        }))
    }))
}

function P(e) {
    return new Promise((function (n) {
        return setTimeout(n, e)
    }))
}

function L(e, n) {
    A && (A.cancel(), A = null), A = figma.notify(e, n)
}

function _() {
    A && (A.cancel(), A = null)
}

function M(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, a, c;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return i = (t = s).send, o = [h], c = {
                    key: e,
                    id: n
                }, [4, S()];
            case 1:
                return i.apply(t, o.concat([(c.statistics = r.sent(), c)])), console.log("sent, awaiting message 5"), [4, s.async(h)];
            case 2:
                return (a = r.sent()).statisticsSaved ? (console.log("Usage stats saved to the server"), [4, E()]) : [3, 4];
            case 3:
                r.sent(), r.label = 4;
            case 4:
                return [2, a]
            }
        }))
    }))
}
var D = "FILE_SUCCESS_COUNT";

function R(e) {
    var n = 5 - e;
    return n < 0 && (n = 0), n
}

function U() {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (e) {
            return figma.root.setPluginData(D, "0"), [2]
        }))
    }))
}

function V() {
    return t(this, void 0, void 0, (function () {
        var e;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return [4, F("", false)];
            case 1:
                return n.sent(), s.send(u, ""), [4, s.async(u)];
            case 2:
                return e = n.sent(), [4, figma.clientStorage.setAsync(g.ID, e)];
            case 3:
                return n.sent(), [4, K(0)];
            case 4:
                return n.sent(), [2, e]
            }
        }))
    }))
}

function G() {
    return t(this, void 0, void 0, (function () {
        var e, n;
        return r(this, (function (t) {
            switch (t.label) {
            case 0:
                return e = figma.root.getPluginData(D), n = Number(e), isNaN(n) || "" === e ? [4, U()] : [3, 2];
            case 1:
                t.sent(), n = 0, t.label = 2;
            case 2:
                return [2, n]
            }
        }))
    }))
}

function F(e, n) {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (t) {
            switch (t.label) {
            case 0:
                return [4, figma.clientStorage.setAsync(g.LICENSE_VALID, n)];
            case 1:
                return t.sent(), [4, figma.clientStorage.setAsync(g.LICENSE_KEY, e)];
            case 2:
                return [2, t.sent()]
            }
        }))
    }))
}

function j() {
    return t(this, void 0, void 0, (function () {
        var e, n;
        return r(this, (function (t) {
            switch (t.label) {
            case 0:
                return [4, figma.clientStorage.getAsync(g.LICENSE_KEY)];
            case 1:
                return e = t.sent(), [4, figma.clientStorage.getAsync(g.LICENSE_VALID)];
            case 2:
                return n = t.sent(), [2, {
                    key: e,
                    isValid: n
                }]
            }
        }))
    }))
}

function Y() {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (e) {
            switch (e.label) {
            case 0:
                return [4, figma.clientStorage.getAsync(g.SUCCESSES)];
            case 1:
                return [2, e.sent()]
            }
        }))
    }))
}

function K(e) {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return [4, figma.clientStorage.setAsync(g.SUCCESSES, e)];
            case 1:
                return n.sent(), [2]
            }
        }))
    }))
}

function B() {
    return t(this, void 0, void 0, (function () {
        var e;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return [4, figma.clientStorage.getAsync(g.ID)];
            case 1:
                return (e = n.sent()) ? [3, 3] : [4, V()];
            case 2:
                e = n.sent(), n.label = 3;
            case 3:
                return [2, e]
            }
        }))
    }))
}

function z(e, n) {
    return t(this, void 0, void 0, (function () {
        var t;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return [4, M(e.key, n)];
            case 1:
                return (t = r.sent()).isAlreadyActivated ? (console.log("License check successful!"), [2, true]) : [3, 2];
            case 2:
                return t.isActivated ? (console.log("License activation successful!"), [2, true]) : [3, 3];
            case 3:
                return t.isRefunded || t.isInvalid ? (L("Your license is invalid or was refunded."), [4, F(e.key, false)]) : [3, 5];
            case 4:
                return r.sent(), [2, false];
            case 5:
                return console.log("ignoring license check"), [2, true]
            }
        }))
    }))
}
var H = {
    addLaunch: function (e) {
        return void 0 === e && (e = "general"), t(this, void 0, void 0, (function () {
            var n, t, i;
            return r(this, (function (r) {
                switch (r.label) {
                case 0:
                    return n = g.LAUNCHES, "save" === e && (n = g.SAVE_LAUNCHES), [4, figma.clientStorage.getAsync(n)];
                case 1:
                    return t = r.sent(), i = t ? t + 1 : 1, [4, figma.clientStorage.setAsync(n, i)];
                case 2:
                    return r.sent(), [2, i]
                }
            }))
        }))
    },
    addSuccess: function () {
        return t(this, void 0, void 0, (function () {
            var e, n, t, i, o, s, a;
            return r(this, (function (r) {
                switch (r.label) {
                case 0:
                    return [4, G()];
                case 1:
                    return e = r.sent() + 1, figma.root.setPluginData(D, "" + e), [4, j()];
                case 2:
                    return n = r.sent(), (t = "" === n.key) && x() ? [4, B()] : [3, 6];
                case 3:
                    return i = r.sent(), [4, k()];
                case 4:
                    return o = r.sent(), [4, z(n, i)];
                case 5:
                    return r.sent(), [2, o];
                case 6:
                    return n.isValid && !t ? [2, true] : (s = 2e3, L("You have " + R(e) + " trial uses left in this file.", {
                        timeout: s
                    }), [4, Y()]);
                case 7:
                    return a = r.sent() + 1, [4, Promise.all([K(a), P(s)])];
                case 8:
                    return r.sent(), [2, true]
                }
            }))
        }))
    },
    checkLicense: function () {
        return t(this, void 0, void 0, (function () {
            var e, n, t, i, o;
            return r(this, (function (r) {
                switch (r.label) {
                case 0:
                    return [4, B()];
                case 1:
                    return e = r.sent(), [4, j()];
                case 2:
                    return n = r.sent(), o = {}, [4, G()];
                case 3:
                    return o.successCount = r.sent(), o.key = n.key, o.isValid = n.isValid, o.userId = e, o.isGuideFile = x(), (t = o).isValid && "" !== t.key ? [3, 4] : (t.isValid = false, (R(t.successCount) > 0 || t.isGuideFile) && (t.isValid = true), [3, 6]);
                case 4:
                    return (t.successCount - 1) % 5 != 0 || t.isGuideFile ? [3, 6] : (i = t, [4, z(t, e)]);
                case 5:
                    i.isValid = r.sent(), r.label = 6;
                case 6:
                    return [2, t]
                }
            }))
        }))
    },
    showWindow: function (e) {
        return t(this, void 0, void 0, (function () {
            return r(this, (function (n) {
                var t, r, i, o, a, c;
                return "string" == typeof e.key && "" !== e.key ? (o = e.key, a = e.userId, c = e.isValid, s.send(l, {
                    key: o,
                    id: a,
                    isValid: c
                })) : (t = R(e.successCount), r = e.isGuideFile, i = e.userId, s.send(d, {
                    usesLeft: t,
                    id: i,
                    isGuideFile: r
                })), figma.ui.show(), s.once(h, (function (e) {
                    F(e, true)
                })), [2]
            }))
        }))
    }
};
var W = {
        w: 1200,
        h: 700
    },
    q = {
        moveIntoView: function (e) {
            return t(this, void 0, void 0, (function () {
                var n, t, i, o, s, a, c, u, l, d, h, f, p, m, v, g, y;
                return r(this, (function (r) {
                    switch (r.label) {
                    case 0:
                        return n = {
                            x: Math.round(e.x + e.width / 2),
                            y: Math.round(e.y + e.height / 2)
                        }, t = function (e) {
                            return {
                                x: e.x,
                                y: e.y
                            }
                        }(figma.viewport.center), i = figma.viewport.zoom, s = {
                            x: ((o = W).w - 400) / 2 / i,
                            y: (o.h - 80) / 2 / i
                        }, (c = {
                            x: (a = function (e, n, t) {
                                return t > e - n && t < e + n
                            })(t.x, s.x, n.x),
                            y: a(t.y, s.y, n.y)
                        }).x && c.y ? [2] : (u = function (e) {
                            return e > 0 ? 1 : -1
                        }, l = {
                            x: t.x,
                            y: t.y
                        }, c.x || (d = u(t.x - n.x), l.x = n.x + (s.x - 200 / i - e.width) * d), c.y || (d = u(t.y - n.y), l.y = n.y + (s.y - 100 / i - e.height) * d), h = {
                            x: l.x - t.x,
                            y: l.y - t.y
                        }, f = Math.sqrt(h.x * h.x + h.y * h.y), (m = f / 1500 * i * (p = 1e3)) > 5e3 && (m = 5e3), 60, p / 60, v = m / p * 60, g = 1, y = function (e, n) {
                            return e /= n, --e * e * e + 1
                        }, [4, function () {
                            return new Promise((function (e) {
                                var n = 0;
                                n = setInterval((function () {
                                    if (g >= v) return clearInterval(n), figma.viewport.center = l, void e(void 0);
                                    var r = {
                                        x: figma.viewport.center.x,
                                        y: figma.viewport.center.y
                                    };
                                    0 !== h.y && (r.y = t.y + h.y * y(g, v)), 0 !== h.x && (r.x = t.x + h.x * y(g, v)), figma.viewport.center = r, g++
                                }), 16.666666666666668)
                            }))
                        }()]);
                    case 1:
                        return r.sent(), [2]
                    }
                }))
            }))
        },
        windowSize: W
    };

function X(e) {
    return "COMPONENT" === e.type
}

function J(e) {
    return "INSTANCE" === e.type
}

function Z(e) {
    var n = e.type;
    return "FRAME" === n || "COMPONENT" === n || "INSTANCE" === n || "BOOLEAN_OPERATION" === n || "GROUP" === n || "COMPONENT_SET" === n
}

function Q(e) {
    return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
var $ = {
    page: function (e) {
        return "PAGE" === e.type
    },
    component: X,
    componentSet: function (e) {
        return "COMPONENT_SET" === e.type
    },
    instance: J,
    frameOrGroupOrInstance: function (e) {
        var n = e.type;
        return "FRAME" === n || "GROUP" === n || "INSTANCE" === n
    },
    frameLike: function (e) {
        var n = e.type;
        return "FRAME" === n || "COMPONENT" === n || "INSTANCE" === n
    },
    supportsChildrenScene: Z,
    supportsChildrenAll: function (e) {
        var n = e.type;
        return "FRAME" === n || "COMPONENT" === n || "INSTANCE" === n || "BOOLEAN_OPERATION" === n || "GROUP" === n || "DOCUMENT" === n || "PAGE" === n || "COMPONENT_SET" === n
    },
    matchingStructure: function (e, n) {
        if (!Z(e)) return true;
        if (e.children.length !== n.children.length) return false;
        for (var t = 0; t < n.children.length; t++) {
            var r = n.children[t],
                i = e.children[t];
            if (r.type !== i.type) {
                if (!Z(i) || !Z(r)) return false;
                if (X(i)) return false
            }
        }
        return true
    },
    equivalent: function e(n, t) {
        if (n === t) return true;
        if (!(n instanceof Object || t instanceof Object)) return false;
        if (Q(n) !== Q(t)) return false;
        if (Array.isArray(n) && Array.isArray(t)) {
            var r = n.length,
                i = t.length;
            if (r !== i) return false;
            if (r === i)
                for (var o = 0; o < r; o++)
                    if (!e(n[o], t[o])) return false;
            return true
        }
        var s = Object.getOwnPropertyNames(n),
            a = Object.getOwnPropertyNames(t).length,
            c = s.length;
        if (c !== a) return false;
        o = 0;
        for (var u = c; o < u; o++) {
            var l = s[o];
            if (!e(n[l], t[l])) return false
        }
        return true
    },
    mixed: function (e) {
        return e === figma.mixed && "symbol" == typeof e
    },
    nestedInInstance: function (e) {
        for (var n = e; n.parent && "PAGE" !== n.parent.type;)
            if (J(n = n.parent)) return true;
        return false
    },
    instanceOfMainComponent: function (e, n) {
        if (!J(e)) return false;
        if (null === e.mainComponent) return false;
        try {
            if (e.mainComponent.id === n.id) return true
        } catch (n) {
            console.warn("Error node", e.id, e.name)
        }
        return false
    },
    componentMissingOrRemoved: function (e) {
        return null !== e && null === e.parent && !e.remote
    }
};

function ee(e, n) {
    for (var t = e, r = 0, i = n.length; r < i; r++) {
        if (!$.supportsChildrenScene(t)) return null;
        if (void 0 === (t = t.children[n[r]])) return null
    }
    return t
}

function ne(e) {
    for (var n = e, t = [], r = []; n.parent && "PAGE" !== n.parent.type;) {
        var i = n.parent.children.indexOf(n);
        if (n = n.parent, t.unshift(i), $.instance(n)) r.unshift(n);
        else if ($.component(n)) return {
            isNested: true,
            depth: t,
            parentComponent: n,
            trail: r,
            node: e
        }
    }
    return {
        isNested: false,
        depth: t,
        parentComponent: null,
        trail: r,
        node: e
    }
}

function te(e) {
    for (var n = e, t = null; n.parent && !$.page(n);)($.instance(n) || $.component(n)) && (t = n), n = n.parent;
    return t
}

function re() {
    return figma.currentPage.selection.filter((function (e) {
        return true
    }))
}
var ie = {
        ID: "componentId",
        KEY: "componentKey",
        NAME: "componentName",
        TYPE: "componentType"
    },
    oe = {
        ID: "toLinkComponentId",
        KEY: "toLinkComponentKey",
        NAME: "toLinkComponentName",
        TYPE: "toLinkType"
    };

function se(e, n) {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (t) {
            switch (t.label) {
            case 0:
                return [4, figma.clientStorage.setAsync(n.ID, e.id)];
            case 1:
                return t.sent(), [4, figma.clientStorage.setAsync(n.KEY, e.key)];
            case 2:
                return t.sent(), [4, figma.clientStorage.setAsync(n.NAME, e.name)];
            case 3:
                return t.sent(), [4, figma.clientStorage.setAsync(n.TYPE, e.type)];
            case 4:
                return t.sent(), [2]
            }
        }))
    }))
}

function ae(e) {
    return t(this, void 0, void 0, (function () {
        var n, t, i, o, s, a, c, u;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return [4, figma.clientStorage.getAsync(e.ID)];
            case 1:
                return (n = r.sent()) ? [4, figma.clientStorage.getAsync(e.KEY)] : [2, {
                    component: null,
                    error: "Pick Target Component to link objects to it."
                }];
            case 2:
                return t = r.sent(), [4, figma.clientStorage.getAsync(e.NAME)];
            case 3:
                return i = r.sent(), [4, figma.clientStorage.getAsync(e.TYPE)];
            case 4:
                return o = r.sent(), s = figma.getNodeById(n), a = false, c = null !== s && $.component(s) && s.key !== t, u = null !== s && $.componentSet(s) && s.key !== t, c || u ? [3, 8] : "COMPONENT_SET" !== o ? [3, 6] : [4, figma.importComponentSetByKeyAsync(t).then((function (e) {
                    s = e
                })).catch((function () {
                    a = true
                }))];
            case 5:
                return r.sent(), [3, 8];
            case 6:
                return "COMPONENT" !== o ? [3, 8] : [4, figma.importComponentByKeyAsync(t).then((function (e) {
                    s = e
                })).catch((function () {
                    a = true
                }))];
            case 7:
                r.sent(), r.label = 8;
            case 8:
                return null === s || !$.component(s) && !$.componentSet(s) ? [2, {
                    component: null,
                    error: "Error: Target component “" + i + "” not found. Restore it or publish to Library if not local."
                }] : s.remote && a ? [2, {
                    component: null,
                    error: "Error: Target component “" + i + "” is not publised to Team Library!"
                }] : $.component(s) || $.componentSet(s) ? [2, {
                    component: s,
                    error: null
                }] : [2, {
                    component: null,
                    error: "Component not found."
                }]
            }
        }))
    }))
}

function ce(e) {
    return t(this, void 0, void 0, (function () {
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return null === e.mainComponent ? [3, 2] : [4, se(e.mainComponent, oe)];
            case 1:
                n.sent(), n.label = 2;
            case 2:
                return [2]
            }
        }))
    }))
}

function ue(e, n) {
    void 0 === n && (n = 10);
    for (var t = e * n, r = "", i = 0; i < n; i++) r += i < t ? "◼️" : "◻️";
    return r
}

function le(e, n, t) {
    L(t + "  " + e + "/" + n + "  " + ue(e / n))
}
var de = {},
    he = {};
var fe = {
        start: function (e, n) {
            return e = e.replace(/[:;\/\s]/g, "") + n, de[e] = {
                start: +new Date,
                end: -1
            }, {
                end: function () {
                    de[e].end = +new Date;
                    var t = de[e].end - de[e].start;
                    return he[e] = t, "INSTANCE_CREATE" === n && function (e) {
                        e > C.maxProcessingTime && (C.maxProcessingTime = e);
                        (e < C.minProcessingTime || C.minProcessingTime < 0) && (C.minProcessingTime = e)
                    }(t), t
                },
                check: function () {
                    return +new Date - de[e].start
                }
            }
        }
    },
    pe = function (e) {
        this.value = e, this.next = null
    },
    me = function () {
        function e() {
            this.head = null, this.length = 0
        }
        return e.prototype.addToTheEnd = function (e) {
            var n = new pe(e);
            0 === this.length ? (this.head = n, this.tail = n) : (this.tail.next = n, this.tail = n), this.length++
        }, e.prototype.removeFirst = function () {
            if (null === this.head) return null;
            var e = this.head;
            return this.head = this.head.next, this.length--, null === this.head && (this.tail = null), e.value
        }, e.prototype.toArray = function () {
            if (0 === this.length) return [];
            for (var e = [], n = this.head; null !== n;) e.push({
                value: n.value
            }), n = n.next;
            return e
        }, e
    }(),
    ve = function (e) {
        function t(n, t) {
            var r = e.call(this, n) || this;
            return r.children = [], void 0 !== t && r.addChild(t), r
        }
        return n(t, e), t.prototype.addChild = function (e) {
            this.children.push(e)
        }, t
    }(pe),
    ge = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n(t, e), t.prototype.addToTheEnd = function (e, n) {
            var t = new ve(e, n);
            0 === this.length ? (this.head = t, this.tail = t) : (this.tail.next = t, this.tail = t), this.length++
        }, t.prototype.addUnique = function (e, n) {
            var t = this.getByValue(e);
            null === t ? this.addToTheEnd(e, n) : void 0 !== n && t.addChild(n)
        }, t.prototype.getByValue = function (e) {
            if (0 === this.length) return null;
            for (var n = this.head; null !== n;) {
                if (n.value === e) return n;
                n = n.next
            }
            return null
        }, t.prototype.moveItemBefore = function (e, n) {
            var t = n.next,
                r = null;
            null === e ? (r = this.head, this.head = t) : (r = e.next, e.next = t), t === this.tail && (this.tail = n), n.next = t.next, t.next = r
        }, t.prototype.moveBefore = function (e, n) {
            if (!(this.length < 2) && this.head.value !== e) {
                var t = this.head.value === n,
                    r = this.head.next,
                    i = null,
                    o = this.head;
                for (t || null === r || r.value !== n || (t = true, i = this.head); null !== r;) {
                    if (t || r.value !== n) {
                        if (r.value === e) {
                            if (!t) return;
                            return void this.moveItemBefore(i, o)
                        }
                    } else t = true;
                    o = r, t || (i = r), r = r.next
                }
            }
        }, t.prototype.toArray = function () {
            if (0 === this.length) return [];
            for (var e = [], n = this.head; null !== n;) e.push({
                value: n.value,
                children: n.children
            }), n = n.next;
            return e
        }, t
    }(me),
    ye = function () {
        function e(e) {
            this.adjacentNodesKeys = new Set, this.values = [], void 0 !== e && this.values.push(e)
        }
        return e.prototype.addAdjacent = function (e) {
            this.adjacentNodesKeys.add(e)
        }, e.prototype.addValue = function (e, n) {
            void 0 === n && (n = false), void 0 !== e && (n ? this.values.unshift(e) : this.values.push(e))
        }, e
    }(),
    Ce = function () {
        function e() {
            this.nodes = new Map
        }
        return e.prototype.getNode = function (e) {
            return this.nodes.get(e)
        }, e.prototype.addNode = function (e, n, t) {
            void 0 === t && (t = false);
            var r = this.nodes.get(e);
            if (void 0 !== r) return r.addValue(n, t), r;
            var i = new ye(n);
            return this.nodes.set(e, i), this.nodes.get(e)
        }, e.prototype.addEdge = function (e, n) {
            var t = this.addNode(e);
            this.addNode(n), t.addAdjacent(n)
        }, e.prototype.breadthFirstSearch = function (e) {
            var n = new Map,
                t = new me,
                r = [],
                i = 0;
            t.addToTheEnd({
                item: e,
                parent: null
            });
            for (var o = function () {
                    var e = t.removeFirst();
                    if (null === e) return "continue";
                    if (n.has(e.item)) {
                        if (e.parent) {
                            var o = r.findIndex((function (n) {
                                return n.key === e.item
                            }));
                            r[o].ascendants.push(e.parent)
                        }
                        return "continue"
                    }
                    var a = s.nodes.get(e.item);
                    if (void 0 === a) return "continue";
                    var c = e.parent ? [e.parent] : [],
                        u = a.values,
                        l = {
                            key: e.item,
                            values: u,
                            ascendants: c
                        };
                    i += u.length, r.push(l), n.set(e.item, true);
                    for (var d = a.adjacentNodesKeys.values(), h = d.next(); !h.done;) t.addToTheEnd({
                        item: h.value,
                        parent: e.item
                    }), h = d.next()
                }, s = this; t.length > 0;) o();
            return {
                returnNodes: r,
                totalValues: i
            }
        }, e
    }();

function be(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u, l, d, h, f, p, m, v, g, y, C, b, S;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return t = e.children, 0 === (i = t.length) ? [2, 0] : (we(e, i), n > 0 ? [2, Math.round(i * n)] : (o = Ae(e, "ALL_NODES_COUNT")) > 0 ? (s = Ae(e, "CHILDREN_COUNT"), (a = s / i) < .5 || a > 2 ? [2, o / s * i] : [2, o]) : (c = 5e3, u = fe.start(e.id, "FIND_COMPONENTS"), l = i, d = 0, h = 0, f = 0, Se(0), [4, P(10)]));
            case 1:
                r.sent(), p = false, m = 0, r.label = 2;
            case 2:
                return m < i ? (v = t[m], $.supportsChildrenScene(v) ? (h += v.children.length, d++, p ? [3, 4] : (v.findAll((function () {
                    return l++, false
                })), f++, g = u.check() / c, y = m / i, Se(Math.max(g, y)), [4, P(10)])) : [3, 4]) : [3, 5];
            case 3:
                r.sent(), g > 1 && y < .9 && (p = true), r.label = 4;
            case 4:
                return m++, [3, 2];
            case 5:
                return f === d ? [2, l] : (C = h / f, b = Math.round((d - f) * C), Te(e, S = b + l), u.end(), [2, S])
            }
        }))
    }))
}

function Se(e) {
    L("Estimating page size " + ue(e, 5))
}

function Ee(e, n, t) {
    e.setSharedPluginData("FILE_INFO", n, t + "")
}

function Ae(e, n) {
    var t = parseInt(e.getSharedPluginData("FILE_INFO", n));
    return isNaN(t) ? 0 : t
}

function we(e, n) {
    Ee(e, "CHILDREN_COUNT", n)
}

function Te(e, n) {
    Ee(e, "ALL_NODES_COUNT", n)
}

function Ne() {
    return t(this, void 0, void 0, (function () {
        function e() {
            return t(this, void 0, void 0, (function () {
                var e;
                return r(this, (function (n) {
                    switch (n.label) {
                    case 0:
                        return (e = i.check()) - o > 1e3 ? (function (e, n, t) {
                            L("Searching page " + t + "/" + n + " " + ue(e))
                        }(s / a, d, c + 1), [4, P(10)]) : [3, 2];
                    case 1:
                        n.sent(), o = e, n.label = 2;
                    case 2:
                        return [2]
                    }
                }))
            }))
        }

        function n(i, o, a) {
            return void 0 === o && (o = 0), t(this, void 0, void 0, (function () {
                var t, c, l, d, h;
                return r(this, (function (r) {
                    switch (r.label) {
                    case 0:
                        return 0 === (t = i.length) ? [2] : (1 === o && m++, o < 4 ? [4, e()] : [3, 2]);
                    case 1:
                        r.sent(), r.label = 2;
                    case 2:
                        o++, c = 0, r.label = 3;
                    case 3:
                        return c < t ? (l = i[c], d = a, $.component(l) ? (u.addNode(l), d = l) : $.instance(l) && null !== l.mainComponent && (h = void 0 !== a, u.addNode(l.mainComponent, l, h), h && u.addEdge(l.mainComponent, a)), s++, $.supportsChildrenScene(l) ? [4, n(l.children, o, d)] : [3, 5]) : [3, 6];
                    case 4:
                        r.sent(), r.label = 5;
                    case 5:
                        return c++, [3, 3];
                    case 6:
                        return [2]
                    }
                }))
            }))
        }
        var i, o, s, a, c, u, l, d, h, f, p, m, v, g, y;
        return r(this, (function (t) {
            switch (t.label) {
            case 0:
                i = fe.start("", "FIND_COMPONENTS"), o = 0, s = 0, a = 0, c = 0, u = new Ce, l = figma.root.children, d = l.length, h = 0, f = 0, p = 0, m = 0, t.label = 1;
            case 1:
                return c < d ? (v = l[c], g = v.children, 0 === (y = g.length) || v.name.match(/^\s*_/) ? (console.log("Skipping page", v.name), [3, 5]) : (console.log("Searching page " + (c + 1) + "/" + d, v.name), [4, be(v, f)])) : [3, 6];
            case 2:
                return a = t.sent(), [4, n(g)];
            case 3:
                return t.sent(), [4, e()];
            case 4:
                t.sent(), Te(v, s), we(v, y), f = ((h += s) - y) / (p += m), s = 0, m = 0, t.label = 5;
            case 5:
                return c++, [3, 1];
            case 6:
                return console.log("TOTAL FIND TIME", i.end()), [2, u]
            }
        }))
    }))
}
var Ie = {
    OVERRIDEABlE: ["locked", "opacity", "blendMode", "effects", "effectStyleId", "layoutGrids", "clipsContent", "guides", "gridStyleId", "fills", "strokes", "strokeWeight", "strokeAlign", "strokeCap", "strokeJoin", "dashPattern", "strokeMiterLimit", "fillStyleId", "strokeStyleId", "cornerRadius", "cornerSmoothing", "exportSettings", "autoRename"],
    TEXT_RANGE: ["fontName", "fills", "fillStyleId", "fontSize", "textCase", "textDecoration", "letterSpacing", "lineHeight", "textStyleId"],
    TEXT_FULL: ["textAlignHorizontal", "textAlignVertical", "paragraphIndent", "paragraphSpacing"],
    AUTOLAYOUT: ["layoutMode", "primaryAxisSizingMode", "counterAxisSizingMode", "primaryAxisAlignItems", "counterAxisAlignItems", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "itemSpacing"],
    SINGLE: {
        SCALE_FACTOR: "scaleFactor",
        LAYOUT_ALIGN: "layoutAlign",
        LAYOUT_GROW: "layoutGrow"
    }
};

function Oe(e, n) {
    return t(this, void 0, void 0, (function () {
        var t;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                if (null === e) return [2, false];
                if (t = true, e === n.mainComponent) return [2, t];
                r.label = 1;
            case 1:
                return r.trys.push([1, 2, , 4]), n.mainComponent = e, [3, 4];
            case 2:
                return r.sent(), [4, figma.importComponentByKeyAsync(e.key).then((function (e) {
                    n.mainComponent = e
                })).catch((function (n) {
                    console.error("Unable to override instance with component: " + e.name + ".", n), t = false
                }))];
            case 3:
                return r.sent(), [3, 4];
            case 4:
                return [2, t]
            }
        }))
    }))
}

function xe(e, n, t, r) {
    if (void 0 === t && (t = false), void 0 === r && (r = []), !$.supportsChildrenScene(e)) return true;
    var i = true;
    n && (n.visible = e.visible, n.children = []), e.visible || (t ? r.push(e) : e.visible = true, i = false);
    for (var o = e.children, s = o.length, a = 0; a < s; a++) {
        var c = o[a];
        n && (n.children[a] = {
            visible: null
        });
        var u = xe(c, null == n ? void 0 : n.children[a], t, r);
        i = i && u
    }
    return i
}

function ke(e, n) {
    var t = n.visible;
    if (null !== t && e.visible !== t && (e.visible = t), $.supportsChildrenScene(e) && n.children)
        for (var r = e.children, i = Math.min(r.length, n.children.length), o = 0; o < i; o++) {
            ke(r[o], n.children[o])
        }
}

function Pe(e, n) {
    void 0 === n && (n = false);
    var t = {
            visible: null
        },
        r = [];
    return xe(e, t, n, r) && !n ? null : {
        nodeVisibility: t,
        node: e,
        hiddenNodes: r
    }
}

function Le(e, n) {
    null !== e && ke(n, e)
}
var _e = "MASTER_ID",
    Me = "MASTER_KEY";

function De(e, n, t) {
    for (var r = e.children, i = n.children, o = t.children, s = Math.min(r.length, o.length), a = 0; a < s; a++) {
        var c = r[a],
            u = i[a],
            l = o[a];
        $.instance(c) && null !== c.mainComponent && ($.instance(l) && c.mainComponent === l.mainComponent || (c.mainComponent.remote ? u.setPluginData(Me, c.mainComponent.key) : u.setPluginData(_e, c.mainComponent.id))), $.supportsChildrenScene(c) && $.supportsChildrenScene(l) && De(c, u, l)
    }
}

function Re(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return t = {
                    visible: e.visible
                }, i = xe(e, t), xe(n), [4, Ge(e, n, {
                    skipInstances: true
                })];
            case 1:
                return r.sent(), i || ke(n, t), [2]
            }
        }))
    }))
}

function Ue(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return "" === (t = e.getPluginData(Me)) ? [3, 2] : (L("Loading Component from the library"), [4, figma.importComponentByKeyAsync(t).then((function (e) {
                    n.mainComponent = e
                })).catch((function (e) {
                    console.error("Error: can't override instance because remote component is not published to the library."), console.error(e.message)
                }))]);
            case 1:
                return r.sent(), _(), e.setPluginData(Me, ""), [2];
            case 2:
                return "" !== (i = e.getPluginData(_e)) ? ((o = figma.getNodeById(i)) && $.component(o) && (n.mainComponent = o), e.setPluginData(_e, ""), [2]) : [2]
            }
        }))
    }))
}

function Ve(e, n, t) {
    try {
        var r = n[e];
        if (void 0 === r) return;
        var i = t[e];
        if (void 0 === i) return;
        if ($.equivalent(i, r) || $.mixed(r)) return;
        try {
            t[e] = r, C.propertiesOverriden += 1
        } catch (e) {
            console.error("Trying to override the non-overrideable property. Error:\n\n", e)
        }
    } catch (e) {
        console.error("Trying to get property error\n\n", e)
    }
}

function Ge(e, n, i) {
    return void 0 === i && (i = {}), t(this, void 0, void 0, (function () {
        var t, o, s, a, c, u, l, d, h, f, p, m, v, g;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return t = fe.start("", "OVERRIDE"), void 0 === i.recursive && (i.recursive = true), void 0 === i.skipInstances && (i.skipInstances = false), C.nodesChecked += 1, n.removed ? (console.error("Trying to override removed target", n), [2]) : e.removed ? (console.error("Trying to read removed source", e), [2]) : "no-overrides" === n.name ? [2] : "TEXT" !== e.type || "TEXT" !== n.type ? [3, 2] : [4, Ye(e, n)];
            case 1:
                r.sent() || Ie.TEXT_FULL.forEach((function (t) {
                    Ve(t, e, n)
                })), r.label = 2;
            case 2:
                return i.skipInstances ? [3, 7] : $.instance(n) ? $.instance(e) ? (o = e.mainComponent, n.mainComponent === o ? [3, 4] : (C.instancesOverriden += 1, s = null !== o && o.name !== e.name, [4, Oe(o, n)])) : [3, 5] : [3, 7];
            case 3:
                r.sent(), Pe(n), s && (n.name = e.name), r.label = 4;
            case 4:
                return [3, 7];
            case 5:
                return [4, Ue(e, n)];
            case 6:
                r.sent(), C.instancesOverriden += 1, r.label = 7;
            case 7:
                a = t.check(), $.frameLike(e) && $.frameLike(n) && ("NONE" === e.layoutMode ? n.layoutMode = "NONE" : Ie.AUTOLAYOUT.forEach((function (t) {
                    Ve(t, e, n)
                }))), null !== (c = e.parent) && $.frameLike(c) && "NONE" !== c.layoutMode && (Ve(Ie.SINGLE.LAYOUT_ALIGN, e, n), Ve(Ie.SINGLE.LAYOUT_GROW, e, n)), u = Ie.OVERRIDEABlE, l = u.length, d = 0, r.label = 8;
            case 8:
                return d < l ? (Ve(u[d], e, n), t.check() - a > 500 ? [4, P(100)] : [3, 10]) : [3, 11];
            case 9:
                r.sent(), r.label = 10;
            case 10:
                return d++, [3, 8];
            case 11:
                if (t.end(), !i.recursive) return [2];
                if (!$.supportsChildrenScene(e) || !$.supportsChildrenScene(n)) return [3, 16];
                h = e.children, f = n.children, p = Math.min(h.length, f.length), m = 0, r.label = 12;
            case 12:
                return m < p ? (v = h[m], g = f[m], [4, Ge(v, g)]) : [3, 15];
            case 13:
                r.sent(), r.label = 14;
            case 14:
                return m++, [3, 12];
            case 15:
                return [3, 17];
            case 16:
                Ve("visible", e, n), r.label = 17;
            case 17:
                return [2]
            }
        }))
    }))
}

function Fe(e, n, t) {
    return t["getRange" + e[0].toUpperCase() + e.slice(1)](n, n + 1)
}

function je(e, n, t, r) {
    r["setRange" + e[0].toUpperCase() + e.slice(1)](n, n + 1, t)
}

function Ye(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u, l, d, h, f, p, m;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return t = n.characters, 0 === (i = e.characters).length || 0 === t.length ? (console.log("Skipping overrides on empty text node."), [2, true]) : (o = [], s = t === i, a = e.getRangeFontName(0, 1), c = true, [4, figma.loadFontAsync(a).then((function () {
                    Ie.TEXT_RANGE.forEach((function (t) {
                        $.mixed(e[t]) && o.push(t);
                        var r = Fe(t, 0, e);
                        $.equivalent(n[t], r) && void 0 !== r || (n[t] = r)
                    })), s || (n.characters = i, t = i)
                })).catch((function (e) {
                    c = false, console.error("Can't override text as fonts are unavailable.\n", e.message)
                }))]);
            case 1:
                if (r.sent(), !c) return [2, true];
                if (0 === o.length) return [2, false];
                u = true, l = t.length, h = 0, r.label = 2;
            case 2:
                return h < l ? (d = e.getRangeFontName(h, h + 1), [4, figma.loadFontAsync(d).catch((function (e) {
                    u = false, console.error("Can't override mixed font.\n", e.message)
                }))]) : [3, 5];
            case 3:
                r.sent(), r.label = 4;
            case 4:
                return h++, [3, 2];
            case 5:
                if (!u) return [2, true];
                for (h = 0; h < l; h++)
                    for (f = 0; f < o.length; f++) {
                        p = o[f];
                        try {
                            if (null === (m = Fe(p, h, e))) continue;
                            je(p, h, m, n)
                        } catch (e) {
                            e instanceof Error && console.error("Can't override mixed property " + p + "\n", e)
                        }
                    }
                return [2, false]
            }
        }))
    }))
}

function Ke(e, n, t) {
    var r, i;
    void 0 === t && (t = true), t ? (n.relativeTransform = e.relativeTransform, "GROUP" === (null === (r = e.parent) || void 0 === r ? void 0 : r.type) && "GROUP" !== (null === (i = n.parent) || void 0 === i ? void 0 : i.type) && (n.x = e.x - e.parent.x, n.y = e.y - e.parent.y)) : n.relativeTransform = e.absoluteTransform
}

function Be(e, n) {
    Ve("constraints", e, n)
}

function ze(e, n) {
    e.width === n.width && e.height == n.height || ("LINE" !== e.type ? e.resize(He(n.width), He(n.height)) : e.resize(n.width, n.height))
}

function He(e) {
    return e <= 0 ? 1 : e
}

function We(e, n) {
    if ($.supportsChildrenScene(n)) {
        var t = e.name.match(/\b(frame|instance|group|component)\b/i);
        if (null !== t) {
            var r = n.type.replace("_", " ").toLowerCase();
            t[0].charAt(0).toUpperCase() === t[0].charAt(0) && (r = r.charAt(0).toUpperCase() + r.slice(1));
            var i = e.name.replace(t[0], r);
            n.name = i
        } else n.name = e.name
    } else n.name = e.name
}

function qe(e, n, t) {
    try {
        void 0 !== t ? e.insertChild(t, n) : e.appendChild(n)
    } catch (t) {
        if ("DOCUMENT" === e.type || "PAGE" === e.type) return;
        var r = Xe(e);
        n.x = r.x, n.y = r.y - 50 - n.height
    }
}

function Xe(e) {
    for (var n, t = e;
        "PAGE" !== (null === (n = t.parent) || void 0 === n ? void 0 : n.type);) t = t.parent;
    return t
}

function Je(e, n) {
    return t(this, void 0, void 0, (function () {
        var i, o, s, a, c, u, l, d, h, f, p, m, v, g, y, b, S, E, A, w, T, N, I, O, x, k, _, M, D, R, U, V, G, F, j, Y, K, B = this;
        return r(this, (function (z) {
            switch (z.label) {
            case 0:
                return [4, Ne()];
            case 1:
                if (i = z.sent(), console.info("1. Found all instances"), o = i.breadthFirstSearch(e), s = o.returnNodes, a = o.totalValues, 0 === (c = s.length)) return console.error("Components graph is empty"), [2, false];
                if (c > 1) u = s.shift(), s.push(u);
                else if (0 === s[0].values.length) return [2, false];
                return l = [], d = [], h = [], f = fe.start("ATTACH_ALL", "INSTANCE_CREATE"), p = new Map, m = new Map, v = 0, g = f.check(), (y = n.remote) || (b = Pe(n, true), S = b ? b.nodeVisibility : null, p.set(n, S), b && h.push(b.hiddenNodes)), e.remote || (b = Pe(e, true), S = b ? b.nodeVisibility : null, p.set(e, S), b && h.push(b.hiddenNodes)), [4, (E = function () {
                    return t(B, void 0, void 0, (function () {
                        var e;
                        return r(this, (function (n) {
                            switch (n.label) {
                            case 0:
                                return (e = f.check()) - g > 1e3 ? (le(v, a, "Saving overrides"), [4, P(5)]) : [3, 2];
                            case 1:
                                n.sent(), g = e, n.label = 2;
                            case 2:
                                return [2]
                            }
                        }))
                    }))
                })()];
            case 2:
                return z.sent(), [4, P(10)];
            case 3:
                z.sent(), console.info("2. Starting to save overrides"), V = 0, z.label = 4;
            case 4:
                if (!(V < c)) return [3, 14];
                if (A = s[V], w = A.key, T = A.values, !(A.ascendants.length > 0) || w.remote) return [3, 9];
                N = function (e, n) {
                    return e.findAll((function (e) {
                        return e.mainComponent && e.mainComponent.key === n.key
                    }))
                }(w, e), R = Pe(w, true), void 0 === p.get(w) && p.set(w, R ? R.nodeVisibility : null), null !== R && h.push(R.hiddenNodes), I = N.length, O = 0, z.label = 5;
            case 5:
                return O < I ? (x = N[O], d.indexOf(x) >= 0 ? [3, 7] : (v++, l.push({
                    original: x
                }), d.push(x), [4, E()])) : [3, 8];
            case 6:
                z.sent(), z.label = 7;
            case 7:
                return O++, [3, 5];
            case 8:
                return [3, 13];
            case 9:
                k = T.length, _ = 0, z.label = 10;
            case 10:
                return _ < k ? null === (M = T[_]) || d.indexOf(M) >= 0 ? [3, 12] : (v++, d.push(M), null !== (D = te(M)) && (null !== (R = Pe(D, true)) && h.push(R.hiddenNodes), $.component(D) && void 0 === p.get(D) ? p.set(D, R && R.nodeVisibility) : $.instance(D) && void 0 === m.get(D) && m.set(D, R && R.nodeVisibility)), l.push({
                    original: M
                }), [4, E()]) : [3, 13];
            case 11:
                z.sent(), z.label = 12;
            case 12:
                return _++, [3, 10];
            case 13:
                return V++, [3, 4];
            case 14:
                console.info("3. Processed overrides"),
                    function (e) {
                        e.forEach((function (e) {
                            return e.forEach((function (e) {
                                e.visible || (e.visible = true)
                            }))
                        }))
                    }(h), h.length = 0, d.length = 0, l.forEach((function (e) {
                        e.savedCopy = e.original.clone()
                    })), U = l.length, C.instancesToCreate = U, console.info("4. Saved overrides in clones. Applying..."), V = 0, z.label = 15;
            case 15:
                return V < U ? (G = l[V], F = G.original, (j = G.savedCopy) ? !F || F.removed ? (console.error("Not found saved node"), [3, 18]) : (Y = j.name, K = null !== j.mainComponent && j.mainComponent.name !== j.name, null !== j.mainComponent && j.mainComponent.key !== e.key ? F.mainComponent = j.mainComponent : null !== F.mainComponent && F.mainComponent.key !== n.key && (F.mainComponent = n), y && $.supportsChildrenScene(F) && Pe(F), $.nestedInInstance(F) || (ze(F, j), Ve(Ie.SINGLE.SCALE_FACTOR, j, F)), [4, Ge(j, F, {
                    skipInstances: true
                })]) : [3, 18]) : [3, 19];
            case 16:
                return z.sent(), K && (F.name = Y), j.remove(), le(V, U, "Attaching"), [4, P(10)];
            case 17:
                z.sent(), z.label = 18;
            case 18:
                return V++, [3, 15];
            case 19:
                return console.info("5. Applied overrides. Restoring visibility."), C.nodesProcessed = U, L("Restoring visibility of " + (m.size + p.size) + " objects..."), [4, P(10)];
            case 20:
                return z.sent(), p.forEach(Le), m.forEach(Le), console.log("Attach time:", f.end()), console.log("Instances attached:", U), [2, true]
            }
        }))
    }))
}

function Ze(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u, l;
        return r(this, (function (d) {
            switch (d.label) {
            case 0:
                return [4, Ne()];
            case 1:
                t = d.sent(), console.info("1. Found all instances"), i = !e.remote, o = e.children, s = o.length, a = n.children, c = true, console.info("2. Attaching instances"), u = function (e) {
                    var n, c, u, l, d, h, f, p, m, v, g, y, b;
                    return r(this, (function (r) {
                        switch (r.label) {
                        case 0:
                            return n = o[e], c = n.name, (u = a[e]) && u.name === c || (u = a.find((function (e) {
                                return e.name === c
                            }))), void 0 === u ? (C.componentsSkipped += 1, [2, "continue"]) : (l = t.breadthFirstSearch(n), d = l.returnNodes, h = l.totalValues, f = d.length, C.instancesToCreate += h, 0 === f || 1 === f && 0 === d[0].values.length ? [2, "continue"] : (L("Attaching " + ue(e / s)), [4, P(10)]));
                        case 1:
                            for (r.sent(), p = d[0].values, m = p.length, v = o.filter((function (e) {
                                    return e !== n
                                })), g = 0; g < m; g++) y = p[g], i && null !== (b = ne(y).parentComponent) && v.indexOf(b) >= 0 || Qe(y, u);
                            return C.nodesProcessed += m, [2]
                        }
                    }))
                }, l = 0, d.label = 2;
            case 2:
                return l < s ? [5, u(l)] : [3, 5];
            case 3:
                d.sent(), d.label = 4;
            case 4:
                return l++, [3, 2];
            case 5:
                return (C.componentsSkipped >= s || 0 === C.instancesOverriden) && (c = false), [2, c]
            }
        }))
    }))
}

function Qe(e, n) {
    if (e.mainComponent !== n) try {
        e.swapComponent(n), C.instancesOverriden += 1
    } catch (e) {
        C.nodesSkipped += 1
    }
}

function $e(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return i = true, !(t = e).removed && $.frameOrGroupOrInstance(t) && $.matchingStructure(t, n) || (C.nodesSkipped++, i = false, !t.removed) ? (o = fe.start(t.id, "INSTANCE_CREATE"), [4, en(t, n, i)]) : [2, null];
            case 1:
                return s = r.sent(), C.nodesProcessed++, o.end(), [2, s]
            }
        }))
    }))
}

function en(e, n, i) {
    return void 0 === i && (i = true), t(this, void 0, void 0, (function () {
        var t, o, s, a, c, u;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return e.visible = true, null === (o = (t = e).parent) ? [2, null] : (s = $.nestedInInstance(e), a = null, c = null, $.instance(e) ? (t = e.clone(), u = void 0, s || !$.instance(t) ? (null !== e.mainComponent && De(e, t, e.mainComponent), u = e, c = t) : (u = t, t = e, c = e), [4, Oe(n, u)]) : [3, 2]);
            case 1:
                r.sent() ? a = u : (a = e.clone()).mainComponent = n, r.label = 2;
            case 2:
                return null === a && (a = n.createInstance(), c = e), s || (qe(o, a, o.children.indexOf(e) + 1), Ke(t, a, t.parent.id === a.parent.id), ze(a, t), Be(t, a), $.instance(t) && Ve(Ie.SINGLE.SCALE_FACTOR, t, a)), i ? [4, Re(t, a)] : [3, 4];
            case 3:
                r.sent(), r.label = 4;
            case 4:
                return null === c || $.nestedInInstance(c) || c.remove(), [2, a]
            }
        }))
    }))
}

function nn(e, n, i) {
    var o;
    return t(this, void 0, void 0, (function () {
        var t, s, a, c, u, l, d;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                t = [], s = new Map, a = 0, c = e.length, r.label = 1;
            case 1:
                return a < c ? (u = e[a], null !== (l = te(u)) && l !== u && void 0 === s.get(l) && s.set(l, (null === (o = Pe(l)) || void 0 === o ? void 0 : o.nodeVisibility) || null), [4, $e(u, n)]) : [3, 6];
            case 2:
                return null !== (d = r.sent()) && t.push(d), i.check() > 1e3 ? (le(C.nodesProcessed, C.instancesToCreate, "Attaching"), [4, P(10)]) : [3, 5];
            case 3:
                return r.sent(), a % 10 != 0 ? [3, 5] : [4, P(200)];
            case 4:
                r.sent(), r.label = 5;
            case 5:
                return a++, [3, 1];
            case 6:
                return s.forEach((function (e, n) {
                    null !== e && ke(n, e)
                })), [2, t]
            }
        }))
    }))
}

function tn(e, n, i) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u, l, d, h, f, p;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return [4, Ne()];
            case 1:
                t = r.sent(), i = new Map, o = 0, s = e.length, r.label = 2;
            case 2:
                return o < s ? (le(C.nodesProcessed, C.instancesToCreate, "Attaching"), [4, P(10)]) : [3, 8];
            case 3:
                return r.sent(), a = e[o], !(c = a.node) || !$.instance(c) && $.nestedInInstance(c) || !a.parentComponent ? (console.log("Skipped", a.parentComponent, c), [3, 7]) : (u = null, void 0 !== i.get(a.parentComponent) && (u = Pe(a.parentComponent, true), i.set(a.parentComponent, u && u.nodeVisibility)), [4, on(t.breadthFirstSearch(a.parentComponent).returnNodes[0].values, a.depth)]);
            case 4:
                return l = r.sent(), null !== u && u.hiddenNodes.forEach(an), d = function (e, n) {
                    for (var t = [], r = e.length, i = 0; i < r; i++) {
                        var o = (s = e[i]).visibility;
                        null !== o && (void 0 === n.get(o.node) && n.set(o.node, o && o.nodeVisibility), o.hiddenNodes.forEach(an))
                    }
                    for (i = 0; i < r; i++) {
                        var s = e[i];
                        t.push({
                            cloned: s.original.clone(),
                            depth: s.depth,
                            parent: s.parent
                        })
                    }
                    return t
                }(l, i), h = null, $.instance(c) && (h = c.mainComponent), [4, $e(c, n)];
            case 5:
                return null === (f = r.sent()) ? [3, 7] : (p = Pe(f), [4, rn(d, h, n)]);
            case 6:
                r.sent(), null !== p && ke(f, p.nodeVisibility), r.label = 7;
            case 7:
                return o++, [3, 2];
            case 8:
                return i.forEach(Le), [2]
            }
        }))
    }))
}

function rn(e, n, i) {
    return t(this, void 0, void 0, (function () {
        var t, o, s, a;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                t = 0, o = e.length, r.label = 1;
            case 1:
                return t < o ? (s = e[t], a = ee(s.parent, s.depth), C.nodesProcessed += 1, a && $.instance(a) ? s.cloned ? (null !== n && $.instance(s.cloned) && (s.cloned.mainComponent !== n ? a.mainComponent = s.cloned.mainComponent : a.mainComponent !== i && (a.mainComponent = i)), [4, Ge(s.cloned, a, {
                    skipInstances: true
                })]) : [3, 4] : (console.warn("Local nested target not found or is not an instance"), [3, 4])) : [3, 5];
            case 2:
                return r.sent(), s.cloned.remove(), le(C.nodesProcessed, C.instancesToCreate, "Attaching"), [4, P(5)];
            case 3:
                r.sent(), r.label = 4;
            case 4:
                return t++, [3, 1];
            case 5:
                return [2]
            }
        }))
    }))
}

function on(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u;
        return r(this, (function (r) {
            for (C.instancesToCreate += e.length, t = [], i = [], u = 0; u < e.length; u++) o = e[u], (s = ne(o)).isNested ? i.push(s) : t.push(o);
            if (a = [], i.length > 0)
                for (console.log("building dependency tree"), c = function (e) {
                        for (var n = new ge, t = 0, r = e.length; t < r; t++) {
                            var i = e[t].parentComponent;
                            if (null !== i) {
                                var o = e[t].node;
                                n.addUnique(i, o)
                            }
                        }
                        for (t = 0, r = e.length; t < r; t++) {
                            var s = e[t].parentComponent;
                            if (null !== s)
                                for (var a = e[t].trail, c = 0, u = a.length; c < u; c++) {
                                    var l = a[c].mainComponent;
                                    null !== l && n.moveBefore(l, s)
                                }
                        }
                        return n.toArray()
                    }(i), u = 0; u < c.length; u++) sn(c[u].children, n, a);
            return sn(t, n, a), [2, a]
        }))
    }))
}

function sn(e, n, t) {
    for (var r = 0, i = e.length; r < i; r++) {
        var o = e[r],
            s = ee(o, n);
        if (null !== s) {
            var a = Pe(te(o) || o, true);
            t.push({
                depth: n,
                parent: o,
                original: s,
                visibility: a
            })
        }
    }
}

function an(e) {
    e.visible || (e.visible = true)
}

function cn(e, n) {
    return t(this, void 0, void 0, (function () {
        var t, i, o, s, a, c, u, l;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                if (0 === e.length) return [2, false];
                t = false, i = [], o = [], s = 0, r.label = 1;
            case 1:
                return s < e.length ? (a = e[s], c = ne(a), t || !$.instance(a) ? [3, 3] : [4, ce(a)]) : [3, 5];
            case 2:
                r.sent(), t = true, r.label = 3;
            case 3:
                c.isNested && !$.nestedInInstance(a) ? o.push(c) : i.push(a), r.label = 4;
            case 4:
                return s++, [3, 1];
            case 5:
                return u = fe.start("", "TOTAL"), C.instancesToCreate = i.length + o.length, o.length > 0 ? [4, tn(o, n)] : [3, 7];
            case 6:
                r.sent(), r.label = 7;
            case 7:
                return [4, nn(i, n, u)];
            case 8:
                return l = r.sent(), figma.currentPage.selection = l, C.timeTotal += u.end(), [2, true]
            }
        }))
    }))
}

function un() {
    return t(this, void 0, void 0, (function () {
        var e, n, t, i, o, s, a, c, u, l, d, h, f, p, m, v, g;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return e = re(), C.instancesToCreate = e.length, C.command = "CREATE", 0 === e.length ? [2, {
                    msg: "Select one or more objects to create a component from.",
                    success: false
                }] : -1 === (n = function (e) {
                    for (var n = true, t = -1, r = 0, i = e.length; r < i; r++) {
                        var o = e[r];
                        if ($.frameOrGroupOrInstance(o) && -1 === t && (t = r), $.component(o)) return r;
                        if ("COMPONENT_SET" === o.type) return -1;
                        r + 1 < i && o.type !== e[r + 1].type && (n = false)
                    }
                    if (n) return 0;
                    return t
                }(e)) ? [2, {
                    msg: "⚠️ Invalid selection: select only Frames, Groups or Instances       (or only regular objects of one type).",
                    success: false
                }] : (t = e[n], i = $.component(t), o = null, $.frameOrGroupOrInstance(t) || i ? [3, 2] : (s = t.type.replace("_", " ").toLowerCase(), [4, dn(e)]));
            case 1:
                return r.sent(), [2, {
                    msg: "Successfully created a Component from " + C.instancesToCreate + " " + s + " objects!",
                    success: true
                }];
            case 2:
                return a = {
                    y: Math.pow(2, 16),
                    x: 0
                }, c = Xe(t), a = {
                    y: c.y,
                    x: c.x
                }, u = fe.start("", "TOTAL"), i ? (t.visible = true, (o = t.clone()).name += " copy", C.instancesToCreate -= 1, e.splice(n, 1), [4, se(t, oe)]) : [3, 4];
            case 3:
                return r.sent(), [3, 6];
            case 4:
                return [4, ln(t)];
            case 5:
                o = r.sent(), r.label = 6;
            case 6:
                return [4, se(o, ie)];
            case 7:
                r.sent(), l = i, d = [], h = [], f = 0, r.label = 8;
            case 8:
                return f < e.length ? (p = e[f], m = ne(p), l || !$.instance(p) ? [3, 10] : [4, ce(p)]) : [3, 12];
            case 9:
                r.sent(), l = true, r.label = 10;
            case 10:
                m.isNested && !$.nestedInInstance(p) ? d.push(m) : h.push(p), v = Xe(p), a.y >= v.y && (a.y === v.y ? a.x > v.x && (a = {
                    y: v.y,
                    x: v.x
                }) : a = {
                    y: v.y,
                    x: v.x
                }), r.label = 11;
            case 11:
                return f++, [3, 8];
            case 12:
                return d.length > 0 ? [4, tn(d, o)] : [3, 14];
            case 13:
                r.sent(), r.label = 14;
            case 14:
                return [4, nn(h, o, u)];
            case 15:
                return r.sent(), C.timeTotal = u.end(), console.log("total time:", C.timeTotal), console.log("total processed:", C.nodesChecked), console.log("total overrides:", C.propertiesOverriden), console.log("instances overriden:", C.instancesOverriden), hn(o, a), figma.currentPage.selection = [o], [4, q.moveIntoView(o)];
            case 16:
                return r.sent(), g = 0 === C.nodesSkipped ? "Component and all " + C.instancesToCreate + " instances created successfully!" : "Created the component and " + (C.instancesToCreate - C.nodesSkipped) + " instances.       Skipped " + C.nodesSkipped + " objects.", 0 !== C.nodesDetached && (g += " ⚠️ Detached " + C.nodesDetached + " instances inside (e.g. ◇ " + C.detachedNodeName + ").       To prevent this, publish them to Team Library."), [2, {
                    msg: g,
                    success: true
                }]
            }
        }))
    }))
}

function ln(e) {
    return t(this, void 0, void 0, (function () {
        var n, t, i, o, s, a;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                return e.visible = true, ze(n = figma.createComponent(), e), n.relativeTransform = e.absoluteTransform, [4, Ge(e, n, {
                    recursive: false
                })];
            case 1:
                for (r.sent(), Be(e, n), We(e, n), t = e.children, i = 0, o = t.length; i < o; i++) s = t[i], a = void 0, (a = $.component(s) ? s.createInstance() : s.clone()) && (n.appendChild(a), Ke(s, a, true), ze(a, s));
                return hn(n, e), [2, n]
            }
        }))
    }))
}

function dn(e) {
    return t(this, void 0, void 0, (function () {
        var n, t, i, o, s, a, c, u, l, d;
        return r(this, (function (r) {
            switch (r.label) {
            case 0:
                n = e[0], t = figma.createComponent(), i = {
                    y: Math.pow(2, 16),
                    x: 0
                }, ze(t, n), t.relativeTransform = n.absoluteTransform, t.rotation = 0, o = n.clone(), t.appendChild(o), o.x = 0, o.y = 0, o.rotation = 0, We(n, t), hn(t, n), s = 0, a = e.length, r.label = 1;
            case 1:
                return s < a ? (c = e[s], null === (u = c.parent) ? [3, 3] : (ze(l = t.createInstance(), c), qe(u, l, u.children.indexOf(c) + 1), Ke(c, l, true), Be(c, l), [4, Ge(c, l.children[0])])) : [3, 4];
            case 2:
                r.sent();
                try {
                    c.remove()
                } catch (e) {}
                d = Xe(l), i.y > d.y && (i = {
                    y: d.y,
                    x: d.x
                }), r.label = 3;
            case 3:
                return s++, [3, 1];
            case 4:
                return hn(t, i), figma.currentPage.selection = [t], [4, q.moveIntoView(t)];
            case 5:
                return r.sent(), [2]
            }
        }))
    }))
}

function hn(e, n) {
    e.y = n.y - 50 - e.height, e.x = n.x, e.rotation = 0
}

function fn() {
    s.send(f, "true"), figma.ui.show(), s.once(v, (function () {
        figma.closePlugin()
    }))
}

function pn() {
    return t(this, void 0, void 0, (function () {
        var e;
        return r(this, (function (n) {
            switch (n.label) {
            case 0:
                return figma.showUI(__html__, {
                    visible: false,
                    width: 200,
                    height: 159
                }), [4, s.async(c)];
            case 1:
                return void 0 !== (e = n.sent()).w && void 0 !== e.h && (q.windowSize.w = e.w, q.windowSize.h = e.h), [2]
            }
        }))
    }))
}! function () {
    t(this, void 0, void 0, (function () {
        function e(e) {
            return t(this, void 0, void 0, (function () {
                var n;
                return r(this, (function (t) {
                    switch (t.label) {
                    case 0:
                        return n = true, e.success ? [4, H.addSuccess()] : [3, 3];
                    case 1:
                        return n = t.sent(), [4, b()];
                    case 2:
                        t.sent(), t.label = 3;
                    case 3:
                        return _(), n && figma.closePlugin(e.msg), [2]
                    }
                }))
            }))
        }

        function n(e) {
            return t(this, void 0, void 0, (function () {
                return r(this, (function (n) {
                    return console.error("Fatal error:", e), _(), figma.closePlugin("Fatal error: " + e.name + " " + e.message), [2]
                }))
            }))
        }
        var i, o;
        return r(this, (function (c) {
            switch (c.label) {
            case 0:
                return [4, pn()];
            case 1:
                return c.sent(), s.on(a, (function (e) {
                    L(e)
                })), [4, H.checkLicense()];
            case 2:
                switch (i = c.sent(), o = 0, figma.command) {
                case "attach":
                    return [3, 3];
                case "save":
                    return [3, 5];
                case "new":
                    return [3, 7];
                case "license":
                    return [3, 8]
                }
                return [3, 9];
            case 3:
                return i.isValid ? [4, H.addLaunch("save")] : (H.showWindow(i), [2]);
            case 4:
                return 1 !== (o = c.sent()) || x() ? function () {
                    return t(this, void 0, void 0, (function () {
                        var e, n, t, i, o, s, a, c, u, l, d;
                        return r(this, (function (r) {
                            switch (r.label) {
                            case 0:
                                return e = re(), n = null, 0 !== e.length ? [3, 2] : [4, ae(oe)];
                            case 1:
                                if (t = r.sent(), i = t.component, null !== t.error || null === i) return [2, {
                                    msg: "Select objects to attach them to target Component.",
                                    success: false
                                }];
                                n = i, r.label = 2;
                            case 2:
                                return C.command = "ATTACH", o = e.find((function (e) {
                                    return $.component(e)
                                })), s = e.find((function (e) {
                                    return $.componentSet(e)
                                })), void 0 === o ? [3, 4] : [4, se(o, oe)];
                            case 3:
                                return r.sent(), [3, 6];
                            case 4:
                                return void 0 === s ? [3, 6] : [4, se(s, oe)];
                            case 5:
                                r.sent(), r.label = 6;
                            case 6:
                                return [4, ae(ie)];
                            case 7:
                                return a = r.sent(), c = a.component, null !== (u = a.error) || null === c ? [2, {
                                    msg: u,
                                    success: false
                                }] : (l = false, d = "No objects that can be attached found.", void 0 === o ? [3, 10] : $.component(c) && c !== o ? [4, Je(o, c)] : [3, 9]);
                            case 8:
                                l = r.sent(), r.label = 9;
                            case 9:
                                return [3, 20];
                            case 10:
                                return void 0 === s ? [3, 13] : $.componentSet(c) && c !== s ? [4, Ze(s, c)] : [3, 12];
                            case 11:
                                l = r.sent(), r.label = 12;
                            case 12:
                                return [3, 20];
                            case 13:
                                return null === n ? [3, 18] : $.component(n) && $.component(c) ? [4, Je(n, c)] : [3, 15];
                            case 14:
                                return l = r.sent(), [3, 17];
                            case 15:
                                return $.componentSet(n) && $.componentSet(c) ? [4, Ze(n, c)] : [3, 17];
                            case 16:
                                l = r.sent(), r.label = 17;
                            case 17:
                                return [3, 20];
                            case 18:
                                return $.component(c) ? [4, cn(e, c)] : [3, 20];
                            case 19:
                                l = r.sent(), r.label = 20;
                            case 20:
                                return l ? [2, {
                                    msg: d = 0 !== C.nodesSkipped ? "Attached " + (C.instancesToCreate - C.nodesSkipped) + " instances.       Replaced " + C.nodesSkipped + " objects with instances." : 0 !== C.componentsSkipped ? "Attached " + C.instancesToCreate + " instances.       Skipped " + C.componentsSkipped + " unmatched components." : "All " + C.instancesToCreate + " objects attached to “" + c.name + "” successfully!",
                                    success: true
                                }] : [2, {
                                    msg: d,
                                    success: false
                                }]
                            }
                        }))
                    }))
                }().then((function (n) {
                    n.success || 0 !== figma.currentPage.selection.length ? e(n) : fn()
                })).catch(n) : fn(), [3, 10];
            case 5:
                return i.isValid ? [4, H.addLaunch("save")] : (H.showWindow(i), [2]);
            case 6:
                return o = c.sent(), 0 === figma.currentPage.selection.length || 1 === o && !x() ? fn() : function () {
                    return t(this, void 0, void 0, (function () {
                        var e, n, t, i, o;
                        return r(this, (function (r) {
                            switch (r.label) {
                            case 0:
                                if (0 === (e = Object.assign([], figma.currentPage.selection)).length) return [2, {
                                    msg: "Select one Component or its Instance to save it.",
                                    success: false
                                }];
                                if (C.command = "SAVE", n = e[0], t = " To use it in other files, publish it to Team Library and save again.", i = "", $.instance(n)) o = n.mainComponent, i = "Saved “" + o.name + "”.";
                                else if ($.component(n)) o = n, i = "Saved “" + n.name + "”.";
                                else {
                                    if (!$.componentSet(n)) return [2, {
                                        msg: "Error: Can't save " + n.type.toLowerCase() + " as target. Select Component or Instance.",
                                        success: false
                                    }];
                                    o = n, i = "Saved “" + n.name + "”."
                                }
                                return [4, se(o, ie)];
                            case 1:
                                return r.sent(), "" === o.key && (i += t), [2, {
                                    msg: i,
                                    success: false
                                }]
                            }
                        }))
                    }))
                }().then(e).catch(n), [3, 10];
            case 7:
                return i.isValid ? (un().then(e).catch(n), [3, 10]) : (H.showWindow(i), [2]);
            case 8:
                return H.showWindow(i), [3, 10];
            case 9:
                return figma.closePlugin("Unknown menu command " + figma.command), [3, 10];
            case 10:
                return [2]
            }
        }))
    }))
}();
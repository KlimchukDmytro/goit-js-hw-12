import{a as y,i as h}from"./assets/vendor-DFA7Gt-o.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const b="46078376-453970e5bd186575301de3a15",w="https://pixabay.com/api/";async function g(e,r){return(await y.get(w,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}function m(e){const r=document.querySelector(".gallery"),a=e.map(o=>`
        <li class="gallery-item">
          <a href="${o.largeImageURL}">
            <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${o.likes}</p>
            <p><b>Views:</b> ${o.views}</p>
            <p><b>Comments:</b> ${o.comments}</p>
            <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </li>`).join("");r.insertAdjacentHTML("beforeend",a)}function L(){const e=document.querySelector(".gallery");e.innerHTML=""}const S=document.querySelector("#search-form"),p=document.querySelector(".load-more"),q=document.querySelector(".loader");let i="",n=1,u=0;S.addEventListener("submit",v);p.addEventListener("click",E);async function v(e){if(e.preventDefault(),i=e.currentTarget.elements.searchQuery.value.trim(),!i){l("Please enter a search query");return}n=1,L(),c(!0),f(!1);try{const r=await g(i,n);u=r.totalHits,r.hits.length===0?l("No images found"):(m(r.hits),u>n*15&&f(!0))}catch(r){l("Error: "+r.message)}finally{c(!1)}}async function E(){n+=1,c(!0);try{const e=await g(i,n),r=window.scrollY;m(e.hits);const o=document.querySelector(".gallery").scrollHeight;window.scrollTo({top:r+(o-r),behavior:"smooth"}),n*15>=u&&(f(!1),l("You've reached the end of search results","warning"))}catch(e){l("Error: "+e.message)}finally{c(!1)}}function c(e){q.classList.toggle("hidden",!e)}function f(e){p.classList.toggle("hidden",!e)}function l(e,r="error"){h.show({title:r==="error"?"Error":"Warning",message:e,position:"topRight",backgroundColor:r==="error"?"red":"yellow",timeout:5e3,color:"#111"})}
//# sourceMappingURL=index.js.map

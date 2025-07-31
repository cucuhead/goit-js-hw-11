import{S as h,i as d}from"./assets/vendor-5ObWk2rO.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const c=document.getElementById("search-form"),a=document.querySelector(".gallery"),f=document.querySelector(".loader"),p=document.querySelector(".loading-text"),y="https://pixabay.com/api/",g="51560990-264b69e56c9798190df8f6558",u=new h(".gallery a");window.addEventListener("DOMContentLoaded",()=>{const n=new URLSearchParams(window.location.search).get("query");n&&(c.searchQuery.value=n,m(n))});c.addEventListener("submit",async r=>{r.preventDefault();const n=c.searchQuery.value.trim();n&&(v(n),m(n))});function v(r){const n=`${window.location.pathname}?query=${encodeURIComponent(r)}`;window.history.pushState({path:n},"",n)}async function m(r){a.innerHTML="",a.style.display="none",f.hidden=!1,p.hidden=!1;try{const n=await w(r);if(n.hits.length===0){d.warning({class:"my-warning-toast",message:"Sorry, no images match your search. Please try again!",position:"topRight"}),i();return}L(n.hits)}catch{d.error({message:"Something went wrong. Please try again later.",position:"topRight"}),i()}}function i(){f.hidden=!0,p.hidden=!0,a.style.display="grid"}function w(r){const n=new URLSearchParams({key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${y}?${n}`).then(o=>{if(!o.ok)throw new Error("Fetch failed");return o.json()})}function L(r){const n=r.map(e=>`
      <li class="gallery-item">
        <div class="photo-card">
          <a class="gallery-link" href="${e.largeImageURL}">
            <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <div class="info">
            <div class="info-column">
              <span class="info-label">Likes</span>
              <span class="info-value">${e.likes}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Views</span>
              <span class="info-value">${e.views}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Comments</span>
              <span class="info-value">${e.comments}</span>
            </div>
            <div class="info-column">
              <span class="info-label">Downloads</span>
              <span class="info-value">${e.downloads}</span>
            </div>
          </div>
        </div>
      </li>
    `).join("");a.insertAdjacentHTML("beforeend",n);const o=a.querySelectorAll("img.gallery-image");let s=0;if(o.length===0){i(),u.refresh();return}o.forEach(e=>{e.complete?t():(e.addEventListener("load",t),e.addEventListener("error",t))});function t(){s++,s===o.length&&(i(),u.refresh())}}
//# sourceMappingURL=index.js.map

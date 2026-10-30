/* Villa Fun Itu · interações da prévia comercial, sem dependências */
document.documentElement.classList.add("has-js");
const menuButton=document.querySelector("[data-menu-button]");
const siteNav=document.querySelector("[data-menu]");
if(menuButton&&siteNav){
  function closeMenu(){
    document.documentElement.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.setAttribute("aria-label","Abrir menu");
  }
  menuButton.addEventListener("click",()=>{
    const open=!document.documentElement.classList.contains("menu-open");
    document.documentElement.classList.toggle("menu-open",open);
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
    if(open)siteNav.querySelector("a")?.focus();
  });
  siteNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();return;}
    if(e.key!=="Tab"||!document.documentElement.classList.contains("menu-open"))return;
    const items=[...siteNav.querySelectorAll("a"),menuButton];
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  window.matchMedia("(min-width: 851px)").addEventListener("change",closeMenu);
}
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduceMotion&&"IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target);}})},{threshold:.10});
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("is-visible"));}
const viewer=document.querySelector("[data-viewer]");
if(viewer&&typeof viewer.showModal==="function"){
  const viewerImage=viewer.querySelector("[data-viewer-image]");
  const viewerText=viewer.querySelector("[data-viewer-caption]");
  let previousFocus=null;
  document.querySelectorAll("[data-gallery-image]").forEach(button=>button.addEventListener("click",()=>{
    const image=button.querySelector("img");
    previousFocus=button;
    viewerImage.src=image.getAttribute("src");
    viewerImage.alt=image.alt;
    viewerText.textContent=button.dataset.galleryImage+" — imagem ilustrativa";
    viewer.showModal();
  }));
  viewer.querySelector("[data-viewer-close]")?.addEventListener("click",()=>viewer.close());
  viewer.addEventListener("click",e=>{if(e.target===viewer)viewer.close();});
  viewer.addEventListener("close",()=>{viewerImage.removeAttribute("src");previousFocus?.focus();});
}

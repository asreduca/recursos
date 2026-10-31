'use strict';
document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.menu');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.classList.contains('open')){closeMenu();menuButton.focus();}});
const products=window.ASR_PRODUCTS||[];
const purchase=document.getElementById('purchase-dialog');
purchase?.setAttribute('aria-labelledby','purchase-title');
document.querySelectorAll('[data-buy]').forEach(button=>button.addEventListener('click',()=>{
 const product=products.find(p=>p.id===button.dataset.buy);if(!product)return;
 if(product.checkout){
  // Solo se admite el checkout público oficial configurado para este producto.
  try{const url=new URL(product.checkout);if(url.protocol==='https:'&&(url.hostname==='pay.hotmart.com'||url.hostname==='hotmart.com'||url.hostname.endsWith('.hotmart.com'))){window.location.assign(url.href);return;}}catch{}
 }
 purchase.querySelector('[data-purchase-name]').textContent=product.name;
 purchase.showModal();
}));
const imageDialog=document.getElementById('image-dialog');
imageDialog?.setAttribute('aria-labelledby','image-title');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
 const image=imageDialog.querySelector('[data-full-image]');image.src=button.dataset.image;image.alt=button.dataset.title;imageDialog.querySelector('#image-title').textContent=button.dataset.title;imageDialog.showModal();
}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('[data-catalog]').forEach(catalog=>{
 const input=catalog.querySelector('input[type="search"]');const cards=[...catalog.querySelectorAll('[data-card]')];
 const normalized=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 input.addEventListener('input',()=>{let count=0;const q=normalized(input.value.trim());cards.forEach(card=>{card.hidden=!normalized(card.textContent).includes(q);if(!card.hidden)count++;});catalog.querySelector('[data-result-count]').textContent=count+' '+(count===1?'recurso':'recursos');catalog.querySelector('[data-empty]').hidden=count!==0;});
});
const demo=document.querySelector('[data-demo]');
if(demo){
 const states=['p','a','r','j'];const names={p:'Presente',a:'Ausencia',r:'Retardo',j:'Justificada'};
 const cells=[...demo.querySelectorAll('button[data-state]')];const original=cells.map(c=>c.dataset.state);
 function paint(cell,state){cell.dataset.state=state;cell.className='state '+state;cell.textContent=state.toUpperCase();cell.setAttribute('aria-label',`${cell.dataset.person}, ${cell.dataset.day}: ${names[state]}. Cambiar estado`);}
 function counts(){for(const s of states)document.querySelector(`[data-count="${s}"]`).textContent=cells.filter(c=>c.dataset.state===s).length;}
 cells.forEach(c=>{paint(c,c.dataset.state);c.addEventListener('click',()=>{paint(c,states[(states.indexOf(c.dataset.state)+1)%states.length]);counts();});});
 document.querySelector('[data-reset]').addEventListener('click',()=>{cells.forEach((c,i)=>paint(c,original[i]));counts();document.querySelector('[data-demo-message]').textContent='Ejemplo restablecido.';});counts();
}

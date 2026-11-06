/* ============ LEARN ============
   Kid-friendly lessons: words to know, step-by-step how-tos and a worked example for every kind of
   question the game asks. lessonFor(p) picks the lesson that matches a question; openLesson(key)
   shows it; openLibrary() lists them all. Loaded after the main script in index.html. */

const LESSONS={}; // filled by lessons.js (kid-friendly text and pictures)

function lessonFor(p){const t=(p.text||'').replace(/<[^>]+>/g,' ');const vis=(p.vis||[]).map(v=>v[0]);const hasFrac=/class="frac"/.test(p.text||'');
  if(vis.includes('clock'))return'time';
  if(/starts at|lasts/i.test(t))return'elapsed';
  if(/cents/i.test(t))return'coins';
  if(/\$/.test(t))return/change|back/i.test(t)?'change':'money';
  if(/^Round/i.test(t))return'round';
  if(/perimeter/i.test(t))return'perimeter';
  if(/area/i.test(t))return'area';
  if(/degrees|angle/i.test(t))return'angle';
  if(/factor of/i.test(t))return'factor';
  if(/shaded/i.test(t))return'fracname';
  if(/equal to/i.test(t)&&hasFrac)return'fracequiv';
  if(/Compare/i.test(t))return hasFrac?'fraccompare':'decimal';
  if(hasFrac&&/ of /i.test(t))return'fracofset';
  if(hasFrac&&/×/.test(t))return'fracwhole';
  if(hasFrac&&/\+/.test(t))return/\d\s*<span class="frac"/.test(p.text)?'mixed':'fracadd';
  if(/R \?|remainder/i.test(t))return'remainder';
  if(/÷|shared equally/i.test(t))return'divide';
  if(/[a-z]{4,}.*[a-z]{4,}.*[a-z]{4,}/i.test(t)&&!/^\s*[\d,]/.test(t))return'word';
  if(/×\s*\?|\?\s*=|\+\s*\?/.test(t))return'missing';
  if(/×/.test(t)){const n=(t.match(/[\d,]+/g)||[]).map(x=>+x.replace(/,/g,''));if(n.length>=2&&n[0]>=10&&n[1]>=10&&n[0]%10===0&&n[1]%10===0)return'multtens';return n.some(x=>x>10)?'multbig':'mult'}
  if(/−/.test(t)){const a=((t.match(/[\d,]+/)||[''])[0]).replace(/,/g,'');return a.length>=3&&/0/.test(a.slice(1))?'zeros':'sub'}
  if(/\+/.test(t))return'add';
  return'word'}

function lessonHTML(k){const L=LESSONS[k]||LESSONS.word;let pic='';try{pic=L.vis?L.vis():''}catch(e){pic=''}
  return`<div class="lesson"><div class="eyebrow">Grade ${L.g} · Learn</div><h2>${L.title}</h2>${L.hook?`<p class="lhook">${L.hook}</p>`:''}
    <div class="lsec lex"><h3>Example: ${L.ex.q}</h3>${pic?`<div class="lpic">${pic}</div>`:''}${L.ex.work.map(x=>`<p>${x}</p>`).join('')}<div class="lans">Answer: <b>${L.ex.a}</b></div></div>
    <div class="lsec"><h3>How to do it</h3><ol>${L.steps.map(x=>`<li>${x}</li>`).join('')}</ol></div>
    <div class="lsec"><h3>Words to know</h3><dl>${L.terms.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div>
    ${L.tip?`<div class="ltip"><b>Tip!</b> ${L.tip}</div>`:''}</div>`}
function openLesson(k,back){sfx.tap();modal(`${lessonHTML(k)}<div class="row">${back?'<button class="btn blue" data-act="lib">All lessons</button>':''}<button class="btn go" style="font-size:20px;padding:12px 22px" data-act="close">Got it!</button></div>`,{lib:openLibrary},true)}
function openLibrary(){sfx.tap();const keys=Object.keys(LESSONS);
  modal(`<h2>Learn math</h2><p class="note">Tap a topic to see a picture, an example, the steps and the words to know. You can also tap <b>Learn how</b> on any question during a game.</p>
   ${[3,4,5].filter(g=>g<5||g5Open()).map(g=>`<div class="libgrp"><h3>Grade ${g}</h3><div class="libgrid">${keys.filter(k=>LESSONS[k].g===g).map(k=>`<button class="libbtn" data-act="open" data-k="${k}">${LESSONS[k].title}</button>`).join('')}</div></div>`).join('')}
   <div class="row"><button class="btn" data-act="close">Close</button></div>`,{open:b=>openLesson(b.dataset.k,true)},true)}

/* hook the Learn how button into every question and add a Learn math button on the home screens */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#learnq');if(b&&Q&&Q.p){openLesson(lessonFor(Q.p))}
  const l=e.target.closest&&e.target.closest('#tolearn');if(l)openLibrary()});

/* ---------- Grade 5 lesson matching ---------- */
const lessonFor34=lessonFor;
lessonFor=function(p){const h=p.text||'',t=h.replace(/<[^>]+>/g,' ');const dens=[...h.matchAll(/<span>(\d+)<\/span><\/span>/g)].map(m=>m[1]);
  if(/volume|cubic/i.test(t))return'volume';
  if(/<sup>/.test(h))return'exp';
  if(/How many .* are in/i.test(t)||(dens.length&&/÷/.test(t)))return'fdiv';
  if(/value of the digit/i.test(t))return'dplace';
  if(/\[|\(\s*\d/.test(t))return'ooo';
  if(/\d\s*[+−]\s*\d+\s*×/.test(t))return'ooo';
  if(/×\s*(100|1,000)\b/.test(t))return'pow10';
  if(dens.length>=2&&/×/.test(t))return'fmul';
  if(dens.length>=2&&/[+−]/.test(t)&&dens[0]!==dens[1])return'funlike';
  if(/\d\.\d/.test(t)&&!/\$/.test(t)){if(/×\s*(10|100|1,000)\b/.test(t))return'pow10';if(/×/.test(t))return'dmul';if(/[+−]/.test(t))return'decadd'}
  if(/÷\s*\d{2,}/.test(t))return'longdiv';
  if(/^\s*\d{3}\s*×\s*\d{2}\b/.test(t))return'm2d';
  return lessonFor34(p)};
{const pickLesson=lessonFor;lessonFor=function(p){const k=pickLesson(p);return LESSONS[k]&&LESSONS[k].g===5&&!g5Open()?lessonFor34(p):k}}

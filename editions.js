/* ============ EDITIONS ============
   Each sport's binder is an edition: Standard (Grade 3), Bronze (Grade 4), Silver (Grade 5),
   then Gold, Rainbow and Super Shiny (Grade 5, harder starts). Filling every slot in the binder
   unlocks "Move up". Moving up saves the finished binder to S.arch[sport][edition], starts a
   fresh season and binder, and every card gets the new edition's look. Three extra copies can be
   traded for any missing card so a binder can always be finished. Loaded after hockey.js. */

const edStore=sp=>sp==='hockey'?S.hcards:S.cards;
const edTotal=sp=>sp==='hockey'?HCARD_TOTAL:CARD_TOTAL;
const edHave=sp=>sp==='hockey'?hCount():cardCount();
const edComplete=(sp=spNow())=>edHave(sp)>=edTotal(sp);
const extrasOf=store=>Object.values(store).reduce((a,c)=>a+Math.max(0,c-1),0);
function useExtras(store,n){for(let i=0;i<n;i++){let best=null;for(const [k,c] of Object.entries(store))if(c>1&&(!best||c>store[best]))best=k;if(!best)return false;store[best]--}return true}

function edBanner(){const sp=spNow(),e=edOf(sp);if(!edComplete(sp))return'';
  if(e>=6)return`<div class="edban done"><div><b>Super Shiny binder complete!</b><span>You collected every ${sp} edition. You are a true champion!</span></div></div>`;
  return`<button class="edban" id="edup"><div><b>Binder complete! Move up!</b><span>Start Grade ${ED_GRADE[e+1]} with the ${EDITIONS[e+1]} edition: a new season and better-looking cards. Tap here.</span></div></button>`}

let VIEW_ARCH=0;
function edBinderBar(){const sp=spNow(),e=edOf(sp),past=S.arch[sp]||{};const tabs=[];
  for(let n=1;n<=e;n++){const done=n<e;tabs.push(`<button class="edtab ${(VIEW_ARCH?VIEW_ARCH===n:n===e)?'on':''}" data-edtab="${n}" ${done&&!past[n]?'disabled':''}>${EDITIONS[n]}${done?' ✓':''}</button>`)}
  const x=extrasOf(edStore(sp));
  return`<div class="edbar"><span class="eyebrow">Editions</span>${tabs.join('')}${e<6?`<span class="note" style="font-size:13px">Next: ${EDITIONS[e+1]} (Grade ${ED_GRADE[e+1]})</span>`:''}</div>
    ${VIEW_ARCH?`<p class="note" style="margin:6px 0 0"><b>You finished the ${EDITIONS[VIEW_ARCH]} edition.</b> This is your saved binder from Grade ${ED_GRADE[VIEW_ARCH]}.</p>`
      :`<p class="note" style="margin:6px 0 0">${EDITIONS[e]} edition · Grade ${gradeOf(sp)}. Fill every slot to move up to the next edition. You have <b>${x} extra cop${x===1?'y':'ies'}</b>${x>=3?': tap <b>Trade 3 extras</b> on any empty slot to get that card.':'. Every 3 extras can be traded for a card you need.'}</p>`}`}

function edAfterBinder(){
  document.querySelectorAll('#v-binder [data-edtab]').forEach(b=>b.onclick=()=>{const n=+b.dataset.edtab;if(n===edOf())openCurrentBinder();else viewArchive(n)});
  if(VIEW_ARCH)return;const sp=spNow(),store=edStore(sp);if(extrasOf(store)<3)return;
  document.querySelectorAll('#v-binder .empty[data-key]').forEach(el=>{const key=el.dataset.key;if(!key)return;const b=document.createElement('button');b.className='tradebtn';b.textContent='Trade 3 extras';
    b.onclick=()=>{if(extrasOf(store)<3)return;useExtras(store,3);store[key]=1;sfx.win();save();renderBar();openCurrentBinder();
      modal(`<h2>Trade complete!</h2><p class="note">You traded 3 extra cards for a card you needed.${edComplete(sp)?' <b>Your binder is complete!</b>':''}</p><div class="row"><button class="btn go" data-act="close">Awesome!</button></div>`)};el.appendChild(b)})}
function openCurrentBinder(){VIEW_ARCH=0;renderBinder();show('binder')}
function viewArchive(n){const sp=spNow(),A=(S.arch[sp]||{})[n];if(!A)return;
  const keys=sp==='hockey'?['hcards','hperfect']:['cards','pcards','champ','perfect'];const keep={};for(const k of keys)keep[k]=S[k];
  Object.assign(S,A);window.RENDER_ED=n;VIEW_ARCH=n;
  try{renderBinder();show('binder')}finally{Object.assign(S,keep);window.RENDER_ED=0}
  document.querySelectorAll('#v-binder .slot>button').forEach(b=>{b.onclick=null;b.style.cursor='default'});
  document.querySelectorAll('#v-binder [data-edtab]').forEach(b=>b.onclick=()=>{const m=+b.dataset.edtab;if(m===edOf())openCurrentBinder();else viewArchive(m)});
  VIEW_ARCH=0}

/* real-world prize message: shown only when a level (edition) is completed */
const PRIZE_MSG='Great Job, Owen! You have done such a great job and are learning so much! Love Mom & Dad!';
function prizeCelebration(sp,e,then){sfx.win();setTimeout(()=>sfx.win(),700);if(!reduce){confetti(['#ffb703','#ff6a1f','#ffffff','#7a3fd0','#2fd6c9']);setTimeout(()=>confetti(['#ffd34a','#ff5aa8','#6bc8ff','#ffffff']),900)}
  modal(`<div class="prize"><svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true"><path d="M34 14h52v26a26 26 0 0 1-52 0z" fill="#ffc93c" stroke="#b07800" stroke-width="4"/><path d="M34 22H16a16 16 0 0 0 18 22M86 22h18a16 16 0 0 1-18 22" fill="none" stroke="#b07800" stroke-width="5"/><path d="M60 66v18M42 104h36l-4-20H46z" fill="#ffc93c" stroke="#b07800" stroke-width="4" stroke-linejoin="round"/><path d="M60 24l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#fff"/></svg>
    <div class="eyebrow">Level complete! You finished the ${EDITIONS[e]} ${sp} binder</div>
    <h2 class="prize-h">You won a REAL prize!</h2>
    <p class="prize-go">Go see Dad to get your prize!</p>
    <p class="prize-msg">${PRIZE_MSG}</p></div>
    <div class="row"><button class="btn go" style="font-size:22px;padding:14px 26px" data-act="next">Yay! Show me my new cards</button></div>`,{next:then},true)}
function levelUp(sp){const e=edOf(sp);if(e>=6)return;prizeCelebration(sp,e,()=>doLevelUp(sp))}
function doLevelUp(sp){const e=edOf(sp);if(e>=6)return;sfx.win();
  S.arch[sp]=S.arch[sp]||{};
  if(sp==='hockey'){S.arch[sp][e]={hcards:S.hcards,hperfect:S.hperfect};S.hcards={};S.hbeaten=[];S.hperfect={}}
  else{S.arch[sp][e]={cards:S.cards,pcards:S.pcards,champ:S.champ,perfect:S.perfect};S.cards={};S.pcards={};S.champ=0;S.beaten=[];S.pwon=[];S.perfect={}}
  S.ed[sp]=e+1;S.unopened=(S.unopened||0)+1;save();renderBar();if(!reduce)confetti(['#ffb703','#ff6a1f','#ffffff','#7a3fd0','#2fd6c9']);
  const T=sp==='hockey'?HTEAMS[0]:TEAMS[0];
  modal(`<div class="eyebrow">Welcome to Grade ${ED_GRADE[e+1]}!</div><h2>${EDITIONS[e+1]} edition unlocked!</h2>
    <div class="showcase reveal-in">${sportsCard(T,1,true,{slot:0})}</div>
    <p class="note">Your ${EDITIONS[e]} binder is saved. A brand-new ${sp} season starts now with Grade ${ED_GRADE[e+1]} math, and every card you collect has the new ${EDITIONS[e+1]} look. Here's a free pack to get you started!</p>
    <div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="pack">Open your free pack!</button><button class="btn" data-act="home">Locker room</button></div>`,
    {pack:()=>{renderShop();show('shop');buyPack(PACKS[0],true)},home:()=>{closeModal();renderHome();show('home')}},true)}

document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#edup');if(b)levelUp(spNow())});

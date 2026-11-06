/* ============ EXTRAS ============
   Badges (trophy shelf), daily streak calendar with bonus packs, printable sticker sheets,
   stadium sounds (crowd cheer, organ "charge", team horns, all synthesized so they work offline),
   and weekly online backups to Firebase. Loaded last; it hooks into the game by wrapping a few
   global functions (save, flash, renderHome, renderBinder, settings, gearMenu, ...) so the core
   game files stay unchanged. */

/* ---------- styles ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
#toasts{position:fixed;left:50%;top:max(10px,env(safe-area-inset-top));transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:min(420px,92vw)}
.toast{pointer-events:auto;display:flex;align-items:center;gap:12px;background:#16214a;color:#fff;border-radius:16px;padding:10px 14px;box-shadow:0 6px 0 rgba(0,0,0,.35);animation:toastin .4s ease;border:3px solid #ffc93c}
.toast b{display:block;font-family:var(--display);font-weight:400;font-size:20px;line-height:1.1;color:#ffc93c}.toast span{font-weight:700;font-size:14px}
@keyframes toastin{from{transform:translateY(-30px);opacity:0}}
.medal{flex:none;width:52px;height:52px}
#v-trophies{display:flex;flex-direction:column;gap:14px}
#v-trophies h3{margin:0}
.trophy-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;margin-top:12px}
.badge{display:flex;gap:12px;align-items:center;background:var(--paper-2);border-radius:14px;padding:12px;min-width:0;min-height:88px;border:2px solid transparent}
.badge>div{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.badge.got{background:#fff6d6;border:2px solid #f2b705}
.badge.locked .medal{filter:grayscale(1);opacity:.45}
.badge b{display:block;font-family:var(--display);font-weight:400;font-size:17px;line-height:1.1}
.badge small{display:block;font-size:12px;font-weight:700;color:var(--ink-2);line-height:1.25}
.bprog{height:7px;border-radius:4px;background:#d3daec;margin-top:4px;overflow:hidden;width:100%}.bprog i{display:block;height:100%;background:var(--blue)}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;width:100%}
.cal .dh{font-size:12px;font-weight:800;color:var(--ink-2);text-align:center}
.cal .d{aspect-ratio:1;border-radius:10px;background:var(--paper-2);display:grid;place-items:center;font-weight:800;font-size:14px;color:var(--ink-2)}
.cal .d.on{background:linear-gradient(#ffd34a,#ff9a1f);color:#3a2600}
.cal .d.today{outline:3px solid var(--accent);outline-offset:-3px}
.cal .d.future{opacity:.35}
.miles{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
.stk{display:grid;grid-template-columns:minmax(260px,340px) minmax(0,1fr);gap:24px;align-items:start;margin-top:14px}
.stk h3{font-size:18px}
.stk-top{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}
@media (max-width:720px){.stk{grid-template-columns:1fr}.miles{grid-template-columns:repeat(3,minmax(0,1fr))}}
.mile{border-radius:14px;padding:12px 8px;background:var(--paper-2);text-align:center;font-weight:800;display:flex;flex-direction:column;gap:4px;justify-content:center;min-height:104px;border:2px solid transparent}
.mile.done{background:#e8f6ec;border:2px solid #b5e2c3}.mile b{display:block;font-family:var(--display);font-weight:400;font-size:26px}
.streakbig{font-family:var(--display);font-size:56px;line-height:1;color:var(--accent)}
.stchip{display:flex;align-items:center;gap:5px;font-weight:800;font-size:14px;background:#fff1e8;border-radius:999px;padding:4px 10px;color:#b2410c}
.toggle{display:flex;align-items:center;gap:10px;justify-content:center;font-weight:800}
.toggle button{min-width:74px}
.bkrow{display:flex;align-items:center;justify-content:space-between;gap:8px;background:var(--paper-2);border-radius:10px;padding:6px 10px;font-size:14px;font-weight:700;width:100%}
</style>`);
document.body.insertAdjacentHTML('beforeend','<div id="toasts" aria-live="polite"></div>');
{const sec=document.createElement('section');sec.id='v-trophies';sec.hidden=true;document.getElementById('app').appendChild(sec);VIEWS.push('trophies')}

/* ---------- counters + toasts ---------- */
const ensureX=()=>{S.ev=S.ev||{};S.badges=S.badges||{};S.streakAward=S.streakAward||{};if(S.music===undefined)S.music=true};
const evInc=(k,n=1)=>{ensureX();S.ev[k]=(S.ev[k]||0)+n};
function toast(title,sub,sym='★'){const box=document.getElementById('toasts');const t=document.createElement('div');t.className='toast';t.innerHTML=`${medal(sym,true)}<div><b>${title}</b><span>${sub}</span></div>`;
  t.onclick=()=>t.remove();box.appendChild(t);while(box.children.length>3)box.firstChild.remove();setTimeout(()=>t.remove(),4200);cheer(1.1,.12)}
function medal(sym,got){return`<svg class="medal" viewBox="0 0 52 52" aria-hidden="true"><path d="M16 2h8l4 12h-8zM36 2h-8l-4 12h8z" fill="${got?'#e0413a':'#9aa6bd'}"/><circle cx="26" cy="32" r="18" fill="${got?'#ffc93c':'#c9d0de'}" stroke="${got?'#b07800':'#8d97b3'}" stroke-width="3"/><circle cx="26" cy="32" r="12.5" fill="none" stroke="${got?'#fff3b0':'#e3e7ef'}" stroke-width="2"/><text x="26" y="${String(sym).length>2?36:38}" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="${String(sym).length>2?11:String(sym).length>1?14:17}" fill="${got?'#7a4a00':'#6b7590'}">${sym}</text></svg>`}

/* ---------- badges ---------- */
const sum=a=>(a||[]).reduce((x,y)=>x+y,0);
const qTotal=()=>sum(S.stats&&S.stats.n);
const allCards=()=>{let n=Object.keys(S.cards||{}).length+Object.keys(S.hcards||{}).length+Object.keys(S.pcards||{}).length+(S.champ?1:0);
  for(const sp of['football','hockey'])for(const A of Object.values((S.arch||{})[sp]||{}))n+=Object.keys(A.cards||A.hcards||{}).length+Object.keys(A.pcards||{}).length+(A.champ?1:0);return n};
const anyLog=f=>(S.log||[]).some(f);
const BADGES=[
 ['win1','First Win','Win your first game','W',()=>S.wins,1],['win10','Team Captain','Win 10 games','10',()=>S.wins,10],['win50','Hall of Famer','Win 50 games','50',()=>S.wins,50],
 ['st5','Hot Streak','Get 5 right in a row','5',()=>S.bestStreak,5],['st10','On Fire','Get 10 right in a row','10',()=>S.bestStreak,10],['st20','Unstoppable','Get 20 right in a row','20',()=>S.bestStreak,20],
 ['fg','Field Goal Kicker','Kick a field goal','FG',()=>(S.ev||{}).fg||0,1],['bomb','Long Bomb','Throw a surprise long bomb','50',()=>(S.ev||{}).bomb||0,1],
 ['td25','Touchdown Machine','Score 25 touchdowns','TD',()=>(S.ev||{}).td||0,25],['goal25','Goal Scorer','Score 25 hockey goals','G',()=>(S.ev||{}).goal||0,25],
 ['shut','Shutout!','Win a hockey game 5–0','0',()=>anyLog(l=>l.sport==='hockey'&&l.won&&/–0$/.test(l.score||''))?1:0,1],
 ['perfect','Perfect Game','Win a game with no misses','★',()=>anyLog(l=>l.won&&l.wrong===0)?1:0,1],
 ['c25','Card Collector','Collect 25 cards','25',allCards,25],['c100','Super Collector','Collect 100 cards','100',allCards,100],
 ['packs','Pack Ripper','Open 10 packs','10',()=>S.packs||0,10],['trade','Trader','Trade extras for a card','T',()=>(S.ev||{}).trade||0,1],
 ['learn5','Learner','Open 5 lessons','L',()=>(S.ev||{}).lesson||0,5],['fix10','Comeback Kid','Learn 10 missed questions','10',()=>(S.missed||[]).filter(m=>m.mastered).length,10],
 ['q500','Math Marathon','Answer 500 questions','500',qTotal,500],['q2000','Math Superstar','Answer 2,000 questions','2K',qTotal,2000],
 ['coins','Coin Saver','Earn 1,000 coins','$',()=>S.coinsEarned||0,1000],['week','Week Warrior','Play 7 days in a row','7',()=>Math.max(streak(),(S.ev||{}).bestDays||0),7],
 ['bronze','Level Up','Reach the Bronze edition','B',()=>Math.max(edOf('football'),edOf('hockey')),2],['shiny','So Shiny!','Reach the Super Shiny edition','S',()=>Math.max(edOf('football'),edOf('hockey')),6],
 ['champ','Champion','Win the Numon Bowl','#1',()=>S.champ||0,1],['art','Artist','Make a coloring page or sticker sheet','A',()=>((S.ev||{}).color||0)+((S.ev||{}).sticker||0),1]
].map(([id,name,desc,sym,val,goal])=>({id,name,desc,sym,val,goal}));
const STREAK_MILES=[[3,1],[7,2],[30,3]];
function streakStart(){const set=new Set(S.days||[]);const d=new Date();const k=x=>`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;
  if(!set.has(k(d)))d.setDate(d.getDate()-1);let start=null;while(set.has(k(d))){start=k(d);d.setDate(d.getDate()-1)}return start}
let INCHECK=false;
function checkBadges(){ensureX();let changed=false;
  const n=streak();if(n>(S.ev.bestDays||0)){S.ev.bestDays=n;changed=true}
  const st=streakStart();for(const [days,packs] of STREAK_MILES)if(n>=days&&st&&S.streakAward[days]!==st){S.streakAward[days]=st;S.unopened=(S.unopened||0)+packs;changed=true;
    setTimeout(()=>toast(`${days}-day streak!`,`You played ${days} days in a row. +${packs} free pack${packs>1?'s':''}!`,String(days)),300)}
  for(const b of BADGES){if(S.badges[b.id])continue;let v=0;try{v=b.val()||0}catch(e){}if(v>=b.goal){S.badges[b.id]=Date.now();S.coins+=20;S.coinsEarned+=20;changed=true;
    setTimeout(()=>toast(`Badge: ${b.name}!`,`${b.desc}. +20 coins`,b.sym),600)}}
  if(changed){origSave();renderBar()}}
const origSave=save;
save=function(){origSave();if(INCHECK)return;INCHECK=true;try{checkBadges()}finally{INCHECK=false}};

/* event counters via small wrappers */
{const f0=flash;flash=function(text,cls){const t=String(text);
    if(/LONG BOMB/.test(t))evInc('bomb');
    if(/TOUCHDOWN/.test(t)){cheer(1.8)}else if(/^GOAL!/.test(t)){evInc('goal');cheer(1.8)}else if(/IT’S GOOD/.test(t)){cheer(1.6)}else if(/FIRST DOWN|LONG BOMB/.test(t)){cheer(.9,.1)}
    else if(G&&cls==='red'&&/score!|FUMBLE|TURNOVER/.test(t)){teamHorn(G.T.id,.7)}
    return f0.apply(this,arguments)}}
if(typeof scorePoints==='function'){const f0=scorePoints;scorePoints=function(pts,label,why){if(pts===7)evInc('td');if(pts===3)evInc('fg');if(/long bomb/i.test(why||''))evInc('bomb');return f0.apply(this,arguments)}}
{const f0=openLesson;openLesson=function(){evInc('lesson');return f0.apply(this,arguments)}}
{const f0=coloringPage;coloringPage=function(){evInc('color');return f0.apply(this,arguments)}}
{const f0=useExtras;useExtras=function(store,n){const r=f0.apply(this,arguments);if(r)evInc('trade');return r}}
for(const nm of['winGame','hWin']){const f0=window[nm];if(typeof f0==='function')window[nm]=function(){setTimeout(()=>{charge();cheer(2.2)},400);return f0.apply(this,arguments)}}
for(const nm of['startGame','startHGame']){const f0=window[nm];if(typeof f0==='function')window[nm]=function(){const r=f0.apply(this,arguments);setTimeout(charge,600);return r}}

/* ---------- stadium sounds (synthesized) ---------- */
function ac(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();return AC}catch(e){return null}}
function cheer(len=1.6,vol=.16){if(S.muted)return;const a=ac();if(!a)return;try{const t=a.currentTime,b=a.createBuffer(1,Math.floor(a.sampleRate*len),a.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++){const x=i/a.sampleRate;d[i]=(Math.random()*2-1)*(.7+.3*Math.sin(x*9))}
  const n=a.createBufferSource();n.buffer=b;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=1100;f.Q.value=.5;const g=a.createGain();
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.2);g.gain.exponentialRampToValueAtTime(.0001,t+len);n.connect(f).connect(g).connect(a.destination);n.start(t);n.stop(t+len)}catch(e){}}
function charge(){if(S.muted||S.music===false)return;[[392,.14],[523,.14],[659,.14],[784,.3],[0,.12],[659,.14],[784,.5]].reduce((w,[f,d])=>{if(f){tone(f,d,'square',w,.045);tone(f*2,d,'triangle',w,.03)}return w+d+.02},0)}
function teamHorn(id,len=1){if(S.muted)return;const base=140+((id*37)%80);tone(base,len,'sawtooth',0,.05);tone(base*1.26,len,'sawtooth',0,.035);tone(base*1.5,len,'sawtooth',0,.03)}

/* ---------- trophies + streak page ---------- */
function calendarHTML(){const set=new Set(S.days||[]);const t=new Date();const start=new Date(t);start.setDate(t.getDate()-28-t.getDay());
  const k=x=>`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;let h=['S','M','T','W','T','F','S'].map(x=>`<div class="dh">${x}</div>`).join('');
  for(let i=0;i<35;i++){const d=new Date(start);d.setDate(start.getDate()+i);const key=k(d),fut=d>t&&key!==k(t);h+=`<div class="d ${set.has(key)?'on':''} ${key===k(t)?'today':''} ${fut?'future':''}" title="${key}">${d.getDate()}</div>`}
  return`<div class="cal">${h}</div>`}
function renderTrophies(){ensureX();const n=streak(),got=BADGES.filter(b=>S.badges[b.id]).length,st=streakStart();
  $('#v-trophies').innerHTML=`<div class="panel"><div class="head"><button class="btn" id="back9">← Locker room</button><h2>Trophies & streak</h2><button class="btn blue" id="tostick" style="font-size:16px;padding:8px 14px;margin-left:auto">Make a sticker sheet</button></div></div>
  <div class="panel"><div class="stk-top"><div><div class="eyebrow">Daily streak</div><div class="streakbig">${n} day${n===1?'':'s'}</div></div><p class="note" style="margin:0 0 6px;flex:1;min-width:220px">Play a game or practice at least once a day to keep your streak going. Best ever: ${Math.max(n,S.ev.bestDays||0)} days.</p></div>
    <div class="stk"><div><h3 style="margin-bottom:8px">Last 5 weeks</h3>${calendarHTML()}</div><div><h3>Streak rewards</h3>
      <div class="miles">${STREAK_MILES.map(([d,p])=>{const done=st&&S.streakAward[d]===st;return`<div class="mile ${done?'done':''}"><b>${d} days</b>${p} free pack${p>1?'s':''}<br><small>${done?'✓ Earned this streak':n>=d?'Earned!':`${d-n} more day${d-n===1?'':'s'}`}</small></div>`}).join('')}</div></div></div></div>
  <div class="panel"><h3 style="font-size:22px;display:flex;align-items:baseline;gap:8px">Badges <small style="font-family:var(--body);font-size:14px;color:var(--ink-2)">${got} of ${BADGES.length}</small></h3><p class="note" style="margin:2px 0 0">Each new badge earns 20 coins.</p>
    <div class="trophy-grid">${BADGES.map(b=>{let v=0;try{v=b.val()||0}catch(e){}const has=!!S.badges[b.id];const pct=Math.min(100,Math.round(v/b.goal*100));
      return`<div class="badge ${has?'got':'locked'}">${medal(b.sym,has)}<div style="min-width:0"><b>${b.name}</b><small>${b.desc}</small>${has?'<small style="color:var(--good)">✓ Earned</small>':b.goal>1?`<div class="bprog"><i style="width:${pct}%"></i></div><small>${comma(Math.min(v,b.goal))} / ${comma(b.goal)}</small>`:''}</div></div>`}).join('')}</div></div>`;
  $('#back9').onclick=()=>{renderHome();show('home')};$('#tostick').onclick=stickerMenu}
{const f0=renderHome;renderHome=function(){const r=f0.apply(this,arguments);const row=document.querySelector('#v-home .cta .row');
  if(row&&!document.getElementById('totrophy')){(row.querySelector('#toguide3')||row.lastElementChild).insertAdjacentHTML('beforebegin','<button class="btn blue" id="totrophy">Trophies & streak</button>');document.getElementById('totrophy').onclick=()=>{renderTrophies();show('trophies')}}return r}}
{const f0=renderBar;renderBar=function(){f0.apply(this,arguments);const bar=document.querySelector('.bar');if(!bar)return;let c=document.getElementById('stchip');
  if(!c){c=document.createElement('button');c.id='stchip';c.className='stchip';c.title='Daily streak';c.onclick=()=>{if(G||RV)return;renderTrophies();show('trophies')};const w=document.querySelector('.bar .stat');bar.insertBefore(c,w)}
  const n=streak();c.innerHTML=`<svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><path d="M7 1c1 3 5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 1 1 2 2 2 0-3 0-5 1-7z" fill="#ff6a1f"/></svg>${n}`}}

/* ---------- sticker sheets ---------- */
function stickerItems(mode){const HK=S.sport==='hockey';const store=HK?S.hcards:S.cards;
  const toItem=k=>{if(k.startsWith('X-')){const X=PROMO[k.slice(2)];return X?{T:X.T,P:X.P()}:null}const m=HK?k.match(/^H(\d+)-(\d)$/):k.match(/^(\d+)-(\d)$/);if(!m)return null;const T=(HK?HTEAMS:TEAMS)[m[1]-1];return T?{T,P:T.roster[+m[2]]}:null};
  if(mode==='me'){const base=HK?MEPH():MEP();const poses=HK?['hk','shoot','cheer']:['throw','td','flex','ball'],faces=['game','happy','shout'];
    return Array.from({length:20},(_,i)=>({T:HK?ME_H:ME,P:{...base,look:{...base.look,pose:poses[i%poses.length],face:faces[Math.floor(i/poses.length)%3]}}}))}
  let items=Object.keys(store).map(toItem).filter(Boolean);
  return mode==='new'?items.slice(-20).reverse():shuffle(items).slice(0,20)}
function stickerSVG(items){let o='';items.forEach((it,i)=>{const cx=125+(i%4)*200,cy=150+Math.floor(i/4)*196,T=it.T.hockey?it.T:(it.T===ME?UNI():it.T),P=it.P;
  const flip=!it.T.hockey&&(it.T===ME||it.T.city===ME.city);const f=fig(it.T,flip,P).replace('<svg viewBox="0 0 120 120"',`<svg x="${-74}" y="${-80}" width="148" height="148" viewBox="0 0 120 120"`);
  o+=`<circle cx="${cx}" cy="${cy}" r="92" fill="none" stroke="#b7bfd6" stroke-width="1.5" stroke-dasharray="6 5"/>
   <clipPath id="c${i}"><circle cx="0" cy="0" r="84"/></clipPath>
   <g transform="translate(${cx} ${cy})"><circle r="84" fill="${T.p}"/><g clip-path="url(#c${i})"><circle r="84" fill="url(#shine)"/><g${flip?' transform="scale(-1 1)"':''}>${f}</g>
   <rect x="-90" y="36" width="180" height="27" fill="${T.s}"/></g><text x="0" y="55" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="14" fill="${T.p}" textLength="${Math.min(112,String(P.name).length*9)}" lengthAdjust="spacingAndGlyphs">${esc(P.name)}</text>
   <circle r="84" fill="none" stroke="#ffffff" stroke-width="6"/></g>`});
  return`<svg xmlns="http://www.w3.org/2000/svg" width="1700" height="2200" viewBox="0 0 850 1100"><defs><radialGradient id="shine" cx=".35" cy=".25" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
   <rect width="850" height="1100" fill="#fff"/><text x="425" y="38" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="24" fill="#16203f">My Numon sticker sheet</text>${o}
   <text x="425" y="1088" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#8d97b3">Print on letter-size sticker paper and cut along the dotted circles.</text></svg>`}
function stickerMenu(){sfx.tap();const HK=S.sport==='hockey';const have=Object.keys(HK?S.hcards:S.cards).length;
  modal(`<h2>Sticker sheet</h2><p class="note">Make a page of 20 round stickers to print on sticker paper. These use your ${HK?'hockey':'football'} cards.</p>
   <div class="row"><button class="btn blue" data-act="mk" data-m="new" ${have?'':'disabled'}>My newest cards</button><button class="btn blue" data-act="mk" data-m="rand" ${have?'':'disabled'}>Random from my binder</button><button class="btn blue" data-act="mk" data-m="me">Me! (20 poses)</button></div>
   ${have?'':'<p class="note">Win some games to get cards first, or make a sheet of yourself!</p>'}<div class="row"><button class="btn" data-act="close">Close</button></div>`,{mk:b=>makeStickers(b.dataset.m)},true)}
async function makeStickers(mode){const items=stickerItems(mode);if(!items.length)return;modal('<h2>Sticker sheet</h2><p class="note" id="cmsg">Making your stickers…</p>');
  let blob;try{blob=await renderPNG(stickerSVG(items))}catch(e){$('#cmsg').textContent='The sticker sheet could not be made. Close this and try again.';return}
  evInc('sticker');save();const url=URL.createObjectURL(blob);
  modal(`<h2>Sticker sheet</h2><img src="${url}" alt="Sticker sheet with ${items.length} round stickers" style="width:min(320px,70vw);border:1px solid var(--line);border-radius:8px;background:#fff">
    <p class="note" id="cmsg">A full letter-size page. Print it on sticker paper, then cut along the dotted circles.</p>
    <div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="save">Save or print</button><button class="btn blue" data-act="again">Make another</button><button class="btn" data-act="close">Close</button></div>`,
    {save:async b=>{b.disabled=true;try{await saveFile(`sticker-sheet-${today()}.png`,blob,'image/png');$('#cmsg').textContent='Saved! Print it on sticker paper.'}catch(e){$('#cmsg').textContent='Not saved. Tap Save again whenever you are ready.';b.disabled=false}},
     again:()=>{URL.revokeObjectURL(url);stickerMenu()},close:()=>{URL.revokeObjectURL(url);closeModal()}})}
{const f0=renderBinder;renderBinder=function(){const r=f0.apply(this,arguments);const head=document.querySelector('#v-binder .head');
  if(head&&!document.getElementById('b2stick')){head.insertAdjacentHTML('beforeend','<button class="btn blue" id="b2stick" style="font-size:16px;padding:8px 14px">Sticker sheet</button>');document.getElementById('b2stick').onclick=stickerMenu}return r}}

/* ---------- settings: music toggle ---------- */
{const f0=gearMenu;gearMenu=function(){f0.apply(this,arguments);ensureX();const m=document.querySelector('#modal-root .modal');if(!m)return;const done=[...m.querySelectorAll('.row')].pop();
  const el=document.createElement('div');el.className='toggle';el.innerHTML=`<span>Stadium music</span><button class="btn ${S.music?'blue':''}" id="mus">${S.music?'On':'Off'}</button><span class="note" style="font-size:13px">Sound effects use the speaker button</span>`;
  m.insertBefore(el,done);el.querySelector('#mus').onclick=b=>{S.music=!S.music;save();const x=el.querySelector('#mus');x.textContent=S.music?'On':'Off';x.className='btn '+(S.music?'blue':'');if(S.music)charge()}}}

/* ---------- weekly online backups ---------- */
const BK_WEEK=7*864e5,BK_KEEP=8;
async function doBackup(){const fb=window.FB;if(!fb||!fb.uid||!fb.uid())throw new Error('signed out');const uid=fb.uid(),id=today();
  await fb.backupSave(uid,id,{json:JSON.stringify(S),savedAt:Date.now(),summary:{wins:S.wins||0,cards:allCards(),questions:qTotal()}});
  S.lastBackupAt=Date.now();origSave();
  try{const list=(await fb.backupList(uid)).sort((a,b)=>b.id.localeCompare(a.id));for(const x of list.slice(BK_KEEP))await fb.backupDelete(uid,x.id)}catch(e){}}
async function autoBackup(){try{if(!window.FB||!FB.uid||!FB.uid()||!CLOUD.ref||CLOUD.state!=='synced')return;if(Date.now()-(S.lastBackupAt||0)<BK_WEEK)return;await doBackup()}catch(e){}}
setTimeout(autoBackup,15000);setInterval(autoBackup,60000);
{const f0=settings;settings=function(){f0.apply(this,arguments);const m=document.querySelector('#modal-root .modal');if(!m)return;const last=[...m.querySelectorAll('.btn')].pop().closest('.row')||[...m.children].pop();
  const box=document.createElement('div');box.className='acct';box.style.width='100%';box.id='bkbox';m.insertBefore(box,m.lastElementChild);renderBk()}}
async function renderBk(){const box=document.getElementById('bkbox');if(!box)return;const fb=window.FB,signed=fb&&fb.uid&&fb.uid();
  if(!signed){box.innerHTML='<b>Weekly online backups</b><p class="note" style="font-size:13px;margin:2px 0 0">Sign in to a parent account above to keep a backup copy online every week.</p>';return}
  box.innerHTML=`<b>Weekly online backups</b><p class="note" style="font-size:13px;margin:2px 0 6px">A copy saves online once a week (the last ${BK_KEEP} are kept). Last backup: ${S.lastBackupAt?new Date(S.lastBackupAt).toLocaleDateString():'not yet'}.</p>
    <div class="row" style="justify-content:flex-start"><button class="btn blue" id="bknow" style="font-size:15px;padding:8px 14px">Back up now</button><button class="btn" id="bkshow" style="font-size:15px;padding:8px 14px">Restore a backup</button></div><div id="bklist" style="display:grid;gap:6px;margin-top:6px"></div>`;
  $('#bknow').onclick=async b=>{const x=$('#bknow');x.disabled=true;x.textContent='Backing up…';try{await doBackup();x.textContent='Backed up!'}catch(e){x.textContent='Could not back up';x.disabled=false}};
  $('#bkshow').onclick=async()=>{const L=$('#bklist');L.innerHTML='<span class="note">Loading…</span>';try{const list=(await fb.backupList(fb.uid())).sort((a,b)=>b.id.localeCompare(a.id));
    if(!list.length){L.innerHTML='<span class="note">No backups yet.</span>';return}
    L.innerHTML=list.map(x=>`<div class="bkrow"><span>${new Date(x.savedAt).toLocaleDateString([],{month:'short',day:'numeric',year:'numeric'})} · ${(x.summary||{}).wins||0} wins · ${(x.summary||{}).cards||0} cards</span><button class="btn" data-bk="${x.id}" style="font-size:14px;padding:6px 12px">Restore</button></div>`).join('');
    L.querySelectorAll('[data-bk]').forEach(b=>{let armed=false;b.onclick=()=>{if(!armed){armed=true;b.textContent='Tap again to restore';return}const x=list.find(y=>y.id===b.dataset.bk);
      try{S=Object.assign(fresh(),JSON.parse(x.json));migrate();save();closeModal();renderHome();show('home');toast('Backup restored','Progress from '+new Date(x.savedAt).toLocaleDateString()+' is back.','✓')}catch(e){b.textContent='Could not restore'}}})}catch(e){L.innerHTML='<span class="note">Could not load backups. Check the internet connection.</span>'}}}

ensureX();renderBar();

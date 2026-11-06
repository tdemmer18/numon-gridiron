/* ============ GAME GUIDE & CHECKLIST ============
   One reference page opened from Settings (gear) and the grown-ups menu: a live checklist of
   progress plus short "how it works" sections for every part of the game. Loaded after extras.js. */

document.head.insertAdjacentHTML('beforeend',`<style>
.gtabs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.gtabs button{font-weight:800;padding:8px 16px;border-radius:999px;background:var(--paper-2);border:2px solid transparent}
.gtabs button.on{border-color:var(--accent);background:#fff1e8}
.guide{width:100%;text-align:left;display:flex;flex-direction:column;gap:10px}
.guide details{background:var(--paper-2);border-radius:14px;padding:10px 14px}
.guide summary{font-family:var(--display);font-size:20px;cursor:pointer;list-style:none;display:flex;align-items:center;gap:8px}
.guide summary::before{content:"+";display:inline-grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--blue);color:#fff;font-size:18px;flex:none}
.guide details[open] summary::before{content:"−"}
.guide ul{margin:8px 0 2px;padding-left:20px;display:grid;gap:4px;font-weight:600}
.ck{display:grid;gap:6px}
.ckrow{display:flex;align-items:center;gap:10px;background:#fff;border-radius:10px;padding:7px 10px;font-weight:700}
.ckbox{flex:none;width:24px;height:24px;border-radius:7px;border:3px solid #b7bfd6;display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px}
.ckrow.done .ckbox{background:var(--good);border-color:var(--good)}
.ckrow.done .ckt{color:var(--ink-2)}
.ckt{flex:1;min-width:0}.ckv{font-variant-numeric:tabular-nums;color:var(--ink-2);font-size:14px;white-space:nowrap}
.ckbar{height:6px;border-radius:3px;background:#e3e8f3;overflow:hidden;margin-top:3px}.ckbar i{display:block;height:100%;background:var(--blue)}
.modal:has(.guide){max-height:calc(100vh - 40px);overflow-y:auto}
</style>`);

function ckRow(text,cur,goal){const done=cur>=goal,pct=Math.min(100,Math.round(cur/Math.max(1,goal)*100));
  return`<div class="ckrow ${done?'done':''}"><span class="ckbox">${done?'✓':''}</span><div class="ckt">${text}${goal>1&&!done?`<div class="ckbar"><i style="width:${pct}%"></i></div>`:''}</div><span class="ckv">${goal>1?`${comma(Math.min(cur,goal))} / ${comma(goal)}`:done?'Done':'Not yet'}</span></div>`}

function checklistHTML(){ensureX();const fE=edOf('football'),hE=edOf('hockey'),n=streak(),st=streakStart();
  const fBin=cardCount(),hBin=hCount(),dailyDone=S.dailyDay===today()&&!S.dailyReady,playedToday=(S.days||[]).includes(today());
  const got=BADGES.filter(b=>S.badges[b.id]).length;
  return`<div class="guide">
   <details open><summary>Today</summary><div class="ck" style="margin-top:8px">
     ${ckRow('Open your Pack of the Day',dailyDone?1:0,1)}${ckRow('Play a game or practice (keeps your streak going)',playedToday?1:0,1)}
     ${ckRow(`Open your free reward packs${S.unopened?` (${S.unopened} waiting)`:''}`,S.unopened?0:1,1)}${ckRow('Practice your missed questions',needPractice().length?0:1,1)}</div></details>
   <details open><summary>Football · ${EDITIONS[fE]} edition · Grade ${gradeOf('football')}</summary><div class="ck" style="margin-top:8px">
     ${ckRow('Beat all 31 teams',S.beaten.length,TEAMS.length)}${ckRow('Win all 4 playoff games',(S.pwon||[]).length,PLAYOFFS.length)}
     ${ckRow('Fill the football binder',fBin,CARD_TOTAL)}${ckRow('Reach the Super Shiny edition',fE,6)}</div></details>
   <details open><summary>Hockey · ${EDITIONS[hE]} edition · Grade ${gradeOf('hockey')}</summary><div class="ck" style="margin-top:8px">
     ${ckRow('Beat all 31 teams',(S.hbeaten||[]).length,HTEAMS.length)}${ckRow('Fill the hockey binder',hBin,HCARD_TOTAL)}${ckRow('Reach the Super Shiny edition',hE,6)}</div></details>
   <details><summary>Streak rewards · ${n} day${n===1?'':'s'} now</summary><div class="ck" style="margin-top:8px">
     ${STREAK_MILES.map(([d,p])=>ckRow(`${d} days in a row: ${p} free pack${p>1?'s':''}`,st&&S.streakAward[d]===st?d:Math.min(n,d),d)).join('')}</div></details>
   <details><summary>Badges · ${got} of ${BADGES.length}</summary><div class="ck" style="margin-top:8px">
     ${BADGES.map(b=>{let v=0;try{v=b.val()||0}catch(e){}return ckRow(`<b>${b.name}</b>: ${b.desc}`,S.badges[b.id]?b.goal:v,b.goal)}).join('')}</div></details>
   <details><summary>Learning</summary><div class="ck" style="margin-top:8px">
     ${ckRow('Answer 500 questions',qTotal(),500)}${ckRow('Learn 10 missed questions',(S.missed||[]).filter(m=>m.mastered).length,10)}${ckRow('Open 5 lessons',(S.ev||{}).lesson||0,5)}
     ${ckRow('Reach the top difficulty for your grade',S.bestLevel>=lvHi()?1:0,1)}</div></details></div>`}

function howHTML(){return`<div class="guide">
  <details open><summary>Football</summary><ul>
    <li>Pick <b>Run</b> (easier question) or <b>Pass</b> (harder question, more yards). A right answer moves the ball.</li>
    <li>You get 4 downs to go 10 yards for a first down.</li>
    <li>Touchdown = 7 points. Inside the 30, tap <b>Field goal</b> for 3 points.</li>
    <li>Get 10 right in a row for a <b>surprise long bomb</b> of 50+ yards!</li>
    <li>Two misses in a row can cause a <b>fumble</b>: the other team gets points, but you keep playing.</li>
    <li>Score and take the lead to win. A tie means you get the ball back. If they reach 28, they win.</li></ul></details>
  <details><summary>Hockey</summary><ul>
    <li>Pick a <b>Wrist shot</b> (easier) or a <b>Slap shot</b> (harder, more coins).</li>
    <li>A right answer is a goal! A miss lets the other team try to score.</li>
    <li>First team to 5 goals wins. Winning earns the goalie's card and a free pack.</li></ul></details>
  <details><summary>Getting harder (and easier)</summary><ul>
    <li>3 right in a row moves you up a difficulty level. A miss moves you down one.</li>
    <li>Questions you get right are not asked again. Missed questions come back so you can try again.</li></ul></details>
  <details><summary>Coins, packs and cards</summary><ul>
    <li>Earn coins for yards, first downs, goals, wins and badges.</li>
    <li>Spend coins in the <b>Card shop</b>. Every pack has one special promo card.</li>
    <li>Every win gives a free reward pack, and there is a free <b>Pack of the Day</b> every day.</li>
    <li>Got 3 extra copies? Trade them in the binder for any card you need.</li></ul></details>
  <details><summary>Editions and prizes</summary><ul>
    <li>Fill every slot in a binder to finish that edition and move up a grade.</li>
    <li>Editions go Standard → Bronze → Silver → Gold → Rainbow → Super Shiny. Each one has fancier cards.</li>
    <li>Finishing an edition wins a <b>real prize</b>. Go see Dad!</li></ul></details>
  <details><summary>Learning help</summary><ul>
    <li>Tap <b>Learn how</b> on any question for a picture, an example and the steps.</li>
    <li>Use the <b>scratch pad</b> with your finger or Apple Pencil. Tap <b>+</b> to make it bigger.</li>
    <li><b>Learn math</b> on the home screen shows every lesson.</li></ul></details>
  <details><summary>Badges and streaks</summary><ul>
    <li>Earn badges for big moments. Each one is worth 20 coins.</li>
    <li>Play every day to grow your streak: 3 days, 7 days and 30 days earn free packs.</li></ul></details>
  <details><summary>Make and print</summary><ul>
    <li>Tap a card in your binder and choose <b>Coloring page</b> to print a black-and-white version.</li>
    <li>Tap <b>Sticker sheet</b> in the binder to print 20 round color stickers.</li></ul></details>
  <details><summary>Settings</summary><ul>
    <li>Gear icon: switch between football and hockey, choose Mini players or Numons, and turn stadium music on or off.</li>
    <li>Speaker icon: turn all sounds on or off.</li>
    <li><b>Customize player</b> on the home screen changes your name, number and look.</li></ul></details>
  <details><summary>For grown-ups</summary><ul>
    <li>The lock icon opens the grown-ups menu (answer the multiplication question).</li>
    <li>There you can sign in to the parent account, back up or restore progress, give a new Pack of the Day, move a sport to the next edition, and see the progress report.</li>
    <li>While signed in, progress syncs online and a backup saves every week (the last 8 are kept).</li>
    <li>Parent dashboard: <b>tdemmer18.github.io/numon-gridiron/parent.html</b></li>
    <li>Grade 5 lessons and reports stay hidden until a sport reaches Grade 5.</li></ul></details></div>`}

function openGuide(tab='check'){sfx.tap();
  modal(`<h2>Game guide</h2><div class="gtabs"><button class="${tab==='check'?'on':''}" data-act="tab" data-t="check">My checklist</button><button class="${tab==='how'?'on':''}" data-act="tab" data-t="how">How to play</button></div>
    ${tab==='check'?checklistHTML():howHTML()}<div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="close">Done</button></div>`,{tab:b=>openGuide(b.dataset.t)},true)}

{const f0=gearMenu;gearMenu=function(){f0.apply(this,arguments);const m=document.querySelector('#modal-root .modal');if(!m||m.querySelector('#toguide'))return;
  const b=document.createElement('div');b.className='row';b.innerHTML='<button class="btn blue" id="toguide">Game guide & checklist</button>';m.insertBefore(b,m.children[1]);b.firstChild.onclick=()=>openGuide()}}
{const f0=settings;settings=function(){f0.apply(this,arguments);const m=document.querySelector('#modal-root .modal');if(!m||m.querySelector('#toguide2'))return;
  const b=document.createElement('div');b.className='row';b.innerHTML='<button class="btn blue" id="toguide2">Game guide & checklist</button>';m.insertBefore(b,m.lastElementChild);b.firstChild.onclick=()=>openGuide('how')}}

document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#toguide3'))openGuide()});

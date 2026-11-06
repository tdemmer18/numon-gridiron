/* ============ HOCKEY ============
   Loaded after the main game script in index.html and shares its globals (S, save, fig, mountQ,
   pickQuestion, record, sportsCard, slotFor, modal, sfx, ...). Teams are made-up nicknames in real
   NHL cities with team-style colors; no real team names, logos or player names. */

const ME_H={id:0,abbr:'BUF',city:'Buffalo',name:'Blizzard',p:'#002654',s:'#FCB514',o:'#ffffff',hockey:true,kit:['#002654','#FCB514','#002654'],num:17,pos:'C'};
const HDIVS=['Atlantic','Metropolitan','Central','Pacific'];
const HT_RAW=[
 ['BOS','Boston','Beacons','#111111','#FFB81C','Atlantic'],['DET','Detroit','Gearheads','#CE1126','#FFFFFF','Atlantic'],['FLA','Florida','Sunrays','#C8102E','#041E42','Atlantic'],
 ['MTL','Montreal','Maples','#AF1E2D','#192168','Atlantic'],['OTT','Ottawa','Moose','#C52032','#111111','Atlantic'],['TBL','Tampa Bay','Thunderbolts','#002868','#FFFFFF','Atlantic'],
 ['TOR','Toronto','Lakeshore','#00205B','#FFFFFF','Atlantic'],
 ['CAR','Carolina','Cyclones','#CE1126','#111111','Metropolitan'],['CBJ','Columbus','Cannons','#002654','#CE1126','Metropolitan'],['NJD','New Jersey','Dragons','#CE1126','#00563F','Metropolitan'],
 ['NYI','Long Island','Surf','#00539B','#F47D30','Metropolitan'],['NYR','New York','Skyscrapers','#0038A8','#CE1126','Metropolitan'],['PHI','Philadelphia','Pretzels','#F74902','#111111','Metropolitan'],
 ['PIT','Pittsburgh','Ironmen','#111111','#FCB514','Metropolitan'],['WSH','Washington','Eagles','#C8102E','#041E42','Metropolitan'],
 ['CHI','Chicago','Gusts','#CF0A2C','#111111','Central'],['COL','Colorado','Peaks','#6F263D','#236192','Central'],['DAL','Dallas','Lone Stars','#006847','#8F8F8C','Central'],
 ['MIN','Minnesota','Lumberjacks','#154734','#A6192E','Central'],['NSH','Nashville','Guitars','#FFB81C','#041E42','Central'],['STL','St. Louis','Arches','#002F87','#FCB514','Central'],
 ['UTA','Utah','Canyons','#090909','#71AFE5','Central'],['WPG','Winnipeg','Snowhawks','#041E42','#AC162C','Central'],
 ['ANA','Anaheim','Orange Crush','#F47A38','#111111','Pacific'],['CGY','Calgary','Stampede','#C8102E','#F1BE48','Pacific'],['EDM','Edmonton','Grizzlies','#041E42','#FF4C00','Pacific'],
 ['LAK','Los Angeles','Stars','#111111','#A2AAAD','Pacific'],['SEA','Seattle','Orcas','#001628','#99D9D9','Pacific'],['SJS','San Jose','Stingrays','#006D75','#111111','Pacific'],
 ['VAN','Vancouver','Rainmakers','#00205B','#00843D','Pacific'],['VGK','Vegas','Aces','#B4975A','#333F42','Pacific']];
const HREPORTS=['Stops pucks like a brick wall.','Has the quickest glove in the league.','Never lets a rebound get away.','Stays calm even in overtime.','Reads every shot before it happens.',
 'Slides across the crease like lightning.','Loves a big save to get the crowd cheering.','Always the first one on the ice at practice.','Knows every shooter’s favorite move.','Taps the posts for good luck before every game.'];
const HFIRST=['Axel','Bo','Cal','Dane','Emil','Finn','Gus','Hugo','Ike','Jules','Koby','Lars','Mika','Nils','Otto','Pip','Quinn','Remy','Sven','Theo','Ulf','Vik','Wyatt','Jaxon','Kit','Leo','Max','Ned','Ollie','Pierre','Rory','Sami'];
const HLAST=['Slapshot','Icewood','Breakaway','Pucksworth','Bladesley','Crossbar','Faceoff','Hatley','Frostman','Glacierson','Stickley','Rinkman','Powerplay','Boardman','Wristly','Snowbank',
 'Deke','Blueline','Crease','Goalpost','Iceberg','Coldfield','Wintergreen','Northby','Skatesby','Zamberg','Chillwell','Frostby','Netley','Sledsworth','Polaris'];
const HHW={G:[73,77,190,220],C:[70,75,180,210],LW:[70,75,180,205],RW:[70,75,180,205],D:[72,77,195,225]};
let hgi=0,hskin=2;
const HTEAMS=HT_RAW.map(([abbr,city,name,p,s,div],i)=>{const id=i+1,r=seed(id*977+31);
  const T={id,abbr,city,name,p,s,div,hockey:true,kit:[p,s,shade(p,-.35)],start:id<=8?1:id<=16?2:id<=24?3:4,tier:id<=10?'base':id<=20?'silver':id<=28?'gold':'hof',report:HREPORTS[i%HREPORTS.length]};
  const mk=(pos,num,pose)=>{const [h1,h2,w1,w2]=HHW[pos];const nm=`${HFIRST[(hgi*7)%HFIRST.length]} ${HLAST[(hgi*11)%HLAST.length]}`;hgi++;
    return{name:nm,pos,num,ht:fmtHt(h1+Math.floor(r()*(h2-h1+1))),wt:(w1+Math.floor(r()*(w2-w1+1)))+' lb',look:{skin:(hskin++)%5,beard:r()<.3,mouth:['grit','frown','smirk'][Math.floor(r()*3)],pose}}};
  const w=['LW','RW','D'][id%3];
  T.roster=[mk('G',30+(id*3)%10,'goalie'),mk('C',10+(id*7)%20,'hk'),mk(w,w==='D'?2+(id*5)%8:60+(id*3)%30,'hk')];
  T.roster.forEach((P,k)=>{P.slot=k;P.mon=((id*5+k*9)%30)+1});return T});
const hk=(T,slot=0)=>`H${T.id}-${slot}`;
/* the kid's hockey look: its own options, separate from football (name is shared) */
const HUNIFORMS={home:{label:'Home navy',p:'#002654',s:'#FCB514',o:'#ffffff',kit:['#002654','#FCB514','#002654']},away:{label:'Away white',p:'#ffffff',s:'#002654',o:'#FCB514',kit:['#ffffff','#002654','#002654']},third:{label:'Third gold',p:'#FCB514',s:'#002654',o:'#ffffff',kit:['#FCB514','#002654','#002654']}};
const MEH_DEFAULT={num:17,pose:'hk',face:'game',uniform:'home',helmet:'visor',beard:'',tape:'#1b1b1f',skates:'#1b1b1f'};
const meh=()=>({...MEH_DEFAULT,...(S.meh||{})});
const UNIH=()=>{const u=HUNIFORMS[meh().uniform]||HUNIFORMS.home;return{...ME_H,p:u.p,s:u.s,o:u.o,kit:u.kit}};
const MEPH=(m=meh())=>({mon:6,name:(S.me&&S.me.name||'').trim()||'Your player',pos:'C',num:m.num??17,ht:`5'11"`,wt:'190 lb',look:{skin:S.me?S.me.skin??2:2,beard:m.beard,face:m.face,mouth:'smirk',pose:m.pose,helmet:m.helmet,tape:m.tape,skates:m.skates}});

/* hockey figure: helmet with visor, sweater, gloves, stick and skates (faces right) */
function hfig(T,flip,P){if(T===ME_H)T=UNIH();const L=P.look||{};const tape=L.tape||'#1b1b1f',boot=L.skates||'#1b1b1f';const skin=SKIN[L.skin??2],sk=shade(skin,-.35),dk=shade(T.p,-.45),pants=(T.kit&&T.kit[2])||shade(T.p,-.35),pd=shade(pants,-.4),hdk=shade(T.p,-.5);
  const goalie=L.pose==='goalie',face=L.face||'game',mouth=L.mouth||'grit',o=[];
  o.push('<ellipse cx="60" cy="115" rx="32" ry="4.5" fill="rgba(0,0,0,.2)"/>');
  for(const x of[50,70])o.push(`<path d="M${x-9} 107 h16 q3 0 3 3 v2 h-19 z" fill="${boot}" stroke="${shade(boot,-.4)}" stroke-width=".8"/><path d="M${x-10} 114.5 H${x+10}" stroke="#c9d3e0" stroke-width="2" stroke-linecap="round"/>`);
  if(goalie){for(const x of[40,61])o.push(`<rect x="${x}" y="76" width="19" height="32" rx="7" fill="#ffffff" stroke="${dk}" stroke-width="1.6"/><path d="M${x+3} 86 H${x+16} M${x+3} 95 H${x+16}" stroke="${T.p}" stroke-width="3"/>`)}
  else{o.push(`<path d="M40 79 h40 v13 q0 4 -4 4 h-32 q-4 0 -4 -4 z" fill="${pants}" stroke="${pd}" stroke-width="1.5"/>`);
    for(const x of[45,64])o.push(`<rect x="${x}" y="94" width="11" height="15" rx="3" fill="${T.p}" stroke="${dk}" stroke-width="1.3"/><rect x="${x}" y="99" width="11" height="3.5" fill="${T.s}"/>`);
    if(L.pose==='shoot')o.push(`<path d="M74 64 L22 104" stroke="#8a5a2b" stroke-width="3.6" stroke-linecap="round"/><path d="M25 102 L8 104 L9 109 L26 108 Z" fill="${tape}" stroke="#111" stroke-width=".8"/>`);
    else if(L.pose==='cheer')o.push(`<path d="M93 52 L106 8" stroke="#8a5a2b" stroke-width="3.6" stroke-linecap="round"/><path d="M103 9 L117 5 L118 10 L105 13 Z" fill="${tape}" stroke="#111" stroke-width=".8"/>`);
    else o.push(`<path d="M44 70 L100 106" stroke="#8a5a2b" stroke-width="3.6" stroke-linecap="round"/><path d="M97 104 L114 106 L113 111 L96 110 Z" fill="${tape}" stroke="#111" stroke-width=".8"/>`)}
  o.push(`<path d="M29 66 Q30 55 46 53 L74 53 Q90 55 91 66 L89 90 Q60 96 31 90 Z" fill="${T.p}" stroke="${dk}" stroke-width="1.8" stroke-linejoin="round"/>`);
  o.push(`<path d="M32 84 Q60 90 88 84" stroke="${T.s}" stroke-width="3.2" fill="none"/><path d="M51 54 Q60 60 69 54" stroke="${T.s}" stroke-width="2.6" fill="none"/>`);
  o.push(`<g${flip?' transform="translate(120 0) scale(-1 1)"':''}><text x="60" y="80" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="17" fill="${T.s}" stroke="${T.o||dk}" stroke-width="${T.o?1.6:1}" paint-order="stroke">${P.num}</text></g>`);
  const sleeve=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="7.5" ry="11" transform="rotate(${r} ${x} ${y})" fill="${T.p}" stroke="${dk}" stroke-width="1.6"/>`;
  const glove=(x,y)=>`<rect x="${x-7}" y="${y-7}" width="14" height="14" rx="5" fill="${T.p}" stroke="${dk}" stroke-width="1.4"/><rect x="${x-7}" y="${y+2}" width="14" height="4" fill="${T.s}"/>`;
  if(goalie){o.push(sleeve(30,73,25)+`<circle cx="23" cy="84" r="11" fill="${T.s}" stroke="${dk}" stroke-width="1.6"/><path d="M16 80 Q23 74 30 80" stroke="${dk}" stroke-width="1.4" fill="none"/>`);
    o.push(sleeve(90,73,-25)+`<rect x="88" y="73" width="16" height="20" rx="3" fill="${T.s}" stroke="${dk}" stroke-width="1.6"/><rect x="93" y="93" width="6" height="15" fill="#8a5a2b"/><path d="M91 106 h17 v4 h-17z" fill="#1b1b1f"/>`)}
  else if(L.pose==='shoot')o.push(sleeve(42,70,30)+glove(50,80)+sleeve(78,62,-55)+glove(70,65));
  else if(L.pose==='cheer')o.push(sleeve(32,74,18)+glove(28,86)+sleeve(88,58,-30)+glove(93,47));
  else o.push(sleeve(36,69,35)+glove(44,73)+sleeve(80,78,-40)+glove(71,90));
  const eyes=(y,rx,ry,dx)=>{for(const x of[60-dx,60+dx])o.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" stroke="#2a1a10" stroke-width="1"/><circle cx="${x+(x<60?1:-1)}" cy="${y+1}" r="${rx*.52}" fill="#1b1b1f" data-keep="1"/><circle cx="${x-.6}" cy="${y-.6}" r=".9" fill="#fff" data-drop="1"/>`)};
  const brows=(y,dx)=>o.push(face==='happy'?`<path d="M${60-dx-6} ${y+1} Q${60-dx} ${y-3} ${60-dx+6} ${y} M${60+dx+6} ${y+1} Q${60+dx} ${y-3} ${60+dx-6} ${y}" stroke="#2a1a10" stroke-width="3" fill="none" stroke-linecap="round"/>`:`<path d="M${60-dx-6} ${y-1.5} L${60-dx+6} ${y+2} M${60+dx+6} ${y-1.5} L${60+dx-6} ${y+2}" stroke="#2a1a10" stroke-width="3.2" stroke-linecap="round"/>`);
  const mouthAt=y=>o.push(face==='happy'?`<path d="M52 ${y-2} Q60 ${y+7} 68 ${y-2} Z" fill="#7a2a1a" stroke="#2a1a10" stroke-width="1.5"/>`:face==='shout'?`<ellipse cx="60" cy="${y}" rx="6" ry="5" fill="#7a2a1a" stroke="#2a1a10" stroke-width="1.5"/>`:mouth==='grit'?`<rect x="53" y="${y-3}" width="14" height="5.5" rx="2" fill="#fff" stroke="#2a1a10" stroke-width="1.2"/>`:`<path d="M53 ${y} Q61 ${y+4} 67 ${y-1}" stroke="#2a1a10" stroke-width="2.2" fill="none" stroke-linecap="round"/>`);
  if(goalie){o.push(`<path d="M34 40 Q33 12 60 12 Q87 12 86 40 L86 52 Q86 71 60 73 Q34 71 34 52 Z" fill="${T.p}" stroke="${hdk}" stroke-width="1.8"/><path d="M60 12 L60 30" stroke="${T.s}" stroke-width="6"/><ellipse cx="60" cy="48" rx="17" ry="16" fill="${skin}" stroke="${hdk}" stroke-width="1.2"/>`);
    eyes(44,4.3,4,7);brows(38,7);mouthAt(56);
    o.push('<path d="M47 34 V63 M53.5 33 V65 M60 33 V66 M66.5 33 V65 M73 34 V63 M44 41 H76 M44 49 H76 M45 57 H75" stroke="#e8ebf0" stroke-width="1.7" fill="none"/>')}
  else{o.push(`<circle cx="60" cy="40" r="24" fill="${skin}" stroke="${sk}" stroke-width="1.4"/>`);
    if(L.retro)o.push('<path d="M35 40 Q34 14 60 14 Q86 14 85 40 Q78 26 60 26 Q42 26 35 40 Z" fill="#4a2e1a"/>'+`<circle cx="36" cy="43" r="5" fill="${skin}" stroke="${sk}"/><circle cx="84" cy="43" r="5" fill="${skin}" stroke="${sk}"/>`);
    else o.push(`<path d="M34 40 Q33 12 60 12 Q87 12 86 40 L86 47 Q86 50 83 50 L80 50 L80 37 Q78 29 60 29 Q42 29 40 37 L40 50 L37 50 Q34 50 34 47 Z" fill="${T.p}" stroke="${hdk}" stroke-width="1.8"/><path d="M40 21 Q48 15 58 14" stroke="rgba(255,255,255,.4)" stroke-width="3.5" fill="none" stroke-linecap="round"/>`);
    const bd=L.beard===true?'full':L.beard||'';
    if(bd)o.push(`<g opacity="${bd==='stubble'?.32:1}"><path d="M38 46 Q39 64 60 64 Q81 64 82 46 L79 46 Q78 58 60 58 Q42 58 41 46 Z" fill="#2a1a10"/></g>`);
    if(L.eyeblack)o.push('<rect x="45" y="47" width="11" height="3" rx="1.5" fill="#151515"/><rect x="64" y="47" width="11" height="3" rx="1.5" fill="#151515"/>');
    eyes(42,5.2,4.8,9);brows(35.5,9);o.push(`<path d="M57.5 48 Q60 51 62.5 48" stroke="${sk}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);mouthAt(55);
    if(!L.retro){if(L.helmet==='cage')o.push('<path d="M43 34 V62 M50 33 V64 M57 32 V65 M64 32 V65 M71 33 V64 M78 34 V62 M40 41 H80 M40 49 H80 M42 57 H78" stroke="#e8ebf0" stroke-width="1.5" fill="none"/><path d="M48 63 Q60 70 72 63" stroke="#2a2a2a" stroke-width="3" fill="none" stroke-linecap="round"/>');
      else o.push(`<path d="M40 35 Q60 31 80 35 L80 46 Q60 44 40 46 Z" fill="${L.helmet==='tinted'?'rgba(25,35,70,.55)':'rgba(190,225,255,.32)'}" stroke="rgba(120,150,190,.9)" stroke-width="1.2"/><path d="M40 50 Q44 63 60 64 Q76 63 80 50" stroke="#2a2a2a" stroke-width="1.3" fill="none"/>`)}}
  return`<svg viewBox="0 0 120 120" role="img" aria-label="${esc(P.name||'Player')}, number ${P.num}">${o.join('')}</svg>`}

/* hockey promo cards: made-up legends with true NHL history on the back, plus awards and specials */
const HLEG=(name,pos,num,abbr,era,ht,wt,fact,skin,beard)=>({name,pos,num,era,ht,wt,fact,look:{skin,beard,mouth:'smirk',face:'game',pose:pos==='G'?'goalie':'hk',retro:pos!=='G'},abbr});
const HLEGENDS=[
 HLEG('Wizard Wally Grant','C',99,'EDM','1980s',`6'0"`,'185 lb','Wayne Gretzky scored 92 goals in the 1981–82 season, the most ever in one season.',0,false),
 HLEG('Rocket Ron Laval','RW',9,'MTL','1940s',`5'10"`,'180 lb','Maurice Richard was the first NHL player to score 50 goals in 50 games, in the 1944–45 season.',1,false),
 HLEG('Flying Freddie Hallo','D',4,'BOS','1970s',`6'0"`,'197 lb','Bobby Orr is the only defenseman to lead the whole NHL in scoring, and he did it twice.',2,false),
 HLEG('Iron Gus Hollis','RW',9,'DET','1950s',`6'0"`,'205 lb','Gordie Howe played NHL games in five different decades, from the 1940s to 1980.',3,true),
 HLEG('Masked Marcel Brodie','G',1,'NYR','1950s',`6'0"`,'175 lb','Goalie masks caught on after Jacques Plante wore one in a game in 1959.',4,false),
 HLEG('Mighty Max Lemont','C',66,'PIT','1980s',`6'4"`,'230 lb','On December 31, 1988, Mario Lemieux scored five goals in one game, each in a different way.',0,false)];
const HAB=a=>HTEAMS.find(t=>t.abbr===a);
const HPROMOS=[
 ...HLEGENDS.map((L,i)=>({key:`hk-legend-${i+1}`,hk:true,kind:'legend',title:'Hall of Legends',sub:L.era,T:HAB(L.abbr),P:()=>L,desc:`A Numon Hockey legend from the ${L.era}.`,fact:L.fact,theme:'legend'})),
 {key:'hk-roy',hk:true,kind:'award',title:'Rookie of the Year',sub:'ROY',T:ME_H,P:()=>MEPH(),desc:'The best first-year player in the league. That’s you!',theme:'gold'},
 {key:'hk-goalie',hk:true,kind:'award',title:'Goalie of the Year',sub:'Top goalie',T:HAB('NYR'),P:()=>HAB('NYR').roster[0],desc:'Made the most big saves in the whole league.',theme:'gold'},
 {key:'hk-winter',hk:true,kind:'special',title:'Winter Classic',sub:'Special appearance',T:ME_H,P:()=>MEPH(),desc:'Played outdoors on a snowy rink in Buffalo.',theme:'snow'},
 {key:'hk-hattrick',hk:true,kind:'special',title:'Hat Trick Hero',sub:'Special appearance',T:HAB('CHI'),P:()=>HAB('CHI').roster[1],desc:'Scored three goals in one game. Hats everywhere!',theme:'night'},
 {key:'hk-allstar',hk:true,kind:'special',title:'All-Star Game',sub:'Special appearance',T:HAB('COL'),P:()=>HAB('COL').roster[2],desc:'Picked by fans as one of the league’s best.',theme:'allstar'},
 {key:'hk-pond',hk:true,kind:'special',title:'Pond Hockey Day',sub:'Special appearance',T:HAB('MIN'),P:()=>HAB('MIN').roster[1],desc:'Skated on a frozen lake just for fun.',theme:'snow'}];
Object.assign(PROMO,Object.fromEntries(HPROMOS.map(x=>[x.key,x])));
const HCARD_TOTAL=HTEAMS.length*3+HPROMOS.length;
const hCount=()=>Object.keys(S.hcards||{}).length;
function drawHPromo(){let x=Math.random()*HPROMOS.reduce((a,p)=>a+PW[p.kind],0);for(const p of HPROMOS){x-=PW[p.kind];if(x<=0)return p}return HPROMOS[0]}
function hDrawCard(goldPlus){const pool=HTEAMS.filter(T=>!goldPlus||T.tier==='gold'||T.tier==='hof').flatMap(T=>[1,2].map(slot=>({T,slot,w:TW[T.tier]})));
  let x=Math.random()*pool.reduce((a,c)=>a+c.w,0);for(const c of pool){x-=c.w;if(x<=0)return c}return pool[pool.length-1]}
const HJOKES=[
 ['Where do hockey players get their uniforms?','New Jersey!'],['What do you call a ghost who plays goalie?','A ghoul-ie!'],['Why can’t you play hockey with pigs?','They always hog the puck!'],
 ['What do hockey players and magicians have in common?','They both do hat tricks!'],['What is a hockey player’s favorite drink?','Iced tea!'],['What did the puck say to the stick?','Stop pushing me around!'],
 ['Why did the snowman love hockey?','He was a natural on the ice!'],['Why did the penguin join the hockey team?','He already had the perfect skating outfit!'],
 ['Knock knock. Who’s there? Ice. Ice who?','Ice to see you at the game!'],['How do hockey players say hello?','They break the ice!'],['Why are hockey players good at geometry?','They know all the angles!'],
 ['What kind of dog loves hockey?','A boxer, because it loves the penalty box!'],['Why did the goalie bring a ladder?','To reach the top shelf!'],['What’s a hockey player’s favorite subject?','Ice-tory!'],
 ['Why was the hockey rink so cold?','Because the fans were blowing!'],['What did the Zamboni say to the ice?','Smooth moves!']];
const HFACTS=[
 'The Stanley Cup was first awarded in 1893.','The name of every player on a Stanley Cup team gets engraved on the Cup.','The Stanley Cup weighs about 35 pounds.',
 'Montreal has won the Stanley Cup 24 times, more than any other team.','A hockey puck is made of hard rubber. It is 1 inch thick and 3 inches across.',
 'Pucks are frozen before games so they slide fast and bounce less.','The NHL was started in 1917.','An NHL rink is 200 feet long and 85 feet wide.',
 'Each team has six players on the ice: three forwards, two defensemen and a goalie.','A hat trick means one player scores three goals in one game.',
 'Frank Zamboni invented the ice-smoothing machine in 1949.','Bill Mosienko scored three goals in just 21 seconds in 1952, the fastest hat trick ever.',
 'Martin Brodeur won 691 games as a goalie, the most in NHL history.','In April 2025, Alex Ovechkin scored his 895th goal and passed Wayne Gretzky for the most career goals.',
 'Wayne Gretzky was nicknamed “The Great One.”','Hockey games have three periods of 20 minutes each.'];
const teamOfH=id=>HTEAMS[id-101];

/* ---------- hockey home ---------- */
const nextHTeam=()=>HTEAMS.find(t=>!S.hbeaten.includes(t.id));
function hTile(T){const beat=S.hbeaten.includes(T.id),nt=nextHTeam(),isNext=nt&&nt.id===T.id,open=beat||isNext;const cnt=T.roster.filter(P=>S.hcards[hk(T,P.slot)]).length;
  return`<button class="game ${isNext?'next':''} ${open?'':'locked'}" style="${tvars(T)}" ${open?`data-hid="${T.id}"`:'disabled'} aria-label="Week ${T.id} ${T.city} ${T.name}${open?'':' locked'}"><span class="wk">WK ${T.id}</span>${beat?'<span class="done">✓ Won</span>':''}<div class="art flipx">${fig(T,true,T.roster[0])}</div><b>${T.city} ${T.name}</b><small>${open?(isNext?'Next game':`${cnt} of 3 players`):'Locked'}</small></button>`}
function renderHHome(){const nt=nextHTeam(),me=MEPH();const daily=checkDaily();setWX('night');const opp=nt&&nt.roster[0];
  $('#v-home').innerHTML=`${typeof edBanner==='function'?edBanner():''}${daily?`<button class="dailyban" id="dailyban">${packArt(DAILY)}<div><b>Your Pack of the Day is here!</b><span>2 promo cards and 1 player card, free. Tap to open it.</span></div></button>`:''}
  <div class="hero"><div class="eyebrow" style="color:#c9d3f5">Grade ${gradeOf()} · ${EDITIONS[edOf()]} edition · ${S.hbeaten.length} of ${HTEAMS.length} teams beaten</div><h2 class="title">${nt?`Week ${nt.id}: ${ME_H.name} vs ${nt.name}`:'Hockey champions!'}</h2>
    <div class="sub">Answer a question to take a shot. A right answer is a goal! First team to 5 goals wins.</div></div>
  <div class="panel"><div class="vs">
    <div class="side"><span class="tpill" style="${tvars(ME_H)}">${ME_H.city} ${ME_H.name}</span><div class="art">${fig(ME_H,false,me)}</div><h3>${esc(me.name)}</h3><div class="num">#${me.num} · Center</div><button class="btn" id="chstar" style="font-size:16px;padding:8px 14px">Customize player</button></div>
    <div class="vsmark">VS</div>
    ${nt?`<div class="side"><span class="tpill" style="${tvars(nt)}">${nt.city} ${nt.name}</span><div class="art flipx">${fig(nt,true,opp)}</div><h3>${opp.name}</h3><div class="num">#${opp.num} · Goalie · starts at ${LEVELS[startLv(nt.start)]}</div></div>`
      :`<div class="side"><div class="art">${fig(ME_H,false,me)}</div><h3>You beat every team!</h3><div class="note">Replay any game below.</div></div>`}
  </div><div class="cta">${nt?`<button class="btn go" id="kick">Drop the puck!</button><div class="note">Win to get ${opp.name}'s card and a free pack.</div>`:''}
    <div class="row"><button class="btn blue" id="tobinder">Hockey binder (${hCount()}/${HCARD_TOTAL})</button><button class="btn blue" id="toshop">${S.unopened?`Open ${S.unopened} free pack${S.unopened>1?'s':''}!`:`Card shop · ${comma(S.coins)} coins`}</button><button class="btn blue" id="toreport">Progress report</button><button class="btn blue" id="tolearn">Learn math</button></div></div></div>
  <div class="panel"><h3 style="font-size:24px">Hockey schedule</h3><p class="note" style="margin:2px 0 0">Beat every team in order, starting with your own division. Beating a team wins its goalie's card. Its center and winger come in packs from the card shop.</p>
    ${HDIVS.map(d=>`<h3 style="font-size:18px;margin-top:14px">${d}${d==='Atlantic'?' · your division':''}</h3><div class="sched" style="margin-top:6px">${HTEAMS.filter(t=>t.div===d).map(hTile).join('')}</div>`).join('')}</div>`;
  if($('#dailyban'))$('#dailyban').onclick=()=>{renderShop();show('shop');buyPack(DAILY,'daily')};
  $('#chstar').onclick=customizeH;$('#tobinder').onclick=()=>{renderBinder();show('binder')};$('#toreport').onclick=()=>{renderReport();show('report')};$('#toshop').onclick=()=>{renderShop();show('shop')};
  if($('#kick'))$('#kick').onclick=()=>startHGame(nt.id);
  document.querySelectorAll('#v-home .game[data-hid]').forEach(b=>b.onclick=()=>startHGame(+b.dataset.hid))}

function customizeH(){const m=meh();
  const groups=[['pose','Pose',[['hk','Ready'],['shoot','Shooting'],['cheer','Celebrate']]],
    ['face','Face',[['game','Game face'],['happy','Happy'],['shout','Shout']]],
    ['uniform','Jersey',Object.entries(HUNIFORMS).map(([k,u])=>[k,u.label])],
    ['helmet','Helmet',[['visor','Clear visor'],['tinted','Tinted visor'],['cage','Full cage']]],
    ['beard','Beard',[['','None'],['stubble','Stubble'],['full','Playoff beard']]],
    ['tape','Stick tape',[['#1b1b1f','Black'],['#ffffff','White'],['#002654','Navy'],['#FCB514','Gold'],['#C60C30','Red']]],
    ['skates','Skates',[['#1b1b1f','Black'],['#ffffff','White'],['#002654','Navy'],['#FCB514','Gold']]]];
  const chip=(k,v,l)=>`<button class="ochip ${String(m[k])===String(v)?'on':''}" data-k="${k}" data-v='${JSON.stringify(v)}'>${(k==='tape'||k==='skates')?`<i style="background:${v}"></i>`:''}${l}</button>`;
  modal(`<h2>Customize your hockey player</h2>
   <div class="cust"><div class="cprev-wrap"><div class="art" id="cprev"></div></div>
   <div class="copts">
     <div class="ogrp"><span>Name</span><input class="field" id="pname" maxlength="18" autocomplete="off" style="width:100%;font-size:18px;text-align:left" value="${esc((S.me&&S.me.name)||'')}" placeholder="Type a name"></div>
     <div class="ogrp"><span>Number</span><input class="field" id="pnum" inputmode="numeric" maxlength="2" autocomplete="off" style="width:90px;font-size:18px" value="${m.num}"></div>
     ${groups.map(([k,l,opts])=>`<div class="ogrp"><span>${l}</span><div class="orow">${opts.map(([v,t])=>chip(k,v,t)).join('')}</div></div>`).join('')}
   </div></div>
   <div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="save">Save player</button><button class="btn" data-act="close">Cancel</button></div>`,
   {save:()=>{const n=parseInt($('#pnum').value,10);m.num=Number.isFinite(n)&&n>=0&&n<=99?n:17;S.meh=m;S.me={...S.me,name:$('#pname').value.trim().slice(0,18)};save();closeModal();renderHome();renderBar()}},true);
  const draw=()=>{const n=parseInt($('#pnum').value,10);const t={...m,num:Number.isFinite(n)&&n>=0&&n<=99?n:17};const keep=S.me;S.me={...S.me,name:$('#pname').value};$('#cprev').innerHTML=fig(ME_H,false,MEPH(t));S.me=keep};
  draw();$('#pname').oninput=draw;$('#pnum').oninput=()=>{$('#pnum').value=$('#pnum').value.replace(/\D/g,'');draw()};
  document.querySelectorAll('.copts [data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;m[k]=JSON.parse(b.dataset.v);document.querySelectorAll(`.copts [data-k="${k}"]`).forEach(x=>x.classList.toggle('on',x===b));draw()})}

/* ---------- hockey game ---------- */
const horn=()=>{tone(196,.9,'sawtooth',0,.06);tone(247,.9,'sawtooth',0,.045)};
function startHGame(tid){sfx.tap();closeModal();const T=HTEAMS[tid-1];setWX('night');
  const lv=startLv(T.start);G={hk:true,T,round:null,me:0,opp:0,level:lv,startLevel:lv,streak:0,plays:0,right:0,wrong:0,gained:0,coins:0,busy:false,retry:[],retryCount:{},used:new Set(),usedMiss:new Set()};
  const opp1={...T.roster[2]},opp2={...T.roster[1]};
  $('#v-game').innerHTML=`
  <div class="score">
    <div class="sb-team" style="${tvars(ME_H)}"><span class="pts" id="ptsme">0</span><div style="min-width:0"><small>${ME_H.city}</small><b>${ME_H.name}</b></div></div>
    <div class="sb-mid"><div class="dd">First to 5</div><div class="spot" id="hspot">Shot 1</div><div class="spot" style="color:#ffe9a6">Indoor arena</div></div>
    <div class="sb-team away" style="${tvars(T)}"><div style="min-width:0"><small>${T.city}</small><b>${T.name}</b></div><span class="pts" id="ptsopp">0</span></div>
  </div>
  <div class="meters"><button class="btn exitb" id="exitg">← Exit game</button><span>Difficulty <span class="pips" id="pips"></span> <span id="lvname"></span></span><span>Streak <span class="streak" id="streak"></span></span></div>
  <div class="rink" id="rink" style="${tvars(T)}">
    <div class="rk goal" style="left:7%"></div><div class="rk goal" style="left:93%"></div><div class="rk blue" style="left:35%"></div><div class="rk blue" style="left:65%"></div><div class="rk red" style="left:50%"></div>
    <div class="rk-c center" style="left:50%;top:50%"></div><div class="rk-c" style="left:20%;top:30%"></div><div class="rk-c" style="left:20%;top:72%"></div><div class="rk-c" style="left:80%;top:30%"></div><div class="rk-c" style="left:80%;top:72%"></div>
    <div class="crease l"></div><div class="crease r"></div><div class="net l" id="netL"></div><div class="net r" id="netR"></div>
    <div class="hspr back" id="hd1" style="left:57%;bottom:46%"><div class="inner flipx">${fig(T,true,opp1)}</div></div>
    <div class="hspr" id="hd2" style="left:64%;bottom:4%"><div class="inner flipx">${fig(T,true,opp2)}</div></div>
    <div class="hspr" id="hg" style="left:88%;bottom:24%"><div class="inner flipx">${fig(T,true,T.roster[0])}</div></div>
    <div class="hspr" id="hme" style="left:28%;bottom:14%"><div class="inner">${fig(ME_H,false,MEPH())}</div></div>
    <div class="puck" id="puck"></div><div class="flash" id="flash"></div>
  </div>
  <div class="panel" id="gp"></div>`;
  show('game');layoutRink();hPositions(true);hBoard();whistle();
  $('#exitg').onclick=()=>{sfx.tap();modal(`<h2>Leave this game?</h2><p class="note">You keep the coins you earned, but you won't get the card. You can play this team again any time.</p><div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="leave">Leave game</button><button class="btn" data-act="close">Keep playing</button></div>`,{leave:()=>{closeModal();G=null;Q=null;renderHome();show('home')}})};
  hCall(`The ${T.name} are ready in net. Drop the puck! Pick your shot.`)}
function hBoard(){$('#pips').innerHTML=[lvLo(),lvLo()+1,lvLo()+2].map(i=>`<i class="${i<=G.level?'on':''} ${i>=4?'g4':''}"></i>`).join('');$('#lvname').textContent=LEVELS[G.level];
  $('#streak').innerHTML=[0,1,2].map(i=>`<i class="${i<G.streak%3||(G.streak>0&&G.streak%3===0&&G.level===6)?'on':''}"></i>`).join('')}
function layoutRink(){const r=$('#rink');if(!r)return;r.style.setProperty('--hspr',Math.round(Math.min(150,Math.max(64,r.clientHeight*.46)))+'px')}
addEventListener('resize',()=>{if(G&&G.hk)layoutRink()});
const HPOS={hme:[28,14],hd1:[57,46],hd2:[64,4],hg:[88,24]};
function hPositions(instant){for(const [id,[l,b]] of Object.entries(HPOS)){const e=$('#'+id);if(!e)continue;if(instant)e.style.transition='none';e.style.left=l+'%';e.style.bottom=b+'%';e.className='hspr'+(id==='hd1'?' back':'');if(instant){void e.offsetWidth;e.style.transition=''}}placePuck()}
function placePuck(){const r=$('#rink'),m=$('#hme'),pk=$('#puck');if(!r||!m||!pk)return;const R=r.getBoundingClientRect(),M=m.getBoundingClientRect();pk.getAnimations().forEach(a=>a.cancel());
  pk.style.left=(M.left-R.left+M.width*.88-8)+'px';pk.style.top=(M.top-R.top+M.height*.9-4)+'px';pk.style.opacity=1}
function flyPuck(toEl,fx=.5,fy=.5,ms=520){const r=$('#rink').getBoundingClientRect(),pk=$('#puck'),P=pk.getBoundingClientRect(),T=toEl.getBoundingClientRect();
  const dx=T.left+T.width*fx-(P.left+P.width/2),dy=T.top+T.height*fy-(P.top+P.height/2);
  pk.animate([{transform:'translate(0,0)'},{transform:`translate(${dx}px,${dy}px)`}],{duration:ms,easing:'cubic-bezier(.2,.7,.3,1)',fill:'forwards'});
  return new Promise(r=>setTimeout(r,ms))}
function hCall(msg){G.busy=false;Q=null;const [a,b]=lvRange('run',G.level),[c,d]=lvRange('pass',G.level);
  $('#hspot').textContent=`Shot ${G.plays+1}`;
  $('#gp').innerHTML=`<div class="qhead"><span class="eyebrow">Score ${G.me}–${G.opp} · first to 5 wins</span>${G.opp===4?'<span class="chip" style="background:#7a3fd0">They need one more. You can do it!</span>':''}${G.me===4?'<span class="chip" style="background:var(--good)">One more goal to win!</span>':''}</div>
   <div class="msg" style="margin-bottom:10px">${msg}</div>
   <div class="calls"><button class="play run" id="pwrist"><b>WRIST SHOT</b><span>Easier question · Level ${a}–${b}</span><em>Goal = +5 coins</em></button>
   <button class="play pass" id="pslap"><b>SLAP SHOT</b><span>Harder question · Level ${c}–${d}</span><em>Goal = +10 coins</em></button></div>`;
  $('#pwrist').onclick=()=>hShot('wrist');$('#pslap').onclick=()=>hShot('slap')}
function hShot(kind){if(G.busy)return;G.busy=true;sfx.tap();const [a,b]=lvRange(kind==='wrist'?'run':'pass',G.level);const d0=R(a,b);const p=pickQuestion(d0);const d=p._lvl||d0;G.cur={kind,d,p};
  mountQ($('#gp'),p,`<div class="qhead"><span class="chip ${kind==='wrist'?'run':'pass'}">${kind==='wrist'?'WRIST SHOT':'SLAP SHOT'}</span><span class="chip lvl">Level ${d} · ${LEVELS[d]}</span><span class="chip worth">Goal = +${kind==='wrist'?5:10} coins</span>${p._retry?'<span class="chip" style="background:#7a3fd0">Second chance! You missed this one before</span>':''}</div>`,
    `Score ${G.me}–${G.opp}. Answer right to score a goal!`,hResolve)}
function hResolve(ok,given){const g=G;const {kind,d,p}=G.cur;G.plays++;record(p,d,ok,given,100+G.T.id);let note='';
  if(ok){G.right++;G.streak++;if(G.streak>S.bestStreak)S.bestStreak=G.streak;sfx.ok();if(G.streak%3===0&&G.level<lvHi()){G.level++;note=` ${G.streak} in a row! Difficulty up to Level ${G.level}.`;if(G.level>S.bestLevel)S.bestLevel=G.level}}
  else{G.wrong++;G.streak=0;sfx.bad();if(G.level>G.startLevel){G.level--;note=` Difficulty down to Level ${G.level}.`}}
  setTimeout(async()=>{if(G!==g)return;const me=$('#hme');me.classList.add('glide');me.style.left='54%';me.style.bottom='30%';
    setTimeout(async()=>{if(G!==g)return;placePuck();me.classList.remove('glide');let msg;
      if(ok){$('#hg').classList.add('dive');$('#hg').style.bottom='44%';await flyPuck($('#netR'),.45,.5);if(G!==g)return;
        $('#netR').classList.add('lit');setTimeout(()=>$('#netR')&&$('#netR').classList.remove('lit'),1300);horn();flash('GOAL!','gold');G.me++;$('#ptsme').textContent=G.me;me.classList.add('cheer');
        const earn=kind==='wrist'?5:10;G.coins+=earn;S.coins+=earn;S.coinsEarned+=earn;save();renderBar();msg=`GOAL! +${earn} coins. Score ${G.me}–${G.opp}.`}
      else{await flyPuck($('#hg'),.25,.65,420);if(G!==g)return;flash('SAVE!','');
        await new Promise(r=>setTimeout(r,650));if(G!==g)return;const d2=$('#hd2');d2.classList.add('glide');d2.style.left='20%';d2.style.bottom='34%';
        const pk=$('#puck');await flyPuck($('#netL'),.55,.5,700);if(G!==g)return;$('#netL').classList.add('lit');setTimeout(()=>$('#netL')&&$('#netL').classList.remove('lit'),1300);
        flash(`${G.T.name} score!`,'red');G.opp++;$('#ptsopp').textContent=G.opp;msg=`The ${G.T.name} scored that time. Score ${G.me}–${G.opp}.`}
      hBoard();
      setTimeout(()=>{if(G!==g)return;if(G.me>=5)return hWin();if(G.opp>=5)return hLose();hPositions(false);setTimeout(()=>{if(G===g)hCall(msg+note)},700)},1300)},650)},ok?500:1500)}
function hLog(won){S.played++;S.log.unshift({at:Date.now(),team:100+G.T.id,sport:'hockey',won,plays:G.plays,right:G.right,wrong:G.wrong,yards:0,score:`${G.me}–${G.opp}`});if(S.log.length>200)S.log.length=200}
function hWin(){const T=G.T,k=hk(T,0);const first=!S.hcards[k];S.hcards[k]=(S.hcards[k]||0)+1;if(!S.hbeaten.includes(T.id))S.hbeaten.push(T.id);
  const shutout=G.opp===0;if(G.wrong===0)S.hperfect[T.id]=true;const bonus=50+(shutout?25:0);G.coins+=bonus;S.coins+=bonus;S.coinsEarned+=bonus;S.wins++;S.unopened=(S.unopened||0)+1;hLog(true);save();renderBar();
  sfx.win();horn();if(!reduce)confetti([ME_H.p,ME_H.s,'#ffffff','#7fc8ff']);$('#hme').className='hspr cheer';
  const nt=nextHTeam();const gT=G;
  setTimeout(()=>{if(G!==gT)return;modal(`<div class="eyebrow">Final: ${ME_H.name} ${G.me}, ${T.name} ${G.opp}</div><h2>${first?`New card: ${T.roster[0].name}!`:`Another ${T.roster[0].name} card!`}</h2>
    <div class="showcase reveal-in">${sportsCard(T,S.hcards[k],true,{slot:0})}</div>
    <p class="note">You scored ${G.me} goals and got ${G.right} of ${G.plays} right${shutout?'. <b>A shutout!</b>':''}. You earned <b>${G.coins} coins</b> this game, plus a free pack! ${first&&nt?`Next up: the ${nt.city} ${nt.name}.`:''}</p>
    <div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="pack">Open your reward pack!</button><button class="btn blue" data-act="binder">See binder</button><button class="btn" data-act="home">Locker room</button></div>`,
    {pack:()=>{G=null;renderShop();show('shop');buyPack(PACKS[0],true)},binder:()=>{closeModal();G=null;renderBinder();show('binder')},home:()=>{closeModal();G=null;renderHome();show('home')}})},1800)}
function hLose(){const T=G.T;hLog(false);save();const gT=G;$('#hg').className='hspr cheer';
  setTimeout(()=>{if(G!==gT)return;modal(`<div class="art flipx" style="width:150px;height:150px">${fig(T,true,T.roster[0])}</div><h2>The ${T.name} won this one!</h2>
    <p class="note">Great effort! You scored ${G.me} goal${G.me===1?'':'s'}, got ${G.right} of ${G.plays} right and earned ${G.coins} coins. Ready for a rematch?</p>
    <div class="row"><button class="btn go" style="font-size:20px;padding:12px 22px" data-act="again">Play again</button><button class="btn" data-act="home">Locker room</button></div>`,
    {again:()=>startHGame(T.id),home:()=>{closeModal();G=null;renderHome();show('home')}})},1500)}

/* ---------- hockey binder ---------- */
function renderHBinder(){const n=hCount();
  $('#v-binder').innerHTML=`<div class="panel"><div class="head"><button class="btn" id="back2">← Locker room</button><h2>Hockey card binder</h2><div class="prog"><i style="width:${n/HCARD_TOTAL*100}%"></i></div><b class="num" style="font-size:16px">${n} / ${HCARD_TOTAL}</b><button class="btn blue" id="b2shop" style="font-size:16px;padding:8px 14px">Card shop</button></div>
    ${typeof edBinderBar==='function'?edBinderBar():''}<p class="note" style="margin:6px 0 0">Every team has 3 players. Win the game to get the goalie. Find the center and winger in packs from the card shop. Tap a card to flip it over or make a coloring page.</p></div>
  <div class="book hbook" style="display:flex;flex-direction:column;gap:16px">${HDIVS.map(d=>{const ts=HTEAMS.filter(t=>t.div===d);const got=ts.reduce((a,t)=>a+t.roster.filter(P=>S.hcards[hk(t,P.slot)]).length,0);
      return`<div class="sheet"><h3 style="font-size:22px;margin-bottom:10px">${d} <small style="font-family:var(--body);font-size:14px;color:var(--ink-2)">${got} of ${ts.length*3}</small></h3><div class="cards">${ts.map(T=>T.roster.map(P=>slotFor(T,S.hcards[hk(T,P.slot)],S.hcards[hk(T,P.slot)],{slot:P.slot},`${T.abbr} ${P.pos}`,P.slot?'Find in packs':`Win Week ${T.id}`)).join('')).join('')}</div></div>`}).join('')}
    ${[['legend','Hall of Legends','Legends from hockey history. Each card back tells a true Hall of Fame story.'],['award','Awards','Rookie of the Year and Goalie of the Year.'],['special','Special appearances','Outdoor games, hat tricks and all-stars.']].map(([k,t,d])=>{const xs=HPROMOS.filter(x=>x.kind===k);const got=xs.filter(x=>S.hcards['X-'+x.key]).length;
      return`<div class="sheet"><h3 style="font-size:22px;margin-bottom:4px">${t} <small style="font-family:var(--body);font-size:14px;color:var(--ink-2)">${got} of ${xs.length}</small></h3><p class="note" style="margin:0 0 10px">${d} Found only as the promo card in packs.</p><div class="cards">${xs.map(x=>slotFor(x.T,S.hcards['X-'+x.key],S.hcards['X-'+x.key],{promo:x.key},x.title,'Promo card')).join('')}</div></div>`}).join('')}</div>`;
  $('#back2').onclick=()=>{renderHome();show('home')};$('#b2shop').onclick=()=>{renderShop();show('shop')};
  document.querySelectorAll('#v-binder .slot>button').forEach(b=>b.onclick=()=>{const ed=JSON.parse(b.dataset.ed);const T=ed.promo?PROMO[ed.promo].T:HTEAMS[b.dataset.id-1];const cnt=ed.promo?S.hcards['X-'+ed.promo]:S.hcards[hk(T,ed.slot||0)];sfx.tap();
    modal(`<div class="showcase"><div class="fi" id="fi">${sportsCard(T,cnt,true,ed)}${cardBack(T,ed)}</div></div><p class="note">You have ${cnt} cop${cnt>1?'ies':'y'}.</p><div class="row"><button class="btn blue" data-act="flip">Flip card</button><button class="btn blue" data-act="color">Coloring page</button><button class="btn" data-act="close">Close</button></div>`,{flip:()=>$('#fi').classList.toggle('flipped'),color:()=>coloringPage(T,ed)})})}

if(S.sport==='hockey'){renderHome();show('home')}

/* ============ LESSONS ============
   Every lesson, written for 8–10 year olds, with a picture for the example.
   Fills LESSONS (declared in learn.js). Each lesson: g (grade), title, hook (one friendly line),
   terms [[word, meaning]], steps [...], ex {q, work[], a}, vis() -> HTML/SVG picture, tip. */

/* ---------- picture helpers ---------- */
const LK={ink:'#16203f',org:'#ff6a1f',blu:'#2f6fe0',grn:'#1f9d55',red:'#e0413a',gold:'#f2b705',pur:'#7a3fd0',soft:'#eef2fb'};
const LF='font-family="Lilita One, Arial Black, sans-serif"';
// column math: top/bot strings, right-aligned. marks keyed by column from the right (0 = ones).
function lvCols({top,bot,op,ans,carry={},borrow={},heads}){const n=Math.max(top.length,bot.length,ans.length),cw=34,W=n*cw+50,x=i=>W-16-(i+.5)*cw;let o='';
  const rows=heads?24:0;if(heads)heads.slice().reverse().forEach((h,i)=>{o+=`<text x="${x(i)}" y="16" text-anchor="middle" font-size="13" font-weight="800" fill="${[LK.blu,LK.grn,LK.pur,LK.org][i%4]}" font-family="Baloo 2, sans-serif">${h}</text>`});
  const dig=(s,y,fill,i0=0)=>{[...s].reverse().forEach((ch,i)=>{o+=`<text x="${x(i)}" y="${y}" text-anchor="middle" font-size="30" fill="${fill}" ${LF}>${ch}</text>`})};
  for(const [i,t] of Object.entries(carry))o+=`<text x="${x(+i)}" y="${rows+22}" text-anchor="middle" font-size="18" fill="${LK.org}" ${LF}>${t}</text>`;
  for(const [i,t] of Object.entries(borrow)){o+=`<text x="${x(+i)}" y="${rows+22}" text-anchor="middle" font-size="18" fill="${LK.org}" ${LF}>${t}</text><path d="M${x(+i)-11} ${rows+56} L${x(+i)+11} ${rows+34}" stroke="${LK.red}" stroke-width="2.6" stroke-linecap="round"/>`}
  dig(top,rows+56,LK.ink);dig(bot,rows+92,LK.ink);o+=`<text x="12" y="${rows+92}" font-size="30" fill="${LK.ink}" ${LF}>${op}</text>`;
  o+=`<line x1="8" y1="${rows+104}" x2="${W-8}" y2="${rows+104}" stroke="${LK.ink}" stroke-width="3.5" stroke-linecap="round"/>`;dig(ans,rows+138,LK.grn);
  return`<svg viewBox="0 0 ${W} ${rows+150}" style="max-width:${W}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvDots(r,c,hl=0){let o='';for(let i=0;i<r;i++)for(let j=0;j<c;j++)o+=`<circle cx="${14+j*22}" cy="${14+i*22}" r="8" fill="${i>=r-hl?LK.org:LK.blu}"/>`;
  return`<svg viewBox="0 0 ${c*22+6} ${r*22+6}" style="max-width:${c*22+6}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvGroups(g,each,left=0,hl=-1){const per=Math.ceil(Math.sqrt(each)),cs=per*14+16;let o='',x=6;
  for(let k=0;k<g;k++){o+=`<rect x="${x}" y="6" width="${cs}" height="${cs}" rx="${cs/2}" fill="${k<hl?'#fff1e8':LK.soft}" stroke="${k<hl?LK.org:LK.blu}" stroke-width="2.5"/>`;
    for(let i=0;i<each;i++)o+=`<circle cx="${x+15+(i%per)*14}" cy="${21+Math.floor(i/per)*14}" r="5" fill="${k<hl?LK.org:LK.blu}"/>`;x+=cs+8}
  for(let i=0;i<left;i++)o+=`<circle cx="${x+10+i*16}" cy="${6+cs/2}" r="6" fill="${LK.red}"/>`;if(left)x+=left*16+10;
  return`<svg viewBox="0 0 ${x+4} ${cs+12}" style="max-width:${x+4}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvLine(lo,hi,val,target,steps=10){const W=420,X=v=>20+(v-lo)/(hi-lo)*(W-40);let o=`<line x1="14" y1="50" x2="${W-14}" y2="50" stroke="${LK.ink}" stroke-width="3"/>`;
  for(let i=0;i<=steps;i++){const v=lo+(hi-lo)*i/steps;o+=`<line x1="${X(v)}" y1="${i%5===0?40:44}" x2="${X(v)}" y2="${i%5===0?60:56}" stroke="${LK.ink}" stroke-width="2"/>`}
  o+=`<text x="${X(lo)}" y="80" text-anchor="middle" font-size="16" fill="${LK.ink}" ${LF}>${comma(lo)}</text><text x="${X(hi)}" y="80" text-anchor="middle" font-size="16" fill="${LK.ink}" ${LF}>${comma(hi)}</text><text x="${X((lo+hi)/2)}" y="80" text-anchor="middle" font-size="14" fill="#8d97b3" ${LF}>${comma((lo+hi)/2)}</text>`;
  o+=`<circle cx="${X(val)}" cy="50" r="8" fill="${LK.org}"/><text x="${X(val)}" y="28" text-anchor="middle" font-size="16" fill="${LK.org}" ${LF}>${comma(val)}</text>`;
  if(target!=null)o+=`<path d="M${X(val)} 36 Q${(X(val)+X(target))/2} 6 ${X(target)} 36" fill="none" stroke="${LK.grn}" stroke-width="3" marker-end="url(#ah)"/><circle cx="${X(target)}" cy="50" r="8" fill="${LK.grn}"/>`;
  return`<svg viewBox="0 0 ${W} 90" style="max-width:${W}px;width:100%" aria-hidden="true"><defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${LK.grn}"/></marker></defs>${o}</svg>`}
function lvHops(points,labels){const W=440,n=points.length,X=i=>24+i*(W-48)/(n-1);let o=`<line x1="14" y1="62" x2="${W-14}" y2="62" stroke="${LK.ink}" stroke-width="3"/>`;
  points.forEach((p,i)=>{o+=`<circle cx="${X(i)}" cy="62" r="7" fill="${i===n-1?LK.grn:LK.ink}"/><text x="${X(i)}" y="88" text-anchor="middle" font-size="16" fill="${i===n-1?LK.grn:LK.ink}" ${LF}>${p}</text>`;
    if(i<n-1)o+=`<path d="M${X(i)} 54 Q${(X(i)+X(i+1))/2} 14 ${X(i+1)} 54" fill="none" stroke="${LK.org}" stroke-width="3"/><text x="${(X(i)+X(i+1))/2}" y="22" text-anchor="middle" font-size="15" fill="${LK.org}" ${LF}>${labels[i]}</text>`});
  return`<svg viewBox="0 0 ${W} 96" style="max-width:${W}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvArea(colLabels,rowLabels,cells,colW){const cw=colW||colLabels.map(()=>110),rh=56,W=cw.reduce((a,b)=>a+b,0)+60,H=rowLabels.length*rh+40;let o='',x=50;
  colLabels.forEach((c,i)=>{o+=`<text x="${x+cw[i]/2}" y="24" text-anchor="middle" font-size="18" fill="${LK.blu}" ${LF}>${c}</text>`;x+=cw[i]});
  rowLabels.forEach((r,j)=>{o+=`<text x="40" y="${36+j*rh+rh/2+6}" text-anchor="end" font-size="18" fill="${LK.org}" ${LF}>${r}</text>`;let x2=50;
    cw.forEach((w,i)=>{o+=`<rect x="${x2}" y="${36+j*rh}" width="${w}" height="${rh}" fill="${['#e6efff','#fff1e8','#e8f6ec','#f1e8ff'][(i+j)%4]}" stroke="${LK.ink}" stroke-width="2"/><text x="${x2+w/2}" y="${36+j*rh+rh/2+7}" text-anchor="middle" font-size="19" fill="${LK.ink}" ${LF}>${cells[j][i]}</text>`;x2+=w})});
  return`<svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvBar(k,d,label,color=LK.org,w=300,fill2){const pw=w/d;let o='';for(let i=0;i<d;i++)o+=`<rect x="${4+i*pw}" y="4" width="${pw}" height="34" fill="${i<k?color:fill2&&i<k+fill2[0]?fill2[1]:'#fff'}" stroke="${LK.ink}" stroke-width="2.2"/>`;
  return`<div class="lvbar"><svg viewBox="0 0 ${w+8} 42" style="max-width:${w+8}px;width:100%" aria-hidden="true">${o}</svg>${label?`<b>${label}</b>`:''}</div>`}
function lvGrid(n,color=LK.blu){let o='';for(let i=0;i<100;i++)o+=`<rect x="${3+(i%10)*14}" y="${3+Math.floor(i/10)*14}" width="14" height="14" fill="${i<n?color:'#fff'}" stroke="#9aa6bd" stroke-width="1"/>`;
  return`<svg viewBox="0 0 146 146" width="120" height="120" aria-hidden="true">${o}<rect x="3" y="3" width="140" height="140" fill="none" stroke="${LK.ink}" stroke-width="2"/></svg>`}
function lvChart(heads,digits,hl){return`<table class="lvchart"><tr>${heads.map((h,i)=>`<th class="${i===hl?'hl':''}">${h}</th>`).join('')}</tr><tr>${digits.map((d,i)=>`<td class="${i===hl?'hl':''}">${d}</td>`).join('')}</tr></table>`}
function lvRect(l,w,mode){const s=Math.min(30,260/l),W=l*s+80,H=w*s+70;let o='';
  if(mode==='area')for(let i=0;i<l;i++)for(let j=0;j<w;j++)o+=`<rect x="${40+i*s}" y="${20+j*s}" width="${s}" height="${s}" fill="${(i+j)%2?'#d7f0dc':'#e8f6ec'}" stroke="#9bd3aa" stroke-width="1"/>`;
  o+=`<rect x="40" y="20" width="${l*s}" height="${w*s}" fill="${mode==='area'?'none':'#eef6ff'}" stroke="${mode==='perim'?LK.org:LK.ink}" stroke-width="${mode==='perim'?5:3}"/>`;
  o+=`<text x="${40+l*s/2}" y="14" text-anchor="middle" font-size="16" fill="${LK.blu}" ${LF}>${l}</text><text x="${40+l*s/2}" y="${20+w*s+22}" text-anchor="middle" font-size="16" fill="${LK.blu}" ${LF}>${l}</text>`;
  o+=`<text x="30" y="${20+w*s/2+6}" text-anchor="end" font-size="16" fill="${LK.org}" ${LF}>${w}</text><text x="${48+l*s}" y="${20+w*s/2+6}" font-size="16" fill="${LK.org}" ${LF}>${w}</text>`;
  return`<svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvAngle(a){const r=110,cx=150,cy=120,rad=a*Math.PI/180,x=cx-Math.cos(rad)*r,y=cy-Math.sin(rad)*r;
  return`<svg viewBox="0 0 300 140" style="max-width:300px;width:100%" aria-hidden="true"><line x1="20" y1="${cy}" x2="280" y2="${cy}" stroke="${LK.ink}" stroke-width="4" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${LK.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M${cx-34} ${cy} A34 34 0 0 1 ${cx-Math.cos(rad)*34} ${cy-Math.sin(rad)*34}" fill="none" stroke="${LK.blu}" stroke-width="3"/><path d="M${cx-Math.cos(rad)*48} ${cy-Math.sin(rad)*48} A48 48 0 0 1 ${cx+48} ${cy}" fill="none" stroke="${LK.org}" stroke-width="3"/>
    <text x="${cx-60}" y="${cy-12}" font-size="17" fill="${LK.blu}" ${LF}>${a}°</text><text x="${cx+30}" y="${cy-40}" font-size="17" fill="${LK.org}" ${LF}>?</text><text x="150" y="138" text-anchor="middle" font-size="13" fill="#8d97b3" ${LF}>straight line = 180°</text></svg>`}
function lvBox(l,w,h){const s=18,dx=w*s*.5,dy=w*s*.35,X=30,Y=34+dy;let o='';
  for(let i=0;i<l;i++)for(let j=0;j<h;j++)o+=`<rect x="${X+i*s}" y="${Y+j*s}" width="${s}" height="${s}" fill="#ffd9b8" stroke="#c46a2b" stroke-width="1"/>`;
  o+=`<path d="M${X} ${Y} l${dx} ${-dy} h${l*s} l${-dx} ${dy} z" fill="#ffe8d1" stroke="#c46a2b" stroke-width="1.5"/><path d="M${X+l*s} ${Y} l${dx} ${-dy} v${h*s} l${-dx} ${dy} z" fill="#f4b98a" stroke="#c46a2b" stroke-width="1.5"/>`;
  o+=`<text x="${X+l*s/2}" y="${Y+h*s+20}" text-anchor="middle" font-size="15" fill="${LK.blu}" ${LF}>length ${l}</text><text x="${X+l*s+dx+8}" y="${Y-dy+h*s/2}" font-size="15" fill="${LK.org}" ${LF}>height ${h}</text><text x="${X+dx/2+l*s/2}" y="${Y-dy-6}" text-anchor="middle" font-size="14" fill="${LK.pur}" ${LF}>width ${w}</text>`;
  const W=X+l*s+dx+90,H=Y+h*s+30;Y;return`<svg viewBox="0 0 ${W} ${H}" style="max-width:${W}px;width:100%" aria-hidden="true">${o}</svg>`}
function lvFracSquare(a,b,c,d){const S=180;let o='';for(let i=0;i<b;i++)for(let j=0;j<d;j++){const x=10+i*S/b,y=10+j*S/d,inA=i<a,inC=j<c;
  o+=`<rect x="${x}" y="${y}" width="${S/b}" height="${S/d}" fill="${inA&&inC?LK.pur:inA?'#cfe0ff':inC?'#ffe0c8':'#fff'}" stroke="${LK.ink}" stroke-width="1.5"/>`}
  return`<svg viewBox="0 0 200 200" width="170" height="170" aria-hidden="true">${o}<rect x="10" y="10" width="${S}" height="${S}" fill="none" stroke="${LK.ink}" stroke-width="3"/></svg>`}
const lvRow=(...xs)=>`<div class="lvrow">${xs.join('')}</div>`;
const lvSteps=xs=>`<div class="lvsteps">${xs.map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('')}</div>`;

/* ---------- the lessons ---------- */
Object.assign(LESSONS,{
 add:{g:3,title:'Adding with regrouping',hook:'When a column gets too full, trade 10 ones for 1 ten, like trading 10 pennies for a dime!',
  terms:[['Sum','The answer to an adding problem.'],['Regroup','Trading 10 ones for 1 ten (or 10 tens for 1 hundred).']],
  steps:['Stack the numbers. Ones go under ones, tens under tens.','Add the ones first.','10 or more? Write the ones digit. Carry the 1 to the top of the tens.','Add the tens. Don’t forget the carried 1!'],
  ex:{q:'47 + 38',work:['Ones: 7 + 8 = 15. Write 5, carry the 1.','Tens: 1 + 4 + 3 = 8.'],a:'85'},vis:()=>lvCols({top:'47',bot:'38',op:'+',ans:'85',carry:{1:'1'},heads:['T','O']}),tip:'Check it: 85 is close to 50 + 40 = 90. That makes sense!'},
 sub:{g:3,title:'Subtracting with regrouping',hook:'If the top number is too small, borrow from the next door neighbor!',
  terms:[['Difference','The answer to a subtracting problem.'],['Borrow','Take 1 ten from the tens column and turn it into 10 ones.']],
  steps:['Stack the numbers by place value.','Start with the ones. Is the top digit smaller?','Yes? Borrow: the tens digit goes down by 1, and the ones get 10 more.','Subtract each column, right to left.'],
  ex:{q:'72 − 46',work:['2 is smaller than 6, so borrow. 7 tens becomes 6, and 2 becomes 12.','Ones: 12 − 6 = 6. Tens: 6 − 4 = 2.'],a:'26'},vis:()=>lvCols({top:'72',bot:'46',op:'−',ans:'26',borrow:{1:'6'},carry:{0:'12'},heads:['T','O']}),tip:'Check it by adding back: 26 + 46 = 72. ✓'},
 zeros:{g:3,title:'Subtracting across zeros',hook:'Zeros have nothing to lend, so you go knock on the next door down the street!',
  terms:[['Borrow across zeros','When the tens are 0, borrow from the hundreds first.']],
  steps:['Need to borrow, but the tens are 0? Go to the hundreds.','Borrow 1 hundred. Now the tens are 10.','Borrow 1 of those tens. Now the tens are 9 and the ones get 10 more.','Subtract each column.'],
  ex:{q:'400 − 163',work:['4 hundreds becomes 3. Tens become 10, then 9. Ones become 10.','Ones: 10 − 3 = 7. Tens: 9 − 6 = 3. Hundreds: 3 − 1 = 2.'],a:'237'},vis:()=>lvCols({top:'400',bot:'163',op:'−',ans:'237',borrow:{2:'3',1:'9'},carry:{0:'10'},heads:['H','T','O']}),tip:'Think of 400 as 399 + 1. Subtracting from 9s is easy!'},
 missing:{g:3,title:'Finding a missing number',hook:'The ? is a secret number. Use the opposite operation to find it!',
  terms:[['Fact family','Numbers that belong together: 3 + 5 = 8 and 8 − 5 = 3.'],['Opposite operation','Adding and subtracting undo each other. So do multiplying and dividing.']],
  steps:['Look at what the problem is doing to the ?.','Do the opposite: missing in adding? Subtract. Missing in multiplying? Divide.','Put your answer in for the ? to check.'],
  ex:{q:'245 + ? = 610',work:['The whole is 610. One part is 245.','610 − 245 = 365.'],a:'365'},vis:()=>`<div class="lvbm"><div class="w">610 (the whole)</div><div class="p"><span style="flex:245">245</span><span style="flex:365" class="q">?</span></div></div>`,tip:'Check: 245 + 365 = 610. ✓'},
 round:{g:3,title:'Rounding',hook:'Rounding means finding the closest “friendly” number, like the nearest 10 or 100.',
  terms:[['Round','Change a number to the nearest friendly number.'],['Nearest ten','The closest number ending in 0, like 460 or 470.']],
  steps:['Find the place you are rounding to.','Look at the digit to its right.','5 or more? Round up. 4 or less? Stay the same.','Turn the digits after it into zeros.'],
  ex:{q:'Round 467 to the nearest ten',work:['467 is between 460 and 470.','The ones digit is 7. 7 is 5 or more, so round up.'],a:'470'},vis:()=>lvLine(460,470,467,470),tip:'“5 or more, raise the score. 4 or less, let it rest.”'},
 mult:{g:3,title:'Multiplication facts',hook:'Multiplying is a fast way to add equal groups.',
  terms:[['Factor','A number you multiply.'],['Product','The answer to a multiplying problem.'],['Array','Rows and columns of objects, like seats in a stadium.']],
  steps:['6 × 7 means 6 rows of 7.','Skip count: 7, 14, 21, 28, 35, 42.','Or use a fact you know: 5 × 7 = 35, then add one more row of 7.'],
  ex:{q:'6 × 7',work:['5 rows of 7 = 35 (blue).','One more row of 7 (orange): 35 + 7 = 42.'],a:'42'},vis:()=>lvDots(6,7,1),tip:'Order doesn’t matter: 6 × 7 is the same as 7 × 6.'},
 multtens:{g:4,title:'Multiplying by tens',hook:'Hide the zeros, multiply, then bring the zeros back!',
  terms:[['Multiple of ten','A number ending in 0, like 30 or 40.']],
  steps:['Cover the zeros.','Multiply the numbers that are left.','Count the zeros you covered and stick them on the end.'],
  ex:{q:'30 × 40',work:['Cover the zeros: 3 × 4 = 12.','You covered 2 zeros, so add 2 zeros.'],a:'1,200'},vis:()=>`<div class="lvbig">3<s>0</s> × 4<s>0</s> → 3 × 4 = 12 → 12<u>00</u></div>`,tip:'Count the zeros carefully. They are easy to lose!'},
 multbig:{g:4,title:'Multiplying bigger numbers',hook:'Break the big number into smaller pieces, multiply each piece, then add.',
  terms:[['Partial products','The answers to the small multiplying problems you add together.']],
  steps:['Break the big number into tens and ones: 34 = 30 + 4.','Multiply each piece.','Add the pieces.'],
  ex:{q:'34 × 6',work:['30 × 6 = 180.','4 × 6 = 24.','180 + 24 = 204.'],a:'204'},vis:()=>lvArea(['30','4'],['6'],[['180','24']],[150,70]),tip:'The picture is like a rectangle split into two rooms.'},
 divide:{g:3,title:'Division',hook:'Dividing means sharing fairly, so everyone gets the same amount.',
  terms:[['Divide','Split into equal groups.'],['Quotient','The answer to a dividing problem.']],
  steps:['42 ÷ 6 means share 42 into 6 equal groups.','Think: 6 times what equals 42?','6 × 7 = 42, so each group gets 7.'],
  ex:{q:'42 ÷ 6',work:['6 groups, 7 in each group.','6 × 7 = 42.'],a:'7'},vis:()=>lvGroups(6,7),tip:'Every division fact has a multiplication buddy.'},
 remainder:{g:4,title:'Remainders',hook:'Sometimes things don’t share evenly. The leftovers are the remainder!',
  terms:[['Remainder','What is left over after making equal groups. It is always smaller than the number you divide by.']],
  steps:['Find the biggest multiple that fits.','Subtract it.','What’s left is the remainder.'],
  ex:{q:'47 ÷ 5',work:['5 groups of 9 = 45.','47 − 45 = 2 left over (red).'],a:'9 R 2'},vis:()=>lvGroups(5,9,2),tip:'If your leftover is bigger than the number of groups, you can make more groups!'},
 time:{g:3,title:'Telling time',hook:'The short hand tells the hour. The long hand tells the minutes.',
  terms:[['Hour hand','The short hand.'],['Minute hand','The long hand. Each number on the clock is 5 more minutes.']],
  steps:['Look at the short hand. Which number did it just pass? That’s the hour.','Look at the long hand. Count by 5s from the 12.','Write hour : minutes.'],
  ex:{q:'What time is it?',work:['The short hand just passed the 3.','The long hand is on the 4: 5, 10, 15, 20.'],a:'3:20'},vis:()=>clock(3,20),tip:'The long hand on the 6 means 30 minutes, or “half past.”'},
 elapsed:{g:3,title:'Elapsed time',hook:'Elapsed time is how long something takes. Jump along the clock!',
  terms:[['Elapsed time','The time that passes from start to finish.']],
  steps:['Start at the starting time.','Jump to the next full hour first.','Then jump the minutes that are left.'],
  ex:{q:'Starts at 4:40, lasts 35 minutes',work:['4:40 to 5:00 is 20 minutes.','35 − 20 = 15 more minutes: 5:15.'],a:'5:15'},vis:()=>lvHops(['4:40','5:00','5:15'],['+20 min','+15 min']),tip:'An hour has 60 minutes, not 100!'},
 coins:{g:3,title:'Counting coins',hook:'Start with the biggest coins, then count on!',
  terms:[['Quarter','25¢'],['Dime','10¢'],['Nickel','5¢'],['Penny','1¢']],
  steps:['Line the coins up from biggest to smallest.','Count the quarters: 25, 50, 75.','Count on with dimes (+10), nickels (+5), pennies (+1).'],
  ex:{q:'2 quarters, 1 dime, 3 pennies',work:['25, 50 … 60 … 61, 62, 63.'],a:'63¢'},vis:()=>coins([25,25,10,1,1,1]),tip:'A dime is smaller than a nickel, but it’s worth more!'},
 money:{g:3,title:'Adding money',hook:'Money works like decimals: line up the dots!',
  terms:[['Dollar','100 cents, written $1.00.'],['Decimal point','The dot between dollars and cents.']],
  steps:['Line up the decimal points.','Add the cents.','Add the dollars. Put the dot and $ in your answer.'],
  ex:{q:'$2.35 + $1.40',work:['Cents: 35 + 40 = 75.','Dollars: 2 + 1 = 3.'],a:'$3.75'},vis:()=>lvCols({top:'2.35',bot:'1.40',op:'+',ans:'3.75'}),tip:'Line up the dots and the rest lines up by itself.'},
 change:{g:3,title:'Making change',hook:'Count up from the price to what you paid, like a store clerk!',
  terms:[['Change','The money you get back.']],
  steps:['Start at the price.','Count up to the next whole dollar.','Count up to what you paid.','Add the jumps.'],
  ex:{q:'Pay $5.00 for $3.65',work:['$3.65 → $4.00 is 35¢.','$4.00 → $5.00 is $1.00.','$1.00 + 35¢ = $1.35.'],a:'$1.35'},vis:()=>lvHops(['$3.65','$4.00','$5.00'],['+35¢','+$1.00']),tip:'Counting up is easier than subtracting!'},
 fracname:{g:3,title:'Naming fractions',hook:'A fraction tells how many pieces you have out of the whole thing.',
  terms:[['Numerator','The top number: how many pieces you have.'],['Denominator','The bottom number: how many equal pieces in all.']],
  steps:['Count all the equal pieces. That’s the bottom number.','Count the colored pieces. That’s the top number.'],
  ex:{q:'What fraction is colored?',work:['4 pieces in all. 3 are colored.'],a:'3/4'},vis:()=>lvBar(3,4,'3 out of 4 = ¾'),tip:'Pieces must be the same size to make a fraction.'},
 fraccompare:{g:3,title:'Comparing fractions',hook:'Is it more pizza or less pizza? Bars help you see!',
  terms:[['>','Greater than. The open mouth eats the bigger number.'],['<','Less than.']],
  steps:['Same bottom number? More top pieces is bigger.','Same top number? The smaller bottom means bigger pieces, so it’s bigger.','Draw bars the same length to check.'],
  ex:{q:'2/3 ? 2/5',work:['Both have 2 pieces.','Thirds are bigger pieces than fifths.'],a:'2/3 > 2/5'},vis:()=>lvBar(2,3,'⅔',LK.org,300)+lvBar(2,5,'⅖',LK.blu,300),tip:'Cut a pizza into 3 or into 5 pieces. Which slice is bigger?'},
 fracequiv:{g:4,title:'Equivalent fractions',hook:'Different numbers, same amount, like 2 quarters and 50 cents!',
  terms:[['Equivalent','Equal in size.']],
  steps:['Multiply the top and bottom by the same number.','The fraction looks different but is the same size.'],
  ex:{q:'What equals 1/2?',work:['× 3 on top and bottom: 1 × 3 = 3, 2 × 3 = 6.'],a:'3/6'},vis:()=>lvBar(1,2,'½',LK.org,300)+lvBar(3,6,'3/6',LK.blu,300),tip:'The colored parts are the same length. That means they’re equal!'},
 fracadd:{g:4,title:'Adding fractions',hook:'Same size pieces? Just add how many pieces you have!',
  terms:[['Like denominators','Fractions with the same bottom number.']],
  steps:['Check the bottom numbers are the same.','Add the tops.','Keep the bottom the same.'],
  ex:{q:'2/8 + 3/8',work:['2 pieces + 3 pieces = 5 pieces.','The pieces are still eighths.'],a:'5/8'},vis:()=>lvBar(2,8,'2/8 + 3/8 = 5/8',LK.org,320,[3,LK.blu]),tip:'Never add the bottom numbers. The size of the pieces stays the same!'},
 mixed:{g:4,title:'Adding mixed numbers',hook:'Add the wholes, then add the fractions.',
  terms:[['Mixed number','A whole number with a fraction, like 2¼.']],
  steps:['Add the whole numbers.','Add the fractions.','Put them together.'],
  ex:{q:'1 2/5 + 2 1/5',work:['Wholes: 1 + 2 = 3.','Fractions: 2/5 + 1/5 = 3/5.'],a:'3 3/5'},vis:()=>lvBar(5,5,'1',LK.grn,150)+lvBar(5,5,'1',LK.grn,150)+lvBar(5,5,'1',LK.grn,150)+lvBar(3,5,'3/5',LK.org,150),tip:'If the fractions add up to more than 1, make another whole!'},
 fracwhole:{g:4,title:'A fraction times a whole number',hook:'3 × 2/5 means three groups of 2/5. Count the pieces!',
  terms:[['Whole number','A counting number like 1, 2 or 3.']],
  steps:['Multiply the whole number by the top.','Keep the bottom the same.'],
  ex:{q:'3 × 2/5',work:['2 fifths, three times: 2 + 2 + 2 = 6 fifths.'],a:'6/5'},vis:()=>lvBar(2,5,'2/5',LK.org,150)+lvBar(2,5,'2/5',LK.blu,150)+lvBar(2,5,'2/5',LK.grn,150),tip:'6/5 is more than 1 whole. That’s okay!'},
 fracofset:{g:4,title:'A fraction of a group',hook:'“Of” means split the group up, then take some of the parts.',
  terms:[['Of','In math, “of” means multiply.']],
  steps:['Split the group into equal parts (the bottom number).','Take that many parts (the top number).'],
  ex:{q:'2/3 of 12 apples',work:['12 split into 3 groups = 4 in each.','Take 2 groups: 4 + 4 = 8.'],a:'8'},vis:()=>lvGroups(3,4,0,2),tip:'1/3 of 12 is 4. So 2/3 of 12 is twice as much.'},
 decimal:{g:4,title:'Comparing decimals',hook:'Decimals are just tiny pieces of 1. Make them the same length to compare!',
  terms:[['Tenths','The first digit after the dot. 0.4 = 4 tenths.'],['Hundredths','The second digit after the dot. 0.38 = 38 hundredths.']],
  steps:['Line up the decimal points.','Add a zero so they have the same number of digits.','Compare like regular numbers.'],
  ex:{q:'0.4 ? 0.38',work:['0.4 = 0.40 = 40 hundredths.','40 > 38.'],a:'0.4 > 0.38'},vis:()=>lvRow(`<div class="lvcap">${lvGrid(40)}<b>0.40</b></div>`,`<div class="lvcap">${lvGrid(38,LK.org)}<b>0.38</b></div>`),tip:'More digits does not mean bigger!'},
 perimeter:{g:4,title:'Perimeter',hook:'Perimeter is the distance all the way around, like walking around a field.',
  terms:[['Perimeter','The total length of all the sides.']],
  steps:['Find every side’s length.','A rectangle has 2 long and 2 short sides.','Add them all up.'],
  ex:{q:'A field 12 yards long, 5 yards wide',work:['12 + 5 + 12 + 5 = 34.'],a:'34 yards'},vis:()=>lvRect(12,5,'perim'),tip:'Trace the outline with your finger and add as you go.'},
 area:{g:4,title:'Area',hook:'Area is how many squares fit inside, like tiles on a floor.',
  terms:[['Area','The space inside a flat shape.'],['Square unit','A square that is 1 on each side.']],
  steps:['Find the length and width.','Multiply: length × width.','Answer in square units.'],
  ex:{q:'8 long, 6 wide',work:['8 rows of 6 squares... 8 × 6 = 48.'],a:'48 square units'},vis:()=>lvRect(8,6,'area'),tip:'Perimeter is the fence. Area is the grass inside!'},
 angle:{g:4,title:'Angles on a straight line',hook:'A straight line is a half turn. That’s 180 degrees!',
  terms:[['Angle','The amount of turn between two lines, in degrees (°).'],['Right angle','A square corner: 90°.']],
  steps:['Two angles on a straight line add up to 180°.','Subtract the one you know from 180.'],
  ex:{q:'One angle is 65°',work:['180 − 65 = 115.'],a:'115°'},vis:()=>lvAngle(65),tip:'A full circle is 360°. Half of it is 180°.'},
 factor:{g:4,title:'Factors',hook:'Factors are numbers that fit into a number perfectly, with nothing left over.',
  terms:[['Factor','A number that divides evenly into another number.'],['Factor pair','Two numbers that multiply to make the number.']],
  steps:['Think: what times what makes the number?','Write the pairs: 1 × 36, 2 × 18 …','Every number in a pair is a factor.'],
  ex:{q:'Factors of 36',work:['1×36, 2×18, 3×12, 4×9, 6×6.'],a:'1, 2, 3, 4, 6, 9, 12, 18, 36'},vis:()=>`<div class="lvpairs">${[[1,36],[2,18],[3,12],[4,9],[6,6]].map(([a,b])=>`<span><b>${a}</b> × <b>${b}</b></span>`).join('')}</div>`,tip:'If a number doesn’t divide evenly, it’s not a factor.'},
 word:{g:3,title:'Word problems',hook:'Be a math detective: find the clues, then solve!',
  terms:[['Clue words','“in all” or “total” → add or multiply. “left” or “how many more” → subtract. “each” or “shared equally” → divide.']],
  steps:['Read the whole problem.','Circle the numbers. Underline what the question asks.','Pick the operation. Some problems need two steps.','Solve, then ask: does my answer make sense?'],
  ex:{q:'3 touchdowns worth 7 points and 2 field goals worth 3 points',work:['Touchdowns: 3 × 7 = 21.','Field goals: 2 × 3 = 6.','Total: 21 + 6 = 27.'],a:'27 points'},
  vis:()=>`<div class="lvword"><mark>3</mark> touchdowns worth <mark>7</mark> points each and <mark>2</mark> field goals worth <mark>3</mark> points each. <u>How many points in all?</u></div>`,tip:'Drawing a quick picture helps a lot!'},
 /* Grade 5 */
 m2d:{g:5,title:'Multiplying by a 2-digit number',hook:'Split the 2-digit number into tens and ones, then build a rectangle!',
  terms:[['Partial products','The smaller answers you add up at the end.']],
  steps:['Split 26 into 20 + 6.','Multiply 234 × 20.','Multiply 234 × 6.','Add the two answers.'],
  ex:{q:'234 × 26',work:['234 × 20 = 4,680.','234 × 6 = 1,404.','4,680 + 1,404 = 6,084.'],a:'6,084'},vis:()=>lvArea(['234'],['20','6'],[['4,680'],['1,404']],[180]),tip:'Estimate first: 234 × 26 is a bit more than 200 × 25 = 5,000.'},
 longdiv:{g:5,title:'Dividing by a 2-digit number',hook:'Guess, check and fix, like a game of hot and cold!',
  terms:[['Estimate','A smart guess using friendly numbers.'],['Quotient','The answer to a dividing problem.']],
  steps:['Round the divisor to a friendly number.','Make a guess and multiply to check.','Too big? Guess smaller. Too small? Guess bigger.'],
  ex:{q:'672 ÷ 24',work:['24 is about 25. 25 × 27 = 675, so try 28.','24 × 28 = 672. Got it!'],a:'28'},vis:()=>lvSteps([['24 × 25','600 (too small)'],['24 × 30','720 (too big)'],['24 × 28','672 ✓']]),tip:'Your answer must be between your “too small” and “too big” guesses.'},
 decadd:{g:5,title:'Adding and subtracting decimals',hook:'Line up the dots and it works just like regular adding!',
  terms:[['Decimal point','The dot between the whole number and the pieces.']],
  steps:['Line up the decimal points.','Fill empty places with 0.','Add or subtract like normal, regrouping if needed.','Drop the dot straight down.'],
  ex:{q:'8.53 + 8.79',work:['3 + 9 = 12: write 2, carry 1.','5 + 7 + 1 = 13: write 3, carry 1.','8 + 8 + 1 = 17.'],a:'17.32'},vis:()=>lvCols({top:'8.53',bot:'8.79',op:'+',ans:'17.32',carry:{1:'1',3:'1'}}),tip:'The dots always stay in one straight line.'},
 pow10:{g:5,title:'Multiplying by 10, 100 and 1,000',hook:'Each zero slides the digits one place bigger!',
  terms:[['Power of ten','10, 100, 1,000 and so on.']],
  steps:['Count the zeros.','Move the decimal point that many places to the right.','Fill empty spots with zeros.'],
  ex:{q:'3.4 × 100',work:['100 has 2 zeros. Move the dot 2 places right.','3.4 → 34 → 340.'],a:'340'},vis:()=>lvChart(['×','Hundreds','Tens','Ones','.','Tenths'],['3.4','','','3','.','4'],-1)+lvChart(['×100','Hundreds','Tens','Ones','.','Tenths'],['340','3','4','0','.',''],1),tip:'Times 10 makes a number 10 times bigger, so the answer must be bigger!'},
 dmul:{g:5,title:'Multiplying a decimal by a whole number',hook:'Pretend the dot isn’t there, multiply, then put it back!',
  terms:[['Decimal place','A digit after the dot.']],
  steps:['Multiply like whole numbers.','Count the digits after the dot in the problem.','Give your answer that many digits after the dot.'],
  ex:{q:'7.8 × 6',work:['78 × 6 = 468.','7.8 has 1 digit after the dot.'],a:'46.8'},vis:()=>`<div class="lvbig">7.8 × 6 → 78 × 6 = 468 → 46.<u>8</u></div>`,tip:'Estimate: 8 × 6 = 48, so 46.8 makes sense.'},
 ooo:{g:5,title:'Order of operations',hook:'Math has a line order, just like lunch: parentheses go first!',
  terms:[['( ) and [ ]','Do what’s inside first.'],['The order','1. ( ) and [ ]  2. × and ÷  3. + and −']],
  steps:['Do the inside parentheses.','Then the brackets.','Then multiply or divide.','Last, add or subtract.'],
  ex:{q:'4 × [3 + (9 − 5)]',work:['(9 − 5) = 4.','[3 + 4] = 7.','4 × 7 = 28.'],a:'28'},vis:()=>lvSteps([['4 × [3 + (9 − 5)]','start'],['4 × [3 + 4]','( ) first'],['4 × 7','[ ] next'],['28','multiply']]),tip:'In 3 + 4 × 2, multiply first: 3 + 8 = 11.'},
 dplace:{g:5,title:'Decimal place value',hook:'After the dot, the places get smaller: tenths, hundredths, thousandths.',
  terms:[['Tenths','1st place after the dot.'],['Hundredths','2nd place after the dot.'],['Thousandths','3rd place after the dot.']],
  steps:['Find the dot.','Count places to the right: tenths, hundredths, thousandths.','The digit is worth that many of those pieces.'],
  ex:{q:'In 8.324, what is the 2 worth?',work:['The 2 is in the 2nd place after the dot.'],a:'2 hundredths'},vis:()=>lvChart(['Ones','.','Tenths','Hundredths','Thousandths'],['8','.','3','2','4'],3),tip:'Tenths are like dimes, hundredths are like pennies.'},
 funlike:{g:5,title:'Adding fractions with different denominators',hook:'You can only add pieces that are the same size. So cut them the same size first!',
  terms:[['Common denominator','A bottom number both fractions can share.']],
  steps:['Find a common denominator (multiplying the bottoms always works).','Rename both fractions. Whatever you do to the bottom, do to the top.','Add the tops. Simplify if you can.'],
  ex:{q:'1/2 + 1/5',work:['Common denominator: 10.','1/2 = 5/10 and 1/5 = 2/10.','5/10 + 2/10 = 7/10.'],a:'7/10'},vis:()=>lvBar(1,2,'½',LK.org,300)+lvBar(5,10,'= 5/10',LK.org,300)+lvBar(1,5,'⅕',LK.blu,300)+lvBar(2,10,'= 2/10',LK.blu,300),tip:'Same size pieces first, then add.'},
 fmul:{g:5,title:'Multiplying fractions',hook:'Tops times tops, bottoms times bottoms!',
  terms:[['Simplify','Divide the top and bottom by the same number to make it smaller.']],
  steps:['Multiply the tops.','Multiply the bottoms.','Simplify.'],
  ex:{q:'2/3 × 3/4',work:['2 × 3 = 6 and 3 × 4 = 12.','6/12 = 1/2.'],a:'1/2'},vis:()=>lvRow(lvFracSquare(2,3,3,4),'<p class="lvnote">Blue = 2/3. Orange = 3/4.<br>Purple overlap = 6 of 12 squares = ½.</p>'),tip:'Multiplying by a fraction less than 1 makes a number smaller!'},
 fdiv:{g:5,title:'Dividing with unit fractions',hook:'Splitting a slice makes smaller slices. Counting slices makes a big number!',
  terms:[['Unit fraction','A fraction with 1 on top, like ¼.']],
  steps:['Fraction ÷ whole number: split the piece. Multiply the bottom.','Whole number ÷ fraction: count how many pieces fit. Multiply by the bottom.'],
  ex:{q:'3 ÷ 1/4',work:['Each whole has 4 fourths.','3 wholes × 4 = 12 fourths.'],a:'12'},vis:()=>lvBar(4,4,'',LK.org,150)+lvBar(4,4,'',LK.blu,150)+lvBar(4,4,'12 fourths in 3 wholes',LK.grn,150),tip:'1/6 ÷ 2 = 1/12. The piece got smaller!'},
 volume:{g:5,title:'Volume',hook:'Volume is how many little cubes fill a box.',
  terms:[['Volume','The space inside a 3-D shape.'],['Cubic unit','A cube that is 1 on each side.']],
  steps:['Find length, width and height.','Multiply all three.','Two boxes? Find each volume and add.'],
  ex:{q:'A box 4 × 3 × 2',work:['4 × 3 = 12 cubes on the bottom layer.','2 layers: 12 × 2 = 24.'],a:'24 cubic units'},vis:()=>lvBox(4,3,2),tip:'Find the bottom layer first, then stack the layers.'},
 exp:{g:5,title:'Powers of ten',hook:'The little number up top tells how many zeros!',
  terms:[['Exponent','The small raised number. It says how many 10s to multiply.']],
  steps:['10² = 10 × 10 = 100.','10³ = 10 × 10 × 10 = 1,000.','For 6 × 10², write 6 and add 2 zeros.'],
  ex:{q:'6 × 10²',work:['10² = 100.','6 × 100 = 600.'],a:'600'},vis:()=>lvSteps([['10¹','10'],['10²','100'],['10³','1,000'],['10⁴','10,000']]),tip:'Count the zeros. It’s the same as the little number!'}
});

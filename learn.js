/* ============ LEARN ============
   Kid-friendly lessons: words to know, step-by-step how-tos and a worked example for every kind of
   question the game asks. lessonFor(p) picks the lesson that matches a question; openLesson(key)
   shows it; openLibrary() lists them all. Loaded after the main script in index.html. */

const LESSONS={
 add:{g:3,title:'Adding with regrouping',terms:[['Sum','The answer when you add numbers.'],['Place value','What a digit is worth because of where it sits: ones, tens, hundreds.'],['Regroup','When a column adds up to 10 or more, trade 10 ones for 1 ten and carry it to the next column.']],
  steps:['Line up the numbers by place value: ones under ones, tens under tens.','Add the ones column first.','If the ones add up to 10 or more, write the ones digit and carry the 1 to the tens column.','Add the tens column, including any carried 1. Keep going left.'],
  ex:{q:'47 + 38',work:['Ones: 7 + 8 = 15. Write 5, carry 1 ten.','Tens: 4 + 3 + 1 = 8.','So 47 + 38 = 85.'],a:'85'}},
 sub:{g:3,title:'Subtracting with regrouping',terms:[['Difference','The answer when you subtract.'],['Regroup (borrow)','When the top digit is too small, take 1 ten from the next column and turn it into 10 ones.']],
  steps:['Line up the numbers by place value.','Start with the ones. Is the top digit big enough to take away the bottom digit?','If not, borrow: take 1 from the tens digit and add 10 to the ones digit.','Subtract each column from right to left.'],
  ex:{q:'72 − 46',work:['Ones: 2 is smaller than 6, so borrow. The 7 tens becomes 6, and 2 becomes 12.','12 − 6 = 6.','Tens: 6 − 4 = 2.','So 72 − 46 = 26.'],a:'26'}},
 zeros:{g:3,title:'Subtracting across zeros',terms:[['Borrow across zeros','When the next column is 0, keep going left until you find a digit you can borrow from.']],
  steps:['Start at the ones. If you need to borrow and the tens digit is 0, look at the hundreds.','Borrow 1 hundred: it becomes 10 tens.','Now borrow 1 of those tens: it becomes 10 ones. The tens digit is now 9.','Subtract each column.'],
  ex:{q:'400 − 163',work:['Borrow 1 hundred: 4 hundreds becomes 3, and the tens become 10.','Borrow 1 ten: tens become 9, and the ones become 10.','Ones: 10 − 3 = 7. Tens: 9 − 6 = 3. Hundreds: 3 − 1 = 2.','So 400 − 163 = 237.'],a:'237'}},
 missing:{g:3,title:'Finding a missing number',terms:[['Missing number','The ? stands for a number you need to find.'],['Fact family','Numbers that go together: 3 + 5 = 8, so 8 − 5 = 3. And 4 × 6 = 24, so 24 ÷ 4 = 6.']],
  steps:['Read the problem: what is being added or multiplied?','Use the opposite operation. For a missing addend, subtract. For a missing factor, divide.','Check: put your answer in place of the ? and see if it works.'],
  ex:{q:'245 + ? = 610',work:['The opposite of adding is subtracting.','610 − 245 = 365.','Check: 245 + 365 = 610. Yes!'],a:'365'}},
 round:{g:3,title:'Rounding',terms:[['Round','Change a number to a nearby “friendly” number that is easier to use.'],['Nearest ten','The closest number that ends in 0, like 40 or 50.'],['Nearest hundred','The closest number that ends in 00, like 300 or 400.']],
  steps:['Find the place you are rounding to (tens, hundreds or thousands).','Look at the digit just to its right.','If that digit is 5 or more, round up. If it is 4 or less, keep the digit the same.','Change every digit to the right of your place into 0.'],
  ex:{q:'Round 467 to the nearest ten',work:['The tens digit is 6. The digit to its right is 7.','7 is 5 or more, so round up: 6 tens becomes 7 tens.','467 rounds to 470.'],a:'470'}},
 mult:{g:3,title:'Multiplication facts',terms:[['Multiply','Add equal groups quickly. 4 × 3 means 4 groups of 3.'],['Factor','A number you multiply.'],['Product','The answer when you multiply.']],
  steps:['Think of equal groups: the first number is how many groups, the second is how many in each.','Skip count: count by the group size that many times.','Use a fact you know: 6 × 7 is 5 × 7 plus one more 7.','Order does not matter: 3 × 8 is the same as 8 × 3.'],
  ex:{q:'6 × 7',work:['5 × 7 = 35.','Add one more group of 7: 35 + 7 = 42.','So 6 × 7 = 42.'],a:'42'}},
 multtens:{g:4,title:'Multiplying by tens',terms:[['Multiple of ten','A number that ends in 0, like 30 or 70.']],
  steps:['Cover up the zeros and multiply the other digits.','Count the zeros you covered.','Put that many zeros on the end of your answer.'],
  ex:{q:'30 × 40',work:['3 × 4 = 12.','There are 2 zeros in 30 and 40.','Add 2 zeros: 1,200.'],a:'1,200'}},
 multbig:{g:4,title:'Multiplying bigger numbers',terms:[['Partial products','Break a number into tens and ones, multiply each part, then add the parts together.']],
  steps:['Break the bigger number into place values: 34 is 30 + 4.','Multiply each part by the other number.','Add the partial products together.','For 2-digit × 2-digit, break up both numbers and make four small products.'],
  ex:{q:'34 × 6',work:['30 × 6 = 180.','4 × 6 = 24.','180 + 24 = 204.','So 34 × 6 = 204.'],a:'204'}},
 divide:{g:3,title:'Division',terms:[['Divide','Split a number into equal groups.'],['Dividend','The number being split up.'],['Divisor','How many groups (or how big each group is).'],['Quotient','The answer to a division problem.']],
  steps:['Read 42 ÷ 6 as “42 split into 6 equal groups.”','Think of the multiplication fact: 6 × ? = 42.','The missing factor is the quotient.','For big numbers, divide one place at a time from left to right.'],
  ex:{q:'42 ÷ 6',work:['Ask: 6 times what equals 42?','6 × 7 = 42.','So 42 ÷ 6 = 7.'],a:'7'}},
 remainder:{g:4,title:'Remainders',terms:[['Remainder','What is left over when a number cannot be split into equal groups evenly. It is always smaller than the divisor.']],
  steps:['Find the biggest multiple of the divisor that fits into the number.','Subtract it from the number.','What is left is the remainder.'],
  ex:{q:'47 ÷ 5',work:['5 × 9 = 45 is the biggest that fits.','47 − 45 = 2.','So 47 ÷ 5 = 9 R 2. The remainder is 2.'],a:'2'}},
 time:{g:3,title:'Telling time',terms:[['Hour hand','The short hand. It points to the hour.'],['Minute hand','The long hand. Each number on the clock means 5 minutes.']],
  steps:['Look at the short hand first. The hour is the number it just passed.','Look at the long hand. Count by 5s for each number, starting at 12.','For exact minutes, count the small tick marks past the last number.','Write it as hour : minutes.'],
  ex:{q:'Short hand just past 3, long hand on the 4',work:['The hour is 3.','The long hand on 4 means 4 × 5 = 20 minutes.','The time is 3:20.'],a:'3:20'}},
 elapsed:{g:3,title:'Elapsed time',terms:[['Elapsed time','How much time passes from the start to the end.']],
  steps:['Start at the beginning time.','Add the minutes. If you reach 60 minutes, that makes 1 more hour.','Write the new time.'],
  ex:{q:'Starts at 4:40 and lasts 35 minutes',work:['4:40 + 20 minutes = 5:00.','There are 15 minutes left: 5:00 + 15 = 5:15.','It ends at 5:15.'],a:'5:15'}},
 coins:{g:3,title:'Counting coins',terms:[['Quarter','25 cents'],['Dime','10 cents'],['Nickel','5 cents'],['Penny','1 cent']],
  steps:['Sort the coins from biggest to smallest.','Count the biggest coins first: 25, 50, 75...','Keep counting on with the next coins: by 10s, then 5s, then 1s.'],
  ex:{q:'2 quarters, 1 dime, 3 pennies',work:['Quarters: 25, 50.','Dime: 60.','Pennies: 61, 62, 63.','Total: 63 cents.'],a:'63¢'}},
 money:{g:3,title:'Adding money',terms:[['Dollar','100 cents. $1.00'],['Decimal point','The dot between dollars and cents.']],
  steps:['Line up the decimal points.','Add the cents. If they reach 100 or more, carry 1 dollar.','Add the dollars.'],
  ex:{q:'$2.35 + $1.40',work:['Cents: 35 + 40 = 75.','Dollars: 2 + 1 = 3.','Total: $3.75.'],a:'$3.75'}},
 change:{g:3,title:'Making change',terms:[['Change','The money you get back when you pay more than something costs.']],
  steps:['Start at the price.','Count up to the next whole dollar.','Keep counting up to the amount you paid.','Add up how much you counted.'],
  ex:{q:'Pay $5.00 for something that costs $3.65',work:['$3.65 → $4.00 is 35 cents.','$4.00 → $5.00 is $1.00.','Change: $1.00 + $0.35 = $1.35.'],a:'$1.35'}},
 fracname:{g:3,title:'Naming fractions',terms:[['Fraction','A number that names part of a whole.'],['Numerator','The top number: how many parts you have.'],['Denominator','The bottom number: how many equal parts make the whole.']],
  steps:['Count all the equal parts. That number goes on the bottom.','Count the shaded parts. That number goes on the top.'],
  ex:{q:'4 equal parts, 3 shaded',work:['Bottom (denominator): 4.','Top (numerator): 3.','The fraction is 3/4.'],a:'3/4'}},
 fraccompare:{g:3,title:'Comparing fractions',terms:[['Greater than >','The open side faces the bigger number.'],['Less than <','The point faces the smaller number.']],
  steps:['Same bottom number? Compare the tops. More pieces means bigger.','Same top number? The smaller bottom number is bigger, because the pieces are bigger.','Drawing fraction bars helps you see it.'],
  ex:{q:'2/3 ? 2/5',work:['The tops are the same (2 pieces each).','Thirds are bigger pieces than fifths.','So 2/3 > 2/5.'],a:'>'}},
 fracequiv:{g:4,title:'Equivalent fractions',terms:[['Equivalent','Equal in size, even though the numbers look different.']],
  steps:['Multiply the top and the bottom by the same number.','The new fraction is the same size as the old one.','To check, divide the top and bottom of the bigger fraction by the same number.'],
  ex:{q:'Which fraction equals 1/2?',work:['Multiply top and bottom by 3: 1 × 3 = 3 and 2 × 3 = 6.','3/6 is equal to 1/2.'],a:'3/6'}},
 fracadd:{g:4,title:'Adding fractions',terms:[['Like denominators','Fractions with the same bottom number.']],
  steps:['Check that the bottom numbers are the same.','Add the top numbers.','Keep the bottom number the same.'],
  ex:{q:'2/8 + 3/8',work:['The bottoms are both 8.','2 + 3 = 5.','So 2/8 + 3/8 = 5/8.'],a:'5/8'}},
 mixed:{g:4,title:'Adding mixed numbers',terms:[['Mixed number','A whole number and a fraction together, like 2 1/4.']],
  steps:['Add the whole numbers.','Add the fractions (same bottom number).','Put them together.'],
  ex:{q:'1 2/5 + 2 1/5',work:['Wholes: 1 + 2 = 3.','Fractions: 2/5 + 1/5 = 3/5.','Answer: 3 3/5.'],a:'3 3/5'}},
 fracwhole:{g:4,title:'Multiplying a fraction by a whole number',terms:[['Whole number','A counting number like 1, 2, 3 (no fraction part).']],
  steps:['Multiply the whole number by the top number.','Keep the bottom number the same.'],
  ex:{q:'3 × 2/5',work:['3 × 2 = 6.','The bottom stays 5.','So 3 × 2/5 = 6/5.'],a:'6/5'}},
 fracofset:{g:4,title:'A fraction of a group',terms:[['Of','In math, “of” means multiply. 1/3 of 12 means split 12 into 3 equal groups.']],
  steps:['Divide the group by the bottom number to find one part.','Multiply by the top number.'],
  ex:{q:'2/3 of 12 apples',work:['12 ÷ 3 = 4 apples in each third.','2 thirds: 4 × 2 = 8.','So 2/3 of 12 is 8.'],a:'8'}},
 decimal:{g:4,title:'Comparing decimals',terms:[['Tenths','The first digit after the decimal point. 0.4 means 4 tenths.'],['Hundredths','The second digit after the decimal point. 0.38 means 38 hundredths.']],
  steps:['Line up the decimal points.','Add a 0 so both have the same number of digits: 0.4 becomes 0.40.','Compare them like whole numbers.'],
  ex:{q:'0.4 ? 0.38',work:['0.4 is the same as 0.40.','40 hundredths is more than 38 hundredths.','So 0.4 > 0.38.'],a:'>'}},
 perimeter:{g:4,title:'Perimeter',terms:[['Perimeter','The distance all the way around the outside of a shape.']],
  steps:['A rectangle has 2 long sides and 2 short sides.','Add the length and the width.','Double it.'],
  ex:{q:'A field 12 yards long and 5 yards wide',work:['12 + 5 = 17.','17 × 2 = 34.','The perimeter is 34 yards.'],a:'34 yd'}},
 area:{g:4,title:'Area',terms:[['Area','How many squares cover the inside of a shape.'],['Square unit','A square that is 1 unit on each side, like 1 square yard.']],
  steps:['Find the length and the width.','Multiply them.','Write the answer in square units.'],
  ex:{q:'A rectangle 8 yards long and 6 yards wide',work:['8 × 6 = 48.','The area is 48 square yards.'],a:'48 sq yd'}},
 angle:{g:4,title:'Angles on a straight line',terms:[['Angle','The space between two lines that meet, measured in degrees (°).'],['Straight angle','A straight line makes 180°.'],['Right angle','A square corner. It is 90°.']],
  steps:['Two angles that make a straight line add up to 180°.','Subtract the angle you know from 180.'],
  ex:{q:'One angle is 65°. What is the other?',work:['180 − 65 = 115.','The other angle is 115°.'],a:'115°'}},
 factor:{g:4,title:'Factors',terms:[['Factor','A number that divides into another number evenly, with no remainder.']],
  steps:['Try dividing the big number by each choice.','If it divides evenly (no remainder), it is a factor.','Tip: think of multiplication facts. 6 × 6 = 36, so 6 is a factor of 36.'],
  ex:{q:'Is 4 a factor of 36?',work:['36 ÷ 4 = 9 with no remainder.','Yes, 4 is a factor of 36.'],a:'Yes'}},
 word:{g:3,title:'Word problems',terms:[['Key words','Clues that tell you what to do: “in all” or “total” often means add or multiply; “left” or “how many more” often means subtract; “each” or “shared equally” often means divide.']],
  steps:['Read the whole problem slowly.','Find the numbers and what they stand for.','Decide what to do: add, subtract, multiply or divide. Some problems need two steps.','Solve, then reread the question to check your answer makes sense.'],
  ex:{q:'3 touchdowns worth 7 points each and 2 field goals worth 3 points each',work:['Touchdowns: 3 × 7 = 21.','Field goals: 2 × 3 = 6.','Total: 21 + 6 = 27 points.'],a:'27'}}};

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

function lessonHTML(k){const L=LESSONS[k]||LESSONS.word;
  return`<div class="lesson"><div class="eyebrow">Grade ${L.g} · Learn</div><h2>${L.title}</h2>
    <div class="lsec"><h3>Words to know</h3><dl>${L.terms.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div>
    <div class="lsec"><h3>How to do it</h3><ol>${L.steps.map(x=>`<li>${x}</li>`).join('')}</ol></div>
    <div class="lsec lex"><h3>Example: ${L.ex.q}</h3>${L.ex.work.map(x=>`<p>${x}</p>`).join('')}<div class="lans">Answer: <b>${L.ex.a}</b></div></div></div>`}
function openLesson(k,back){sfx.tap();modal(`${lessonHTML(k)}<div class="row">${back?'<button class="btn blue" data-act="lib">All lessons</button>':''}<button class="btn go" style="font-size:20px;padding:12px 22px" data-act="close">Got it!</button></div>`,{lib:openLibrary},true)}
function openLibrary(){sfx.tap();const keys=Object.keys(LESSONS);
  modal(`<h2>Learn math</h2><p class="note">Tap a topic to see what the words mean, how to solve it, and an example. You can also tap <b>Learn how</b> on any question during a game.</p>
   ${[3,4,5].map(g=>`<div class="libgrp"><h3>Grade ${g}</h3><div class="libgrid">${keys.filter(k=>LESSONS[k].g===g).map(k=>`<button class="libbtn" data-act="open" data-k="${k}">${LESSONS[k].title}</button>`).join('')}</div></div>`).join('')}
   <div class="row"><button class="btn" data-act="close">Close</button></div>`,{open:b=>openLesson(b.dataset.k,true)},true)}

/* hook the Learn how button into every question and add a Learn math button on the home screens */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#learnq');if(b&&Q&&Q.p){openLesson(lessonFor(Q.p))}
  const l=e.target.closest&&e.target.closest('#tolearn');if(l)openLibrary()});

/* ---------- Grade 5 lessons ---------- */
Object.assign(LESSONS,{
 m2d:{g:5,title:'Multiplying by a 2-digit number',terms:[['Partial products','Break one number into tens and ones, multiply by each part, then add the answers.']],
  steps:['Break the 2-digit number into tens and ones: 26 is 20 + 6.','Multiply the big number by the tens part.','Multiply the big number by the ones part.','Add the two answers together.'],
  ex:{q:'234 × 26',work:['234 × 20 = 4,680.','234 × 6 = 1,404.','4,680 + 1,404 = 6,084.'],a:'6,084'}},
 longdiv:{g:5,title:'Dividing by a 2-digit number',terms:[['Estimate','Make a smart guess using friendly numbers.'],['Quotient','The answer to a division problem.']],
  steps:['Round the divisor to a friendly number to make a guess.','Multiply your guess by the real divisor to check it.','Too big? Guess smaller. Too small? Guess bigger.','When it matches exactly, that is your quotient.'],
  ex:{q:'672 ÷ 24',work:['24 is close to 25, and 25 × 27 = 675, so try about 27 or 28.','24 × 28 = 672. It matches!','So 672 ÷ 24 = 28.'],a:'28'}},
 decadd:{g:5,title:'Adding and subtracting decimals',terms:[['Decimal point','The dot that separates whole numbers from parts of a whole.']],
  steps:['Line up the decimal points, one above the other.','Fill empty places with zeros if you need to.','Add or subtract just like whole numbers, regrouping when needed.','Bring the decimal point straight down into your answer.'],
  ex:{q:'8.53 + 8.79',work:['Hundredths: 3 + 9 = 12. Write 2, carry 1.','Tenths: 5 + 7 + 1 = 13. Write 3, carry 1.','Ones: 8 + 8 + 1 = 17.','Answer: 17.32.'],a:'17.32'}},
 pow10:{g:5,title:'Multiplying by 10, 100 and 1,000',terms:[['Power of ten','Numbers like 10, 100 and 1,000.']],
  steps:['Count the zeros: 10 has one, 100 has two, 1,000 has three.','Move the decimal point that many places to the right.','Fill any empty places with zeros.'],
  ex:{q:'3.4 × 100',work:['100 has two zeros, so move the decimal point 2 places right.','3.4 → 34. → 340.','So 3.4 × 100 = 340.'],a:'340'}},
 dmul:{g:5,title:'Multiplying a decimal by a whole number',terms:[['Decimal place','Each digit to the right of the decimal point.']],
  steps:['Ignore the decimal point and multiply like whole numbers.','Count how many digits were after the decimal point.','Put the decimal point back so your answer has that many digits after it.'],
  ex:{q:'7.8 × 6',work:['78 × 6 = 468.','7.8 had 1 digit after the decimal point.','So the answer is 46.8.'],a:'46.8'}},
 ooo:{g:5,title:'Order of operations',terms:[['Parentheses ( )','Do what is inside these first.'],['Brackets [ ]','Like parentheses, but they can hold parentheses inside.'],['Order','First ( ) and [ ], then × and ÷ from left to right, then + and − from left to right.']],
  steps:['Work inside the innermost parentheses first.','Then finish what is inside the brackets.','Next do multiplication and division.','Last do addition and subtraction.'],
  ex:{q:'4 × [3 + (9 − 5)]',work:['Parentheses: 9 − 5 = 4.','Brackets: 3 + 4 = 7.','Multiply: 4 × 7 = 28.'],a:'28'}},
 dplace:{g:5,title:'Decimal place value',terms:[['Tenths','First place after the decimal point.'],['Hundredths','Second place after the decimal point.'],['Thousandths','Third place after the decimal point.']],
  steps:['Find the decimal point.','Count places to the right: tenths, hundredths, thousandths.','The digit’s value is the digit with that place name.'],
  ex:{q:'In 8.324, what is the 2 worth?',work:['3 is in the tenths place.','2 is in the hundredths place.','So the 2 is worth 2 hundredths.'],a:'2 hundredths'}},
 funlike:{g:5,title:'Adding fractions with different denominators',terms:[['Common denominator','A bottom number that both fractions can share.']],
  steps:['Find a common denominator: a number both bottoms divide into (multiplying the two bottoms always works).','Rename each fraction so it has that bottom number. Multiply the top by the same amount.','Add or subtract the tops.','Simplify if you can.'],
  ex:{q:'1/2 + 1/5',work:['A common denominator is 10.','1/2 = 5/10 and 1/5 = 2/10.','5/10 + 2/10 = 7/10.'],a:'7/10'}},
 fmul:{g:5,title:'Multiplying fractions',terms:[['Simplify','Divide the top and bottom by the same number to make the fraction smaller and easier.']],
  steps:['Multiply the top numbers.','Multiply the bottom numbers.','Simplify the answer if you can.'],
  ex:{q:'2/3 × 3/4',work:['Tops: 2 × 3 = 6.','Bottoms: 3 × 4 = 12.','6/12 simplifies to 1/2.'],a:'1/2'}},
 fdiv:{g:5,title:'Dividing with unit fractions',terms:[['Unit fraction','A fraction with 1 on top, like 1/4.']],
  steps:['A unit fraction ÷ a whole number: split the piece into that many smaller pieces. Multiply the bottom by the whole number.','A whole number ÷ a unit fraction: ask how many pieces fit. Multiply the whole number by the bottom.'],
  ex:{q:'1/6 ÷ 2 and 3 ÷ 1/4',work:['1/6 ÷ 2: the bottom becomes 6 × 2 = 12, so 1/12.','3 ÷ 1/4: each whole holds 4 fourths, so 3 × 4 = 12.'],a:'1/12 and 12'}},
 volume:{g:5,title:'Volume',terms:[['Volume','How much space is inside a 3-D shape, like a box.'],['Cubic unit','A cube that is 1 unit on each side.']],
  steps:['Find the length, width and height.','Multiply them: length × width × height.','For a shape made of two boxes, find each volume and add them.','Write the answer in cubic units.'],
  ex:{q:'A box 7 cm × 9 cm × 5 cm',work:['7 × 9 = 63.','63 × 5 = 315.','Volume: 315 cubic centimeters.'],a:'315 cu cm'}},
 exp:{g:5,title:'Powers of ten',terms:[['Exponent','The small raised number. It tells how many times to multiply 10 by itself.']],
  steps:['10² means 10 × 10 = 100. 10³ means 10 × 10 × 10 = 1,000.','The exponent is the number of zeros.','For 6 × 10², write 6 and add 2 zeros.'],
  ex:{q:'6 × 10²',work:['10² = 100.','6 × 100 = 600.'],a:'600'}}});
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


const TOPIC_PAGES=[['blood-pressure.html','Blood Pressure','bloodPressure'],['diabetes.html','Diabetes & A1C','diabetes'],['cholesterol.html','Cholesterol','cholesterol'],['gut-health.html','Gut Health','gutHealth'],['weight-joints.html','Weight & Joint Health','weightJoints'],['kidney-health.html','Kidney Health','kidneyHealth'],['bone-health.html','Bone Health','boneHealth'],['liver-health.html','Liver Health','liverHealth']];
const PAGES=[['index.html','Home','home'],['lifestyle.html','Lifestyle & Weight','lifestyle'],...TOPIC_PAGES,['resources.html','Sources','resources']];
const TOPIC_IMAGES={bloodPressure:['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=82','Home blood pressure cuff and healthy lifestyle'],diabetes:['https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=82','Preparing a meal with vegetables and whole foods'],cholesterol:['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=82','Colorful vegetables and healthy foods'],gutHealth:['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=82','Fiber-rich salad with vegetables'],weightJoints:['https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=82','Person walking outdoors for physical activity'],kidneyHealth:['https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=82','Balanced whole-food meal'],boneHealth:['https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=82','Calcium-rich dairy food'],liverHealth:['https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1000&q=82','Healthy whole-food meal with vegetables']};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const safeUrl=u=>{try{let x=new URL(u,location.href);return ['http:','https:'].includes(x.protocol)?x.href:'#'}catch{return '#'}};
async function getContent(){let r=await fetch('data/content.json');if(!r.ok)throw Error('content');return r.json()}
function header(c,page){const topicActive=TOPIC_PAGES.some(p=>p[2]===page);return `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><span class="brand-mark">N</span><span>${esc(c.site.title)}</span></a><button class="menu-btn" aria-label="Open menu" onclick="document.querySelector('.site-nav').classList.toggle('open')">☰</button><nav class="site-nav"><a href="index.html" class="${page==='home'?'active':''}">Home</a><details class="nav-dropdown ${topicActive?'active':''}"><summary>How Your Diet Affects Your Health</summary><div class="nav-dropdown-menu">${TOPIC_PAGES.map(p=>`<a href="${p[0]}" class="${page===p[2]?'active':''}">${p[1]}</a>`).join('')}</div></details><a href="lifestyle.html#weight-loss-plan" class="${page==='lifestyle'?'active':''}">Weight Loss</a><a href="lifestyle.html#calorie-calculator">Calorie Calculator</a><a href="lifestyle.html#shopping-tools">Helpful Tools</a><a href="resources.html" class="${page==='resources'?'active':''}">Sources</a></nav></div></header>`}
function footer(c){return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" style="color:white" href="index.html"><span class="brand-mark">N</span>${esc(c.site.title)}</a><p>${esc(c.site.about)}</p><span class="reviewed">Content reviewed: ${esc(c.site.reviewed)}</span></div><div class="footer-links"><a href="lifestyle.html#weight-loss-plan">Weight Loss</a><a href="lifestyle.html#calorie-calculator">Calorie Calculator</a><a href="lifestyle.html#shopping-tools">Helpful Tools</a>${TOPIC_PAGES.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}<a href="resources.html">Sources</a></div></div><div class="disclaimer"><b>Educational information, not medical advice.</b> Nutrition needs change with medications, pregnancy, allergies, kidney or liver disease, eating disorders, and other medical conditions. Use this site to prepare questions for your healthcare professional or registered dietitian — not to replace individualized care.</div></div></footer>`}
function renderHome(c){document.querySelector('#hero-title').textContent=c.home.heroTitle;document.querySelector('#hero-subtitle').textContent=c.home.heroSubtitle;document.querySelector('#topics').innerHTML=c.home.topics.map(t=>`<a class="topic-card" href="${t.link}"><span class="topic-icon">${t.icon}</span><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><span>Explore topic →</span></a>`).join('')}
function renderTopic(t){
 const page=document.body.dataset.page;
 document.querySelector('#topic-kicker').textContent=t.kicker;
 document.querySelector('#topic-title').textContent=t.pageTitle;
 document.querySelector('#topic-intro').textContent=t.intro;
 const img=TOPIC_IMAGES[page]; if(img){const n=document.querySelector('#topic-image');n.src=img[0];n.alt=img[1]}
 if(t.warning){let n=document.querySelector('#notice');n.hidden=false;n.innerHTML='<b>Important:</b> '+esc(t.warning)}
 const startGrid=document.querySelector('#start-grid'); if(startGrid) startGrid.innerHTML=t.actions.slice(0,3).map((x,i)=>`<article class="start-card"><span>${i+1}</span><p>${esc(x)}</p></article>`).join('');
 document.querySelector('#why-grid').innerHTML=t.why.map(x=>`<article class="evidence-card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><a class="source-link" href="${safeUrl(x.url)}" target="_blank" rel="noopener">See source ↗</a></article>`).join('');
 document.querySelector('#steps').innerHTML=t.actions.map(x=>`<div class="step"><div>${esc(x)}</div></div>`).join('');
 document.querySelector('#foods').innerHTML=t.foods.map((x,i)=>`<div class="food-box ${i===0?'food-choose':'food-limit'}"><div class="food-box-label">${i===0?'Choose more often':'Be more mindful of'}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div>`).join('');
 document.querySelector('#references').innerHTML=t.references.map(x=>`<div class="reference"><a href="${safeUrl(x.url)}" target="_blank" rel="noopener">${esc(x.title)} ↗</a><span class="badge">${esc(x.type)}</span></div>`).join('')
}
function renderResources(c){document.querySelector('#resource-groups').innerHTML=c.resources.categories.map(cat=>`<section style="padding:28px 0"><div class="section-heading"><h2>${esc(cat.name)}</h2></div><div class="resources-grid">${cat.links.map(x=>`<article class="resource-card"><h3><a href="${safeUrl(x.url)}" target="_blank" rel="noopener">${esc(x.title)} ↗</a></h3><p>${esc(x.description)}</p></article>`).join('')}</div></section>`).join('')}
document.addEventListener('DOMContentLoaded',async()=>{let page=document.body.dataset.page,c=await getContent();document.querySelector('#site-header').innerHTML=header(c,page);document.querySelector('#site-footer').innerHTML=footer(c);if(page==='home')renderHome(c);else if(page==='resources')renderResources(c);else renderTopic(c.topics[page]);});

function initCalorieCalculator(){
 const form=document.querySelector('#calorie-form'); if(!form)return;
 form.addEventListener('submit',e=>{e.preventDefault();
  const sex=document.querySelector('#sex').value, age=+document.querySelector('#age').value, ft=+document.querySelector('#feet').value, inch=+document.querySelector('#inches').value, lb=+document.querySelector('#weight').value, act=+document.querySelector('#activity').value;
  const out=document.querySelector('#calc-results');
  if(age<18||age>100||ft<4||ft>7||inch<0||inch>11||lb<80||lb>700){out.innerHTML='<p>Please check the values entered.</p>';return}
  const cm=(ft*12+inch)*2.54, kg=lb*0.453592;
  const bmr=10*kg+6.25*cm-5*age+(sex==='male'?5:-161);
  const maint=Math.round(bmr*act/10)*10;
  const rawTarget=maint-500;
  const floor=sex==='male'?1500:1200;
  const target=Math.max(rawTarget,floor);
  const pct5=Math.round(lb*.05), pct10=Math.round(lb*.10);
  const limited=rawTarget<floor;
  out.innerHTML=`<div class="result-grid"><div><small>Estimated maintenance</small><strong>${maint.toLocaleString()}</strong><span>cal/day</span></div><div><small>Example weight-loss target</small><strong>${target.toLocaleString()}</strong><span>cal/day</span></div></div><p class="result-note">A 5–10% first weight-loss goal for ${Math.round(lb)} lb is about <b>${pct5}–${pct10} lb</b>. ${limited?'A 500-calorie deficit would fall below a commonly used guideline range, so the calculator capped the example target. Consider individualized guidance from a clinician or dietitian.':'The example target uses an approximately 500-calorie/day deficit. Actual needs can differ.'}</p>`;
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initCalorieCalculator);else initCalorieCalculator();

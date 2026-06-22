document.querySelector('.hero').id='home';
var typedHero=document.getElementById('typedHero');
var heroPhrase=typedHero.dataset.text;
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){typedHero.textContent=heroPhrase;}
else{
  var typeIndex=0;
  (function typeHero(){
    typedHero.textContent=heroPhrase.slice(0,typeIndex++);
    if(typeIndex<=heroPhrase.length)setTimeout(typeHero,typeIndex<10?78:58);
  })();
}

function navigateWithFade(hash){
  if(!hash)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){location.hash=hash;return;}
  document.body.classList.add('page-changing');
  setTimeout(function(){
    location.hash=hash;
    setTimeout(function(){document.body.classList.remove('page-changing')},130);
  },300);
}

document.addEventListener('click',function(e){
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  var link=e.target.closest('a[href^="#"]');
  if(!link)return;
  var hash=link.getAttribute('href');
  if(!hash||hash==='#')return;
  e.preventDefault();
  navigateWithFade(hash);
});

function updatePageView(){
  var hash=location.hash||'#home';
  var contactMode=hash.indexOf('#contact')===0;
  var portfolioMode=hash==='#projects';
  var projectMatch=hash.match(/^#project-(\d+)$/);
  document.body.classList.toggle('contact-view',contactMode);
  document.body.classList.toggle('portfolio-view',portfolioMode);
  document.body.classList.toggle('project-view',Boolean(projectMatch));
  if(projectMatch)renderProject(Number(projectMatch[1])-1);
  if(contactMode||portfolioMode||projectMatch){window.scrollTo({top:0,behavior:'smooth'});}
  else if(hash==='#home'||hash==='#portfolio'){
    requestAnimationFrame(function(){var target=document.querySelector(hash);if(target)target.scrollIntoView({behavior:'smooth'})});
  }
}
window.addEventListener('hashchange',updatePageView);
var hc=document.getElementById('heroContent');
window.addEventListener('scroll',function(){
  var y=window.scrollY;
  hc.style.transform='scale('+Math.max(.85,1-y/600)+')';
  hc.style.opacity=Math.max(0,1-y/450);
},{passive:true});
document.querySelectorAll('.faq-q').forEach(function(q){
  q.addEventListener('click',function(){q.parentElement.classList.toggle('open')});
});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -55px'});
document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=Math.min(i*.07,.28)+'s';io.observe(el)});

var menu=document.getElementById('menuOverlay');
var menuButtons=Array.from(document.querySelectorAll('.menu-btn'));
var activeMenuButton=menuButtons[0];
var menuClose=document.querySelector('.overlay-close');
function setMenu(open,restoreFocus){
  menu.classList.toggle('open',open);
  menu.setAttribute('aria-hidden',String(!open));
  menuButtons.forEach(function(button){button.setAttribute('aria-expanded',String(open))});
  document.body.classList.toggle('overlay-open',open);
  if(open)menuClose.focus();else if(restoreFocus!==false)activeMenuButton.focus();
}
menuButtons.forEach(function(button){button.addEventListener('click',function(){activeMenuButton=button;setMenu(true)})});
menuClose.addEventListener('click',function(){setMenu(false)});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false,false)})});

var cards=Array.from(document.querySelectorAll('.pf-card'));
var projectData=[
  {
    title:'Intern Management Application',category:'Full-Stack',color:'var(--mint)',image:'islem-portfolio-assets/intern-management.png',
    description:'A complete intern management platform with real-time dashboards, secure authentication, and database modeling.',
    stack:['Django','Java','Angular','MySQL','REST API','JWT Auth'],
    features:['Dynamic dashboard for real-time internship tracking and statistics','Secure authentication with role-based access control','Relational database model designed for scalability','Responsive Angular interface for desktop and mobile','RESTful backend services powered by Django and Java']
  },
  {
    title:'Camping Mobile Application',category:'Mobile / UI-UX',color:'var(--peach)',image:'islem-portfolio-assets/camping-mobile.png',
    description:'A geolocation-powered camping finder with interactive maps, e-commerce integration, and a carefully designed mobile experience.',
    stack:['Android Studio','Java','Google Maps API','Figma','Mobile UI/UX'],
    features:['Interactive map for discovering nearby camping locations','Geolocation-based search and route assistance','Integrated camping equipment marketplace','Detailed campsite information and saved favorites','Mobile-first interface prototyped and refined in Figma']
  },
  {
    title:'Conflict Data Analysis',category:'Data / AI',color:'var(--pink)',image:'islem-portfolio-assets/conflict-analysis.png',
    description:'An automated open-data pipeline that collects, structures, and analyzes conflict data using LLM-powered extraction and classification.',
    stack:['Python','SQLite','Web Scraping','LLMs','NLP','Data Visualization'],
    features:['Automated collection from reliable open-data sources','LLM-powered entity extraction and classification','Structured SQLite storage with a reproducible pipeline','Analytical summaries and visual reporting','Data cleaning and validation for higher-quality insights']
  },
  {
    title:'Generative AI Experiments',category:'Generative AI',color:'var(--purple)',image:'islem-portfolio-assets/generative-ai.png',
    description:'Practical experiments with GPT, prompt engineering, and agent workflows applied to useful product and automation scenarios.',
    stack:['OpenAI API','Python','Prompt Engineering','Agents','LLMs'],
    features:['Reusable prompt patterns for consistent structured output','Multi-step agent workflows for practical automation','Rapid prototypes for real product use cases','Evaluation of response quality and reliability','Human-centered experiments with responsible AI behavior']
  },
  {
    title:'Smart ERP',category:'PFE / ERP',color:'var(--gold)',image:'islem-portfolio-assets/smart-erp.png',
    description:'My final-year project: an integrated ERP platform that centralizes inventory, sales, purchasing, finance, notifications, and decision-ready business analytics.',
    stack:['Spring Boot','Angular','SQL Server','REST API','JWT','Business Intelligence'],
    features:['Unified inventory, sales, purchasing, and finance workflows','Role-based access with secure authentication','Real-time dashboards and operational KPI tracking','Automated notifications for important business events','Modular architecture designed for future business growth']
  }
];

function mockupMarkup(index){
  var top='<div class="mock-topbar"><i></i><i></i><i></i></div>';
  if(index===1)return '<div class="app-mockup phone-mock">'+top+'<div class="mock-body"><div class="mock-map"><i class="mock-pin"></i><i class="mock-pin"></i><i class="mock-pin"></i></div><div class="phone-card"></div></div></div>';
  if(index===2)return '<div class="app-mockup chart-mock">'+top+'<div class="mock-body"><div class="mock-panel"><div class="mock-bars"><i></i><i></i><i></i><i></i><i></i></div></div><div class="mock-panel"></div></div></div>';
  if(index===3)return '<div class="app-mockup ai-mock">'+top+'<div class="mock-body"><div class="ai-prompt"></div><div class="ai-node"></div><div class="ai-node"></div></div></div>';
  return '<div class="app-mockup dashboard-mock">'+top+'<div class="mock-body"><div class="mock-sidebar"></div><div class="mock-panel"></div><div class="mock-panel"></div><div class="mock-panel"></div><div class="mock-panel"></div></div></div>';
}

function renderProject(index){
  index=Math.max(0,Math.min(projectData.length-1,index));
  var data=projectData[index];
  document.getElementById('detailCategory').textContent=data.category;
  document.getElementById('detailTitle').textContent=data.title;
  document.getElementById('detailDescription').textContent=data.description;
  var showcase=document.getElementById('detailShowcase');
  showcase.style.background=data.color;
  showcase.classList.add('has-cover');
  showcase.innerHTML='<img class="detail-cover-image" src="'+data.image+'" alt="'+data.title+' interface preview">';
  document.getElementById('detailStack').innerHTML=data.stack.map(function(item){return '<span>'+item+'</span>'}).join('');
  document.getElementById('detailFeatures').innerHTML=data.features.map(function(item){return '<li>'+item+'</li>'}).join('');
}

var allProjectsGrid=document.getElementById('allProjectsGrid');
cards.forEach(function(card,index){
  var link=document.createElement('a');
  link.className='project-card-link';
  link.href='#project-'+(index+1);
  link.setAttribute('aria-label','View '+projectData[index].title+' case study');
  var clone=card.cloneNode(true);
  clone.removeAttribute('tabindex');clone.removeAttribute('role');clone.removeAttribute('aria-label');
  link.appendChild(clone);allProjectsGrid.appendChild(link);
});
updatePageView();
var projectOverlay=document.getElementById('projectOverlay');
var projectClose=document.querySelector('.project-close');
var currentProject=0;
function showProject(index){
  currentProject=(index+cards.length)%cards.length;
  var card=cards[currentProject];
  var visual=projectOverlay.querySelector('.project-visual');
  var top=card.querySelector('.pf-top');
  visual.style.background=top.style.background;
  projectOverlay.querySelector('.project-number').textContent=card.querySelector('.pf-num').textContent;
  projectOverlay.querySelector('.project-icon').innerHTML=card.querySelector('.pf-icon').innerHTML;
  document.getElementById('projectTitle').textContent=card.querySelector('h3').textContent;
  document.getElementById('projectDescription').textContent=card.querySelector('.pf-body p').textContent;
  document.getElementById('projectTags').innerHTML=card.querySelector('.pf-tags').innerHTML;
  document.getElementById('projectYear').textContent=card.querySelector('.pf-year').textContent;
  document.getElementById('projectCategory').textContent=card.querySelector('.pf-cat').textContent;
  projectOverlay.querySelector('.project-count').textContent=String(currentProject+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
  projectOverlay.classList.add('open');
  projectOverlay.setAttribute('aria-hidden','false');
  document.body.classList.add('overlay-open');
  projectClose.focus();
}
function closeProject(){
  projectOverlay.classList.remove('open');
  projectOverlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('overlay-open');
  cards[currentProject].focus();
}
cards.forEach(function(card,index){
  card.addEventListener('click',function(){navigateWithFade('#project-'+(index+1))});
  card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();navigateWithFade('#project-'+(index+1))}});
});
projectClose.addEventListener('click',closeProject);
projectOverlay.addEventListener('click',function(e){if(e.target===projectOverlay)closeProject()});
projectOverlay.querySelectorAll('.project-nav button').forEach(function(button){
  button.addEventListener('click',function(){showProject(currentProject+Number(button.dataset.direction))});
});

var contactForm=document.getElementById('contactForm');
var sendButton=contactForm.querySelector('.send-message');
var sendButtonContent=sendButton.innerHTML;
var successTitle=document.getElementById('successTitle');
var successMessage=document.getElementById('successMessage');
var sendAnother=document.getElementById('sendAnother');
var successToast=document.getElementById('successToast');
var toastTitle=document.getElementById('toastTitle');
var toastMessage=document.getElementById('toastMessage');
var toastTimer;

function showSubmissionSuccess(){
  contactForm.classList.remove('has-error');
  contactForm.classList.add('is-sent');
  successTitle.textContent='Message Sent!';
  successMessage.textContent="Thank you for reaching out. I'll get back to you within 24–48 hours.";
  sendAnother.textContent='Send Another Message';
  toastTitle.textContent='Message sent!';
  toastMessage.textContent="Thank you for reaching out. I'll get back to you soon.";
  successToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){successToast.classList.remove('show')},5200);
  contactForm.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(function(){successTitle.focus()},450);
}

function resetContactForm(){
  contactForm.reset();
  contactForm.classList.remove('is-sent','has-error');
  successToast.classList.remove('show');
  sendButton.disabled=false;
  sendButton.innerHTML=sendButtonContent;
  document.getElementById('contactName').focus();
}
sendAnother.addEventListener('click',resetContactForm);

contactForm.addEventListener('submit',async function(e){
  e.preventDefault();
  if(sendButton.disabled)return;
  contactForm.classList.remove('has-error');
  sendButton.disabled=true;
  var controller=new AbortController();
  var timeout=setTimeout(function(){controller.abort()},15000);
  var fields=Object.fromEntries(new FormData(contactForm).entries());
  try{
    var response=await fetch('https://formsubmit.co/ajax/eslemsessi179@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(fields),
      signal:controller.signal
    });
    var rawResponse=await response.text();
    var result={};
    try{result=JSON.parse(rawResponse)}catch(parseError){}
    if(!response.ok||(result.success!==true&&result.success!=='true'))throw new Error(result.message||'Message delivery failed');
    showSubmissionSuccess();
  }catch(error){
    contactForm.classList.add('has-error');
    sendButton.disabled=false;
    sendButton.innerHTML=sendButtonContent;
    var errorBox=document.getElementById('formError');
    errorBox.textContent=error.name==='AbortError'
      ? 'FormSubmit did not respond in time. Please try again.'
      : (error.message||'The message could not be delivered. Confirm FormSubmit activation, then try again.');
    errorBox.focus();
  }finally{
    clearTimeout(timeout);
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    if(projectOverlay.classList.contains('open'))closeProject();
    else if(menu.classList.contains('open'))setMenu(false);
  }
  if(projectOverlay.classList.contains('open')&&e.key==='ArrowRight')showProject(currentProject+1);
  if(projectOverlay.classList.contains('open')&&e.key==='ArrowLeft')showProject(currentProject-1);
});

/* Public WerbeTracker preview: entirely local, synthetic sample data. No API calls. */
(() => {
"use strict";
const games=[
{id:"S-010",map:"Ascent",result:"Win",score:"13 - 9",acs:214,kills:21,deaths:16,assists:6,rr:22,days:"Today",note:"Sample opening rounds and successful coordinated retakes."},
{id:"S-009",map:"Bind",result:"Loss",score:"10 - 13",acs:186,kills:17,deaths:19,assists:5,rr:-17,days:"Yesterday",note:"Sample data shows uneven outcomes across the later rounds."},
{id:"S-008",map:"Haven",result:"Win",score:"13 - 11",acs:229,kills:23,deaths:17,assists:8,rr:19,days:"2 days ago",note:"A fictional close win with several late-round recoveries."},
{id:"S-007",map:"Split",result:"Win",score:"13 - 8",acs:207,kills:19,deaths:15,assists:9,rr:20,days:"3 days ago",note:"Sample scoreline and an illustrative positive RR adjustment."},
{id:"S-006",map:"Ascent",result:"Loss",score:"9 - 13",acs:171,kills:15,deaths:20,assists:4,rr:-18,days:"4 days ago",note:"An example loss with a lower average combat score."},
{id:"S-005",map:"Bind",result:"Win",score:"13 - 7",acs:251,kills:26,deaths:14,assists:7,rr:23,days:"5 days ago",note:"An illustrative strong individual performance."},
{id:"S-004",map:"Haven",result:"Loss",score:"11 - 13",acs:196,kills:18,deaths:19,assists:7,rr:-16,days:"6 days ago",note:"Close match example; no actual round data is sourced."},
{id:"S-003",map:"Split",result:"Win",score:"13 - 10",acs:224,kills:22,deaths:18,assists:6,rr:18,days:"1 week ago",note:"An example match with a positive outcome."},
{id:"S-002",map:"Ascent",result:"Win",score:"13 - 6",acs:238,kills:24,deaths:13,assists:5,rr:25,days:"1 week ago",note:"Fictional performance and RR metrics."},
{id:"S-001",map:"Bind",result:"Loss",score:"8 - 13",acs:184,kills:16,deaths:21,assists:4,rr:-19,days:"2 weeks ago",note:"An example difficult loss; for interface testing only."}
];
const plans={
site:{title:"Coordinated site setup",desc:"Example of a prepared five-person execute with separate entries, cover and utility assignments. This canvas is abstract and does not represent a real map.",phases:[["01 / PREPARE","Agree on roles, responsibilities and utility timing before playing."],["02 / EXECUTE","Use the shared diagram as a saved preparation reference."],["03 / REVIEW","Discuss the outcome after a completed match."]]},
mid:{title:"Mid control and regroup",desc:"A neutral diagram for discussing coordinated mid control, support positions and an agreed regroup decision before the match starts.",phases:[["01 / COORDINATE","Establish the planned space-control responsibilities."],["02 / REGROUP","Review a fallback route and communication conventions beforehand."],["03 / REVIEW","Document notes after the game rather than receiving live prompts."]]},
defense:{title:"Defensive anchor rotation",desc:"A saved planning example describing holding responsibilities and rotation principles, not a live in-game tactical alert.",phases:[["01 / ASSIGN","Set defensive anchors and support responsibilities."],["02 / PREPARE","Write down pre-agreed response principles."],["03 / LEARN","Compare the planned approach with post-match data."]]}
};
const agents=[
{name:"Brimstone",role:"Controller",icon:"◉",why:"Smokes and planned support role",base:76},
{name:"Omen",role:"Controller",icon:"◇",why:"Controller coverage and map familiarity",base:74},
{name:"Sova",role:"Initiator",icon:"⌁",why:"Information-focused team preparation",base:77},
{name:"Fade",role:"Initiator",icon:"◎",why:"Initiator role complement",base:72},
{name:"Killjoy",role:"Sentinel",icon:"⛨",why:"Sentinel role and defensive preparation",base:78},
{name:"Cypher",role:"Sentinel",icon:"◇",why:"Sentinel coverage and map history",base:73},
{name:"Jett",role:"Duelist",icon:"↗",why:"Duelist role for an entry-oriented roster",base:75},
{name:"Raze",role:"Duelist",icon:"✦",why:"Duelist role and example map preference",base:71}
];
const $ = id => document.getElementById(id);
const toText = (node,content) => {node.textContent=content;};
const resultClass = g => g.result==="Win"?"win":"lose";
const rrText = g => (g.rr>0?"+":"")+g.rr+" RR";
const renderOverview = () => {
const total=games.length,wins=games.filter(g=>g.result==="Win").length;
const kills=games.reduce((s,g)=>s+g.kills,0),deaths=games.reduce((s,g)=>s+g.deaths,0);
const avg=Math.round(games.reduce((s,g)=>s+g.acs,0)/total);
$("overview-metrics").innerHTML=[
["WIN RATE",Math.round(wins/total*100)+"%","Synthetic matches"],
["AVERAGE ACS",String(avg),"Illustrative data"],
["K/D RATIO",(kills/deaths).toFixed(2),"Illustrative data"],
["MATCHES",String(total),"Sample archive"]
].map(([label,value,note])=>'<div class="metric-box"><span>'+label+'</span><strong>'+value+'</strong><small>'+note+'</small></div>').join("");
$("overview-recent").innerHTML=games.slice(0,5).map(g=>'<div class="sample-match"><b class="'+(g.result==="Win"?"w":"l")+'">'+(g.result==="Win"?"W":"L")+'</b><span>'+g.map+' · '+g.result+'<small>'+g.score+' · '+g.days+'</small></span><strong class="'+resultClass(g)+'">'+rrText(g)+'</strong></div>').join("");
const chronological=[...games].reverse();let rating=300;const points=[rating];for(const g of chronological){rating+=g.rr;points.push(rating);}
const min=Math.min(...points)-15,max=Math.max(...points)+15;
const coords=points.map((v,i)=>[12+i*536/(points.length-1),191-(v-min)/(max-min)*166]);
const line=coords.map(([x,y],i)=>(i?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)).join(" ");
const area=line+" L548 205 L12 205Z";
$("demo-chart").innerHTML='<svg viewBox="0 0 560 210" preserveAspectRatio="none" role="img" aria-label="Synthetic ranked rating progression based on fictional matches"><defs><linearGradient id="demofill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#5beddf" stop-opacity=".31"/><stop offset="1" stop-color="#5beddf" stop-opacity="0"/></linearGradient></defs><path d="M0 35H560M0 87H560M0 139H560M0 191H560" fill="none" stroke="#284151"/><path d="'+area+'" fill="url(#demofill)"/><path d="'+line+'" stroke="#5ef2df" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" fill="none"/><circle cx="'+coords[coords.length-1][0]+'" cy="'+coords[coords.length-1][1]+'" r="5" fill="#86ffef"/></svg>';
};
let selectedMatch=games[0].id;
function renderMatches(){
const map=$("map-filter").value,res=$("result-filter").value;
const filtered=games.filter(g=>(map==="all"||g.map===map)&&(res==="all"||g.result===res));
toText($("match-count"),filtered.length+" sample matches");
$("match-list").innerHTML=filtered.length?filtered.map(g=>'<button type="button" class="match-row '+(selectedMatch===g.id?"selected":"")+'" data-match="'+g.id+'"><b class="outcome '+resultClass(g)+'">'+(g.result==="Win"?"VICTORY":"DEFEAT")+'</b><span><strong>'+g.map+'</strong><small>'+g.days+' · '+g.id+'</small></span><span class="score">'+g.score+'</span><span class="acs">'+g.acs+' ACS</span><span class="rr '+resultClass(g)+'">'+rrText(g)+'</span></button>').join(""):'<p class="detail-note">No fictional matches match these filters.</p>';
const g=filtered.find(g=>g.id===selectedMatch)||filtered[0];
if(g){selectedMatch=g.id;$("match-detail").innerHTML='<div class="card-head"><b>'+g.map+' · '+g.result+'</b><span>'+g.id+' / SYNTHETIC</span></div><div class="detail-stats"><div><small>RESULT</small><b>'+g.score+'</b></div><div><small>ACS</small><b>'+g.acs+'</b></div><div><small>RANKED RATING</small><b class="'+resultClass(g)+'">'+rrText(g)+'</b></div><div><small>KILLS / DEATHS</small><b>'+g.kills+' / '+g.deaths+'</b></div><div><small>ASSISTS</small><b>'+g.assists+'</b></div><div><small>MAP</small><b>'+g.map+'</b></div></div><p class="detail-note">'+g.note+' This public demo does not contain actual player or round records.</p>';}
else{$("match-detail").innerHTML='<div class="card-head"><b>Round detail</b><span>NO MATCH SELECTED</span></div><p>No examples to show for this filter.</p>';}
}
const escapeText=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function renderDraft(){
const role=$("draft-role").value,map=$("draft-map").value;
const m={Ascent:2,Haven:0,Bind:3,Split:1}[map];
const choices=agents.filter(a=>role==="All"||a.role===role).map((a,i)=>({...a,fit:a.base+((i*3+m*5)%9)-4})).sort((a,b)=>b.fit-a.fit).slice(0,role==="All"?3:2);
$("draft-cards").innerHTML=choices.map(a=>'<article class="draft-card"><span class="role-label">'+a.role.toUpperCase()+' · EXAMPLE</span><div class="agent-mark">'+escapeText(a.icon)+'</div><h3>'+escapeText(a.name)+'</h3><p>Real VALORANT agent name, represented by a generic symbol rather than game artwork.</p><div class="fit">'+a.fit+' / 100 illustrative fit</div><div class="explain"><b>Sample reasoning</b><br>'+escapeText(a.why)+' on '+escapeText(map)+'. In the real application, suitability must be based on actual authorized archive evidence.</div></article>').join("");
}
function renderPlan(){
const plan=plans[$("plan-select").value];
toText($("plan-title"),plan.title);toText($("plan-description"),plan.desc);
$("plan-phases").innerHTML=plan.phases.map(([title,description])=>'<div><b>'+escapeText(title)+'</b>'+escapeText(description)+'</div>').join("");
}
function openTab(name){
document.querySelectorAll(".tab-button").forEach(b=>{const active=b.dataset.tab===name;b.classList.toggle("active",active);if(active)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");});
document.querySelectorAll(".demo-pane").forEach(p=>{const active=p.id==="pane-"+name;p.hidden=!active;p.classList.toggle("visible",active);});
if(name==="matches")renderMatches();if(name==="draft")renderDraft();if(name==="strategy")renderPlan();
}
document.querySelectorAll("[data-tab]").forEach(button=>button.addEventListener("click",()=>openTab(button.dataset.tab)));
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>openTab(button.dataset.go)));
$("map-filter").addEventListener("change",renderMatches);$("result-filter").addEventListener("change",renderMatches);
$("clear-filters").addEventListener("click",()=>{$("map-filter").value="all";$("result-filter").value="all";selectedMatch=games[0].id;renderMatches();});
$("match-list").addEventListener("click",event=>{const button=event.target.closest("button[data-match]");if(button){selectedMatch=button.dataset.match;renderMatches();}});
$("draft-map").addEventListener("change",renderDraft);$("draft-role").addEventListener("change",renderDraft);
$("plan-select").addEventListener("change",renderPlan);
renderOverview();renderMatches();renderDraft();renderPlan();
})();
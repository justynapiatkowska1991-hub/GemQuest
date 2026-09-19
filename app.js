const status=document.getElementById("status");
const title=document.getElementById("title");
const idea=document.getElementById("idea");

const duration=document.getElementById("duration");
const format=document.getElementById("format");
const style=document.getElementById("style");

function sceneCount(value){
  if(value.includes("30")) return 3;
  if(value.includes("1 minuta")) return 5;
  if(value.includes("3 minuty")) return 8;
  if(value.includes("5 minut")) return 12;
  return 20;
}

function buildScenes(project){
  const count=sceneCount(project.duration);
  const locations=["dom","ulica","kawiarnia","park","pociąg","las","mieszkanie","punkt widokowy"];
  return Array.from({length:count},(_,i)=>({
    number:i+1,
    title:"Scena "+(i+1),
    duration:Math.max(5,Math.round((project.duration.includes("sekund")?30:60)/count)),
    visual:"Filmowy kadr w stylu "+project.style.toLowerCase()+". "+project.idea,
    location:locations[i%locations.length],
    camera:i%3===0?"zbliżenie":i%3===1?"ujęcie szerokie":"kamera podążająca",
    emotion:i%2===0?"spokój i nadzieja":"napięcie i ciekawość",
    dialogue:"Dialog zostanie wygenerowany przez silnik AI.",
    sound:"Naturalne dźwięki otoczenia + delikatna muzyka filmowa."
  }));
}

function renderScript(project){
  const scenes=buildScenes(project);
  let box=document.getElementById("scriptBox");
  if(!box){
    box=document.createElement("section");
    box.id="scriptBox";
    box.className="script-box";
    document.querySelector(".content").appendChild(box);
  }
  box.innerHTML="<div class='script-head'><div><span class='eyebrow'>ETAP 1 GOTOWY</span><h2>📝 Scenariusz i sceny</h2><p>To jest robocza wersja. W następnym etapie podłączymy prawdziwy model AI.</p></div><button id='saveScript' class='small-btn'>💾 Zapisz</button></div>"+
    "<div class='scene-list'>"+scenes.map(s=>"<article class='scene'><div class='scene-number'>"+String(s.number).padStart(2,"0")+"</div><div><h3>"+s.title+" <span>"+s.duration+" s</span></h3><p><b>Obraz:</b> "+s.visual+"</p><p><b>Miejsce:</b> "+s.location+" · <b>Kamera:</b> "+s.camera+"</p><p><b>Emocja:</b> "+s.emotion+"</p><p><b>Dialog:</b> "+s.dialogue+"</p><p><b>Dźwięk:</b> "+s.sound+"</p></div></article>").join("")+"</div>";
  document.getElementById("saveScript").onclick=()=>{localStorage.setItem("aiFilmScript",JSON.stringify({project,scenes}));status.textContent="💾 Scenariusz zapisany w tym urządzeniu.";};
  box.scrollIntoView({behavior:"smooth",block:"start"});
}

document.getElementById("generate").addEventListener("click",()=>{
  const name=title.value.trim()||"Nowy film";
  const text=idea.value.trim();
  if(!text){status.textContent="✍️ Najpierw wpisz pomysł na film.";idea.focus();return}
  const project={title:name,idea:text,duration:duration.value,format:format.value,style:style.value};
  localStorage.setItem("aiFilmProject",JSON.stringify(project));
  status.textContent="✨ Tworzę strukturę filmu...";
  setTimeout(()=>{status.textContent="🎬 Scenariusz roboczy gotowy.";renderScript(project)},500);
});

document.getElementById("newProject").addEventListener("click",()=>{
  title.value="";idea.value="";status.textContent="Gotowe. Czekam na Twój pomysł.";
  document.getElementById("scriptBox")?.remove();title.focus();
});
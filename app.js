const status=document.getElementById("status");
const title=document.getElementById("title");
const idea=document.getElementById("idea");

document.getElementById("generate").addEventListener("click",()=>{
  const name=title.value.trim()||"Nowy film";
  const text=idea.value.trim();
  if(!text){status.textContent="✍️ Najpierw wpisz pomysł na film.";idea.focus();return}
  status.textContent="✨ Projekt „"+name+"” został przygotowany. Następny etap: generator scenariusza AI.";
  localStorage.setItem("aiFilmProject",JSON.stringify({
    title:name,
    idea:text,
    duration:document.getElementById("duration").value,
    format:document.getElementById("format").value,
    style:document.getElementById("style").value
  }));
});

document.getElementById("newProject").addEventListener("click",()=>{
  title.value="";idea.value="";status.textContent="Gotowe. Czekam na Twój pomysł.";title.focus();
});

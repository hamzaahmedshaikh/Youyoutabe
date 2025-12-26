const videos=[
{
title:"JavaScript Interview Questions 2025",
description:"Most asked JavaScript interview questions",
channel:"Muhammad Hasan Dev",
views:"317K views",
time:"1 year ago",
category:"coding",
thumb:"https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
},
{
title:"Breaking News Pakistan",
description:"Latest political updates",
channel:"Dunya News",
views:"12K views",
time:"2 hours ago",
category:"news",
thumb:"https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg"
},
{
title:"Podcast: Reality Talks",
description:"Deep discussion podcast",
channel:"Hajira Umer",
views:"98K views",
time:"3 days ago",
category:"podcast",
thumb:"https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg"
}
]

const grid=document.getElementById("videoGrid")
const searchInput=document.getElementById("searchInput")
const chips=document.querySelectorAll(".chip")

function render(list){
grid.innerHTML=""
list.forEach(v=>{
const el=document.createElement("div")
el.className="card"
el.innerHTML=`
<img src="${v.thumb}">
<div class="info">
<img src="profile.jpg">
<div class="text">
<h4>${v.title}</h4>
<p>${v.channel}</p>
<p>${v.views} • ${v.time}</p>
</div>
</div>
`
grid.appendChild(el)
})
}

render(videos)

searchInput.addEventListener("input",()=>{
const q=searchInput.value.toLowerCase()
render(videos.filter(v=>
v.title.toLowerCase().includes(q) ||
v.description.toLowerCase().includes(q)
))
})

chips.forEach(chip=>{
chip.addEventListener("click",()=>{
chips.forEach(c=>c.classList.remove("active"))
chip.classList.add("active")
const cat=chip.dataset.category
render(cat==="all"?videos:videos.filter(v=>v.category===cat))
})
})

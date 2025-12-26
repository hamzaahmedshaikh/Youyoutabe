const videos=[
{
title:"JavaScript Interview Questions 2025",
description:"Most asked JavaScript interview questions",
channel:"Muhammad Hasan Dev",
views:"317K views",
time:"1 year ago",
duration:"1:35:43",
category:"coding",
thumb:"https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
},
{
title:"Full Stack Developer Roadmap",
description:"Step by step full stack roadmap",
channel:"Muhammad Hasan Dev",
views:"210K views",
time:"8 months ago",
duration:"42:11",
category:"coding",
thumb:"https://i.ytimg.com/vi/9He4UBLyk8Y/maxresdefault.jpg"
},
{
title:"Advanced JavaScript Concepts",
description:"Closures, hoisting, async explained",
channel:"Muhammad Hasan Dev",
views:"180K views",
time:"5 months ago",
duration:"58:22",
category:"coding",
thumb:"https://i.ytimg.com/vi/PoRJizFvM7s/maxresdefault.jpg"
},
{
title:"Breaking News Pakistan",
description:"Latest political updates",
channel:"Dunya News",
views:"12K views",
time:"2 hours ago",
duration:"8:36",
category:"news",
thumb:"https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg"
},
{
title:"PIA Privatized Successfully",
description:"Shocking news for Pakistan",
channel:"24 News HD",
views:"678 views",
time:"1 hour ago",
duration:"12:24",
category:"news",
thumb:"https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
},
{
title:"Reality Talk Podcast",
description:"Deep discussion on society",
channel:"Hajira Umer",
views:"98K views",
time:"3 days ago",
duration:"1:54:11",
category:"podcast",
thumb:"https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg"
},
{
title:"Indian Pop Mix",
description:"Trending Indian pop songs",
channel:"YouTube Mix",
views:"1.2M views",
time:"1 week ago",
duration:"2:15:00",
category:"music",
thumb:"https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
},
{
title:"Coding Motivation",
description:"Why you should learn programming",
channel:"Muhammad Hasan Dev",
views:"54K views",
time:"2 weeks ago",
duration:"15:40",
category:"coding",
thumb:"https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
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
<div class="thumb-wrap">
<img class="thumb" src="${v.thumb}">
<span class="duration">${v.duration}</span>
</div>
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

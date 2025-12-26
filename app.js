const videos=[
{title:"Top 30 JavaScript Interview Questions 2025",channel:"Intellipaat",cat:"javascript",thumb:"https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg"},
{title:"DOES GOD EXIST? Complete Video",channel:"Hajira Umer Kitchen",cat:"podcast",thumb:"https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg"},
{title:"AJ ka Horoscope | Lawyer aur Comedy",channel:"Triple Trouble",cat:"podcast",thumb:"https://i.ytimg.com/vi/9He4UBLyk8Y/maxresdefault.jpg"},
{title:"Mix – Indian Pop",channel:"YouTube Mix",cat:"music",thumb:"https://i.ytimg.com/vi/PoRJizFvM7s/maxresdefault.jpg"},
{title:"Big Arrest Late Night Headlines",channel:"Dunya News",cat:"news",thumb:"https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg"},
{title:"PIA Privatized Successfully",channel:"24 News HD",cat:"news",thumb:"https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg"}
]

const grid=document.getElementById("grid")
const search=document.getElementById("search")
const chips=document.querySelectorAll(".chip")

function render(list){
grid.innerHTML=""
list.map(v=>{
const d=document.createElement("div")
d.className="card"
d.innerHTML=`
<img src="${v.thumb}">
<div class="info">
<img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='%23333'/><text x='50%' y='55%' fill='white' font-size='90' text-anchor='middle' font-family='Arial'>M</text></svg>">
<div class="text">
<h4>${v.title}</h4>
<p>${v.channel}</p>
</div>
</div>`
grid.appendChild(d)
})
}

render(videos)

search.oninput=e=>{
const q=e.target.value.toLowerCase()
render(videos.filter(v=>v.title.toLowerCase().includes(q)))
}

chips.forEach(c=>{
c.onclick=()=>{
chips.forEach(x=>x.classList.remove("active"))
c.classList.add("active")
const k=c.dataset.cat
render(k==="all"?videos:videos.filter(v=>v.cat===k))
}
})    li.tabIndex = 0;
    li.addEventListener('click',()=>{document.querySelectorAll('.nav-cats li').forEach(n=>n.classList.remove('active'));li.classList.add('active');categorySelect.value = c;applyFilters()});
    li.addEventListener('keydown',e=>{if(e.key==='Enter'){li.click()}});
    categoryList.appendChild(li);
  });
  const first = categoryList.querySelector('li');
  if(first) first.classList.add('active');
}
function createCard(v){
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.dataset.id = v.id;
  const thumbWrap = document.createElement('div');
  thumbWrap.className = 'thumb-wrap';
  const img = document.createElement('img');
  img.className = 'thumb';
  img.loading = 'lazy';
  img.src = v.thumb;
  img.alt = v.title;
  const dur = document.createElement('div');
  dur.className = 'duration';
  dur.textContent = v.duration;
  thumbWrap.appendChild(img);
  thumbWrap.appendChild(dur);
  const meta = document.createElement('div');
  meta.className = 'meta';
  const avatar = document.createElement('img');
  avatar.className = 'avatar';
  avatar.src = 'profile.jpg';
  avatar.alt = v.channel;
  const info = document.createElement('div');
  info.className = 'info';
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = v.title;
  const channel = document.createElement('div');
  channel.className = 'channel';
  channel.textContent = `${v.channel} • ${v.views} views • ${formatDate(v.date)}`;
  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = v.desc;
  info.appendChild(title);
  info.appendChild(channel);
  info.appendChild(desc);
  meta.appendChild(avatar);
  meta.appendChild(info);
  card.appendChild(thumbWrap);
  card.appendChild(meta);
  card.addEventListener('click',()=>openPlayer(v));
  card.addEventListener('keydown',e=>{if(e.key==='Enter')openPlayer(v)});
  return card;
}
function renderGrid(items){
  videoGrid.innerHTML = '';
  if(items.length===0){
    const empty = document.createElement('div');
    empty.textContent = 'No videos found';
    empty.style.color = 'var(--muted)';
    videoGrid.appendChild(empty);
    return;
  }
  items.forEach(v=>videoGrid.appendChild(createCard(v)));
}
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categorySelect.value;
  const sort = sortSelect.value;
  let filtered = videos.filter(v=>{
    const inCat = cat==='all' || v.category===cat;
    const inQuery = q==='' || v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q);
    return inCat && inQuery;
  });
  if(sort==='newest'){filtered.sort((a,b)=>new Date(b.date)-new Date(a.date))}
  if(sort==='oldest'){filtered.sort((a,b)=>new Date(a.date)-new Date(b.date))}
  renderGrid(filtered);
}
function openPlayer(v){
  playerContent.innerHTML = '';
  const thumb = document.createElement('img');
  thumb.className = 'player-thumb';
  thumb.src = v.thumb;
  thumb.alt = v.title;
  const title = document.createElement('h2');
  title.style.marginTop = '12px';
  title.textContent = v.title;
  const meta = document.createElement('div');
  meta.className = 'meta-row';
  meta.style.marginTop = '8px';
  meta.textContent = `${v.channel} • ${v.views} views • ${formatDate(v.date)}`;
  const desc = document.createElement('p');
  desc.className = 'modal-desc';
  desc.style.marginTop = '10px';
  desc.style.color = 'var(--muted)';
  desc.textContent = v.desc;
  playerContent.appendChild(thumb);
  playerContent.appendChild(title);
  playerContent.appendChild(meta);
  playerContent.appendChild(desc);
  playerModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closePlayer(){
  playerModal.setAttribute('aria-hidden','true');
  playerContent.innerHTML = '';
  document.body.style.overflow = '';
}
closeModal.addEventListener('click',closePlayer);
playerModal.addEventListener('click',e=>{if(e.target===playerModal)closePlayer()});
searchInput.addEventListener('input',()=>applyFilters());
categorySelect.addEventListener('change',()=>applyFilters());
sortSelect.addEventListener('change',()=>applyFilters());
findBtn.addEventListener('click',()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q) return;
  const found = videos.find(v=>v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
  if(found){
    const el = document.querySelector(`.card[data-id="${found.id}"]`);
    if(el){
      el.scrollIntoView({behavior:'smooth',block:'center'});
      el.classList.add('highlight');
      setTimeout(()=>el.classList.remove('highlight'),1800);
      el.focus();
    }
  } else {
    videoGrid.innerHTML = '';
    const no = document.createElement('div');
    no.textContent = 'No match found';
    no.style.color = 'var(--muted)';
    videoGrid.appendChild(no);
  }
});
document.getElementById('clearSearch').addEventListener('click',()=>{
  searchInput.value = '';
  applyFilters();
});
function formatDate(d){
  try{
    const dt = new Date(d);
    return dt.toLocaleDateString();
  }catch(e){
    return d;
  }
}
document.getElementById('profilePic').addEventListener('error',function(){this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'});
function init(){
  populateCategories();
  renderGrid(videos);
}
init();

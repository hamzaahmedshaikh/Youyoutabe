const videos = [
{"id":"v1","title":"Modern JavaScript Patterns 2025","desc":"Practical patterns and tips for writing clean, maintainable JavaScript.","thumb":"https://images.unsplash.com/photo-1526378721641-3b9b6f7f6b1b?q=80&w=1400&auto=format&fit=crop","category":"Education","channel":"Muhammad Hasan Dev","date":"2025-06-12","views":"124K","duration":"12:34"},
{"id":"v2","title":"Build a Fast Portfolio Site","desc":"Step-by-step guide to build a blazing fast portfolio with modern tooling.","thumb":"https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1400&auto=format&fit=crop","category":"Development","channel":"Muhammad Hasan Dev","date":"2025-04-02","views":"89K","duration":"18:02"},
{"id":"v3","title":"CSS Grid & Flexbox Mastery","desc":"Combine Grid and Flexbox to create responsive layouts that scale.","thumb":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop","category":"Design","channel":"Design Lab","date":"2024-11-20","views":"210K","duration":"22:10"},
{"id":"v4","title":"Node.js Performance Checklist","desc":"Small changes that yield big performance improvements in Node.js apps.","thumb":"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400&auto=format&fit=crop","category":"Development","channel":"Server Side","date":"2025-01-15","views":"47K","duration":"9:45"},
{"id":"v5","title":"Deploy with GitHub Actions","desc":"Automate builds, tests, and deployments using GitHub Actions workflows.","thumb":"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop","category":"DevOps","channel":"CI/CD Academy","date":"2023-09-10","views":"33K","duration":"14:20"},
{"id":"v6","title":"TypeScript Tips for Teams","desc":"Type-safe patterns that help teams scale codebases without friction.","thumb":"https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop","category":"Education","channel":"Muhammad Hasan Dev","date":"2025-03-05","views":"76K","duration":"11:12"},
{"id":"v7","title":"Design Systems in Practice","desc":"How to build and maintain a design system that designers and engineers love.","thumb":"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop","category":"Design","channel":"Design Lab","date":"2024-07-22","views":"58K","duration":"27:05"},
{"id":"v8","title":"Kubernetes for Developers","desc":"A practical intro to Kubernetes concepts developers actually need.","thumb":"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop","category":"DevOps","channel":"Cloud Native","date":"2025-02-28","views":"99K","duration":"16:40"},
{"id":"v9","title":"Frontend Performance Audit","desc":"Tools and techniques to audit and improve frontend performance.","thumb":"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop","category":"Development","channel":"Performance Pro","date":"2024-12-05","views":"41K","duration":"8:50"},
{"id":"v10","title":"Accessibility Essentials","desc":"Make your web apps accessible to everyone with practical checks.","thumb":"https://images.unsplash.com/photo-1526378721641-3b9b6f7f6b1b?q=80&w=1400&auto=format&fit=crop","category":"Education","channel":"A11y Works","date":"2025-05-01","views":"66K","duration":"7:30"}
];
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const categoryList = document.getElementById('categoryList');
const findBtn = document.getElementById('findBtn');
const sortSelect = document.getElementById('sortSelect');
const playerModal = document.getElementById('playerModal');
const playerContent = document.getElementById('playerContent');
const closeModal = document.getElementById('closeModal');
function uniqueCategories(items){
  return ['all',...Array.from(new Set(items.map(i=>i.category)))];
}
function populateCategories(){
  const cats = uniqueCategories(videos);
  categorySelect.innerHTML = '';
  categoryList.innerHTML = '';
  cats.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    categorySelect.appendChild(opt);
    const li = document.createElement('li');
    li.textContent = c;
    li.dataset.cat = c;
    li.tabIndex = 0;
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

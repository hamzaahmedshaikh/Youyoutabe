const videos = [
{"id":"x1","title":"Intro to Modern JS","desc":"A concise guide to modern JavaScript patterns.","thumb":"https://via.placeholder.com/480x270?text=Video+1","category":"Education"},
{"id":"x2","title":"Build a Portfolio Site","desc":"Step-by-step portfolio build for 2025.","thumb":"https://via.placeholder.com/480x270?text=Video+2","category":"Development"},
{"id":"x3","title":"CSS Grid Deep Dive","desc":"Master CSS Grid with practical examples.","thumb":"https://via.placeholder.com/480x270?text=Video+3","category":"Design"},
{"id":"x4","title":"Node.js Performance Tips","desc":"Optimize Node.js apps for production.","thumb":"https://via.placeholder.com/480x270?text=Video+4","category":"Development"},
{"id":"x5","title":"Deploying with CI/CD","desc":"Automate deployments with modern pipelines.","thumb":"https://via.placeholder.com/480x270?text=Video+5","category":"DevOps"}
];
const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const categoryList = document.getElementById('categoryList');
function uniqueCategories(arr){return ['all',...new Set(arr.map(v=>v.category))]}
function renderCategories(){const cats=uniqueCategories(videos);categorySelect.innerHTML='';categoryList.innerHTML='';cats.forEach(c=>{const opt=document.createElement('option');opt.value=c;opt.textContent=c;categorySelect.appendChild(opt);const li=document.createElement('li');li.textContent=c;li.dataset.cat=c;li.addEventListener('click',()=>{filterByCategory(c);document.querySelectorAll('.sidebar li').forEach(n=>n.classList.remove('active'));li.classList.add('active')});categoryList.appendChild(li)})}
function renderGrid(items){videoGrid.innerHTML='';items.map(v=>{const card=document.createElement('div');card.className='card';card.innerHTML=`<img class="thumb" src="${v.thumb}" alt=""><div class="meta"><div class="title">${v.title}</div><div class="desc">${v.desc}</div></div>`;videoGrid.appendChild(card)})}
function filterByCategory(cat){const q=searchInput.value.trim().toLowerCase();let filtered=videos.filter(v=> (cat==='all'||v.category===cat) && (v.title.toLowerCase().includes(q)||v.desc.toLowerCase().includes(q)));renderGrid(filtered)}
searchInput.addEventListener('input',()=>filterByCategory(categorySelect.value))
categorySelect.addEventListener('change',e=>filterByCategory(e.target.value))
renderCategories()
renderGrid(videos)
document.getElementById('profilePic').addEventListener('error',()=>{document.getElementById('profilePic').src='https://via.placeholder.com/80'})
  

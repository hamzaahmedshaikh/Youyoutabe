const videos = [
  {
    title: "Create a Website in Just 12 Minutes Using Pure HTML | Beginner-Friendly Tutorial",
    description: "Most asked JavaScript interview questions",
    channel: "Muhammad Hasan Dev",
    views: "207 views",
    time: "8 monts ago",
    duration: "1:35:43",
    category: "coding",
    thumb: "hoverimg2.png",
    hoverThumb: "v2.png"
  },
  {
    title: "Build a Resume Website Using Only HTML | Step-by-Step Tutorial for Beginners",
    description: "Step by step roadmap for full stack developers",
    channel: "Muhammad Hasan Dev",
    views: "284 views",
    time: "11 months ago",
    duration: "42:11",
    category: "coding",
    thumb: "v3.jpg",
    hoverThumb: "hoverimg.png"
  },
  {
    title: "How JavaScript Runs | Event Loop, Task Queue, Microtask Queue, Promises & Async/Await",
    description: "Is video mein hum JavaScript ke behind the scenes concepts ko step-by-step aur simple language mein samjhenge. Agar aap JavaScript, React, ya MERN Stack seekh rahe ho, to ye video aap ke liye must watch hai. Is session mein hum cover karenge",
    channel: "Muhammad Hasan Dev",
    views: "72 views",
    time: "8 days ago",
    duration: "1:46:52",
    category: "coding",
    thumb: "hoverimg3.png",
    hoverThumb: "v1.png"
  },
  {
    title: "Breaking News Pakistan",
    description: "Latest political updates from Pakistan",
    channel: "Dunya News",
    views: "12K views",
    time: "2 hours ago",
    duration: "8:36",
    category: "news",
    thumb: "https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg"
  },
  {
    title: "PIA Privatized Successfully",
    description: "Major breaking news and analysis",
    channel: "24 News HD",
    views: "678 views",
    time: "1 hour ago",
    duration: "12:24",
    category: "news",
    thumb: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
  },
  {
    title: "Reality Talk Podcast",
    description: "Deep discussion on society and culture",
    channel: "Hajira Umer",
    views: "98K views",
    time: "3 days ago",
    duration: "1:54:11",
    category: "podcast",
    thumb: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg"
  },
  {
    title: "Indian Pop Mix",
    description: "Trending Indian pop songs playlist",
    channel: "YouTube Mix",
    views: "1.2M views",
    time: "1 week ago",
    duration: "2:15:00",
    category: "music",
    thumb: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
  },
  {
    title: "Coding Motivation",
    description: "Why learning programming will change your life",
    channel: "Muhammad Hasan Dev",
    views: "54K views",
    time: "2 weeks ago",
    duration: "15:40",
    category: "coding",
    thumb: "https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
  }
]

const grid = document.getElementById("videoGrid")
const searchInput = document.getElementById("searchInput")
const chips = document.querySelectorAll(".chip")

let activeCategory = "all"

function renderVideos(list) {
  grid.innerHTML = ""

  list.forEach(video => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <div class="thumb-wrap">
        <img class="thumb" src="${video.thumb}">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="info">
        <img src="profile.jpg">
        <div class="text">
          <h4>${video.title}</h4>
          <p>${video.channel}</p>
          <p>${video.views} • ${video.time}</p>
        </div>
      </div>
    `

   
    if (video.hoverThumb) {
      const img = card.querySelector(".thumb")
      const original = video.thumb

      
      new Image().src = video.hoverThumb

      img.addEventListener("mouseenter", () => {
        img.src = video.hoverThumb
      })

      img.addEventListener("mouseleave", () => {
        img.src = original
      })
    }

    grid.appendChild(card)
  })
}

function applyFilters() {
  const query = searchInput.value.toLowerCase()

  const filtered = videos.filter(video => {
    const matchesCategory =
      activeCategory === "all" || video.category === activeCategory

    const matchesSearch =
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  renderVideos(filtered)
}

renderVideos(videos)

searchInput.addEventListener("input", applyFilters)

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"))
    chip.classList.add("active")
    activeCategory = chip.dataset.category
    applyFilters()
  })
})

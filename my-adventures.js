const TOURS = [
  {
    id: 1,
    name: "Tri-Island Tour + Corregidor Island",
    location: "Guyam, Naked, Daku & Corregidor Island",
    desc: "Explore Siargao’s most iconic island-hopping spots with a scenic stop at Corregidor Island.",
    longDesc:
      "Experience Siargao’s most iconic island-hopping adventure as you explore the pristine shores of Guyam Island, the unique sandbar of Naked Island, and the crystal-clear waters of Daku Island. Cap off your journey with a visit to Corregidor Island, known for its rolling hills, breathtaking panoramic views, and tranquil atmosphere perfect for nature lovers and photography enthusiasts.",
    price: 1999,
    duration: "Full Day",
    groupSize: "2–12",
    category: "Island",
    emoji: "🏝️",
    image: "public/corregidor.jpg",
    includes: ["Boat transfers", "Guide", "Entrance fees", "Lunch"],
    accent: "#2e9e4f",
    accentDk: "#1a5e30",
  },
  {
    id: 2,
    name: "Tri-Island Tour + Secret Island",
    location: "Guyam, Naked, Daku & Secret Island",
    desc: "Discover Siargao’s classic island-hopping route with a hidden tropical escape.",
    longDesc:
      "Discover the beauty of Siargao’s famous island-hopping destinations, including the palm-fringed Guyam Island, the picturesque Naked Island sandbar, and the vibrant waters surrounding Daku Island. Complete your tropical escape with a visit to Secret Island, a hidden paradise during high tide that offers stunning coastal scenery away from the crowds.",
    price: 1299,
    duration: "Full Day",
    groupSize: "2–15",
    category: "Island",
    emoji: "⛵",
    image: "public/secret-island.jpg",
    includes: ["Boat transfers", "Guide", "Lunch", "Entrance fees"],
    accent: "#00897b",
    accentDk: "#00574b",
  },
  {
    id: 3,
    name: "South Land Tour + Sugba Lagoon",
    location: "Magpupungko, Sugba Lagoon, Maasin River & More",
    desc: "See Siargao’s southern wonders from rock pools to coconut-lined viewpoints.",
    longDesc:
      "Embark on an unforgettable journey through Siargao’s southern wonders. Swim in the natural pools of Magpupungko Rock Pools, paddle across the emerald waters of Sugba Lagoon, and marvel at the famous bent palm tree along Maasin River. This tour also takes you to Secret Beach, Coconut Road + Coconut Mountain View, and other scenic spots that showcase the island’s breathtaking landscapes and laid-back charm.",
    price: 1799,
    duration: "Full Day",
    groupSize: "2–15",
    category: "Adventure",
    emoji: "🌴",
    image: "public/sugba-lagoon.jpg",
    includes: ["Van transfer", "Guide", "Entrance fees", "Lunch"],
    accent: "#7b3fa0",
    accentDk: "#4a1a6a",
  },
  {
    id: 4,
    name: "North Land Tour",
    location: "Alegria, Pacifico, Pasikon, Trogon’s Perch & More",
    desc: "Explore Siargao’s northern side with beaches, caves, waterfalls, and scenic viewpoints.",
    longDesc:
      "Explore the less-traveled northern side of Siargao and uncover its hidden gems. From the serene shores of Alegria Beach, Pacifico Beach, and Pasikon Beach to the stunning viewpoints of Trogon’s Perch and Million Dollar View, this tour offers a perfect blend of nature, adventure, and relaxation. Visit Taktak waterfalls, Danjug caves, coastal Little Hawaii lookouts, and picturesque beaches while enjoying the authentic countryside atmosphere of Siargao.",
    price: 2800,
    duration: "Full Day",
    groupSize: "2 pax",
    category: "Land Tour",
    emoji: "🛵",
    image: "public/north-land.webp",
    includes: ["Transport", "Guide", "Entrance fees", "Refreshments"],
    accent: "#1976d2",
    accentDk: "#0d47a1",
  },
  {
    id: 5,
    name: "Sohoton Adventure by WOW Siargao",
    location: "Sohoton Cove, Bucas Grande",
    desc: "A magical adventure through jellyfish sanctuaries and enchanting caves.",
    longDesc:
      "Set sail on an extraordinary adventure to Sohoton Cove, one of the most breathtaking natural attractions in the region. Swim in the Stringless Jellyfish Sanctuary, venture into the enchanting Hagukan and Luminous Caves, and enjoy the pristine beauty of Tiktikan Resort and its surrounding waters. This tour is perfect for travelers seeking a mix of adventure, exploration, and unforgettable natural wonders.",
    price: 2499,
    duration: "Full Day",
    groupSize: "2–10",
    category: "Nature",
    emoji: "🌊",
    image: "public/sohoton-1.webp",
    includes: ["Boat transfer", "Guide", "Lunch", "Entrance fees"],
    accent: "#2e9e4f",
    accentDk: "#1a5e30",
  },
  {
    id: 6,
    name: "Sohoton Bucas Grande Tour",
    location: "Sohoton Cove, Hagukan Cave, Tiktikan Lake & Socorro Island",
    desc: "An island-hopping escape through the best sights of Bucas Grande.",
    longDesc:
      "Experience the best of Bucas Grande on an unforgettable island-hopping adventure. Cruise through the spectacular Sohoton Cove, explore the mystical Hagukan Cave, and admire the tranquil beauty of Tiktikan Lake. Encounter the famous stingless jellyfish in the Jellyfish Sanctuary, brave the exhilarating Dragon Slide and Diving Cave, and enjoy the picturesque landscapes of Socorro Island for a day filled with adventure and natural wonders.",
    price: 2499,
    duration: "Full Day",
    groupSize: "2–12",
    category: "Island",
    emoji: "🏝️",
    image: "public/sohoton-2.jpg",
    includes: ["Boat transfers", "Guide", "Lunch", "Entrance fees"],
    accent: "#00897b",
    accentDk: "#00574b",
  },
  {
    id: 7,
    name: "Sohoton Tour",
    location: "Sohoton Cove, Tiktikan Lake, Hagukan, Bolitas & Crystal Caves",
    desc: "Discover Sohoton’s caves, lagoons, jellyfish sanctuary, and peaceful resort views.",
    longDesc:
      "Discover the hidden treasures of Sohoton Cove through a journey of caves, lagoons, and pristine waters. From the tranquil Tiktikan Lake and the renowned Jellyfish Sanctuary to the awe-inspiring Hagukan, Bolitas, Crystal, and Diving Caves, every stop offers a unique glimpse into the area's natural beauty. End the day at Club Tara, surrounded by breathtaking scenery and the peaceful charm of Bucas Grande.",
    price: 2799,
    duration: "Full Day",
    groupSize: "2–10",
    category: "Nature",
    emoji: "🦑",
    image: "public/sohoton-3.jpg",
    includes: ["Boat transfer", "Guide", "Lunch", "Entrance fees"],
    accent: "#558b2f",
    accentDk: "#33691e",
  },
];

const STAR_LABELS = ["", "Poor", "Okay", "Good", "Great", "Amazing!"];

let activeFilter = "all";
let ratingBookingId = null;
let selectedStars = 0;

function normalizeRatings(data) {
  const out = {};
  if (!data || typeof data !== "object") return out;

  for (const [key, value] of Object.entries(data)) {
    const stars = Number(value?.stars ?? value?.rating_value ?? 0);
    out[key] = {
      stars,
      comment: value?.comment ?? value?.review ?? "",
      ratedAt: value?.ratedAt ?? value?.rated_at ?? "",
    };
  }

  return out;
}

function getTourRatingStats(tourId, bookings, ratings) {
  const relatedBookings = bookings.filter(
    (b) => Number(b.tourId) === Number(tourId),
  );

  const stars = relatedBookings
    .map((b) => Number(ratings[b.bookingId]?.stars || 0))
    .filter((s) => s > 0);

  const count = stars.length;
  const avg = count ? stars.reduce((a, b) => a + b, 0) / count : 0;

  return {
    count,
    avg,
    label: count ? `${avg.toFixed(1)} ★ (${count})` : "NO RATING YET",
  };
}

function getAllTourRatingStats(bookings, ratings) {
  const stats = {};
  for (const t of TOURS) {
    stats[t.id] = getTourRatingStats(t.id, bookings, ratings);
  }
  return stats;
}

async function apiGetJson(url) {
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed GET ${url}:`, err);
    return null;
  }
}

async function apiPostForm(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams(body).toString(),
    });
    return await res.json();
  } catch (err) {
    console.error(`Failed POST ${url}:`, err);
    return { success: false };
  }
}

async function getBookings() {
  const data = await apiGetJson("api/bookings_list.php");
  return Array.isArray(data) ? data : [];
}

async function getRatings() {
  const data = await apiGetJson("api/ratings_list.php");
  return normalizeRatings(data);
}

async function saveRating(bookingId, stars, comment) {
  return apiPostForm("api/ratings_save.php", {
    bookingId,
    stars,
    comment,
  });
}

async function cancelBookingRequest(bookingId) {
  return apiPostForm("api/bookings_delete.php", {
    bookingId,
  });
}

function isFinished(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  return d < today;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

async function render() {
  const content = document.getElementById("content");
  const statsEl = document.getElementById("stats");
  const tabsEl = document.getElementById("filterTabs");

  if (!content || !statsEl || !tabsEl) return;

  const bookings = await getBookings();
  const ratings = await getRatings();
  const tourStats = getAllTourRatingStats(bookings, ratings);

  const withStatus = bookings.map((b) => ({
    ...b,
    finished: isFinished(b.date),
  }));

  const ongoing = withStatus.filter((b) => !b.finished);
  const finished = withStatus.filter((b) => b.finished);
  const ratedCount = Object.keys(ratings).length;

  if (bookings.length > 0) {
    const avgAcrossRated = Object.values(ratings)
      .map((r) => Number(r?.stars || 0))
      .filter((n) => n > 0);

    const avgOverall = avgAcrossRated.length
      ? (
          avgAcrossRated.reduce((a, b) => a + b, 0) / avgAcrossRated.length
        ).toFixed(1)
      : "0.0";

    statsEl.innerHTML = [
      { lbl: "TOTAL BOOKED", val: bookings.length, col: "var(--ink)" },
      { lbl: "ONGOING", val: ongoing.length, col: "var(--green)" },
      { lbl: "FINISHED", val: finished.length, col: "var(--brown)" },
      { lbl: "AVG RATING", val: avgOverall, col: "var(--yellow)" },
      {
        lbl: "RATED",
        val: `${ratedCount}/${finished.length}`,
        col: "var(--yellow)",
      },
    ]
      .map(
        (s) =>
          `<div class="stat"><div class="stat-lbl">${s.lbl}</div><div class="stat-val" style="color:${s.col}">${s.val}</div></div>`,
      )
      .join("");
  } else {
    statsEl.innerHTML = "";
  }

  const tabs = [
    { key: "all", lbl: "ALL QUESTS", cnt: bookings.length, cls: "active-all" },
    {
      key: "ongoing",
      lbl: "ONGOING",
      cnt: ongoing.length,
      cls: "active-ongoing",
    },
    {
      key: "finished",
      lbl: "FINISHED",
      cnt: finished.length,
      cls: "active-finished",
    },
  ];

  if (bookings.length > 0) {
    tabsEl.innerHTML = tabs
      .map(
        (t) =>
          `<button class="filter-tab ${activeFilter === t.key ? t.cls : ""}" onclick="setFilter('${t.key}')">${t.lbl} (${t.cnt})</button>`,
      )
      .join("");
  } else {
    tabsEl.innerHTML = "";
  }

  const displayed =
    activeFilter === "ongoing"
      ? ongoing
      : activeFilter === "finished"
        ? finished
        : withStatus;

  if (bookings.length === 0) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">
          <img src="public/island.png" alt="Map" class="empty-icon">
        </div>
        <div class="empty-text">
          NO ADVENTURES YET!<br>
          <span style="font-size:.42rem">BOOK A TOUR TO GET STARTED</span>
        </div>
        <a href="tours.html" style="padding:10px 24px;background:var(--green);outline:4px solid var(--gdk);box-shadow:4px 4px 0 var(--gdk);font-family:var(--px);font-size:.5rem;color:#fff;border:none;cursor:pointer;letter-spacing:.05em;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .1s" onmouseover="this.style.transform='translate(-2px,-2px)'" onmouseout="this.style.transform=''">EXPLORE TOURS</a>
      </div>`;
    return;
  }

  if (displayed.length === 0) {
    const msg =
      activeFilter === "ongoing"
        ? '🌿<br>NO ONGOING TOURS<br><span style="font-size:.4rem">ALL DONE FOR NOW!</span>'
        : '🏆<br>NO FINISHED TOURS YET<br><span style="font-size:.4rem">YOUR ADVENTURES AWAIT!</span>';

    content.innerHTML = `<div class="empty-state"><div class="empty-emoji"></div><div class="empty-text">${msg}</div></div>`;
    return;
  }

  content.innerHTML = `<div class="grid">${displayed
    .map((b, i) => cardHTML(b, ratings, i, tourStats))
    .join("")}</div>`;
}

function cardHTML(b, ratings, i, tourStats = {}) {
  const t = TOURS.find((x) => x.id == b.tourId);
  if (!t) return "";

  const r = ratings[b.bookingId];
  const tourRating = tourStats[t.id] || {
    count: 0,
    avg: 0,
    label: "NO RATING YET",
  };

  let ratingHTML = "";
  if (b.finished) {
    if (r) {
      const stars = Number(r.stars || 0);
      ratingHTML = `<div class="rating-box" style="outline:2px solid ${t.accent};box-shadow:2px 2px 0 ${t.accentDk};background:var(--ground)">
        <div class="rtg-header">
          <div class="rtg-stars" style="color:${t.accent}">YOUR RATING: ${"★".repeat(stars)}${"☆".repeat(5 - stars)}</div>
          <div class="rtg-date">${r.ratedAt || ""}</div>
        </div>
        ${r.comment ? `<div class="rtg-comment">"${r.comment}"</div>` : ""}
        <button class="pxbtn sm" style="align-self:flex-start;background:var(--ground);outline-color:var(--blt);box-shadow:2px 2px 0 var(--blt);color:var(--dim);margin-top:4px" onclick="openRating(${b.bookingId})">EDIT RATING</button>
      </div>`;
    } else {
      ratingHTML = `<div class="no-rating-box">
        <div class="no-rtg-lbl">★ NO RATING YET</div>
        <p class="no-rtg-p">How was your adventure? Share your experience!</p>
        <button class="pxbtn sm" style="align-self:flex-start;background:var(--yellow);outline-color:var(--brown);box-shadow:3px 3px 0 var(--brown);color:var(--ink)" onclick="openRating(${b.bookingId})">RATE THIS TOUR</button>
      </div>`;
    }
  } else {
    ratingHTML = `<div class="upcoming-box">
      <div class="upcoming-lbl">🌿 UPCOMING ADVENTURE</div>
      <p class="upcoming-p">Get ready! Your guide will contact you 24 hours before your tour date.</p>
      <div class="upcoming-note">RATING AVAILABLE AFTER TOUR</div>
      <button class="pxbtn sm" style="align-self:flex-start;background:#c95d4f;outline-color:#7f2e26;box-shadow:3px 3px 0 #7f2e26;color:#fff;margin-top:6px" onclick="cancelBooking(${b.bookingId})">CANCEL BOOKING</button>
    </div>`;
  }

  return `<div class="adv-card" style="--dl:${i * 0.06}s">
    <div class="card-img">
      <img src="${t.image}" alt="${t.name}" loading="lazy" style="filter:${b.finished ? "saturate(1.1)" : "saturate(1.3) brightness(1.05)"}"/>
      <div class="scanlines"></div><div class="grad"></div>
      <div class="ref-badge">${b.refCode}</div>
      <div class="card-name-overlay">
        <div class="ov-name">${t.name}</div>
        <div class="ov-loc">📍 ${t.location.toUpperCase()}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="chips">
        <div class="chip">📅 ${b.date}</div>
        <div class="chip">👥 ${b.guests} GUEST${b.guests > 1 ? "S" : ""}</div>
        <div class="chip">⏱ ${t.duration}</div>
      </div>
      <div class="paid-row">
        <span class="paid-lbl">TOTAL PAID</span>
        <span class="paid-val">₱${Number(b.totalPaid || 0).toLocaleString()}</span>
      </div>
      <div class="avg-rating-row" style="display:flex;justify-content:space-between;gap:8px;align-items:center;padding:10px 12px;margin-top:8px;border:2px solid ${t.accent};background:rgba(255,255,255,.35);font-family:var(--px);font-size:.42rem;letter-spacing:.05em">
        <span style="color:var(--dim)">AVG RATING</span>
        <span style="color:${t.accent}">${tourRating.label}</span>
      </div>
      <div class="divider-dash"></div>
      ${ratingHTML}
    </div>
  </div>`;
}

function setFilter(f) {
  activeFilter = f;
  render();
}

async function cancelBooking(bookingId) {
  const confirmed = window.confirm(
    "Cancel this booking? This will permanently remove it from your adventure list.",
  );

  if (!confirmed) return;

  const result = await cancelBookingRequest(bookingId);

  if (!result?.success) {
    alert(result?.message || "Unable to cancel this booking right now.");
    return;
  }

  await render();
}

async function openRating(bookingId) {
  ratingBookingId = Number(bookingId);
  selectedStars = 0;

  const bookings = await getBookings();
  const booking = bookings.find(
    (b) => Number(b.bookingId) === Number(bookingId),
  );
  if (!booking) {
    alert("Booking not found.");
    return;
  }

  const t = TOURS.find((x) => Number(x.id) === Number(booking.tourId));
  if (!t) {
    alert("Tour not found.");
    return;
  }

  const ratings = await getRatings();
  const existing = ratings[bookingId];

  if (existing) selectedStars = Number(existing.stars || 0);

  const ratingStats = getTourRatingStats(t.id, bookings, ratings);

  const rateTourName = document.getElementById("rateTourName");
  const rateHdr = document.getElementById("rateHdr");
  const rateComment = document.getElementById("rateComment");
  const rateForm = document.getElementById("rateForm");
  const rateDone = document.getElementById("rateDone");
  const rateBd = document.getElementById("rateBd");

  if (
    !rateTourName ||
    !rateHdr ||
    !rateComment ||
    !rateForm ||
    !rateDone ||
    !rateBd
  )
    return;

  rateHdr.style.background = t.accent;
  rateHdr.style.borderBottomColor = t.accentDk;
  rateComment.value = existing?.comment || "";
  rateForm.classList.remove("hidden");
  rateDone.classList.add("hidden");
  buildStars();
  rateBd.classList.add("open");
  document.body.style.overflow = "hidden";
}

function buildStars() {
  const picker = document.getElementById("starPicker");
  if (!picker) return;

  picker.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (s) =>
        `<button class="star-btn ${s <= selectedStars ? "on" : ""}" onclick="pickStar(${s})" type="button">⭐</button>`,
    )
    .join("");

  updateStarLbl();

  const submitBtn = document.getElementById("submitRtgBtn");
  if (!submitBtn) return;

  submitBtn.disabled = !selectedStars;

  if (selectedStars) {
    submitBtn.style.background = "var(--yellow)";
    submitBtn.style.outlineColor = "var(--brown)";
    submitBtn.style.boxShadow = "4px 4px 0 var(--brown)";
    submitBtn.style.color = "var(--ink)";
  }
}

function pickStar(s) {
  selectedStars = s;

  document.querySelectorAll(".star-btn").forEach((b, i) => {
    b.classList.toggle("on", i < s);
  });

  updateStarLbl();

  const submitBtn = document.getElementById("submitRtgBtn");
  if (!submitBtn) return;

  submitBtn.disabled = false;
  submitBtn.style.background = "var(--yellow)";
  submitBtn.style.outlineColor = "var(--brown)";
  submitBtn.style.boxShadow = "4px 4px 0 var(--brown)";
  submitBtn.style.color = "var(--ink)";
}

function updateStarLbl() {
  const lbl = document.getElementById("starLbl");
  if (!lbl) return;

  lbl.textContent = STAR_LABELS[selectedStars] || "TAP TO RATE";
  lbl.style.color = selectedStars ? "var(--green)" : "var(--dim)";
}

async function submitRating() {
  if (!selectedStars || !ratingBookingId) return;

  const commentEl = document.getElementById("rateComment");
  const doneText = document.getElementById("doneText");
  const rateForm = document.getElementById("rateForm");
  const rateDone = document.getElementById("rateDone");
  const xpFill = document.getElementById("xpFill");

  const comment = commentEl ? commentEl.value.trim() : "";

  try {
    const ratings = await getRatings();
    const existing = ratings[ratingBookingId];

    await saveRating(ratingBookingId, selectedStars, comment);

    if (rateForm) rateForm.classList.add("hidden");
    if (rateDone) rateDone.classList.remove("hidden");
    if (doneText)
      doneText.textContent = existing ? "RATING UPDATED!" : "RATING SAVED!";

    setTimeout(() => {
      if (xpFill) xpFill.style.width = "100%";
    }, 50);

    setTimeout(() => {
      closeRating();
      render();
    }, 2300);
  } catch (err) {
    console.error(err);
    alert("Could not save rating.");
  }
}

function closeRating() {
  const rateBd = document.getElementById("rateBd");
  if (rateBd) rateBd.classList.remove("open");
  document.body.style.overflow = "";
}

function handleBd(e) {
  const rateBd = document.getElementById("rateBd");
  if (rateBd && e.target === rateBd) closeRating();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRating();
});

document.addEventListener("DOMContentLoaded", () => {
  render();
});

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

const CATS = ["All", "Island", "Adventure", "Nature", "Land Tour"];
const STAR_LABELS = ["", "Poor", "Okay", "Good", "Great", "Amazing!"];

let activeCat = "All";
let curTour = null;
let curStep = 0;
let guests = 2;
let refCode = "";
let selectedStars = 0;
let ratingBookingId = null;

function starsHTML(r) {
  return [1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<span class="px-star ${i <= Math.round(r) ? "on" : "off"}">${
          i <= Math.round(r) ? "★" : "☆"
        }</span>`,
    )
    .join("");
}

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

async function saveBooking(data) {
  return apiPostForm("api/bookings_save.php", data);
}

function getTourRatingStats(tourId, bookings, ratings) {
  const tourBookings = bookings.filter(
    (b) => Number(b.tourId) === Number(tourId),
  );

  const rated = tourBookings.map((b) => ratings[b.bookingId]).filter(Boolean);
  const count = rated.length;
  const avg = count
    ? rated.reduce((sum, r) => sum + Number(r.stars || 0), 0) / count
    : 0;

  return { avg, count };
}

function formatRatingSummary(stats) {
  if (!stats.count) return "No ratings yet";
  return `${stats.avg.toFixed(1)} ★ · ${stats.count} rating${
    stats.count === 1 ? "" : "s"
  }`;
}

function isFinished(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  return d < today;
}

function init() {
  $("#dateIn").attr("min", new Date().toISOString().split("T")[0]);

  const catRow = $("#catRow");
  catRow.empty();

  CATS.forEach((c) => {
    const b = $('<button type="button"></button>');
    b.addClass("cat-btn");
    if (c === "All") b.addClass("active");
    b.text(c.toUpperCase());
    b.attr("data-cat", c);
    catRow.append(b);
  });

  renderAll();
}

async function renderAll() {
  try {
    const q = ($("#searchInput").val() || "").toLowerCase();
    const bookings = await getBookings();
    const ratings = await getRatings();

    const list = TOURS.filter(
      (t) =>
        (activeCat === "All" || t.category === activeCat) &&
        (t.name.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q)),
    );

    const statsByTour = {};
    TOURS.forEach((t) => {
      statsByTour[t.id] = getTourRatingStats(t.id, bookings, ratings);
    });

    $("#resultCount").text(
      ` ${list.length} QUEST${list.length !== 1 ? "S" : ""} FOUND`,
    );

    const mqBtn = $("#myQuestsBtn");
    mqBtn.text(
      `MY QUESTS${bookings.length > 0 ? " (" + bookings.length + ")" : ""}`,
    );

    const grid = $("#grid");
    if (!list.length) {
      grid.html(
        `<div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;gap:12px;padding:5rem 1rem;font-family:var(--px);font-size:.48rem;color:var(--dim);letter-spacing:.08em;text-align:center;line-height:2.5"><div style="font-size:3rem">🌿</div>NO QUESTS FOUND<br>TRY ANOTHER SEARCH!</div>`,
      );
      return;
    }

    grid.html(
      list
        .map((t, i) => {
          const stats = statsByTour[t.id];
          const avgTxt = stats.count ? stats.avg.toFixed(1) : "0.0";
          const rateTxt = `${stats.count} RATE${stats.count === 1 ? "" : "S"}`;

          return `
            <div
              class="card tour-card"
              data-tour-id="${t.id}"
              style="
                --accent:${t.accent};
              "
            >
              <div class="card-img">
                <img src="${t.image}" alt="${t.name}" loading="lazy"/>
                <div class="scanlines"></div><div class="grad"></div>
                <div class="card-cat" style="background:${t.accent};outline-color:${t.accentDk}">${t.category.toUpperCase()}</div>
                <div class="card-rtg">${avgTxt}</div>
                <div class="card-loc">
                  <img src="public/location.png" class="loc-icon" alt="Location" />
                  ${t.location.toUpperCase()}
                </div>
              </div>
              <div class="card-body">
                <div class="card-name" style="color:${t.accent}">${t.name}</div>
                <p class="card-desc">${t.desc}</p>
                <div class="px-stars">${starsHTML(stats.count ? stats.avg : 0)}</div>
                <div class="chips">
                  <div class="chip">${t.duration}</div>
                  <div class="chip">${t.groupSize} pax</div>
                  <div class="chip">${avgTxt}</div>
                  <div class="chip">${rateTxt}</div>
                </div>
                <div class="divider-dash"></div>
                <div class="card-footer">
                  <div>
                    <div class="price-from">FROM</div>
                    <div class="price-val">₱${t.price.toLocaleString()}</div>
                    <div class="price-per">/PERSON</div>
                  </div>
                  <button type="button" class="pxbtn sm book-btn" data-tour-id="${t.id}" style="background:${t.accent};outline-color:${t.accentDk};box-shadow:3px 3px 0 ${t.accentDk};color:#fff">BOOK</button>
                </div>
              </div>
            </div>
          `;
        })
        .join(""),
    );
  } catch (err) {
    console.error("renderAll error:", err);
    $("#grid").html(
      `<div style="grid-column:1/-1;">Failed to load tours.</div>`,
    );
  }
}

async function renderMyQuests() {
  try {
    const bookings = await getBookings();
    const ratings = await getRatings();

    const quests = bookings
      .map((b) => {
        const tour = TOURS.find((t) => Number(t.id) === Number(b.tourId));
        if (!tour) return null;

        const rating = ratings[b.bookingId] || null;
        return { ...tour, ...b, rating };
      })
      .filter(Boolean);

    const html = quests.length
      ? quests
          .map(
            (q) => `
              <div class="card tour-card">
                <div class="card-body">
                  <div class="card-name">${q.name}</div>
                  <p class="card-desc">${q.location}</p>
                  <div>Guests: ${q.guests}</div>
                  <div>Date: ${q.date}</div>
                  <div>Total: ₱${Number(q.totalPaid).toLocaleString()}</div>
                  <div>Ref: ${q.refCode}</div>

                  ${
                    q.rating
                      ? `<div class="user-rtg-box">
                           <div class="user-rtg-stars">
                             YOUR RATING: ${"★".repeat(q.rating.stars)}${"☆".repeat(5 - q.rating.stars)}
                           </div>
                           ${
                             q.rating.comment
                               ? `<div class="user-rtg-comment">"${q.rating.comment.slice(0, 50)}${q.rating.comment.length > 50 ? "…" : ""}"</div>`
                               : ""
                           }
                         </div>`
                      : `<button type="button" class="pxbtn sm rate-btn" data-booking-id="${q.bookingId}">RATE</button>`
                  }
                </div>
              </div>
            `,
          )
          .join("")
      : `<div>No quests found.</div>`;

    $("#grid").html(html);
  } catch (err) {
    console.error("renderMyQuests error:", err);
    $("#grid").html(
      `<div style="grid-column:1/-1;">Failed to load bookings.</div>`,
    );
  }
}

async function openBooking(id) {
  curTour = TOURS.find((t) => Number(t.id) === Number(id));
  if (!curTour) return;

  curStep = 0;
  guests = 2;
  refCode = "SDN-" + Math.random().toString(36).toUpperCase().slice(2, 10);

  $("#dateIn").attr("min", new Date().toISOString().split("T")[0]);
  $("#s0img").attr("src", curTour.image).attr("alt", curTour.name);
  $("#s0name").text(curTour.name.toUpperCase()).css("color", curTour.accent);
  $("#s0desc").text(curTour.longDesc);
  const bookings = await getBookings();
  const ratings = await getRatings();

  const stats = getTourRatingStats(curTour.id, bookings, ratings);

  $("#s0stars").html(starsHTML(stats.avg));

  $("#s0rev").text(
    stats.count
      ? `${stats.avg.toFixed(1)} ★ • ${stats.count} review${stats.count > 1 ? "s" : ""}`
      : "No reviews yet",
  );
  $("#s0dur").text(`⏱ ${curTour.duration}`);
  $("#s0incl").html(
    curTour.includes
      .map(
        (i) => `<div class="incl-item"><div class="incl-dot"></div>${i}</div>`,
      )
      .join(""),
  );
  $("#guestNote").text(`MAX ${curTour.groupSize}`);
  $("#guestVal").text("2");
  $("#dateIn").val("");
  $("#cardNum").val("");
  $("#cardHolder").val("");
  $("#cardExp").val("");
  $("#cardCvv").val("");
  $("#cvNum").text("•••• •••• •••• ••••");
  $("#cvHolder").text("YOUR NAME");
  $("#cvExp").text("MM/YY");

  const cv = $("#cardVis");
  cv.css(
    "background",
    `linear-gradient(135deg,${curTour.accent},${curTour.accentDk})`,
  );
  cv.css("outline-color", curTour.accentDk);

  updateModal();
  openModal("bookBd");
}

function grand() {
  const s = curTour.price * guests;
  return s + Math.round(s * 0.12);
}

function renderPriceBox(elId, short = false) {
  if (!curTour) return;

  const sub = curTour.price * guests;
  const tax = Math.round(sub * 0.12);
  const g = sub + tax;
  const date = $("#dateIn").val() || "—";
  const el = $("#" + elId);

  if (short) {
    el.html(`
      <div class="pr"><span class="l">${
        curTour.name.length > 20
          ? curTour.name.slice(0, 20) + "…"
          : curTour.name
      }</span><span class="v"></span></div>
      <div class="pr"><span class="l">${guests} GUEST${guests > 1 ? "S" : ""} · ${date}</span><span class="v b" style="color:${curTour.accent}">₱${g.toLocaleString()}</span></div>
    `);
  } else {
    el.html(`
      <div class="pr"><span class="l">₱${curTour.price.toLocaleString()} × ${guests} GUEST${guests > 1 ? "S" : ""}</span><span class="v">₱${sub.toLocaleString()}</span></div>
      <div class="pr"><span class="l m">TAX (12%)</span><span class="v">₱${tax.toLocaleString()}</span></div>
      <div class="pr-div"></div>
      <div class="pr"><span class="l">TOTAL</span><span class="v b" style="color:${curTour.accent}">₱${g.toLocaleString()}</span></div>
    `);
  }
}

function updateModal() {
  $(".step").each(function (i) {
    $(this).toggleClass("active", i === curStep);
  });

  const pct = ((curStep + 1) / 4) * 100;
  $("#bookProg")
    .css("width", pct + "%")
    .css("background", `linear-gradient(90deg,${curTour.accent},#a3cc52)`);

  $("#bookHdr")
    .css("background", curTour.accent)
    .css("border-bottom-color", curTour.accentDk);

  const confirmed = curStep === 3;
  $("#stepLbl").text(confirmed ? "CONFIRMED!" : `STEP ${curStep + 1}/4`);

  const titles = {
    0: "TOUR INFO",
    1: "SCHEDULE",
    2: "PAYMENT",
    3: "CONFIRMED!",
  };
  $("#stepTtl").text(titles[curStep]);

  $("#backBtn").toggleClass("hidden", curStep === 0 || confirmed);
  $("#bookFtr").css("display", confirmed ? "none" : "");

  const btn = $("#ctaBtn");
  $("#ctaTxt").removeClass("hidden");
  $("#ctaSpin").addClass("hidden");
  btn.prop("disabled", false);

  if (curStep === 2) {
    btn.css({
      background: "#f0c030",
      "outline-color": "#7a5230",
      "box-shadow": "4px 4px 0 #7a5230",
      color: "#1a2e1a",
    });
    $("#ctaTxt").text(`PAY ₱${grand().toLocaleString()}`);
  } else {
    btn.css({
      background: curTour.accent,
      "outline-color": curTour.accentDk,
      "box-shadow": `4px 4px 0 ${curTour.accentDk}`,
      color: "#fff",
    });
    $("#ctaTxt").text(curStep === 0 ? " BOOK NOW" : "NEXT ");
  }

  if (curStep === 1) {
    btn.prop("disabled", !$("#dateIn").val());
    renderPriceBox("pb1");
  }

  if (curStep === 2) renderPriceBox("pb2", true);
}

function validateStep() {
  if (curStep === 1) {
    $("#ctaBtn").prop("disabled", !$("#dateIn").val());
  }
}

function nextStep() {
  if (curStep === 1 && !$("#dateIn").val()) return;

  if (curStep === 2) {
    pay();
    return;
  }

  if (curStep >= 3) {
    closeModal("bookBd");
    return;
  }

  curStep++;
  updateModal();
}

function prevStep() {
  if (curStep > 0 && curStep < 3) {
    curStep--;
    updateModal();
  }
}

function chGuests(d) {
  guests = Math.max(1, Math.min(20, guests + d));
  $("#guestVal").text(guests);
  renderPriceBox("pb1");

  if (curStep === 2) {
    $("#ctaTxt").text(`PAY ₱${grand().toLocaleString()}`);
    renderPriceBox("pb2", true);
  }
}

function fmtCard(i) {
  let v = $(i)
    .val()
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

  $(i).val(v);
  $("#cvNum").text(v || "•••• •••• •••• ••••");
}

function fmtExp(i) {
  let v = $(i).val().replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);

  $(i).val(v);
  $("#cvExp").text(v || "MM/YY");
}

async function pay() {
  const btn = $("#ctaBtn");
  btn.prop("disabled", true);
  $("#ctaTxt").addClass("hidden");
  $("#ctaSpin").removeClass("hidden");

  try {
    const g = grand();
    const date = $("#dateIn").val();

    await saveBooking({
      tourId: curTour.id,
      guests,
      date,
      totalPaid: g,
      refCode,
      bookedAt: new Date().toISOString(),
    });

    $("#confDetail").html(
      `<strong>${curTour.name}</strong><br>${guests} guest${guests > 1 ? "s" : ""} · ${date}`,
    );

    $("#confBox").html(
      `Your guide contacts you <strong>24 hrs before</strong> the tour. Get ready! 🌿<br><br>Head to <strong style="color:${curTour.accent}">My Quests</strong> to rate this tour after your trip.`,
    );

    $("#refCode").text(refCode).css("color", curTour.accent);

    curStep = 3;
    updateModal();
    showToast(
      `Payment of ₱${g.toLocaleString()} confirmed!`,
      `${curTour.name} · Ref: ${refCode}`,
    );

    renderAll();
  } catch (err) {
    console.error("AJAX Error:", err);
    console.log("Response:", err.responseText);
    alert(err.responseText || "Booking failed.");
  } finally {
    $("#ctaTxt").removeClass("hidden");
    $("#ctaSpin").addClass("hidden");
    btn.prop("disabled", false);
  }
}

function showToast(msg, desc = "", dur = 5000) {
  const wrap = $("#toastWrap");
  const el = $(`
    <div class="toast">
      <div><span class="toast-icon"><img src="public/success.png" alt="Success" class="toast-img"></span>${msg}</div>
      ${desc ? `<div class="toast-desc">${desc}</div>` : ""}
    </div>
  `);

  wrap.append(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.addClass("show")));

  setTimeout(() => {
    el.removeClass("show");
    setTimeout(() => el.remove(), 350);
  }, dur);
}

function openModal(id) {
  $("#" + id).addClass("open");
  $("body").css("overflow", "hidden");
}

function closeModal(id) {
  $("#" + id).removeClass("open");
  $("body").css("overflow", "");
}

function handleBd(e, id) {
  if ($(e.target).is($("#" + id))) closeModal(id);
}

async function openRating(bookingId) {
  ratingBookingId = bookingId;
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

  if (existing) selectedStars = existing.stars;

  const tourStats = getTourRatingStats(t.id, bookings, ratings);
  const summary = formatRatingSummary(tourStats);

  $("#rateTourName").html(
    `${t.emoji} ${t.name}<div style="margin-top:4px;font-size:.38rem;opacity:.9;line-height:1.3">${summary}</div>`,
  );
  $("#rateHdr").css("background", t.accent);
  $("#rateHdr").css("border-bottom-color", t.accentDk);
  $("#rateComment").val(existing?.comment || "");
  $("#rateForm").removeClass("hidden");
  $("#rateDone").addClass("hidden");
  buildStars();
  $("#rateBd").addClass("open");
  $("body").css("overflow", "hidden");
}

function buildStars() {
  const picker = $("#starPicker");
  picker.empty();

  [1, 2, 3, 4, 5].forEach((s) => {
    const b = $('<button type="button"></button>');
    b.addClass("star-btn");
    if (s <= selectedStars) b.addClass("on");
    b.text("⭐");
    b.attr("data-star", s);
    picker.append(b);
  });

  updateStarLbl();
  $("#submitRtgBtn").prop("disabled", !selectedStars);

  if (selectedStars) {
    $("#submitRtgBtn")
      .css("background", "var(--yellow)")
      .css("outline-color", "var(--brown)")
      .css("box-shadow", "4px 4px 0 var(--brown)")
      .css("color", "var(--ink)");
  }
}

function pickStar(s) {
  selectedStars = s;

  $(".star-btn").each(function (i) {
    $(this).toggleClass("on", i < s);
  });

  updateStarLbl();

  $("#submitRtgBtn")
    .prop("disabled", false)
    .css("background", "var(--yellow)")
    .css("outline-color", "var(--brown)")
    .css("box-shadow", "4px 4px 0 var(--brown)")
    .css("color", "var(--ink)");
}

function updateStarLbl() {
  const labels = ["", "Poor", "Okay", "Good", "Great", "Amazing!"];
  $("#starLbl").text(labels[selectedStars] || "TAP TO RATE");
  $("#starLbl").css("color", selectedStars ? "var(--green)" : "var(--dim)");
}

async function submitRating() {
  if (!selectedStars || !ratingBookingId) return;

  const comment = $("#rateComment").val().trim();

  try {
    const ratings = await getRatings();
    const existed = !!ratings[ratingBookingId];

    await saveRating(ratingBookingId, selectedStars, comment);

    closeRating();

    renderMyQuests();
    renderAll();

    showToast(
      existed ? "⭐ Rating Updated!" : "⭐ Rating Submitted!",
      existed
        ? "Your review has been changed."
        : "Thank you for your feedback.",
    );
  } catch (err) {
    console.error(err);
    alert("Could not save rating.");
  }
}

function closeRating() {
  $("#rateBd").removeClass("open");
  $("body").css("overflow", "");
}

$(document).ready(function () {
  init();

  $(document).on("input", "#searchInput", function () {
    renderAll();
  });

  $(document).on("click", ".cat-btn", function () {
    activeCat = $(this).data("cat");
    $(".cat-btn").removeClass("active");
    $(this).addClass("active");
    renderAll();
  });

  $(document).on("click", ".tour-card", function (e) {
    if ($(e.target).closest(".book-btn").length) return;
    openBooking($(this).data("tour-id"));
  });

  $(document).on("click", ".book-btn", function (e) {
    e.stopPropagation();
    openBooking($(this).data("tour-id"));
  });

  $(document).on("click", "#myQuestsBtn", function () {
    renderMyQuests();
  });

  $(document).on("click", ".rate-btn", function () {
    openRating($(this).data("booking-id"));
  });

  $(document).on("click", "#backBtn", function () {
    prevStep();
  });

  $(document).on("input", "#dateIn", function () {
    validateStep();
  });

  $(document).on("input", "#cardNum", function () {
    fmtCard(this);
  });

  $(document).on("input", "#cardExp", function () {
    fmtExp(this);
  });

  $(document).on("click", ".star-btn", function () {
    pickStar($(this).data("star"));
  });

  $(document).on("click", "#submitRtgBtn", function () {
    submitRating();
  });

  $(document).on("click", "#rateCloseBtn", function () {
    closeRating();
  });

  $(document).on("click", "#bookCloseBtn", function () {
    closeModal("bookBd");
  });

  $(document).on("click", "#rateBd", function (e) {
    handleBd(e, "rateBd");
  });

  $(document).on("click", "#bookBd", function (e) {
    handleBd(e, "bookBd");
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal("bookBd");
      closeRating();
    }
  });
});

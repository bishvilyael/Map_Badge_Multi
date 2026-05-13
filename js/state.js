const params = new URLSearchParams(window.location.search);
const badge = params.get("badge") || params.get("Badge") || "";

const map = L.map("map", {
  preferCanvas: true,
  maxZoom: 22
}).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 19,
  maxNativeZoom: 19
}).addTo(map);

let mapTitle = badge
  ? `מפה אישית עבור יעל # ${badge}`
  : "בחר יעל מהרשימה";

let currentTotalCount = null;
let badgePointRows = [];
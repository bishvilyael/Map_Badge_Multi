function parseBadgeDate(dateText) {
  const m = String(dateText || "").match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return 0;
  return new Date(`${m[3]}-${m[2]}-${m[1]}`).getTime();
}

function renderPlacesTable() {
  let panel = document.getElementById("placesTablePanel");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "placesTablePanel";
    panel.innerHTML = `
      <div class="places-table-header">
        <span>רשימת נקודות</span>
        <button id="placesTableToggle" type="button">הסתר</button>
      </div>
      <div id="placesTableBodyWrap">
        <table class="places-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>יעל</th>
              <th>שם</th>
              <th>מקום</th>
              <th>FB</th>
            </tr>
          </thead>
          <tbody id="placesTableBody"></tbody>
        </table>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById("placesTableToggle").onclick = function () {
      const wrap = document.getElementById("placesTableBodyWrap");
      const hidden = wrap.style.display === "none";
      wrap.style.display = hidden ? "block" : "none";
      this.textContent = hidden ? "הסתר" : "הצג";
    };
  }

  const tbody = document.getElementById("placesTableBody");
  tbody.innerHTML = "";

  const rows = [...badgePointRows].sort((a, b) => {
    return parseBadgeDate(b.date) - parseBadgeDate(a.date);
  });

  rows.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHtml(row.date || "")}</td>
      <td>${escapeHtml(row.badgeNo || "")}</td>
      <td>${escapeHtml(row.name || "")}</td>
      <td>${escapeHtml(row.place || "—")}</td>
      <td>${
        row.fbUrl
          ? `<a href="${escapeHtml(row.fbUrl)}" target="_blank" rel="noopener noreferrer">פייסבוק</a>`
          : ""
      }</td>
    `;

    tr.onclick = function (e) {
      if (e.target.tagName.toLowerCase() === "a") return;

      if (row.latlng && row.marker) {
        map.setView(row.latlng, 17);
        row.marker.openPopup();
      }
    };

    tbody.appendChild(tr);
  });
}
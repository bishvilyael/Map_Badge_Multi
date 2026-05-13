async function loadBadgesIndexToSelect() {
  const response = await fetch("json/badges.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("badges.json לא נטען");
  }

  const badges = await response.json();

  if (!Array.isArray(badges)) {
    throw new Error("badges.json לא תקין");
  }

  const select = document.getElementById("badgeSelect");
  if (!select) return;

  select.innerHTML = "";

  badges.forEach(item => {
    const badgeNo = item.badge || "";
    const name = item.name || "";
    const option = document.createElement("option");

    option.value = badgeNo;
    option.textContent = name
      ? `${name} - #${badgeNo}`
      : `יעל #${badgeNo}`;

    if (badgeNo === badge) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  console.log("רשימת Badge נטענה לתפריט:", badges);
}

(async function () {
  try {
    await loadBadgesIndexToSelect();

    await loadBadgeTitle();
    await loadBadgeGeoJson();
  } catch (err) {
    console.error(err);
    document.getElementById("mapTitleText").textContent =
      "שגיאה: " + err.message;
  }
})();
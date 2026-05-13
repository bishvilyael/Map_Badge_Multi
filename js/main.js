async function testLoadBadgesIndex() {
  const response = await fetch("json/badges.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("badges.json לא נטען");
  }

  const badges = await response.json();

  if (!Array.isArray(badges)) {
    throw new Error("badges.json לא תקין");
  }

  console.log("badges.json נטען בהצלחה:", badges);
}

(async function () {
  try {
    await testLoadBadgesIndex();

    await loadBadgeTitle();
    await loadBadgeGeoJson();
  } catch (err) {
    console.error(err);
    document.getElementById("mapTitleText").textContent =
      "שגיאה: " + err.message;
  }
})();
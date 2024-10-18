import { test, expect } from "@playwright/test";

test.describe("Tankstellen E2E Tests", () => {
  test("Startseite lädt korrekt", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(
      page.locator('input[placeholder="Straße, Stadt oder PLZ"]')
    ).toBeVisible();
  });

  test("Suche auf der Startseite funktioniert", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.fill('input[placeholder="Straße, Stadt oder PLZ"]', "Köln");
    await page.click('button:has-text("Suchen")');
    await expect(page).toHaveURL(/\/tankstellen\?search=K%C3%B6ln/);
  });

  test("Tankstellen-Seite lädt und filtert korrekt", async ({ page }) => {
    await page.goto("http://localhost:3000/tankstellen?search=Köln");
    const listItems = await page.locator(".flex.flex-col > div").count();
    expect(listItems).toBeGreaterThan(0);
  });

  test("API ist erreichbar", async ({ request }) => {
    const response = await request.get(
      "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid%20is%20not%20null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=%2A&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
    );
    expect(response.ok()).toBeTruthy();
  });

  test("Grid auf der Startseite wird korrekt angezeigt", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const gridItems = await page
      .locator(
        ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.gap-7 > div"
      )
      .count();
    expect(gridItems).toBeGreaterThan(0);
  });
});

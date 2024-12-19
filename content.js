chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchTableData") {
    const extractedData = [];
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
      const rows = table.querySelectorAll('tr');

      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) { // Ensure there are at least two columns
          const name = cells[0]?.innerText.trim() || "N/A";
          const phone = cells[1]?.innerText.trim() || "N/A";
          extractedData.push({ name, phone });
        }
      });
    });

    sendResponse(extractedData);
  }
});

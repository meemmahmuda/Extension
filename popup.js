document.addEventListener('DOMContentLoaded', () => {
  // Send a message to content script to fetch table data
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fetchTableData" }, (response) => {
      if (chrome.runtime.lastError || !response) {
        console.error('Error fetching data or no data returned.');
        return;
      }

      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = ""; // Clear previous entries

      // Populate table rows
      response.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td>`;
        tableBody.appendChild(tr);
      });
    });
  });
});

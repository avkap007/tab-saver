document.getElementById('save-tabs').addEventListener('click', async () => {
    try {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const tabUrls = tabs.map(tab => tab.url).join('\n');

        // Create a text blob with URLs
        const blob = new Blob([tabUrls], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tabs.txt';
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.getElementById('status').innerText = 'Tabs saved successfully! You can now safely close your browser.';
    } catch (error) {
        document.getElementById('status').innerText = 'Error saving tabs: ' + error.message;
    }
});

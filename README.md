# service worker

`pnpm build` for building `sw.js`

other comments:

chrome is currently experimenting with [installability criterias](https://developer.chrome.com/blog/update-install-criteria?utm_source=lighthouse&utm_medium=devtools)
... installability still requires a fetch handler, but a no-op is fine

Also there exists [beforeInstallPrompt()](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) to let the user trigger the install prompt themselves with a button for example

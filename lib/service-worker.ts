// This file will be used to register a service worker for offline functionality

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          )
        },
        (err) => {
          console.log("ServiceWorker registration failed: ", err)
        }
      )
    })
  }
}

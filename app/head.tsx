// ─── app/head.tsx ───
export default function Head() {
    return (
      <>
        {/* Basic favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
  
        {/* PWA manifest & theme */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="TappyTyping" />
  
        {/* Apple touch icons */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        {/* …add all the other apple-touch-icon sizes here… */}
  
        {/* Apple web-app meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="tappy_typing" />
  
        {/* Apple startup images */}
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 320px) and (device-height: 568px) and
                 (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/apple-touch-startup-image-640x1136.png"
        />
        {/* …repeat for each device/size/orientation… */}
  
        {/* Windows tile */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/mstile-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/browserconfig.xml"
        />
  
        {/* Yandex tableau widget */}
        <link
          rel="yandex-tableau-widget"
          href="/yandex-browser-manifest.json"
        />
      </>
    )
  }
  
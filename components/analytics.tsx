"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [domain, setDomain] = useState("")

  useEffect(() => {
    // Get the current hostname for domain-specific tracking
    setDomain(window.location.hostname)
  }, [])

  // Track page views for GA4 when the route changes
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_search: searchParams?.toString() || "",
        page_title: document.title,
        domain: domain, // Track which domain the view came from
      })
    }
  }, [pathname, searchParams, domain])

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
            
            // Add domain info to dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'domain': '${domain}',
              'isPrimaryDomain': ${domain.includes("tappytyping.com")}
            });
          `,
        }}
      />

      {/* Google Analytics 4 */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              custom_map: {
                dimension1: 'domain'
              }
            });
            gtag('set', {'domain': '${domain}'});
          `,
        }}
      />

      {/* Microsoft Clarity */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "XXXXXXXXXX");
            
            // Set domain as a custom tag for Clarity
            if (window.clarity) {
              window.clarity("set", "domain", "${domain}");
            }
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}

// Add TypeScript interface for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params: {
        [key: string]: any
      },
    ) => void
    dataLayer: any[]
    clarity: (command: string, key: string, value: string) => void
  }
}

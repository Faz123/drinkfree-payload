export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  window.gtag('event', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

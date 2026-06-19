import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prokodex.com" // Canonical base URL
  
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/careers",
    "/internship",
    "/faq",
    "/contact",
    "/verify",
    "/privacy",
    "/terms"
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/services" || route === "/portfolio" ? 0.8 : 0.5
  }))
}

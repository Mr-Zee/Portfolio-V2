/**
 * Project categories used for filtering.
 * Suggested: "Website UI", "Dashboard", "App Screens", "Software/Web", "Branding"
 */
export const categories = [
  "All",
  "Website UI",
  "Dashboard",
  "App Screens",
  "Software/Web",
  "Photography"
];

export const projects = [
  {
    id: "ui-01",
    title: "E-commerce Website UI",
    category: "Website UI",
    year: "2025",
    summary: "Minimal storefront UI with clean typography and conversion-focused layout.",
    tags: ["UI", "Web", "Design System"],
    cover: "/works/ui/sample-ui-1.jpg",
    images: ["/works/ui/sample-ui-1.jpg", "/works/ui/sample-ui-2.jpg"],
    links: {
      live: "",
      repo: ""
    },
    caseStudy: {
      problem: "Client needed a premium, fast browsing experience on mobile and desktop.",
      approach: [
        "Built a minimal grid system + consistent spacing scale",
        "Designed reusable components: cards, filters, hero, CTA blocks",
        "Optimized hierarchy with typography and contrast"
      ],
      outcome: "Clear layout, strong product focus, and easy navigation."
    }
  },
  {
    id: "dash-01",
    title: "Analytics Dashboard",
    category: "Dashboard",
    year: "2026",
    summary: "Data-dense dashboard layout with modular cards and filters.",
    tags: ["Dashboard", "UX", "Components"],
    cover: "/works/dashboards/sample-dash-1.jpg",
    images: ["/works/dashboards/sample-dash-1.jpg", "/works/dashboards/sample-dash-2.jpg"]
  },
  {
    id: "app-01",
    title: "Fitness App Screens",
    category: "App Screens",
    year: "2025",
    summary: "Mobile app screens focused on clarity, progression, and habit reinforcement.",
    tags: ["Mobile", "UX", "UI"],
    cover: "/works/apps/sample-app-1.jpg",
    images: ["/works/apps/sample-app-1.jpg", "/works/apps/sample-app-2.jpg"]
  },
  {
    id: "soft-01",
    title: "Portfolio + CMS (Build)",
    category: "Software/Web",
    year: "2026",
    summary: "A lightweight portfolio + content model for projects, photos, and case studies.",
    tags: ["React", "Tailwind", "Routing"],
    cover: "/works/software/sample-soft-1.jpg",
    images: ["/works/software/sample-soft-1.jpg"]
  },
  {
    id: "photo-01",
    title: "Street Photography — Set 01",
    category: "Photography",
    year: "2024–2026",
    summary: "A minimal street series focused on geometry, light, and texture.",
    tags: ["Photography", "B&W", "Composition"],
    cover: "/works/photos/sample-photo-1.jpg",
    images: ["/works/photos/sample-photo-1.jpg", "/works/photos/sample-photo-2.jpg"]
  }
];

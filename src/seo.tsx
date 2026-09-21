import { weddingData } from "./weddingData";

export function Seo() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Casamento de ${weddingData.couple.groom.firstName} e ${weddingData.couple.bride.firstName}`,
    description: weddingData.seo.description,
    startDate: weddingData.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [weddingData.hero.image],
    location: {
      "@type": "Place",
      name: weddingData.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: weddingData.venue.address,
        addressLocality: weddingData.venue.city,
        addressRegion: weddingData.venue.state,
        addressCountry: "BR",
      },
    },
    organizer: {
      "@type": "Person",
      name: weddingData.names,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

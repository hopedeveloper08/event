import EventDetails from "@/components/EventDetails/EventDetails";
import data from "../../../database/fake-data.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return data.map((event) => ({
    slug: event.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const event = data.find((item) => item.slug === decodedSlug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <EventDetails event={event} />
    </main>
  );
}


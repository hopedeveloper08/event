import EventDetails from "@/components/EventDetails/EventDetails";
import Event from "@/database/event.model";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  "use cache";
  cacheLife("hours");

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const event = await Event.findOne({ slug: decodedSlug });

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails event={event} />
      </Suspense>
    </main>
  );
}

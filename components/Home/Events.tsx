// import { cacheLife } from "next/cache";

// import { IEvent } from "@/database/event.model";
import Event from "./Event";

// const BASE_URL = process.env.BASE_URL;

import data from "../../database/fake-data.json";

export default async function Events() {
  // "use cache";
  // cacheLife("hours");

  // const response = await fetch(`${BASE_URL}/api/events`);
  // const events: IEvent[] = await response.json();
  // const items = events?.slice(0, 10).reverse() ?? [];

  const items = data;

  if (!items.length) return null;

  return (
    <div className="overflow-hidden">
      <div className="animate-marquee flex items-start gap-8 md:gap-32 hover:paused">
        {items.map((event) => (
          <Event
            key={event.slug}
            title={event.title}
            slug={event.slug}
            image={event.image}
            overview={event.overview}
            date={event.date}
          />
        ))}
      </div>
    </div>
  );
}

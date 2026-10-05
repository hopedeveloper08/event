// import { cacheLife } from "next/cache";

// import { IEvent } from "@/database/event.model";
import Event from "@/components/Home/Event";

// const BASE_URL = process.env.BASE_URL;

import data from "../../database/fake-data.json";

export default async function page() {
  // "use cache";
  // cacheLife("hours");

  // const response = await fetch(`${BASE_URL}/api/events`);
  // const events: IEvent[] = await response.json();
  const events = data;

  return (
    <div className="container mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
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
  );
}

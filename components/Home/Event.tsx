import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

type EventProps = {
  title: string;
  slug: string;
  image: string;
  overview: string;
  date: string;
};

export default function Event({
  title,
  slug,
  image,
  overview,
  date,
}: EventProps) {
  return (
    <Card className="pt-0 shrink-0">
      <Image
        src={image}
        alt="event"
        width={400}
        height={200}
        className="relative z-20 aspect-video object-cover brightness-80 dark:brightness-60"
      />
      <CardHeader className="grow">
        <CardTitle className="line-clamp-2 md:line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2 md:line-clamp-3 text-justify">
          {overview}
        </CardDescription>
        <Badge variant="secondary">{date}</Badge>
      </CardHeader>
      <CardFooter>
        <Link href={`/events/${slug}`} className="w-full">
          <Button className="w-full">جزئیات رویداد</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Tag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
// import { IEvent } from "@/database/event.model";

// export default function EventDetails({ event }: { event: IEvent }) {
export default function EventDetails({ event }: { event: any }) {
  if (!event) {
    return (
      <main
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center px-4"
      >
        <Card className="w-full max-w-md text-center">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <CalendarDays className="size-8 text-muted-foreground" />
            </div>

            <div>
              <h1 className="text-xl font-bold">رویداد پیدا نشد</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                رویدادی با این مشخصات وجود ندارد یا حذف شده است.
              </p>
            </div>

            <Button variant="outline">
              <Link href="/events">
                بازگشت به رویدادها
                <ArrowLeft className="mr-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const eventDate = new Date(event.date);

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(eventDate);

  const modeLabel =
    event.mode === "online"
      ? "آنلاین"
      : event.mode === "hybrid"
        ? "حضوری و آنلاین"
        : "حضوری";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Image */}
            <div className="relative aspect-16/10 overflow-hidden rounded-3xl bg-muted shadow-sm">
              <Image
                src={`/event${event.image}`}
                alt={event.title}
                className="size-full object-cover"
                width={800}
                height={400}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 right-5 left-5 flex flex-wrap gap-2">
                <Badge className="bg-background/90 text-foreground backdrop-blur">
                  {modeLabel}
                </Badge>

                {event.tags?.slice(0, 3).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-background/80 backdrop-blur"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hero content */}
            <div className="flex flex-col">
              <Badge variant="outline" className="mb-5 w-fit gap-2">
                <CalendarDays className="size-3.5" />
                رویداد تخصصی
              </Badge>

              <h1 className="text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                {event.title}
              </h1>

              <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                {event.description}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <InfoItem
                  icon={<CalendarDays />}
                  label="تاریخ"
                  value={formattedDate}
                />

                <InfoItem icon={<Clock3 />} label="ساعت" value={event.time} />

                <InfoItem
                  icon={<MapPin />}
                  label="مکان"
                  value={event.location}
                />

                <InfoItem
                  icon={<Building2 />}
                  label="محل برگزاری"
                  value={event.venue}
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-xl">
                  ثبت‌نام در رویداد
                </Button>

                <Button size="lg" variant="outline" className="rounded-xl">
                  <a
                    href="#agenda"
                    className="flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    مشاهده برنامه
                    <ArrowLeft className="mr-2 size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Main */}
          <div className="space-y-8">
            {/* Overview */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">درباره رویداد</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <p className="leading-8 text-muted-foreground">
                  {event.overview}
                </p>

                <Separator />

                <p className="leading-8 text-muted-foreground">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card
              id="agenda"
              className="scroll-mt-24 rounded-2xl border-border/60 shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-xl">برنامه رویداد</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-0">
                  {event.agenda?.map((item: string, index: number) => (
                    <div
                      key={`${item}-${index}`}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >
                      {/* Line */}
                      {index !== event.agenda.length - 1 && (
                        <div className="absolute right-4 top-8 h-full w-px bg-border" />
                      )}

                      <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle2 className="size-4" />
                      </div>

                      <div className="pt-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          بخش {index + 1}
                        </span>

                        <p className="mt-1 text-sm font-medium leading-7">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Audience */}
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="size-5" />
                  مخاطبان رویداد
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-8 text-muted-foreground">
                  {event.audience}
                </p>
              </CardContent>
            </Card>

            {/* Tags */}
            {event.tags?.length > 0 && (
              <Card className="rounded-2xl border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Tag className="size-5" />
                    موضوعات
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-lg px-3 py-1.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <Card className="overflow-hidden rounded-2xl border-border/60 shadow-sm">
              <CardHeader className="bg-muted/40">
                <CardTitle>اطلاعات رویداد</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 pt-6">
                <DetailRow
                  icon={<CalendarDays />}
                  label="تاریخ"
                  value={formattedDate}
                />

                <DetailRow icon={<Clock3 />} label="زمان" value={event.time} />

                <DetailRow
                  icon={<MapPin />}
                  label="موقعیت"
                  value={event.location}
                />

                <DetailRow
                  icon={<Building2 />}
                  label="محل برگزاری"
                  value={event.venue}
                />

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground">برگزارکننده</p>

                  <p className="mt-2 font-semibold">{event.organizer}</p>
                </div>

                <Button className="w-full rounded-xl" size="lg">
                  ثبت‌نام در رویداد
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm">
        <span className="[&>svg]:size-4">{icon}</span>
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <span className="[&>svg]:size-4">{icon}</span>
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium leading-6">{value}</p>
      </div>
    </div>
  );
}

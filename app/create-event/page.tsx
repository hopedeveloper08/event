"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  ImagePlus,
  MapPin,
  Plus,
  Tags,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEventPage() {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [agenda, setAgenda] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleImageChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setImage(file);

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const addAgendaItem = () => {
    setAgenda((current) => [...current, ""]);
  };

  const updateAgendaItem = (index: number, value: string) => {
    setAgenda((current) =>
      current.map((item, i) => (i === index ? value : item)),
    );
  };

  const removeAgendaItem = (index: number) => {
    setAgenda((current) => current.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const value = tagInput.trim();

    if (!value || tags.includes(value)) return;

    setTags((current) => [...current, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((item) => item !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // image از state گرفته می‌شود
      if (!image) {
        setSubmitError("لطفاً تصویر رویداد را انتخاب کنید.");
        return;
      }

      // تصویر
      formData.set("image", image);

      // agenda و tags باید JSON string باشند
      formData.set(
        "agenda",
        JSON.stringify(agenda.filter((item) => item.trim() !== "")),
      );

      formData.set("tags", JSON.stringify(tags));

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "خطا در ایجاد رویداد");
      }

      setSubmitSuccess(true);

      // در صورت نیاز:
      // router.push("/events");
      // router.refresh();

      console.log("Event created:", result);
    } catch (error) {
      console.error(error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "خطایی در ایجاد رویداد رخ داد.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl tracking-tight">ایجاد رویداد جدید</h1>

          <p className="mt-2 text-muted-foreground">
            اطلاعات رویداد را وارد کنید تا رویداد جدید ایجاد شود.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>اطلاعات اصلی</CardTitle>
              <CardDescription>
                عنوان و توضیحات اصلی رویداد را وارد کنید.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان رویداد</Label>

                <Input
                  id="title"
                  name="title"
                  placeholder="مثلاً کنفرانس تخصصی برنامه‌نویسی و هوش مصنوعی"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>

                <Input
                  id="slug"
                  name="slug"
                  dir="ltr"
                  placeholder="conference-ai-programming"
                  required
                  className="h-11"
                />

                <p className="text-xs text-muted-foreground">
                  این مقدار برای آدرس صفحه رویداد استفاده می‌شود.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">توضیحات کوتاه</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="توضیح کوتاهی درباره این رویداد بنویسید..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overview">معرفی و Overview</Label>

                <Textarea
                  id="overview"
                  name="overview"
                  placeholder="این رویداد چه چیزی به شرکت‌کنندگان ارائه می‌دهد؟"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>تصویر رویداد</CardTitle>
              <CardDescription>
                یک تصویر باکیفیت برای نمایش در صفحه رویداد انتخاب کنید.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <input
                ref={imageInputRef}
                type="file"
                name="image"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files?.[0])}
              />

              {!imagePreview ? (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-14 text-center transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-background shadow-sm">
                    <ImagePlus className="size-7 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <p className="font-semibold">برای انتخاب تصویر کلیک کنید</p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    PNG، JPG یا WEBP — حداکثر ۵ مگابایت
                  </p>

                  <div className="mt-5">
                    <span className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-sm">
                      <Upload className="size-4" />
                      انتخاب تصویر
                    </span>
                  </div>
                </button>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border bg-muted">
                  <div className="relative aspect-16/8">
                    <Image
                      src={imagePreview}
                      alt="پیش‌نمایش تصویر رویداد"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t bg-background p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {image?.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {image
                          ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                          : ""}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                    >
                      <Trash2 className="ml-2 size-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date & Location */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>زمان و مکان</CardTitle>
              <CardDescription>
                زمان و محل برگزاری رویداد را مشخص کنید.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    <CalendarDays className="ml-1 inline size-4" />
                    تاریخ
                  </Label>

                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">
                    <Clock3 className="ml-1 inline size-4" />
                    ساعت
                  </Label>

                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">نحوه برگزاری</Label>

                <select
                  id="mode"
                  name="mode"
                  defaultValue="offline"
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                >
                  <option value="offline">حضوری</option>
                  <option value="online">آنلاین</option>
                  <option value="hybrid">حضوری و آنلاین</option>
                </select>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="venue">
                    <MapPin className="ml-1 inline size-4" />
                    محل برگزاری
                  </Label>

                  <Input
                    id="venue"
                    name="venue"
                    placeholder="مثلاً مرکز همایش‌های بین‌المللی تهران"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">شهر / کشور</Label>

                  <Input
                    id="location"
                    name="location"
                    placeholder="مثلاً تهران، ایران"
                    required
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience & Organizer */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>مخاطبان و برگزارکننده</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="audience">
                  <Users className="ml-1 inline size-4" />
                  مخاطبان
                </Label>

                <Textarea
                  id="audience"
                  name="audience"
                  placeholder="مثلاً برنامه‌نویسان، مهندسان نرم‌افزار، دانشجویان..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer">برگزارکننده</Label>

                <Input
                  id="organizer"
                  name="organizer"
                  placeholder="نام سازمان یا برگزارکننده"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle>برنامه رویداد</CardTitle>
              <CardDescription>
                بخش‌های مختلف برنامه را به ترتیب وارد کنید.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {agenda.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                    {index + 1}
                  </div>

                  <Input
                    value={item}
                    onChange={(e) => updateAgendaItem(index, e.target.value)}
                    placeholder={`مثلاً سخنرانی درباره ${index === 0 ? "آینده برنامه‌نویسی با هوش مصنوعی" : "..."}`}
                    className="h-10"
                  />

                  {agenda.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAgendaItem(index)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addAgendaItem}
                className="mt-2"
              >
                <Plus className="ml-2 size-4" />
                افزودن بخش
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="size-5" />
                برچسب‌ها
              </CardTitle>

              <CardDescription>
                چند برچسب مرتبط با موضوع رویداد اضافه کنید.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="مثلاً هوش مصنوعی"
                  className="h-11"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  className="shrink-0"
                >
                  <Plus className="ml-2 size-4" />
                  افزودن
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 rounded-lg px-3 py-1.5"
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="mr-1 rounded-full outline-none hover:text-destructive"
                      >
                        <X className="size-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold">آماده ایجاد رویداد هستید؟</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  پس از ایجاد، اطلاعات رویداد در سیستم ذخیره خواهد شد.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="rounded-xl">
                  انصراف
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-xl px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ایجاد..." : "ایجاد رویداد"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}

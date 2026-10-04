import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Event from "@/database/event.model";
import sharp from "sharp";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const tagsValue = formData.get("tags");
    const agendaValue = formData.get("agenda");

    const tags = tagsValue ? JSON.parse(tagsValue as string) : [];
    const agenda = agendaValue ? JSON.parse(agendaValue as string) : [];

    const title = formData.get("title") as string;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    if (!slug) {
      return NextResponse.json(
        { error: "Could not generate slug from title" },
        { status: 400 }
      );
    }

    const eventData = Object.fromEntries(formData.entries());

    delete eventData.image;
    delete eventData.tags;
    delete eventData.agenda;

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "images",
      "events"
    );

    await mkdir(uploadDir, { recursive: true });

    const fileName = `${slug}.jpg`;

    const filePath = path.join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const jpgBuffer = await sharp(buffer)
      .jpeg({
        quality: 90,
      })
      .toBuffer();

    await writeFile(filePath, jpgBuffer);

    const createdEvent = await Event.create({
      ...eventData,
      slug,
      image: `/images/events/${fileName}`,
      tags,
      agenda,
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create event error:", error);

    return NextResponse.json(
      {
        error: "Failed to create event",
      },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

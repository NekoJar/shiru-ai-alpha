import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const people = await prisma.peoples.findMany({ orderBy: { id: "asc" } });

  return NextResponse.json(people);
}

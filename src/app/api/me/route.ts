import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Natchaya Palee",
    studentId: "660610754",
  });
};

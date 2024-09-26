import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { Database, Payload } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { roomId, totalRooms } = <Payload>payload;
  readDB();
  if (roomId === "ADMIN" || "SUPER_ADMIN") {
    return NextResponse.json({
      ok: true,
      rooms: (<Database>DB).rooms,
      totalRooms: totalRooms,
    });
  }
  const roomsNoList = [];
  for (const  room of  (<Database>DB).rooms) {
    if (room.roomId === roomId) {
      roomsNoList.push(room.roomId);
    }
  }

  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload) {
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
  }
  readDB();

  return NextResponse.json(
    {
      ok: false,
      message: `Room ${"replace this with room name"} already exists`,
    },
    { status: 400 }
  );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};

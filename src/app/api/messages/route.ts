import { DB, readDB, writeDB, Payload, Database } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
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
  const { roomId, messageId, messageText} = <Payload>payload;
  readDB();
  if (roomId === "ADMIN" || "SUPER_ADMIN") {
    return NextResponse.json({
      ok: true,
      rooms: (<Database>DB).messages,
      messageId: messageId,
      messageText: messageText,
    });
  }
  const roomsNoList = [];
  for (const  room of  (<Database>DB).messages) {
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
  readDB();

  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  if(!payload) {
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
      message: "Message is not found",
    },
    { status: 404 }
  );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};

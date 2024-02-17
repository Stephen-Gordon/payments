import { NextRequest, NextResponse } from 'next/server';
import { dummyDb } from '@/app/utils/db/in-memory-db';
export async function GET(_: NextRequest) {
  return NextResponse.json(dummyDb);
}

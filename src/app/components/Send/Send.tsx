'use client';
import { useState } from 'react';
export default function Send() {
  return (
    <>
      <button
        onClick={() => {
          //setModal(true);
        }}
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      >
        Send
      </button>
    </>
  );
}

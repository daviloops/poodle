'use client';

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  return (
    <div>
      <div>{data?.user?.name}</div>
      <button onClick={() => signOut()}>out</button>
    </div>
  );
};

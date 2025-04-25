import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { email, name } = router.query;
  return (
    <>
      <h1>Hello to dashboard!</h1>
      <h2>{name}</h2>
      <h3>{email}</h3>
    </>
  );
}

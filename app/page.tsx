"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

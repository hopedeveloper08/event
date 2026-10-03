"use client";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (!theme) { 
      localStorage.setItem("theme", "dark");
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <Button variant="outline" className="flex-center py-5 bg-transparent" onClick={changeTheme}>
      <HiOutlineMoon className="size-6 dark:hidden" />
      <HiOutlineSun className="size-6 hidden dark:block" />
    </Button>
  );
}

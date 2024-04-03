"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Image from "next/image";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

    const handleToggle = () => {
        if(resolvedTheme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

  return (
    <div onClick={handleToggle} className={`cursor-pointer rounded-[5px] flex items-center justify-center h-[36px] w-[36px] box-content p-[5px] ${resolvedTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-300'} transition-colors duration-300`}>
    {resolvedTheme === "dark" ? (
      <IoMdSunny className="text-[25px]"/>
    ) : (
      <IoMdMoon className="text-[25px]"/>
    )}
  </div>
  
  );
};

export default ThemeSwitch;

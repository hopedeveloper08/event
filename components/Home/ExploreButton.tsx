import { HiMiniArrowDown } from "react-icons/hi2";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ExploreButton() {
  return (
    <div className="mt-8 flex-center">
      <Link href="/events">
        <Button
          variant="default"
          size="lg"
          className="
            w-full
            flex-center
            py-8 px-4
            font-semibold text-2xl md:text-3xl 
            animate-float
        "
        >
          <HiMiniArrowDown className="size-8" />
          <span className="mb-2">بررسی رویدادها</span>
        </Button>
      </Link>
    </div>
  );
}

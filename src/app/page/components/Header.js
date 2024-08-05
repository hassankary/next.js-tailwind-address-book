import Image from "next/image";
import ThemeButton from "./ThemeButton";
import {
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const Header = ({ searchTitle, onChange, onClick }) => {
  return (
    <div className="fixed flex z-10 top-0 bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 text-white h-[70px] w-full">
      <div className="flex justify-center items-center my-auto w-1/4 md:w-[45%] space-x-2 order-1">
        <UserGroupIcon className="h-7 w-7" />
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="hidden md:flex font-bold text-lg"
        >
          Address Book
        </button>
      </div>
      <div className="flex justify-center items-center w-1/4 md:w-[10%] order-3 md:order-2">
        <ThemeButton />
      </div>
      <div className="flex justify-center items-center w-2/4 md:w-[45%] order-2 md:order-2">
        <form className="flex justify-end">
          <input
            className="rounded-md text-black dark:text-slate-200 py-1 px-2 w-[75%]"
            type="search"
            placeholder="Search..."
            value={searchTitle}
            onChange={onChange}
          />
          <button
            onClick={onClick}
            type="search"
            className="font-semibold px-2 w-[15%]"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

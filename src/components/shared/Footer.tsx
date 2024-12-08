import React from "react";
import {
  BriefcaseIcon,
  AtSymbolIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

import { TRANSLATIONS } from "../../constants/translations";

const t = TRANSLATIONS["en"];

interface NavigationItem {
  name: string;
  href: string;
  icon: "at-symbol" | "code-bracket" | "briefcase";
}

const navigation: NavigationItem[] = [
  {
    name: "Gmail",
    href: "mailto:volkanugurarslan@gmail.com",
    icon: "at-symbol",
  },
  {
    name: "GitHub",
    href: "https://github.com/Volkarslan",
    icon: "code-bracket",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/volkan-ugur-arslan/",
    icon: "briefcase",
  },
];

const Footer: React.FC = () => {
  const getIconComponent = (icon: NavigationItem["icon"]) => {
    switch (icon) {
      case "at-symbol":
        return <AtSymbolIcon className="h-5 w-5" />;
      case "code-bracket":
        return <CodeBracketIcon className="h-5 w-5" />;
      case "briefcase":
        return <BriefcaseIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-white border-t border-gray-300 ">
      <div className="mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 duration-300 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              {getIconComponent(item.icon)}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600 md:order-1 md:mt-0">
          {t.project.dev_part_1}{" "}
          <span
            aria-label="love"
            role="img"
            className="animate-breathe inline-block"
          >
            ❤️
          </span>{" "}
          {t.project.dev_part_2}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

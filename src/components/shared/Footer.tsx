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
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavigationItem[] = [
  {
    name: "Gmail",
    href: "mailto:volkanugurarslan@gmail.com",
    Icon: AtSymbolIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/Volkarslan",
    Icon: CodeBracketIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/volkan-ugur-arslan/",
    Icon: BriefcaseIcon,
  },
];

/**
 * Footer component that includes navigation links and project credits.
 * @returns {JSX.Element} Footer component.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="mx-auto max-w-7xl p-4 md:flex md:items-center md:justify-between">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              className="text-gray-600 duration-300 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{name}</span>
              <Icon className="h-5 w-5" />
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

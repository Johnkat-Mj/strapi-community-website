import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useWindowScroll } from "@/hooks/useWindowScroll";

import AppContainer from "./atoms/AppContainer";
import { GithubIcon, DiscordIcon } from "@/components/icons/social";
import NavItem from "./atoms/NavItem";
import ThemeSwitcher from "./elements/ThemeSwitcher";
import { getStrapiURL } from "@/lib/api";


const navLinks = [
  {
    text: "About",
    href: "/about-community",
    externalLink: false
  },
  {
    text: "Showcases",
    href: "/showcases",
    externalLink: false
  },
  {
    text: "Articles",
    href: "/articles",
    externalLink: false
  },
  {
    text: "Bounty",
    href: "/bounty",
    externalLink: false
  },
  {
    text: "Forum",
    href: "https://forum.strapi.io/",
    externalLink: true
  },
]


export default function AppHeader({data}) {
  const [navOpen, setNavOpen] = useState<boolean>(false)

  const { scrollY } = useWindowScroll()

  const toggleNavBar = useCallback(
    () => {
      setNavOpen(navOpen => !navOpen)
      if (typeof document !== "undefined" && typeof window !== "undefined") {
        document.body.classList.add(!navOpen ? "!overflow-y-hidden" : "overlflow-y-auto")
        if (navOpen) {
          document.body?.classList.remove("!overflow-y-hidden")
        }
      }
    },
    [navOpen],
  )

  const closeNav = useCallback(
    () => {
      setNavOpen(() => false)
      if (typeof document !== "undefined" && typeof window !== "undefined") {
        document.body.classList.remove("!overflow-y-hidden")
      }
    },
    [],
  )



  return (
    <>

      <div className={`fixed h-screen z-50 backdrop-filter backdrop-blur-md bg-white dark:bg-darkBg !bg-opacity-40 inset-x-0 top-0 ${navOpen ? "flex" : "hidden"}`} onClick={closeNav}></div>

      <header className={`
        flex items-center h-20 lg:h-[5.5rem] fixed top-0 w-full left-0 z-50 transition-all ease-linear duration-300 border-b
        ${scrollY > 20 ? " shadow-lg shadow-gray-200/50 dark:shadow-darkCard/50 bg-white border-b-transparent dark:bg-darkBg dark:border-b dark:border-b-gray-700" : " border-b-transparent"}
      `}>
        <AppContainer className="relative lg:!px-6 xl:!px-4">

          <nav className="flex items-center justify-between">

            {/* site logo */}
            <div>
              <Link href={"/"}>
                <Image width={80} height={40} alt="Strapi" src={getStrapiURL(data.data.attributes.logoLight.data.attributes.url)} className="w-auto h-8 hidden xs:flex dark:hidden" />
                <Image width={80} height={40} alt="Strapi" src={getStrapiURL(data.data.attributes.logoDark.data.attributes.url)} className="w-auto h-8 hidden xs:dark:flex" />
                <Image width={80} height={40} alt="Strapi" src={getStrapiURL(data.data.attributes.logoMono.data.attributes.url)} className="w-auto h-8 xs:hidden" />
              </Link>
            </div>


            {/* site navigation */}
            <div className={
              `absolute h-max py-5 px-5 sm:px-10 lg:px-0 lg:py-0 w-full top-[calc(100%+20px)] border-b-2 border-b-gray-200 dark:border-b-gray-700 lg:!border-b-0 lg:top-0 max-w-xs lg:transition-all ease-linear lg:max-w-none lg:-left-0 lg:w-auto 
            bg-white dark:bg-darkBg lg:bg-transparent lg:dark:bg-transparent lg:h-max lg:visible lg:relative lg:flex 
            ${navOpen ? "!-left-0 transition-all" : "-left-full lg:-left-0"}`
            }>
              <ul onClick={closeNav} className="flex flex-col lg:flex-row lg:items-center gap-y-3 lg:gap-x-4 text-title dark:text-gray-100">
                {data.data.attributes.links.map((navlink, index)=>(
                  <NavItem key={index} {...navlink} />
                ))
                }
              </ul>
            </div>


            {/* action links */}
            <div className="flex items-center gap-3 min-w-max">
              <div className="flex gap-2">
                <a href={"https://github.com/strapi-community/"} target="_blank" rel="noreferrer" className="outline-none rounded-md p-1.5 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-darkCard text-gray-500 dark:text-gray-200">
                  <span className="sr-only">Github</span>
                  <GithubIcon />
                </a>

                <a href={"https://discord.com/invite/strapi"} target="_blank" rel="noreferrer" className="outline-none rounded-md p-1.5 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-darkCard text-gray-500 dark:text-gray-200">
                  <span className="sr-only">Discord</span>
                  <DiscordIcon />
                </a>

                <ThemeSwitcher />
              </div>
              <div className="lg:hidden pl-2 border-l border-l-gray-200 relative">
                <button
                  onClick={toggleNavBar}
                  className="outline-none w-7 h-auto flex flex-col relative">

                  <span className="sr-only">toggle navbar</span>

                  <span className={
                    `w-6 h-0.5 rounded-full bg-gray-500 dark:bg-gray-200 transition-all 
                      duration-300 ease-linear
                      ${navOpen ? "translate-y-1.5 rotate-[40deg] scale-x-100" : "scale-x-50 origin-left"}`
                  }>
                  </span>

                  <span className={
                    `w-6 mt-1 h-0.5 rounded-full bg-gray-500 dark:bg-gray-200
                      transition-all duration-300 ease-linear scale-75 origin-left
                      ${navOpen ? "scale-x-0 opacity-0" : ""}`
                  }>
                  </span>

                  <span className={
                    `w-6 mt-1 h-0.5 rounded-full bg-gray-500 dark:bg-gray-200 transition-all
                      duration-300 ease-linear
                      ${navOpen ? "-translate-y-1.5 -rotate-[40deg] scale-x-100" : "scale-x-75 origin-left"}
                  `}></span>
                </button>
              </div>
            </div>
          </nav>
        </AppContainer>
      </header>
    </>
  )
}

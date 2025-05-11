// "use client";
// import { useState, useEffect } from "react";
// import { FiGrid, FiUser, FiCode, FiMonitor, FiMail } from "react-icons/fi";

// function NavigationBar() {
//   const [active, setActive] = useState("Home");

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["home", "about-me", "skills", "works", "contact"];
//       const sectionMap = {
//         "home": "Home",
//         "about-me": "About_Me",
//         "skills": "Skills",
//         "works": "Works",
//         "contact": "contact"
//       };

//       for (const section of sections) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
//             setActive(sectionMap[section as keyof typeof sectionMap]);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const click = (text: string) => {
//     setActive(text);
//   };

//   return (
//     <ul className="fixed top-1/2 left-0 md:left-5 z-50 flex flex-col gap-6 border rounded-t-full rounded-b-full py-3 px-1 bg-bg2 -translate-y-1/2">
//       <li
//         className={`after-nav after:content-["Home"] ${
//           active == "Home" ? "bg-[#fff]" : ""
//         }`}
//       >
//         <a href="#home" onClick={() => click("Home")}>
//           <FiGrid size={30} color={active == "Home" ? "black" : "white"} />
//         </a>
//       </li>
//       <li
//         className={`after-nav after:content-["About_Me"] ${
//           active == "About_Me" ? "bg-[#fff]" : ""
//         }`}
//       >
//         <a href="#about-me" onClick={() => click("About_Me")}>
//           <FiUser size={30} color={active == "About_Me" ? "black" : "white"} />
//         </a>
//       </li>
//       <li
//         className={`after-nav after:content-["Skills"] ${
//           active == "Skills" ? "bg-[#fff]" : ""
//         }`}
//       >
//         <a href="#skills" onClick={() => click("Skills")}>
//           <FiCode size={30} color={active == "Skills" ? "black" : "white"} />
//         </a>
//       </li>
//       <li
//         className={`after-nav after:content-["Works"] ${
//           active == "Works" ? "bg-[#fff]" : ""
//         }`}
//       >
//         <a href="#works" onClick={() => click("Works")}>
//           <FiMonitor size={30} color={active == "Works" ? "black" : "white"} />
//         </a>
//       </li>
//       <li
//         className={`after-nav after:content-["contact"] ${
//           active == "contact" ? "bg-[#fff]" : ""
//         }`}
//       >
//         <a href="#contact" onClick={() => click("contact")}>
//           <FiMail size={30} color={active == "contact" ? "black" : "white"} />
//         </a>
//       </li>
//     </ul>
//   );
// }

// export default NavigationBar;

"use client";

import { useEffect, useState } from "react";
import { FiGrid, FiUser, FiCode, FiMonitor, FiMail } from "react-icons/fi";

function NavigationBar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { text: "Home", id: "home", icon: FiGrid, href: "#home" },
    { text: "About_Me", id: "about-me", icon: FiUser, href: "#about-me" },
    { text: "Skills", id: "skills", icon: FiCode, href: "#skills" },
    { text: "Works", id: "works", icon: FiMonitor, href: "#works" },
    { text: "contact", id: "contact", icon: FiMail, href: "#contact" }, // Changed "Contact" to "contact" to match the active state
  ];

  return (
    <ul className="fixed top-1/2 left-0 md:left-5 z-50 flex flex-col gap-6 border rounded-t-full rounded-b-full py-3 px-1 bg-bg2 -translate-y-1/2">
      {links.map(({ id, text, icon: Icon, href }) => (
        <li
          key={id}
          className={`after-nav after:content-["${text}"] ${
            active === id ? "bg-[#fff]" : ""
          }`}
        >
          <a href={href}>
            <Icon
              color={active === id ? "black" : "white"}
              className="text-[20px] md:text-[30px]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavigationBar;

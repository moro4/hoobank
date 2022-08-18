import React, { useEffect, useState, useRef } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';

function Navbar() {

   const [isNavLinkActive, setIsNavLinkActive] = useState(
      Array(navLinks.length).fill(false)
   );
   const [toggle, setToggle] = useState(false);
   const mobileNavToggleRef = useRef();

   function navLinkHighlight(index) {
      const navMenuItems = new Array(navLinks.length).fill(false);
      navMenuItems[index] = true;
      setIsNavLinkActive(navMenuItems);
   }

   useEffect(() => {
      // Disables dropdown menu when clicked outside the mobile toggle button

      function handleToggleOutClick(event) {
         const insideClick = mobileNavToggleRef.current.contains(event.target);
         if (!insideClick) {
            setToggle(false);
         }
      }

      document.addEventListener('click', handleToggleOutClick);
      return () => {
         document.removeEventListener('click', handleToggleOutClick)
      };
   }, []);

   useEffect(() => {
      // Disables mobile dropdown menu on breakpoint change

      function handleDropdownMenu() {
         const breakpoint = window.matchMedia('(min-width: 768px)');
         if(breakpoint.matches) {
            setToggle(false);
         }
      }

      window.addEventListener('resize', handleDropdownMenu);
      return () => {
         window.removeEventListener('resize', handleDropdownMenu)
      };
   }, []);

   return (
      <nav className='flex py-6 justify-between items-center navbar'>

         <img src={logo} alt="hoobank logo" className='w-[124px] h-[32px]' />

         {/* Desktop Nav */}
         <ul className='sm:flex hidden items-center justify-end flex-1
            space-x-10'
         >
            {navLinks.map((nav, index) => (
               <li
                  onClick={() => navLinkHighlight(index)}
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer
                     text-[16px] ${isNavLinkActive[index] ? 'text-secondary' : 'text-white'}`}
               >
                  <a href={'#' + nav.id}>
                     {nav.title}
                  </a>
               </li>
            ))}
         </ul>

         {/* Mobile Nav */}
         <div className='sm:hidden flex flex-1 justify-end items-center'>

            <img src={toggle ? close : menu} alt="mobile menu control"
               className='w-[28px] h-[28px] object-contain'
               onClick={() => setToggle(!toggle)} ref={mobileNavToggleRef}
            />

            <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient
               absolute top-16 right-0 mx-4 my-2 min-w-[140px] rounded-md
               sidebar justify-center`}
            >
               <ul className='flex flex-col space-y-7'>
                  {navLinks.map((nav, index) => (
                     <li
                        onClick={() => navLinkHighlight(index)}
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer
                           text-[16px] ${isNavLinkActive[index] ? 'text-secondary' : 'text-white'}`}
                     >
                        <a href={'#' + nav.id}>
                           {nav.title}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

         </div>

      </nav>
   )
}

export default Navbar;
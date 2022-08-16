import React, { useState } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';

function Navbar() {

   const [isNavLinkActive, setIsNavLinkActive] = useState(false);

   return (
      <nav className='flex py-6 justify-between items-center navbar'>
         <img src={logo} alt="hoobank logo" className='w-[124px] h-[32px]' />
         <ul className='sm:flex list-none hidden justify-end items-center
            flex-1 space-x-10'
         >
            {navLinks.map((nav) => (
               <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer
                     text-[16px] ${isNavLinkActive ? 'on' : 'off'} text-white`}
               >
                  <a href={'#' + nav.id}>
                     {nav.title}
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default Navbar;
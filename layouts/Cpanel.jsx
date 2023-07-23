import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ShrinkSidebar from './ShrinkSidebar';
import ExpandSidebar from './ExpandSidebar';
import Header from './Header';

export default function Cpanel({ children }) {
    const [scrollY, setScrollY] = useState(0)
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const maxScrollY = 70

    useEffect(() => {
        window.onscroll = (e) => {
            setScrollY(Math.floor(window.pageYOffset))
        }
    }, [scrollY])

    return (
        <div>
            {/* {side bar} */}
            <div
                className={`
                    fixed
                    top-0
                    bottom-0
                    transition
                    bg-main
                    h-screen
                    z-20

                    // mobile first
                    w-sidebar-extend
                    ${sidebarExpanded ? 'translate-x-[0%]' : '-translate-x-[102%]'}

                    // desktop
                    hover-element
                    md:translate-x-[0%]
                    ${sidebarExpanded ? 'md:w-sidebar-extend' : 'md:w-sidebar-shrink'}
                `}
            >
                {/* nav toggle */}
                <div
                    className='
                        h-[var(--header-height)]
                        w-[40px]
                        absolute
                        right-0
                        top-o
                        text-white

                        // hide on large screen
                        md:hidden

                        // shown on smaller screen (mobile first)
                        flex
                        items-center
                        justify-center
                    '
                >
                    <MenuIcon
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className="
                        text-4xl
                        cursor-pointer
                    "
                    />
                </div>
                {/* shrink side bar */}
                <div
                    className={`
                        h-full
                        w-[var(--sidebar-shrink)]
                        ${sidebarExpanded ? 'hidden' : 'block'}
                        transition
                        hover-effect-sidebar-content
                    `}
                >
                    <ShrinkSidebar />
                </div>
                {/* expanded side bar */}
                <div
                    className='
                        h-full
                        w-[var(--sidebar-expand)]
                        transition
                    '
                >
                    <ExpandSidebar />
                </div>
            </div>

            {/* {header} */}
            <div
                className={`
                    transition
                    flex
                    duration-75
                    bg-white
                    h-header
                    ${scrollY >= maxScrollY ? 'fixed' : 'static'} ${scrollY >= maxScrollY ? 'shadow-lg' : 'shadow-none'}
                    top-0
                    right-0
                    left-0 z-10
            
                    // desktop
                    ${sidebarExpanded ? 'md:ml-[var(--sidebar-extend)]' : 'md:ml-[var(--sidebar-shrink)]'}
                    hover-effect
                `}>

                {/* nav toggle */}
                <div
                    className='
                        h-full
                        w-[40px]
                        flex
                        items-center
                        justify-center
                    '
                >
                    <MenuIcon
                        onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        className="
                        text-4xl
                        cursor-pointer
                    "
                    />
                </div>
                <div
                    className='
                        h-full
                        flex-1
                    '
                >
                    <Header />
                </div>
            </div>

            {/* overlay */}
            <div
                onClick={() => setSidebarExpanded(false)}
                className={`
                    fixed
                    top-0
                    bottom-0
                    left-0
                    right-0
                    bg-black
                    bg-opacity-25
                    z-10
                    md:hidden
                    ${sidebarExpanded ? 'block' : 'hidden'}
                `}
            >

            </div>

            {/* {main} */}
            <div
                className={`
                    relative
                    transition
                    duration-75
            
                    // desktop
                    ${sidebarExpanded ? 'md:ml-[var(--sidebar-extend)]' : 'md:ml-[var(--sidebar-shrink)]'}
                    hover-effect
                `}
            >
                {children}
            </div>

        </div >
    )
}

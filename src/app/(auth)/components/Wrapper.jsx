"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, LinkIcon, Menu, QrCode } from "lucide-react";

import Logo from '@/components/Logo.jsx';
import { brandName } from '@/config/siteConfig.js';

const navigations = [
    { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { name: "Links", href: "/dashboard/links", icon: LinkIcon },
    { name: "QR Codes", href: "/dashboard/qrcodes", icon: QrCode },
];

const Wrapper = ({ children }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function toggleIsOpen() {
            if (window.innerWidth > 1200) setIsOpen(true);
        };

        toggleIsOpen();
    }, []);

    return (
        // Main viewport
        <div className='w-screen min-h-screen flex'>
            {/* Sidebar */}
            <div className={`fixed lg:sticky h-auto lg:top-0 w-full lg:w-auto p-5 bg-white duration-300 ${isOpen ? "min-w-[250px] top-[73px]" : "lg:flex flex-col items-center -top-40"} border-r`}>
                <div className={`hidden lg:flex items-center mb-10 ${isOpen ? "gap-3 px-1.5" : ""}`}>
                    <Logo />
                    <h1 className={`font-extrabold text-2xl ml-2 ${isOpen ? "" : "hidden"}`}>{brandName}</h1>
                </div>

                {/* Navigation Links */}
                <div className=''>
                    {/* TODO: Create new button with 2 options */}

                    <div className="space-y-1">
                        <Link
                            href={"/dashboard"}
                            className={`flex items-center font-medium px-3 py-3 bg-neutral-2000 rounded-md hover:bg-primary-100 hover:text-primary duration-300 leading-3 ${pathname == "/dashboard" ? "bg-primary-100 text-primary" : ""} gap-4`}
                        >
                            <LayoutDashboard size={20} />
                            <span className={`${isOpen ? "" : "lg:hidden"}`}>Dashboard</span>
                        </Link>
                        {navigations.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center font-medium px-3 py-3 bg-neutral-2000 rounded-md hover:bg-primary-100 hover:text-primary duration-300 leading-3 ${pathname.startsWith(item.href) ? "bg-primary-100 text-primary" : ""} gap-4`}
                            >
                                <item.icon size={20} />
                                <span className={`${isOpen ? "" : "lg:hidden"}`}>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className='min-h-screen w-full'>
                {/* Header */}
                <div className='p-5 bg-white w-full border-b gap-3 flex items-center sticky top-0'>
                    <button onClick={() => setIsOpen(!isOpen)}><Menu /></button>
                    <span className="lg:opacity-0"><Logo /></span>
                </div>

                {/* Main Content */}
                <div className='p-6 max-w-5xl mx-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
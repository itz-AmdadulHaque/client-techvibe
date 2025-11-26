"use client";

import Image from "next/image";
import Link from "next/link";



export default function Footer() {

    const handleWhatsappMassage = () => {
        const phone = "8801320504151"; // without the plus sign
        const message = encodeURIComponent(
            "Hello TechVibe Global, I’d like to get in touch."
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    };

    const handleCallClick = () => {
        window.location.href = "tel:+8801320504151";
    };

    
    return (
        <footer
            id="contact"
            className="bg-black border-t border-neutral-700"
        >
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Grid - 3 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* Left Grid - Company Info & Contact */}
                    <div className="space-y-8">
                        {/* Company Logo & Info */}
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="TechVibe Global Logo"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover rounded-sm"
                                    priority
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    TechVibe Global
                                </h2>
                                <p className="text-blue-400 font-medium text-sm">
                                    Engineering Excellence Since 2017
                                </p>
                            </div>
                        </div>
                        {/* Company Description */}
                        <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                            Transform your engineering challenges into innovative solutions
                            with our expert team.
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <svg
                                    className="w-5 h-5 text-blue-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                Contact Us
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href="tel:+8801320504151"
                                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-400 mr-3 group-hover:text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    +880 13205-04151
                                </a>

                                <a
                                    href="mailto:info@techvibeglobal.com"
                                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-400 mr-3 group-hover:text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    info@techvibeglobal.com
                                </a>

                                <a
                                    href="mailto:techvibeglobal@gmail.com"
                                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-400 mr-3 group-hover:text-blue-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    techvibeglobal@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Middle Grid - Services */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                            <svg
                                className="w-6 h-6 text-purple-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                            Our Services
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center text-gray-300">
                                <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                                <span>Fire and Life Safety</span>
                            </div>

                            <div className="flex items-center text-gray-300">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                <span>Electrical Safety</span>
                            </div>

                            <div className="flex items-center text-gray-300">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                <span>IT and Surveillance</span>
                            </div>

                            <div className="flex items-center text-gray-300">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span>Engineering Consultancy</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="pt-6 space-y-3">
                            <button
                                onClick={handleCallClick}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                Call for Consultation
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href="mailto:techvibeglobal@gmail.com"
                                    className="px-4 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Email
                                </a>

                                <button
                                    onClick={handleWhatsappMassage}
                                    className="px-4 py-3 border border-green-600 text-green-400 hover:bg-green-800/20 hover:border-green-500 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Grid - Office Addresses */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                            <svg
                                className="w-6 h-6 text-green-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Our Offices
                        </h3>

                        <div className="space-y-6">
                            {/* Dhaka Office */}
                            <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700">
                                <div className="flex items-center mb-3">
                                    <svg
                                        className="w-5 h-5 text-blue-400 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <h4 className="font-semibold text-blue-300">Dhaka Office</h4>
                                </div>
                                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                                    4th Floor, House #07, Road #09,
                                    <br />
                                    Sector #11, Uttara, Dhaka
                                </address>
                            </div>

                            {/* Chottogram Office */}
                            <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700">
                                <div className="flex items-center mb-3">
                                    <svg
                                        className="w-5 h-5 text-green-400 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <h4 className="font-semibold text-green-300">
                                        Chottogram Office
                                    </h4>
                                </div>
                                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                                    2nd Floor, Wali Khan Bhaban,
                                    <br />
                                    Chowmuhoni, Chottogram
                                </address>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center pt-8 border-t border-gray-700">
                    <p className="text-gray-400 text-sm">
                        © 2025 TechVibe Global. All rights reserved. | Connecting Technology
                        and Sustainability
                    </p>
                </div>
                
                
                <div className="text-center pt-8 ">
                    <p className="text-gray-400 text-sm">
                        Developed by - <Link className="text-blue-500 font-extrabold text-xl" href="https://softzyne.com/" target="_blank">Softzyne</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
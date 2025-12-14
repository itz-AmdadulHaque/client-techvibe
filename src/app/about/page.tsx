import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const storyCards = [
    {
        title: "Our Beginning",
        description:
            "Founded in 2017 in Bangladesh, TechVibe Global set out to transform sustainable infrastructure design. Built by experienced engineers passionate about innovation, we strive to revolutionize outdated industry practices.",
        iconColor: "from-blue-500 to-purple-500",
        icon: (
            <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
    },
    {
        title: "Our Mission",
        description:
            "We combine technical precision with creativity and ethical responsibility. Every project is an opportunity to solve real-world problems, improve lives, and shape a sustainable future through continuous improvement and collaboration.",
        iconColor: "from-green-500 to-blue-500",
        icon: (
            <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
];

const coreValues = [
    {
        icon: "🔥",
        title: "Fire Safety",
        desc: "Comprehensive fire protection and life safety solutions",
        gradient: "from-red-500 to-orange-500",
    },
    {
        icon: "⚡",
        title: "Electrical Safety",
        desc: "Advanced electrical system safety and compliance",
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        icon: "💻",
        title: "IT Solutions",
        desc: "Cutting-edge surveillance and IT infrastructure",
        gradient: "from-blue-500 to-purple-500",
    },
    {
        icon: "🏭",
        title: "Engineering Consultancy",
        desc: "Sustainable infrastructure and building solutions",
        gradient: "from-green-500 to-blue-500",
    },
];

const About = () => {
    return (
        <main className="container mx-auto">
            <section
                id="about"
                className="pt-20 pb-1"
                aria-labelledby="about-heading"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        
                        <h2
                            id="about-heading"
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                        >
                            Welcome to our company
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
                    </div>

                    {/* Story Cards */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        {storyCards.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5"
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-r ${item.iconColor} rounded-xl flex items-center justify-center mr-4`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <div
                                            className={`w-16 h-1 mt-1 rounded bg-gradient-to-r ${item.iconColor}`}
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Core Values */}
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            Our Expertise
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-10" />

                        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
                            {coreValues.map((value, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 text-left"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div
                                            className={`w-14 h-14 bg-gradient-to-r ${value.gradient} rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {value.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {value.title}
                                            </h3>
                                            <div
                                                className={`w-14 h-1 mt-1 rounded bg-gradient-to-r ${value.gradient}`}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm pl-1 pr-2">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='text-center'>
                        <h2
                            id="about-heading "
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                        >
                            Our Digital Partner
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
                    </div>

                    <Link
                        href="https://softzyne.com/"
                        target='_blank'
                    >
                        <div
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-5 max-w-3xl mx-auto mb-20"
                        >
                            <div className="flex items-center">
                                <Image
                                    src="/softzyne-logo.png"
                                    height={250}
                                    width={250}
                                    alt='Softzyne'
                                    className='w-24 h-24'
                                />
                                <div>
                                    <h3 className="text-3xl font-extrabold text-gray-900">
                                        Softzyne Digital Solutions
                                    </h3>
                                    <div
                                        className={`w-16 h-1 mt-1 rounded bg-gradient-to-r from-blue-500 to-purple-500  `}
                                    />
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                TechVibe Global partners with Softzyne Digital Solutions as our trusted digital partner, supporting our online presence and engagement. This allows us to focus on delivering quality engineering solutions while maintaining a strong brand in the digital space.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default About
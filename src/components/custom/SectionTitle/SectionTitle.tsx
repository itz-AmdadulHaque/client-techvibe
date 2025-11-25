import React from 'react'

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className='my-4 sm:my-8'>
            <h3 className="font-bold text-2xl sm:text-3xl text-center">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-2"></div>
        </div>
    )
}

export default SectionTitle
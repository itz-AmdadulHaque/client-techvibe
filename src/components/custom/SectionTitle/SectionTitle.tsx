import React from 'react'

const SectionTitle = ({ title, desciption }: { title: string , desciption?: string }) => {
    return (
        <div className='my-3 sm:my-8'>
            <h3 className="font-bold text-2xl sm:text-3xl text-center">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-2"></div>
            {desciption && <p className="text-center text-slate-800 mt-4">{desciption}</p>}
        </div>
    )
}

export default SectionTitle
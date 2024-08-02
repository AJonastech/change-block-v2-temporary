import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='h-full'>
        <div className='py-4 lg:px-12'>
        <img
              src={ "/logo.svg"}
              alt="Logo"
              className={`max-h-12  "w-[184px] h-[44px] object-cover"}`}
            />
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout
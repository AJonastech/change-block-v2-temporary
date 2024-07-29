import FileUploader from '@/components/FileUploader'
import RichInput from '@/components/RichInput'
import { Button } from '@nextui-org/react'
import React from 'react'

function page() {
  return (
   <div className='w-full flex flex-col justify-between h-full'>
<div className='flex flex-col gap-4'>
<FileUploader/>
<Button className='!bg-primary w-fit' color='primary'>
  Process Translation
</Button>
</div>
<div className='flex flex-col gap-2'>
  <RichInput/>
  <p className='text-sm font-satoshi text-center text-grey-100'>File upload limit is 200MB per file</p>
</div>
   </div>
  )
}

export default page
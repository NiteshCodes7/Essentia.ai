import Link from 'next/link';
import React from 'react'
import { Button } from '@/components/ui/button';

const NoSummaryPage = () => {
  return (
    <div className=' flex flex-col items-center justify-center gap-4 h-[50vh]'>
      <h3 className='text-gray-900 font-bold text-4xl'>Summary Not Found</h3>
      <p className='text-gray-500'>The summary you are looking doesn't exist or has been removed</p>
      <Button><Link href={"/"}>Return Home</Link></Button>
    </div>
  )
}

export default NoSummaryPage;

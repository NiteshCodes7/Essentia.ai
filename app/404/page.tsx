'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6 text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Button>
            <Link href={"/"} >Go to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;

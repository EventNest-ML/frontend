import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Button
      variant={"ghost"}
      asChild
    >
      <Link href={"./"}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
    </Button>
  );
}

export default BackButton
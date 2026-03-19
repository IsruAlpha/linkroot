'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-6">
        <Loader2 className="size-8 text-white animate-spin" />
        <p className="text-zinc-500 font-medium font-outfit uppercase tracking-widest text-sm">
            Preparing your checkout...
        </p>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const Tools = ({ item }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL + "/" + item.slug}`);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Error copying to clipboard:', err);
        }
    };

    return (
        <div>
            <button className='hover:bg-gray-300 bg-gray-200 p-2 rounded text-neutral-700 text-sm flex gap-1 duration-300' onClick={handleCopyClick}>
                <Copy className='text-neutral-600' size={18} />
                {isCopied ? 'Copied' : 'Copy'}
            </button>

        </div>
    );
};

export default Tools;
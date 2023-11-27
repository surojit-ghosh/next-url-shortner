import React from 'react';
import CreateLink from './components/Create.jsx';
import { getServerSession } from 'next-auth';
import userModel from '@/models/user.js';
import linkModel from '@/models/link.js';
import connect from '@/utils/db.js';
import { format, parseISO } from "date-fns"
import Link from 'next/link.js';
import { Calendar, LineChart } from 'lucide-react';
import numeral from "numeral";
import Tools from '@/components/Tools.jsx';

export const revalidate = 3600;

const fetchLinks = async () => {
    try {
        await connect();
        const session = await getServerSession();
        const user = await userModel.findOne({ email: session.user.email });
        const links = await linkModel.find({ user: user._id });

        return JSON.parse(JSON.stringify(links));
    } catch (error) {
        console.log(`Unable to fetch data.`);
    };
};

const ShortenLink = async () => {
    const links = await fetchLinks();

    return (
        <div className=''>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-3xl'>Links</h1>
                <CreateLink />
            </div>

            <div className='mt-20'>
                <div className='space-y-5'>
                    {links?.map((link, index) => (
                        <div key={index} className='bg-neutral-50 rounded-md p-5 flex'>
                            {/* details */}
                            <div className='flex-1'>
                                <div className='flex flex-col gap-2'>
                                    <Link href={"/dashboard/links"}><h1 className='text-xl font-bold hover:underline duration-300'>{link.title ? link.title : `Untitled ${format(parseISO(link.createdAt), "yyyy-MM-dd HH:mm:ss")}`}</h1></Link>
                                    <a className='hover:underline duration-300 text-primary-600 font-semibold' href={`${process.env.NEXT_PUBLIC_URL + "/" + link.slug}`} rel="noreferrer" target="_blank">{`${process.env.NEXT_PUBLIC_URL + "/" + link.slug}`}</a>
                                    <a className='hover:underline duration-300' href={`${link.url}`} rel="noreferrer" target="_blank">{`${link.url}`}</a>
                                </div>

                                {/* stats div */}
                                <div className='mt-10 flex gap-6'>
                                    <div className='flex items-center gap-1.5'><LineChart size={18} className='text-neutral-600' /><span className='text-neutral-600 text-sm'>{numeral(link.clicks?.length || 0).format("0a")}</span></div>

                                    <div className='flex items-center gap-1.5'><Calendar size={18} className='text-neutral-600' /><span className='text-neutral-600 text-sm'>{format(parseISO(link.createdAt), "MMM dd, yyyy")}</span></div>
                                </div>
                            </div>

                            {/* actions */}
                            <Tools item={link} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShortenLink;
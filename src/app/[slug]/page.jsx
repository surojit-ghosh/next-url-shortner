import linkModel from '@/models/link.js';
import { redirect } from 'next/navigation';

const Link = async ({ params }) => {
    const url = await linkModel.findOne({ slug: params.slug });

    if (url) {
        redirect(url.url);
    };

    return <div>URL not found</div>;
};

export default Link;
import { NextRequest, NextResponse } from "next/server";
import linkModel from "@/models/link.js";
import connect from "@/utils/db.js";
import { getServerSession } from "next-auth";
import userModel from "@/models/user.js";

/**
 * @param {NextRequest} request 
 */
export async function POST(request) {
    try {
        await connect();

        const data = await request.json();

        const session = await getServerSession();

        const user = await userModel.findOne({ email: session.user.email });

        if (!session || !session.user || !user) {
            return NextResponse.json({ error: "unauthorized", message: 'unauthorized' }, { status: 401 });
        };

        if (data.slug) {
            const existingUrlWithSlug = await linkModel.findOne({ slug: data.slug });

            if (existingUrlWithSlug) {
                return NextResponse.json({ error: "existing_slug", message: 'Custom slug is not available. Please choose another one.' }, { status: 400 });
            };
        };

        let slug = data.slug || generateRandomSlug();

        let existingSlug;
        do {
            existingSlug = await linkModel.findOne({ slug });

            if (existingSlug) {
                slug = generateRandomSlug();
            };
        } while (existingSlug);

        let linkData = { url: data.url, slug, user: user._id };
        if (data.expiresOn) linkData.expiresOn = data.expiresOn;
        const newLink = new linkModel(linkData);

        const newSavedLink = await newLink.save();

        return NextResponse.json({ message: "Successfully created a new Link.", data: newSavedLink }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "server_error", message: "Unable to create link." }, { status: 404 });
    };
};

function generateRandomSlug() {
    return Math.random().toString(36).slice(2, 10);
};
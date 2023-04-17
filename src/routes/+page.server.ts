import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async () => {
    return {
        articles: await prisma.article.findMany()
    };
}) satisfies PageServerLoad;

import type { Actions } from './$types';

export const actions = {
    createArticle: async ({ request }) => {
        const { title, content } = Object.fromEntries(
            await request.formData()
        ) as { title: string, content: string }

        try {
            await prisma.article.create({
                data: {
                    title,
                    content
                }
            })
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: "Could not create the article."
            })
        }
        return {
            status: 201
        };
    },

    deleteArticle: async ({ url }) => {
        const id = url.searchParams.get("id");
        if (!id) {
            return fail(400, { message: "invalid request" })
        }

        try {
            await prisma.article.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: "Something went wrong deleting your article."
            })
        }
        return {
            status: 200
        };
    }
} satisfies Actions;

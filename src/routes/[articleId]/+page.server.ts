import type { PageServerLoad } from './$types';
import { prisma } from "$lib/server/prisma";
import { error, fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    async function getArticle() {
        const article = await prisma.article.findUnique({
            where: {
                id: Number(params.articleId)
            }
        });
        if (!article) {
            throw error(404, { message: "Article not found" });

        }
        return article;
    }
    return { article: getArticle() };
}) satisfies PageServerLoad;

import type { Actions } from './$types';

export const actions = {
    updateArticle: async ({ request, params }) => {
        const { title, content } = Object.fromEntries(
            await request.formData()
        ) as { title: string, content: string };
        try {
            await prisma.article.update({
                where: {
                    id: Number(params.articleId)
                },
                data: {
                    title,
                    content
                }
            })
            
        } catch (error) {
            console.error(error);
            return fail(500, {
                message: "Could not update the article."
            })
        }
        return {
            status: 200
        };
    }
} satisfies Actions;

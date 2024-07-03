import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];
        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name! || identity.email!,
            imageUrl: randomImage
        })

        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id('boards')
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }

        // delete favorites
        const userId = identity.subject;
        const existingFavorites = await ctx.db
            .query('userFavorites')
            .withIndex('by_user_board', (q) => 
                q
                    .eq('userId', userId)
                    .eq('boardId', args.id)
            ).unique();

        if (existingFavorites) {
            await ctx.db.delete(existingFavorites._id);
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: {
        id: v.id('boards'),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error('Title is required');
        }

        if (title.length > 60) {
            throw new Error('Maximum title length is 60 characters');
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title
        })

        return board;
    }
})

export const favorite = mutation({
    args: {
        id: v.id('boards'),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }


        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }

        const userId = identity.subject;
        const existingFavorites = await ctx.db
            .query('userFavorites')
            .withIndex('by_user_board_org', (q) => 
                q
                .eq('userId', userId)
                .eq('boardId', board._id)
                .eq('orgId', args.orgId)
        )
            .unique();
 
        if (existingFavorites) {
            throw new Error('Board already favorited');
        }

        await ctx.db.insert('userFavorites', {
            userId,
            boardId: board._id,
            orgId: args.orgId
        });

        return board;
    }
})

export const unfavorite = mutation({
    args: {
        id: v.id('boards'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthorized')
        }


        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }

        const userId = identity.subject;
        const existingFavorites = await ctx.db
            .query('userFavorites')
            .withIndex('by_user_board_org', (q) => 
                q
                .eq('userId', userId)
                .eq('boardId', board._id)
                .eq('orgId', board.orgId)
        )
            .unique();
 
        if (!existingFavorites) {
            throw new Error('Favorite board not found');
        }

        await ctx.db.delete(existingFavorites._id);
        
        return board;
    }
})
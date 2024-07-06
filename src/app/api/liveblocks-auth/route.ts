// import { auth, currentUser } from "@clerk/nextjs/server";

// import { Liveblocks } from "@liveblocks/node";
// import { ConvexHttpClient } from "convex/browser";

// import { api } from "../../../../convex/_generated/api";

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// const liveblocks = new Liveblocks({
//   secret: process.env.SECRET_API_KEY!,
// });

// export async function POST(request: Request) {
//     const authorization = await auth();
//     const user = await currentUser();

//     console.log('User', user);
//     console.log('Auth', authorization);

//     if (!authorization || !user) {
//         return new Response("Unauthorized", { status: 403 })
//     }

//     const { room } = await request.json();
//     const board = await convex.query(api.board.get, { id: room });

//     // console.log('Board', board);

//     if (board?.orgId !== authorization.orgId) {
//         // console.log('True', board?.orgId !== authorization.orgId)
//         return new Response("Unauthorized", { status: 403 })
//     }

//     const userInfo = {
//         name: user.firstName || "Anonymous",
//         picture: user.imageUrl
//     }

//     // console.log('userInfo', userInfo);

//     const session = liveblocks.prepareSession(
//         user.id,
//         { userInfo }
//     );

//     if (room) {
//         // console.log('room', room)
//         session.allow('room', session.FULL_ACCESS);
//     }

//     const { status, body } = await session.authorize();

//     // console.log({status, body}, 'Allowed')

//     return new Response(body, { status })
// }

import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.SECRET_API_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log('User:', user);
  console.log('Authorization:', authorization);

  if (!authorization || !user) {
    console.log('Unauthorized access: Missing auth or user');
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  console.log('Board:', board);

  if (board?.orgId !== authorization.orgId) {
    console.log('Unauthorized access: OrgId mismatch');
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  console.log('Authorization Status:', status);
  console.log('Authorization Body:', body);

  return new Response(body, { status });
}

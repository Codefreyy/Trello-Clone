## Fullstack Trello Clone

This is a Fullstack Trello Clone: Next.js 14, Server Actions, React, Prisma, Stripe, Tailwind, MySQL

### Key Features:
- Auth
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited boards
- Landing page
- MySQL DB
- Prisma ORM
- shadcnUI & TailwindCSS

### How to set up
#### Clone the repository
```
git clone https://github.com/Codefreyy/Trello-Clone.git
```
#### Install packages
```
npm i
```
#### Setup .env file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

STRIPE_API_KEY=

NEXT_PUBLIC_APP_URL=

STRIPE_WEBHOOK_SECRET=
```
#### Setup Prisma
Add MySQL Database
```
npx prisma generate
npx prisma db push
```
#### Start the app
```
npm run dev
```
#### Resources
1. Add authentication and user management to your Next.js app with [Clerk](https://clerk.com/docs/quickstarts/nextjs?_gl=1*oofofx*_gcl_au*MTczNDE5Njk0MC4xNzA0NjUyNjM5*_ga*MTExOTgyODg2Ni4xNzA0NjUyNjM5*_ga_1WMF5X234K*MTcwNDY1MjYzOS4xLjEuMTcwNDY1MjY3Mi4wLjAuMA..) in 7 minutes 
2. [Upsplash API](https://unsplash.com/developers) for getting free beautiful photos for boards
3. [hello-pangea](https://github.com/hello-pangea/dnd): Beautiful and accessible drag and drop for lists with React.
4. [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference

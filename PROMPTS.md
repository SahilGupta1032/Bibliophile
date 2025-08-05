# Prompt Engineering Log

This file documents the key prompts used during the development of Bibliophile, a modern book tracker application.

## Initial Project Setup

- `npx create-next-app@latest bibliophile --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- `cd bibliophile && npm install @prisma/client prisma @auth/prisma-adapter next-auth@beta zod framer-motion react-hot-toast lucide-react @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast class-variance-authority clsx tailwind-merge`
- `npx shadcn-ui@latest init`
- `npx shadcn-ui@latest add button card input label form dialog dropdown-menu select sonner skeleton badge`

## Database & Schema

- **Create Prisma Schema**: I designed the Prisma schema with the `User`, `Account`, `Session`, `VerificationToken`, and `Book` models, including an enum for `Genre`.

- **Database Seeding**: I created a seed script at `src/lib/seed.ts` to populate the database with a demo user and a diverse collection of 50 books.

## Authentication

- **Auth.js v5 Setup**: I configured Auth.js v5 with the Prisma adapter, including setting up the `authorize` function with password hashing using `bcryptjs`.

- **Sign-in/Sign-up Pages**: I built client-side sign-in and sign-up pages with forms, validation, and loading states.

- **Server Actions**: I created server actions for user registration (`signUpAction`) and sign-in (`signInAction`), including error handling and success/error feedback.

## Book Management

- **CRUD Actions**: I implemented server actions for creating, updating, and deleting books, with robust validation using Zod.

- **Dialog Components**: I built dialog components for creating, editing, and confirming the deletion of books, with integrated forms and loading states.

- **Optimistic UI**: I implemented optimistic UI for book deletion to provide instant feedback to the user.

## UI/UX & Design

- **Landing Page**: I designed a beautiful and responsive landing page with animations and a clear call-to-action.

- **Dashboard**: I created a dashboard with a clean layout, including a header with user actions and a paginated book list.

- **Book Card Component**: I designed a book card component with a hover effect, dropdown menu for actions, and clear information hierarchy.

- **Filters & Pagination**: I implemented client-side filters for genre and reading status, with debounced search and URL-based state management.

- **Loading States**: I used skeleton loaders for the book list to improve the user experience during data fetching.

## Error Resolution & Debugging

- **NextAuth.js v5 Migration**: I resolved issues with the NextAuth.js v5 migration by updating the `getServerSession` function to the new `auth` function and fixing import paths.

- **Tailwind CSS Configuration**: I fixed CSS loading issues by creating a proper `tailwind.config.ts` file and ensuring correct content paths.

- **Font Loading**: I resolved font loading issues by switching from Google Fonts to system fonts to ensure consistent rendering.

This log provides a high-level overview of the prompts and development process. For more detailed information, please refer to the commit history and the codebase itself.

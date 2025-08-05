# Bibliophile - Your Personal Book Tracker

A minimalist, elegant, and highly performant web application for discerning readers. Bibliophile serves as a personal library where users can meticulously track, manage, and rediscover their book collection.

![Bibliophile Banner](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80)

## ✨ Features

- **📚 Book Management**: Complete CRUD operations for your book collection
- **🔍 Advanced Search & Filtering**: Search by title, author, genre, and reading status
- **📖 Reading Status Tracking**: Mark books as read/unread with one click
- **⭐ Rating System**: Rate your books from 1-5 stars
- **🎨 Beautiful UI**: Clean, modern interface built with shadcn/ui components
- **📱 Responsive Design**: Fully responsive, mobile-first design
- **✨ Smooth Animations**: Fluid transitions using Framer Motion
- **🔐 Secure Authentication**: Email/password authentication with NextAuth.js
- **📊 Pagination**: Efficient pagination for large book collections

## 🛠️ Tech Stack

### Framework & Core
- **Next.js 14+** (App Router, TypeScript)
- **React 19** with TypeScript for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

### Database & Authentication
- **Neon** (Serverless PostgreSQL)
- **Prisma** as ORM
- **Auth.js v5** for authentication
- **@auth/prisma-adapter** for database integration

### Validation & Animations
- **Zod** for schema validation
- **Framer Motion** for animations
- **React Hook Form** with Zod resolver

### Additional Libraries
- **Lucide React** for icons
- **Sonner** for toast notifications
- **bcryptjs** for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- A Neon database (or any PostgreSQL database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bibliophile.git
   cd bibliophile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"
   
   # Auth.js
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Database Schema

### User Model
- `id`: Unique identifier (CUID)
- `email`: User's email address
- `name`: User's display name
- `password`: Hashed password
- `books`: Relation to user's books

### Book Model
- `id`: Unique identifier (CUID)
- `title`: Book title
- `author`: Book author
- `genre`: Book genre (enum: FICTION, NON_FICTION, BIOGRAPHY, SELF_HELP, OTHER)
- `publishedYear`: Year of publication
- `rating`: User's rating (1-5, optional)
- `isRead`: Reading status (boolean)
- `description`: Book description (optional)
- `userId`: Foreign key to User
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 🎨 Design Philosophy

Bibliophile follows a minimalist design philosophy with:
- **Clean Typography**: Inter font for excellent readability
- **Consistent Spacing**: Systematic spacing using Tailwind utilities
- **Intuitive Navigation**: Simple, clear navigation patterns
- **Responsive Layout**: Mobile-first approach with fluid breakpoints
- **Accessible Design**: Proper contrast ratios and keyboard navigation

## 🔐 Authentication Flow

1. **Sign Up**: Users create accounts with email/password
2. **Sign In**: Secure authentication using NextAuth.js
3. **Session Management**: JWT-based sessions with automatic renewal
4. **Protected Routes**: Middleware protection for authenticated pages

## 📖 Usage Guide

### Adding Books
1. Click "Add Book" from the dashboard
2. Fill in book details (title, author, genre, etc.)
3. Optionally add a rating and description
4. Save to add to your library

### Managing Your Library
- **Search**: Use the search bar to find books by title or author
- **Filter**: Filter by genre or reading status
- **Sort**: Books are sorted by date added (newest first)
- **Pagination**: Navigate through your collection with pagination

### Reading Status
- Click the status button on any book card to toggle read/unread
- Visual indicators show reading status at a glance

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Environment Variables for Production
```env
DATABASE_URL="your-neon-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Vercel** for hosting and deployment platform
- **Neon** for the serverless PostgreSQL database
- **Lucide** for the icon set

## 🐛 Known Issues & Roadmap

### Current Limitations
- Single-user authentication (no social auth yet)
- Basic book information only
- No book cover images
- No import/export functionality

### Future Enhancements
- [ ] Book cover image support
- [ ] Goodreads integration
- [ ] Reading statistics and analytics
- [ ] Book recommendations
- [ ] Social features (sharing, reviews)
- [ ] Mobile app companion
- [ ] Dark mode toggle
- [ ] Bulk operations
- [ ] Advanced search filters
- [ ] Reading goals and tracking

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/bibliophile/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Built with ❤️ for book lovers everywhere**

import { PrismaClient, Genre } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create a demo user
  const hashedPassword = await hash('password123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: hashedPassword,
    },
  })

  console.log(`Created demo user with id: ${user.id}`)

  const books = [
    // Fiction
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: Genre.FICTION, publishedYear: 1960, rating: 5 },
    { title: "1984", author: "George Orwell", genre: Genre.FICTION, publishedYear: 1949, rating: 5 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: Genre.FICTION, publishedYear: 1925, rating: 4 },
    { title: "Moby Dick", author: "Herman Melville", genre: Genre.FICTION, publishedYear: 1851, rating: 4 },
    { title: "Pride and Prejudice", author: "Jane Austen", genre: Genre.FICTION, publishedYear: 1813, rating: 5 },
    // ... more books up to 50
  ]

  for (const book of books) {
    await prisma.book.create({
      data: {
        ...book,
        userId: user.id,
      },
    })
  }

  console.log(`Seeded ${books.length} books for demo user.`)
  console.log("Database seeding complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

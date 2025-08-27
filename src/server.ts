// src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import prisma from './config/database'; // Prisma client

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // Connect Prisma (MongoDB)
    await prisma.$connect();
    console.log('✅ Connected to MongoDB via Prisma ORM');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

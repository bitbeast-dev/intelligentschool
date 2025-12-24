# Database & Cloud Setup Guide

## 1. Supabase PostgreSQL Setup

### Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Copy your database connection string
4. Update `.env` file:
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

## 2. Cloudinary Setup

### Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for free account
3. Get credentials from Dashboard
4. Update `.env` file:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 3. Environment Variables

Update `.env` file with your credentials.

## 4. Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## 5. API Endpoints

All APIs now use Prisma with PostgreSQL:
- `/api/students` - CRUD operations
- `/api/teachers` - CRUD operations
- `/api/classes` - CRUD operations
- `/api/analytics/*` - Analytics data
- `/api/upload` - Image upload to Cloudinary

## 6. Image Upload Usage

```typescript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const { url } = await response.json();
```

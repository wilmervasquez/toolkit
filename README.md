# Vita Care

A modern application register appointement medical
## 1. Introduccion
### 1. Installing
```bash
git clone git@github.com/wilmervasquez/market.git
cd market
pnpm install
```
### 1. Requiriments
```bash
pnpm add -g tsx
pnpm add -g prisma
```
### ✨ Features

- 🛍️ **Product Management** - Browse, search, and manage products
- 🔐 **Authentication** - Secure user registration and login with Lucia Auth
- 💳 **Payment Processing** - Integrated payment system
- 📊 **Analytics & Metrics** - Track user engagement and sales
- 👥 **User Management** - Admin panel for user administration
- 📋 **Attendance System** - Track user attendance and visits
- 🤖 **AI Integration** - Google Generative AI for enhanced features
- 📱 **QR Code Support** - Generate and scan QR codes
- 📧 **Email Integration** - Send emails using Resend
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS

### Tech Stack

- **Frontend**: SvelteKit 2.x, TypeScript, Tailwind CSS 4.0
- **Backend**: SvelteKit API routes, Lucia Auth
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Lucia Auth with Prisma adapter
- **AI**: Google Generative AI
- **Email**: Resend
- **Image Processing**: Sharp
- **Development**: Vite, ESLint
---

## 2. Getting Started
### 1. Tools
| Proyectos | Macros |
|:---------:|-------:|
|node       |v22.0   |
|POstgreSQL |v16     |

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis
- pnpm (recommended package manager)

### Installation
1. **Clone repoository**:
   ```bash
   git clone git@github.com:wilmervasquez/vitacare-web.com
   cd vitacare-web
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   > Update the `.env` file with your configuration:

4. **Database Setup**:
   ```bash
   npx prisma generate # Generate Prisma client
   npx prisma migrate dev --name init # Run database migrations
   npx prisma db seed # (Optional) Seed the database
   ```

5. **Start the development server**:
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Run Svelte type checking
- `pnpm lint` - Run ESLint
- `pnpm db:fresh` - Reset database and run fresh migrations
- `pnpm db:liam` - Generate ERD from Prisma schema

---
## Utilities
```bash
pnpm add -g serve
pnpm add -g @liam-hq/cli # liam
pnpm add -g prisma
pnpm add -g serve
```

## 🔧 Configuration

### Database Schema

The application uses a modular Prisma schema structure:

- `user.prisma` - User accounts and profiles
- `product.prisma` - Product catalog
- `order.prisma` - Order management
- `payment.prisma` - Payment processing
- `attendance.prisma` - Attendance tracking
- `session.prisma` - User sessions
- `visit.prisma` - Visit tracking
- `bookmark.prisma` - User bookmarks

### Authentication

The app uses Lucia Auth for secure authentication with PostgreSQL session storage.

### AI Integration

Google Generative AI is integrated for enhanced features. Configure your API key in the environment variables.

---
## 🚀 Deployment

### Cloudflare Workers

This project is configured for Cloudflare Workers deployment:

```bash
pnpm build # Deploy using Cloudflare Workers
```

### Other Platforms

The application can be deployed to various platforms. Update the adapter in `svelte.config.js` as needed.

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---
## 📝 License

This project is licensed under the [MIT License](LICENSE).
---

## 📞 Support
If you have any questions or need help, please open an issue on GitHub.
> ![NOTE]
> n

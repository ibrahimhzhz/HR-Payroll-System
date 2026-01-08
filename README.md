# HR-Payroll Management System

A modern, full-featured HR and Payroll management dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

## 🎯 Features

### Dashboard Views (Role-Based)
- **Employee View:** Leave balance, compensation tracking, schedule status
- **Manager View:** Team approvals queue, operations control, pending authorizations
- **Admin View:** Payroll health, workforce analytics, compliance radar

### Core Modules
- 📊 **Dashboard** - Multi-role operational overview
- 💼 **Employees** - Directory, search, and employee records
- 💰 **Payroll** - Run history, payment tracking, Xero integration
- 📅 **Leave & WFH** - Request management and history
- 📄 **Documents** - Compliance documentation tracking

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Run dev server (client only)
npm run dev:client
# Available at: http://localhost:5000

# Or run full stack with Express backend
npm run dev
```

### Production Build
```bash
# Build client for deployment
npm run build:client

# Build full-stack application
npm run build
```

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4, Tailwind Merge, Class Variance Authority
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** TanStack React Query
- **Form Handling:** React Hook Form with Zod validation
- **Routing:** Wouter (lightweight alternative to React Router)
- **Backend:** Express.js (optional, uses mock data for standalone mode)
- **ORM:** Drizzle ORM

## 📋 User Roles

The system supports three role-based views:

1. **Employee** - View personal leave, compensation, schedule
2. **Manager** - Approve/reject leave requests, team oversight
3. **Admin** - System administration, payroll control, compliance

Switch roles using the context selector on the dashboard.

## 🎨 Design System

- **Color Scheme:** Midnight Indigo (#1E2A5A) + Electric Blue gradient
- **Typography:** Inter (body) + Plus Jakarta Sans (headings)
- **Components:** Modern glass morphism with smooth animations
- **Spacing:** Rem-based responsive sizing

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Deploy to GitHub Pages or self-hosted
- [Component Library](./client/src/components/ui/) - Reusable UI components

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom settings:
```env
VITE_API_URL=http://localhost:5000
```

### Mock Data
Employee and payroll data is seeded in `client/src/lib/mockData.ts`. Modify to suit your needs.

## 📂 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Role-based dashboards
│   │   ├── layout/         # Sidebar, header layouts
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Page components
│   ├── lib/                # Utilities and mock data
│   ├── hooks/              # Custom React hooks
│   └── main.tsx            # Entry point
├── index.html
└── vite.config.ts

server/                       # Express backend (optional)
shared/                       # Shared schemas and types
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🎓 Learning Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Known Limitations

- **Data Persistence:** All data is stored in memory. Refresh resets the data.
- **Backend:** Uses mock data by default. Requires backend integration for production.
- **Authentication:** No auth system included. Add your own for security.

## 🚀 Future Enhancements

- [ ] Real database integration
- [ ] User authentication & authorization
- [ ] Email notifications
- [ ] Advanced reporting & analytics
- [ ] Mobile app version
- [ ] Xero API integration
- [ ] Multi-language support

---

**Built with ❤️ for modern HR management**

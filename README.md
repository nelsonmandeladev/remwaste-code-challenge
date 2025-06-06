# RemWaste Code Challenge

A modern, full-stack React application built with React Router, TypeScript, and TailwindCSS.

## Project Overview

This project is a code challenge implementation that demonstrates modern web development practices and best practices in React application development.

## Tech Stack

### Core Technologies

- ⚛️ React 19
- 🎯 TypeScript
- 🛣️ React Router 7
- 🎨 TailwindCSS 4
- ⚡️ Vite 6

## Code Quality Tools

### Git Hooks with Husky

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks and ensure code quality before commits. The following hooks are configured:

- **pre-commit**: Runs lint-staged to format and check code before each commit

### Code Formatting

- **Prettier**: Automatic code formatting on commit
- **lint-staged**: Runs Prettier on staged files before commit

### Setup Git Hooks

After cloning the repository, the Git hooks will be automatically set up when you run:

```bash
npm install
```

This is handled by the `prepare` script in package.json which sets up Husky.

### Manual Setup

If you need to set up the hooks manually:

```bash
npx husky install
```

### Adding New Hooks

To add new Git hooks:

```bash
npx husky add .husky/hook-name "command-to-run"
```

### Key Libraries

- `@tabler/icons-react` - Modern icon library
- `clsx` & `tailwind-merge` - Utility libraries for class name management
- `motion` - Animation library
- `nuqs` - URL state management

## Project Structure

```
├── app/              # Main application routes and pages
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── libs/            # Utility functions and shared logic
├── public/          # Static assets
├── services/        # API and external service integrations
├── types/           # TypeScript type definitions
└── mocks/           # Mock data for development
```

## Top Features

- 🚀 Modern React with Server-Side Rendering
- ⚡️ Hot Module Replacement (HMR) for fast development
- 📦 Optimized production builds
- 🔒 TypeScript for type safety
- 🎨 TailwindCSS for utility-first styling
- 📱 Responsive design
- 🔄 Efficient data loading and state management
- 🎯 Clean and maintainable code structure

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nelsonmandeladev/remwaste-code-challenge.git
cd remwaste-code-chalenge
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Implementation Approach

### Architecture Overview

The application follows a modern React architecture with a focus on maintainability, scalability, and performance. Here's a detailed breakdown of the implementation approach:

#### 1. Project Structure

```
├── app/                    # Main application code
│   ├── routes/            # Route components
│   ├── root.tsx           # Root layout component
│   └── routes.ts          # Route definitions
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── libs/                 # Utility functions
├── services/             # API and external services
├── types/                # TypeScript type definitions
└── mocks/                # Mock data for development
```

#### 2. Key Technical Decisions

1. **React Router 7**

   - Utilized for client-side routing
   - Implements nested routes for better code organization
   - Leverages data loading capabilities for efficient data fetching

2. **TypeScript Integration**

   - Strong typing throughout the application
   - Custom type definitions for better code maintainability
   - Strict type checking enabled for better code quality

3. **State Management**

   - React hooks for local state management
   - URL state management using `nuqs` for shareable states
   - Efficient data loading patterns

4. **Styling Approach**

   - TailwindCSS for utility-first styling
   - Responsive design implementation
   - Custom component styling with CSS modules

5. **Code Quality**
   - Husky for Git hooks
   - Prettier for code formatting
   - lint-staged for pre-commit checks
   - TypeScript for type safety

#### 3. Development Workflow

1. **Local Development**

   - Hot Module Replacement (HMR) for fast development
   - TypeScript type checking
   - Automatic code formatting on save

2. **Code Quality Checks**
   - Pre-commit hooks for code formatting
   - TypeScript type checking
   - Consistent code style enforcement

#### 6. Deployment Strategy

1. **Build Process**

   - Production build optimization
   - Environment-specific configurations
   - Asset optimization

2. **Docker Integration**
   - Containerized deployment
   - Environment isolation
   - Easy scaling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages
- Add appropriate comments and documentation
- Follow the existing project structure

## License

This project is proprietary and confidential.

---

Built with ❤️ using React Router and modern web technologies.

# Flor Guzman Portfolio

![Build Status](https://github.com/username/rayoalmar/actions/workflows/deploy.yml/badge.svg)

A modern, minimal portfolio website for Flor Guzman showcasing photography, shoots, sketchup drawings, and personal information.

## Live Demo

Visit the live site: [https://rayoalmar.com](https://rayoalmar.com)

## Tech Stack

- **Framework**: React 19+ with TypeScript 5+
- **Build Tool**: Vite 7+
- **Styling**: CSS Modules with custom design tokens
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## Project Structure

```
rayoalmar/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Header/       # Navigation header component
│   ├── sections/         # Main page sections
│   │   ├── PhotoSessions/
│   │   ├── Shoots/
│   │   ├── Sketchup/
│   │   └── AboutMe/
│   ├── hooks/            # Custom React hooks
│   │   ├── useHeaderVisibility.ts
│   │   └── useActiveSection.ts
│   ├── styles/           # Global styles and design system
│   │   ├── reset.css     # CSS reset
│   │   ├── variables.css # Design tokens
│   │   └── global.css    # Global styles
│   ├── App.tsx           # Main application container
│   └── main.tsx          # Application entry point
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/username/rayoalmar.git
cd rayoalmar
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run deploy` - Deploy to GitHub Pages

## 🧪 Testing

This project uses Vitest and React Testing Library for comprehensive test coverage.

### Running Tests

**Run all tests:**

```bash
npm run test
```

**Run tests in watch mode (for development):**

```bash
npm run test -- --watch
```

**Run tests with UI:**

```bash
npm run test:ui
```

**Generate coverage report:**

```bash
npm run test:coverage
```

The coverage report will be available in:

- Terminal output (text format)
- `coverage/index.html` (detailed HTML report)

### Test Structure

Tests are organized alongside their source files:

- **Component tests**: `src/components/[Component]/[Component].test.tsx`
- **Section tests**: `src/sections/[Section]/[Section].test.tsx`
- **Hook tests**: `src/hooks/[hookName].test.ts`
- **Integration tests**: `src/tests/[feature].test.tsx`
- **Mock fixtures**: `src/tests/fixtures/`

### Writing New Tests

Follow these patterns when writing tests:

1. **Component Tests** - Test rendering and basic interactions:

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

it('renders component with props', () => {
  render(<MyComponent title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

2. **Hook Tests** - Use `renderHook` utility:

```typescript
import { renderHook } from '@testing-library/react';
import { useMyHook } from './useMyHook';

it('returns expected values', () => {
  const { result } = renderHook(() => useMyHook());
  expect(result.current).toBeTruthy();
});
```

3. **Integration Tests** - Test multiple components working together:

```typescript
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

it('navigation works correctly', () => {
  render(<App />);
  // Test user workflows
});
```

### Mock Data Fixtures

Use mock fixtures in tests to avoid coupling with production data:

```typescript
import { mockPhotoSessions } from '../../tests/fixtures';

// Use in tests
<Grid data={mockPhotoSessions} />
```

Fixtures are located in `src/tests/fixtures/` and mirror the structure of production data.

### Coverage Goals

- **Target**: 80% coverage for lines, branches, functions, and statements
- **CI/CD**: Tests run automatically on all pull requests
- **Coverage check**: Build fails if coverage drops below 80%

## Design System

The project uses a comprehensive design system with CSS custom properties:

### Colors

- Background: `#ffffff`
- Text: `#1a1a1a`
- Accent: `#2c2c2c`
- Hover: `#000000`

### Spacing Scale

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 32px
- XL: 64px
- 2XL: 96px

### Typography

- Base Font: System font stack
- Heading Font: Georgia, serif
- Responsive font sizes with mobile-first approach

### Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1024px
- Desktop: 1025px+

## Testing

The project uses Vitest and React Testing Library for testing. Tests are focused on critical user workflows:

- Header component rendering and interactions
- Active section detection with IntersectionObserver
- Section components rendering with proper IDs and ARIA labels
- Navigation flow (click → scroll → active state update)

Run tests with:

```bash
npm run test
```

## Deployment

The project is configured for automated deployment to GitHub Pages:

1. **Automatic Deployment**: Push to `main` branch triggers CI/CD pipeline
2. **Manual Deployment**: Run `npm run deploy` to deploy manually

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set source to "GitHub Actions"
3. The workflow will automatically deploy on push to main

### CI/CD Pipeline

The GitHub Actions workflow runs on every push and pull request:

- **CI Job**: Lints, formats, and builds the project
- **Deploy Job**: Deploys to GitHub Pages (only on main branch)

## Future Enhancements

- Add real content to all sections
- Implement image galleries with lightbox
- Add contact form in About Me section
- Implement mobile footer navigation
- Add animations and transitions
- Integrate with a CMS for content management

## Architecture Decisions

- **CSS Modules**: Scoped styling to prevent conflicts
- **Custom Hooks**: Reusable logic for header visibility and active section tracking
- **IntersectionObserver**: Efficient viewport tracking for active sections
- **Mobile-first**: Progressive enhancement from mobile to desktop
- **Semantic HTML**: Proper use of HTML5 elements for accessibility

## 📄 License

This project is private and all rights are reserved.

## 👤 Author

**Flor Guzman**

---

Built with ❤️ using React, TypeScript, and Vite

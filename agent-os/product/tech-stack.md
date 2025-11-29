# Tech Stack: Flor Guzman Portfolio

## Overview

This document defines the complete technical stack for the Flor Guzman portfolio website. The stack is optimized for a single-page, static website with excellent performance, maintainability, and developer experience.

---

## Core Technology Decisions

### Frontend Framework
**React 18+**
- **Why**: Component-based architecture for maintainable UI
- **Use Cases**: All UI components, state management, routing
- **Benefits**: Rich ecosystem, excellent tooling, great performance with static generation

### Programming Language
**TypeScript 5+**
- **Why**: Type safety reduces bugs and improves developer experience
- **Use Cases**: All application code
- **Benefits**: Better IDE support, catches errors at compile time, self-documenting code

---

## Development & Build Tools

### Build Tool
**Vite** (Recommended) or **Create React App**
- **Why**: Fast development server, optimized production builds, modern tooling
- **Use Cases**: Development server, production builds, asset optimization
- **Benefits**: 
  - Vite: Lightning-fast HMR, native ESM, optimized builds
  - CRA: Zero-config setup, proven reliability

### Package Manager
**npm** or **yarn**
- **Why**: Standard JavaScript package management
- **Use Cases**: Dependency management, script running
- **Benefits**: Consistent dependency resolution, lock files for reproducible builds

---

## UI & Styling

### Styling Approach
 **Tailwind CSS**
- **Why**: Utility-first CSS for rapid development
- **Use Cases**: All styling with utility classes
- **Benefits**: Consistent design system, smaller bundle sizes, fast prototyping

### Design System
**Custom minimal design system**
- Colors, typography, spacing defined in CSS variables or theme file
- Consistent visual language across all components

---

## Key Libraries & Dependencies

### Image Carousel
**Swiper** or **React Slick**
- **Why**: Battle-tested carousel libraries with great mobile support
- **Use Cases**: Portfolio image galleries
- **Features**: Touch gestures, keyboard navigation, lazy loading, responsive

### Video Player
**React Player** or native HTML5 `<video>`
- **Why**: Simple, lightweight video playback
- **Use Cases**: Short video clips showcase
- **Features**: Cross-browser compatibility, custom controls, responsive sizing

### Internationalization (i18n)
**react-i18next** or **React Intl (formatjs)**
- **Why**: Industry-standard i18n solutions for React
- **Use Cases**: English/Spanish language switching
- **Features**: 
  - Translation management
  - Language detection
  - LocalStorage persistence
  - Pluralization and formatting

### Smooth Scrolling
**react-scroll** or native `scrollIntoView()`
- **Why**: Smooth navigation between sections
- **Use Cases**: Sticky footer anchor navigation
- **Features**: Smooth scroll behavior, offset support, active highlighting

### Icons (Optional)
**React Icons** or **Lucide React**
- **Why**: Lightweight icon libraries with React components
- **Use Cases**: UI icons, social media links, navigation
- **Features**: Tree-shaking, consistent styling, customizable

---

## Testing

### Unit & Integration Testing
**Jest**
- **Why**: Standard testing framework for React applications
- **Use Cases**: Component testing, utility function testing
- **Features**: Snapshot testing, mocking, coverage reports

### React Testing Library
**@testing-library/react**
- **Why**: Best practices for testing React components
- **Use Cases**: Component behavior testing, user interaction testing
- **Features**: Accessibility-focused, user-centric queries

### End-to-End Testing (Optional)
**Playwright** or **Cypress**
- **Why**: Comprehensive browser automation for critical user flows
- **Use Cases**: Full user journey testing
- **When**: Consider for post-launch if complexity warrants it

---

## Deployment & CI/CD

### Hosting Platform
**GitHub Pages**
- **Why**: Free, reliable static hosting with GitHub integration
- **Use Cases**: Production website hosting
- **Features**: Custom domain support, HTTPS, CDN

### Continuous Integration/Deployment
**GitHub Actions**
- **Why**: Native GitHub integration, free for public repos
- **Use Cases**: 
  - Automated testing on pull requests
  - Automated deployment to GitHub Pages
  - Build status checks
- **Workflow**: 
  1. On PR: Run tests and build
  2. On merge to main: Run tests, build, deploy to GitHub Pages

### Domain & DNS (Optional)
**Custom Domain** (if purchasing domain for Flor)
- Configure with GitHub Pages
- Use registrar's DNS or Cloudflare for DNS management

---

## Development Tools

### Code Quality

**ESLint**
- **Why**: Enforce code quality and consistency
- **Config**: eslint-config-react-app or Airbnb style guide
- **Use Cases**: Linting JavaScript/TypeScript code

**Prettier**
- **Why**: Consistent code formatting
- **Config**: Standard Prettier config with team preferences
- **Use Cases**: Auto-format all code files

**Husky + lint-staged**
- **Why**: Enforce quality checks pre-commit
- **Use Cases**: Run linting and formatting before commits
- **Benefits**: Prevent bad code from entering repository

### TypeScript Configuration
**tsconfig.json**
- Strict mode enabled for maximum type safety
- Path aliases for cleaner imports
- JSX: React
- Target: ES2020+ for modern browsers

---

## Performance Optimizations

### Image Optimization
**Sharp** (via build tools) or **next/image**-style optimization
- **Why**: Reduce image file sizes without quality loss
- **Use Cases**: Optimize all portfolio images
- **Features**: WebP conversion, responsive images, lazy loading

### Code Splitting
**React.lazy() + Suspense**
- **Why**: Load code only when needed
- **Use Cases**: Heavy components (carousel, video player)
- **Benefits**: Faster initial page load

### Asset Loading Strategy
- **Critical CSS**: Inline critical styles
- **Lazy Loading**: Images and videos loaded on-demand
- **Preloading**: Preload critical assets
- **Bundle Optimization**: Tree-shaking, minification

---

## Browser Support

### Target Browsers
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Note**: No IE11 support (use modern JavaScript features)

### Polyfills
- Minimal polyfills via browserslist configuration
- Consider core-js for older browser support if needed

---

## Development Environment

### Node.js Version
**Node 18+ LTS**
- **Why**: Modern JavaScript features, active LTS support
- **Version Management**: Use nvm or fnm

### IDE/Editor
**Visual Studio Code** (Recommended)
- **Extensions**:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - CSS Modules

### Git Workflow
- **Main Branch**: `main` (production)
- **Feature Branches**: `feature/feature-name`
- **Pull Requests**: Required for all changes
- **Protected Main**: Require tests to pass before merge

---

## File Structure

```
rayoalmar/
├── public/                    # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── locales/              # Translation files
│       ├── en/
│       │   └── translation.json
│       └── es/
│           └── translation.json
├── src/
│   ├── components/           # React components
│   │   ├── Carousel/
│   │   ├── VideoPlayer/
│   │   ├── Navigation/
│   │   ├── Footer/
│   │   └── LanguageSwitcher/
│   ├── sections/             # Page sections
│   │   ├── PhotoSessions/
│   │   ├── Shoots/
│   │   ├── Sketchup/
│   │   └── About/
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── i18n/                 # i18n configuration
│   ├── types/                # TypeScript types
│   ├── assets/               # Images, videos, fonts
│   ├── styles/               # Global styles
│   ├── App.tsx               # Main app component
│   └── index.tsx             # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── agent-os/                 # Project documentation
│   ├── product/
│   └── standards/
├── package.json
├── tsconfig.json
├── vite.config.ts (or react-scripts)
├── .eslintrc.js
├── .prettierrc
└── README.md
```

---

## Security Considerations

### Content Security Policy
- Define CSP headers for GitHub Pages if possible
- Restrict script sources to same-origin and trusted CDNs

### Dependencies
- Regular dependency updates via Dependabot
- Audit packages with `npm audit`
- Keep dependencies minimal to reduce attack surface

---

## Accessibility Standards

### WCAG Compliance
**Target**: WCAG 2.1 Level AA
- Semantic HTML elements
- Proper ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast ratios
- Alt text for all images
- Captions/transcripts for videos (if applicable)

### Testing Tools
- **axe DevTools**: Browser extension for accessibility testing
- **Lighthouse**: Automated accessibility audits
- **Screen Reader Testing**: Test with VoiceOver (macOS) or NVDA (Windows)

---

## Monitoring & Analytics (Optional)

### Analytics
**Google Analytics 4** or **Plausible Analytics**
- **Why**: Understand visitor behavior and portfolio engagement
- **Privacy**: Consider privacy-friendly alternatives
- **Use Cases**: Track page views, section engagement, language preferences

### Performance Monitoring
**Lighthouse CI**
- **Why**: Monitor performance over time
- **Use Cases**: Performance regression detection in CI/CD

---

## Documentation

### Code Documentation
- JSDoc comments for complex functions
- Component prop documentation via TypeScript interfaces
- README with setup instructions

### Project Documentation
- Mission, roadmap, and tech stack in `agent-os/product/`
- Coding standards in `agent-os/standards/`
- Deployment instructions in README

---

## Summary: Key Decisions

| Category | Technology | Rationale |
|----------|-----------|-----------|
| Frontend | React + TypeScript | Modern, maintainable, type-safe |
| Build Tool | Vite or CRA | Fast development, optimized builds |
| Testing | Jest + RTL | Industry standard for React |
| i18n | react-i18next | Robust internationalization |
| Hosting | GitHub Pages | Free, reliable, integrated with GitHub |
| CI/CD | GitHub Actions | Automated testing and deployment |
| Carousel | Swiper | Great mobile support, feature-rich |
| Video | React Player | Simple, cross-browser compatible |
| Styling | CSS Modules or Tailwind | Component-scoped, maintainable |

---

This tech stack provides a solid foundation for building a performant, maintainable, and beautiful portfolio website for Flor Guzman that can grow and evolve as needed.


# Task Breakdown: Foundation & Core Layout

## Overview
Total Task Groups: 5
Estimated Total Tasks: ~45 individual tasks

## Task List

### Project Setup & Configuration

#### Task Group 1: Initialize Project Structure
**Dependencies:** None

- [ ] 1.0 Complete project initialization
  - [ ] 1.1 Initialize Vite + React + TypeScript project
    - Run: `npm create vite@latest rayoalmar -- --template react-ts`
    - Verify project structure is created correctly
    - Navigate into project directory
  - [ ] 1.2 Install core dependencies
    - Install React 18+ and TypeScript 5+
    - Verify package.json has correct versions
  - [ ] 1.3 Set up Git repository
    - Initialize git: `git init`
    - Create `.gitignore` with node_modules, dist, .env
    - Make initial commit
    - Connect to GitHub remote repository
  - [ ] 1.4 Create folder structure
    - Create `src/components/` directory
    - Create `src/sections/` directory
    - Create `src/styles/` directory
    - Create `src/utils/` directory
    - Create `src/hooks/` directory for custom hooks
  - [ ] 1.5 Configure TypeScript
    - Update `tsconfig.json` with strict mode enabled
    - Add path aliases if needed (`@/components`, `@/sections`, etc.)
    - Set target to ES2020+ for modern browsers
    - Configure JSX: React

**Acceptance Criteria:**
- Vite project runs successfully with `npm run dev`
- TypeScript compilation works without errors
- Folder structure matches requirements
- Git repository initialized and connected to GitHub

#### Task Group 2: Development Tools Setup
**Dependencies:** Task Group 1

- [ ] 2.0 Complete development tools configuration
  - [ ] 2.1 Install and configure ESLint
    - Install ESLint with React and TypeScript plugins
    - Create `.eslintrc.js` or `.eslintrc.json`
    - Add linting rules for React, TypeScript, and accessibility
    - Add lint script to package.json: `"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"`
  - [ ] 2.2 Install and configure Prettier
    - Install Prettier as dev dependency
    - Create `.prettierrc` with formatting preferences
    - Add format script to package.json: `"format": "prettier --write \"src/**/*.{ts,tsx,css}\""`
    - Configure ESLint to work with Prettier (eslint-config-prettier)
  - [ ] 2.3 Set up pre-commit hooks (optional but recommended)
    - Install husky and lint-staged
    - Configure to run linting and formatting before commits
  - [ ] 2.4 Configure Vite for development
    - Update `vite.config.ts` with any needed plugins
    - Configure dev server port and host if needed
    - Verify HMR (Hot Module Replacement) works

**Acceptance Criteria:**
- ESLint runs without errors: `npm run lint`
- Prettier formats code correctly: `npm run format`
- Development server starts and hot reload works
- No linting or formatting warnings in clean code

### Core Layout & Styling

#### Task Group 3: Global Styles and Design System
**Dependencies:** Task Group 2

- [ ] 3.0 Complete global styling setup
  - [ ] 3.1 Choose styling approach
    - Decide between CSS Modules or Tailwind CSS
    - Install necessary styling dependencies
  - [ ] 3.2 Create CSS reset/normalization
    - Add CSS reset or use modern-normalize package
    - Create `src/styles/reset.css` or import normalization
  - [ ] 3.3 Define design tokens
    - Create `src/styles/variables.css` with CSS custom properties
    - Define color palette (minimal, professional colors)
    - Define spacing scale (e.g., 0.25rem, 0.5rem, 1rem, 2rem, 4rem, 6rem)
    - Define typography scale (font sizes, line heights, font families)
    - Define transition/animation durations
  - [ ] 3.4 Create global styles
    - Create `src/styles/global.css`
    - Apply base typography styles (body font, headings)
    - Set up box-sizing, font-smoothing
    - Define responsive breakpoints as CSS variables or media queries
  - [ ] 3.5 Import global styles in main entry
    - Import reset, variables, and global styles in `src/main.tsx`
    - Verify styles apply correctly to the app

**Acceptance Criteria:**
- Design tokens defined and accessible throughout app
- Global styles apply consistently
- Typography looks clean and readable
- No conflicting default browser styles

#### Task Group 4: Main Application Container
**Dependencies:** Task Group 3

- [ ] 4.0 Complete App component and main layout
  - [ ] 4.1 Create App.tsx structure
    - Update `src/App.tsx` to be the main container
    - Use semantic HTML: `<main>` element
    - Set up layout to hold Header and all sections
  - [ ] 4.2 Implement basic responsive layout
    - Apply mobile-first CSS (starts at 320px width)
    - Use CSS Grid or Flexbox for main layout
    - Ensure proper stacking of sections
  - [ ] 4.3 Add container/wrapper styles
    - Create max-width container for content (if needed)
    - Apply consistent horizontal padding
    - Ensure content doesn't touch screen edges on mobile
  - [ ] 4.4 Test initial app render
    - Verify App renders without errors
    - Check responsive behavior at different screen sizes
    - Validate semantic HTML structure

**Acceptance Criteria:**
- App.tsx renders successfully
- Semantic HTML structure in place
- Responsive layout adapts from 320px to desktop
- No console errors or warnings

### Navigation System

#### Task Group 5: Header Component with Pop-up Behavior
**Dependencies:** Task Group 4

- [ ] 5.0 Complete Header component
  - [ ] 5.1 Write 2-8 focused tests for Header component
    - Test: Header renders with all navigation links
    - Test: Header shows/hides based on user interaction
    - Test: Navigation link click triggers scroll (mock scrollIntoView)
    - Test: Active link styling applies correctly
    - Limit to maximum 8 tests focusing on critical behaviors
  - [ ] 5.2 Create Header component structure
    - Create `src/components/Header/Header.tsx`
    - Create `src/components/Header/Header.module.css` (or Tailwind classes)
    - Use semantic `<header>` and `<nav>` elements
    - Add four navigation links: "Photo Sessions", "Shoots", "Sketchup", "About Me"
  - [ ] 5.3 Implement fixed positioning
    - Position header fixed at top of viewport
    - Ensure header stays on top with proper z-index
    - Add smooth transitions for appearance/disappearance
  - [ ] 5.4 Implement auto-hide/reveal behavior
    - Create custom hook `useHeaderVisibility` in `src/hooks/`
    - Detect mouse movement and touch interactions
    - Show header on interaction, hide after inactivity (e.g., 3 seconds)
    - Use debouncing to prevent excessive state updates
  - [ ] 5.5 Style Header with minimal design
    - Apply clean typography and generous padding
    - Add spacing between navigation items (1-2rem minimum)
    - Create subtle background or border to distinguish from content
    - Ensure high contrast for accessibility (4.5:1 ratio)
    - Add hover states with smooth transitions
  - [ ] 5.6 Make Header responsive
    - Ensure header works on mobile (320px+), tablet, and desktop
    - Adjust padding and font sizes for different breakpoints
    - Ensure touch targets are 44x44px minimum on mobile
  - [ ] 5.7 Ensure Header tests pass
    - Run ONLY the 2-8 tests written in 5.1
    - Verify header renders and interacts correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 5.1 pass
- Header appears/disappears based on user interaction
- Navigation links are clearly visible and accessible
- Header is responsive across all breakpoints
- Minimal, modern styling matches design intent

#### Task Group 6: Smooth Scrolling Navigation
**Dependencies:** Task Group 5

- [ ] 6.0 Complete smooth scrolling functionality
  - [ ] 6.1 Create scroll utility function
    - Create `src/utils/scroll.ts`
    - Implement smooth scroll function using `scrollIntoView({ behavior: 'smooth' })`
    - Add scroll offset to account for fixed header height
    - Handle edge cases (already at section, invalid target)
  - [ ] 6.2 Add click handlers to navigation links
    - Update Header component to handle link clicks
    - Prevent default anchor behavior
    - Call scroll utility with target section ID
    - Ensure accessibility: maintain keyboard navigation
  - [ ] 6.3 Test smooth scrolling across browsers
    - Verify smooth scrolling works in Chrome, Firefox, Safari, Edge
    - Test on mobile devices (iOS Safari, Chrome Mobile)
    - Ensure scroll offset correctly accounts for header height
  - [ ] 6.4 Handle scroll-to-section edge cases
    - Test clicking same section when already in view
    - Verify scrolling doesn't break on rapid clicks
    - Ensure smooth scrolling works on page load with hash URLs (if applicable)

**Acceptance Criteria:**
- Clicking navigation links smoothly scrolls to corresponding sections
- Scroll offset properly accounts for fixed header
- Works across all modern browsers
- Keyboard navigation remains functional

#### Task Group 7: Active Section Highlighting
**Dependencies:** Task Group 6

- [ ] 7.0 Complete active section detection and highlighting
  - [ ] 7.1 Write 2-8 focused tests for active section detection
    - Test: IntersectionObserver detects active section
    - Test: Active state updates when scrolling between sections
    - Test: Only one section is active at a time
    - Limit to maximum 8 tests focusing on critical behaviors
  - [ ] 7.2 Implement IntersectionObserver hook
    - Create `src/hooks/useActiveSection.ts` custom hook
    - Set up IntersectionObserver to track section visibility
    - Use 50% viewport visibility as threshold
    - Return currently active section ID
  - [ ] 7.3 Integrate active section state with Header
    - Pass active section ID to Header component
    - Apply active styling to corresponding navigation link
    - Ensure only one link has active state at a time
  - [ ] 7.4 Style active navigation state
    - Add clear visual distinction (underline, bold, or color change)
    - Use smooth transitions when active state changes
    - Ensure active state is accessible (sufficient contrast)
  - [ ] 7.5 Test active section highlighting
    - Verify active state updates correctly when scrolling
    - Test on different screen sizes
    - Ensure smooth visual transitions
  - [ ] 7.6 Ensure active section tests pass
    - Run ONLY the 2-8 tests written in 7.1
    - Verify IntersectionObserver tracking works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 7.1 pass
- Active section is accurately detected while scrolling
- Navigation highlights the correct active section
- Visual feedback is clear and accessible

### Content Sections

#### Task Group 8: Section Components
**Dependencies:** Task Group 4

- [ ] 8.0 Complete all section components
  - [ ] 8.1 Write 2-8 focused tests for section components
    - Test: Each section renders with correct ID
    - Test: Sections display placeholder content
    - Test: Sections have proper semantic structure
    - Limit to maximum 8 tests focusing on critical behaviors
  - [ ] 8.2 Create PhotoSessions section
    - Create `src/sections/PhotoSessions/PhotoSessions.tsx`
    - Create `src/sections/PhotoSessions/PhotoSessions.module.css`
    - Use semantic `<section>` element with id="photo-sessions"
    - Add ARIA label: `aria-label="Photo Sessions"`
    - Add placeholder content: heading + "Content Coming Soon" text
  - [ ] 8.3 Create Shoots section
    - Create `src/sections/Shoots/Shoots.tsx`
    - Create `src/sections/Shoots/Shoots.module.css`
    - Use semantic `<section>` element with id="shoots"
    - Add ARIA label: `aria-label="Shoots"`
    - Add placeholder content: heading + "Content Coming Soon" text
  - [ ] 8.4 Create Sketchup section
    - Create `src/sections/Sketchup/Sketchup.tsx`
    - Create `src/sections/Sketchup/Sketchup.module.css`
    - Use semantic `<section>` element with id="sketchup"
    - Add ARIA label: `aria-label="Sketchup Drawings"`
    - Add placeholder content: heading + "Content Coming Soon" text
  - [ ] 8.5 Create AboutMe section
    - Create `src/sections/AboutMe/AboutMe.tsx`
    - Create `src/sections/AboutMe/AboutMe.module.css`
    - Use semantic `<section>` element with id="about-me"
    - Add ARIA label: `aria-label="About Me"`
    - Add placeholder content: heading + "Content Coming Soon" text
  - [ ] 8.6 Style sections with generous spacing
    - Each section has content-based height (not full viewport)
    - Apply minimum comfortable viewing size (e.g., min-height: 400px)
    - Add generous vertical spacing between sections (4-6rem)
    - Style placeholder content: centered, clear typography
    - Ensure section titles are prominent and readable
  - [ ] 8.7 Import sections into App.tsx
    - Add all four section components to App.tsx in order
    - Verify sections stack vertically with proper spacing
    - Check that IDs match navigation anchor targets
  - [ ] 8.8 Make sections responsive
    - Test sections on mobile (320px+), tablet, and desktop
    - Adjust padding, font sizes, and spacing for different breakpoints
    - Ensure sections maintain generous spacing on all screen sizes
  - [ ] 8.9 Ensure section tests pass
    - Run ONLY the 2-8 tests written in 8.1
    - Verify all sections render correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 8.1 pass
- All four sections render with placeholder content
- Sections have content-based height with generous spacing
- Semantic HTML and ARIA labels in place
- Responsive behavior works across all breakpoints

### Testing Infrastructure

#### Task Group 9: Testing Setup and Configuration
**Dependencies:** Task Group 2

- [ ] 9.0 Complete testing infrastructure
  - [ ] 9.1 Install testing dependencies
    - Install Jest and React Testing Library
    - Install @testing-library/jest-dom for DOM matchers
    - Install @testing-library/user-event for user interactions
    - Install @types/jest for TypeScript support
  - [ ] 9.2 Configure Jest
    - Create `jest.config.js` or update `vite.config.ts` for Vitest
    - Set up test environment (jsdom)
    - Configure module name mapping for path aliases
    - Set up coverage collection configuration
  - [ ] 9.3 Create test setup files
    - Create `src/setupTests.ts` for global test configuration
    - Import @testing-library/jest-dom for custom matchers
    - Add any global test mocks (e.g., IntersectionObserver polyfill)
  - [ ] 9.4 Add test scripts to package.json
    - Add `"test": "jest"` or `"test": "vitest"` script
    - Add `"test:watch": "jest --watch"` for development
    - Add `"test:coverage": "jest --coverage"` for coverage reports
  - [ ] 9.5 Create example test
    - Write a simple test for App.tsx to verify setup works
    - Run test to confirm configuration is correct
    - Fix any configuration issues

**Acceptance Criteria:**
- Jest/Vitest configured and runs successfully
- Test setup file loads without errors
- Example test passes
- Test scripts work in package.json

### Deployment & CI/CD

#### Task Group 10: GitHub Pages Deployment Configuration
**Dependencies:** Task Group 1, 2

- [ ] 10.0 Complete GitHub Pages deployment setup
  - [ ] 10.1 Configure Vite for GitHub Pages
    - Update `vite.config.ts` with base URL (repository name)
    - Example: `base: '/rayoalmar/'` if repo is github.com/username/rayoalmar
    - Test build locally to verify base URL is correct
  - [ ] 10.2 Update package.json scripts
    - Ensure build script exists: `"build": "tsc && vite build"`
    - Add preview script: `"preview": "vite preview"`
    - Add predeploy script (optional): `"predeploy": "npm run build"`
  - [ ] 10.3 Install gh-pages package (optional)
    - Install gh-pages as dev dependency: `npm install --save-dev gh-pages`
    - Add deploy script: `"deploy": "gh-pages -d dist"`
  - [ ] 10.4 Test local production build
    - Run `npm run build` and verify dist folder is created
    - Run `npm run preview` to test production build locally
    - Verify all assets load correctly with base URL
  - [ ] 10.5 Configure GitHub repository for Pages
    - Push code to GitHub repository
    - In repo settings, enable GitHub Pages
    - Configure source: Deploy from branch (gh-pages) or GitHub Actions
    - Note the GitHub Pages URL

**Acceptance Criteria:**
- Vite builds successfully with correct base URL
- Production build works locally with `npm run preview`
- GitHub repository configured for Pages deployment
- Base URL correctly applied to all assets

#### Task Group 11: GitHub Actions CI/CD Pipeline
**Dependencies:** Task Group 9, 10

- [ ] 11.0 Complete GitHub Actions workflow
  - [ ] 11.1 Create workflow directory
    - Create `.github/workflows/` directory in project root
  - [ ] 11.2 Create deploy.yml workflow file
    - Create `.github/workflows/deploy.yml`
    - Configure workflow name: "Deploy to GitHub Pages"
    - Set up triggers: on push to main branch and on pull requests
  - [ ] 11.3 Configure CI job (runs on PRs)
    - Set up Node.js environment (version 18+)
    - Install dependencies: `npm ci`
    - Run linter: `npm run lint`
    - Run formatter check: `npm run format -- --check` (if applicable)
    - Run tests: `npm run test`
    - Build project: `npm run build`
    - Ensure job fails if any step fails
  - [ ] 11.4 Configure deployment job (runs on main)
    - Extend CI job to also deploy on main branch pushes
    - Use actions/upload-pages-artifact and actions/deploy-pages
    - Or use gh-pages action to deploy dist folder to gh-pages branch
    - Set appropriate permissions for GitHub Pages deployment
  - [ ] 11.5 Test CI/CD pipeline
    - Commit and push workflow file
    - Create a test branch and open PR to verify CI runs
    - Merge PR to main and verify deployment succeeds
    - Check GitHub Pages URL to confirm site is live
  - [ ] 11.6 Add build badge to README
    - Generate build status badge from GitHub Actions
    - Add badge to README.md for visibility
    - Verify badge displays correct build status

**Acceptance Criteria:**
- GitHub Actions workflow file is valid and runs
- CI runs on pull requests (lint, format, test, build)
- Deployment runs automatically on main branch merge
- Site successfully deploys to GitHub Pages
- Build badge displays in README

### Final Integration & Testing

#### Task Group 12: Integration Testing and Quality Assurance
**Dependencies:** All previous task groups

- [ ] 12.0 Complete integration testing and final verification
  - [ ] 12.1 Review tests from Task Groups 5, 7, and 8
    - Review the 2-8 tests written for Header (Task 5.1)
    - Review the 2-8 tests written for active section detection (Task 7.1)
    - Review the 2-8 tests written for section components (Task 8.1)
    - Total existing tests: approximately 6-24 tests
  - [ ] 12.2 Analyze test coverage gaps for this feature only
    - Identify critical user workflows that lack test coverage
    - Focus on navigation flow, scrolling, and component integration
    - Check for untested interaction patterns
    - Do NOT assess entire application test coverage
  - [ ] 12.3 Write up to 10 additional strategic tests maximum
    - Add integration tests for full navigation flow (click → scroll → active state update)
    - Test responsive behavior at key breakpoints
    - Test IntersectionObserver integration with sections
    - Test header visibility behavior comprehensively
    - Focus on end-to-end workflows, not edge cases
    - Maximum 10 new tests to fill critical gaps
  - [ ] 12.4 Run all feature-specific tests
    - Run ONLY tests related to this feature (from tasks 5.1, 7.1, 8.1, and 12.3)
    - Expected total: approximately 16-34 tests maximum
    - Verify all tests pass
    - Fix any failing tests
  - [ ] 12.5 Manual cross-browser testing
    - Test on Chrome (desktop and mobile)
    - Test on Firefox
    - Test on Safari (desktop and iOS)
    - Test on Edge
    - Verify smooth scrolling, navigation, and active states work everywhere
  - [ ] 12.6 Manual responsive testing
    - Test at 320px (smallest mobile)
    - Test at 768px (tablet)
    - Test at 1024px+ (desktop)
    - Verify layout, spacing, and touch targets at all sizes
  - [ ] 12.7 Accessibility verification
    - Test keyboard navigation (Tab, Enter, arrow keys)
    - Verify semantic HTML structure
    - Check ARIA labels on sections
    - Test with screen reader (VoiceOver or NVDA) for basic navigation
    - Verify color contrast ratios meet WCAG 2.1 AA (4.5:1)
  - [ ] 12.8 Performance check
    - Run Lighthouse audit on deployed site
    - Ensure performance score is high (90+)
    - Verify accessibility score meets standards
    - Check that initial load time is acceptable
  - [ ] 12.9 Final visual design review
    - Compare implementation to `planning/visuals/space and header design.jpeg`
    - Compare to `planning/visuals/galery layout.jpeg`
    - Reference Laura Veciana portfolio for aesthetic alignment
    - Ensure generous whitespace and minimal design achieved
    - Verify all placeholder content is clear and properly styled
  - [ ] 12.10 Create project README
    - Document project setup instructions
    - Add scripts documentation (dev, build, test, deploy)
    - Include GitHub Pages URL
    - Add build status badge
    - Document folder structure and architecture decisions

**Acceptance Criteria:**
- All feature-specific tests pass (approximately 16-34 tests total)
- No more than 10 additional tests added for gap filling
- Site works correctly across all target browsers
- Responsive design functions properly at all breakpoints
- Accessibility standards met (keyboard nav, screen reader, contrast)
- Lighthouse performance score 90+
- Visual design matches specifications and references
- Comprehensive README documentation in place

## Execution Order

Recommended implementation sequence:
1. **Project Setup & Configuration** (Task Groups 1-2)
2. **Core Layout & Styling** (Task Groups 3-4)
3. **Navigation System** (Task Groups 5-7)
4. **Content Sections** (Task Group 8)
5. **Testing Infrastructure** (Task Group 9)
6. **Deployment & CI/CD** (Task Groups 10-11)
7. **Final Integration & Testing** (Task Group 12)

## Notes

- Each development task group (5, 7, 8) follows TDD approach: write tests first, implement, verify tests pass
- Testing is focused and lightweight: 2-8 tests per group during development, maximum 10 additional for gaps
- Visual design should reference provided mockups and Laura Veciana portfolio
- Future mobile footer positioning noted but not implemented in this phase
- Internationalization (i18n) explicitly out of scope for this phase


# Contributing to Good Gradients

First off, thanks for taking the time to contribute! This project is open source and we love receiving contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

- Make sure you have [Bun](https://bun.sh/) installed (or Node.js 18+)
- Fork the repository
- Clone your fork locally
- Create a branch for your changes

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

### Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature has already been suggested
- Provide a clear use case
- Explain how it benefits users

### Adding Gradients

Want to add new gradients to the collection? Great! Here's how:

1. Edit `src/data/gradients.ts`
2. Follow the existing gradient format:
   ```typescript
   {
     id: 'unique-kebab-case-id',
     name: 'Gradient Name',
     description: 'A brief description',
     colors: ['#hex1', '#hex2'],
     stops: [
       { color: '#hex1', position: 0 },
       { color: '#hex2', position: 100 }
     ],
     angle: 135,
     tags: ['tag1', 'tag2']
   }
   ```
3. Ensure colors work well together
4. Add appropriate tags for filtering
5. Test locally before submitting

### Improving Documentation

Documentation improvements are always welcome, whether it's:

- Fixing typos
- Clarifying instructions
- Adding examples
- Translating content

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/goodgradients.git
cd goodgradients

# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test
```

## Pull Request Process

1. **Create a branch** from `main` for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit with clear messages
   ```bash
   git commit -m "feat: add new sunset gradient collection"
   ```

3. **Test your changes**
   ```bash
   bun run build
   bun run test
   ```

4. **Push to your fork** and open a Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Fill out the PR template** with relevant details

6. **Wait for review** - maintainers will review and may request changes

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Style Guidelines

### TypeScript

- Use strict mode
- Prefer `const` over `let`
- Use explicit types for function parameters and returns
- Avoid `any` - use `unknown` if type is truly unknown

### React

- Functional components only
- Use hooks appropriately
- Keep components focused and small
- Extract reusable logic into custom hooks

### CSS/Tailwind

- Use Tailwind utility classes
- Keep custom CSS minimal
- Follow mobile-first responsive design
- Ensure dark mode compatibility (we're dark-mode only)

### Testing

- Write E2E tests for new features
- Test critical user flows
- Keep tests maintainable and readable

## Questions?

Feel free to open an issue with the "question" label if you need help!

---

Thank you for contributing to Good Gradients!

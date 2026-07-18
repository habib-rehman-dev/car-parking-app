# Mui - Material-UI React Project

A modern React application built with Vite, featuring Material-UI components for elegant and responsive user interfaces.

## 🚀 Features

- **React 18+** - Latest React features and hooks
- **Vite** - Lightning-fast build tool with HMR (Hot Module Replacement)
- **Material-UI (MUI)** - Comprehensive component library for beautiful UIs
- **TypeScript** - Type-safe development
- **ESLint** - Code quality and consistency
- **Fast Development** - Instant server start and rapid rebuilds

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/habib-rehman-dev/Mui.git
cd Mui
```

2. Install dependencies:
```bash
npm install
```

## 📖 Usage

### Development Server

Start the development server with HMR:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### ESLint

Run ESLint to check code quality:
```bash
npm run lint
```

## 🏗️ Project Structure

```
Mui/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 🎨 Vite Plugins

This project uses two official Vite plugins for React:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** - Uses [Oxc](https://oxc.rs) for fast compilation
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)** - Uses [SWC](https://swc.rs/) as an alternative

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **@mui/material** - Material-UI component library
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling for MUI

## ⚙️ Configuration

### React Compiler

The React Compiler is not enabled by default due to performance considerations during development and build. To enable it, refer to the [official React Compiler documentation](https://react.dev/learn/react-compiler/installation).

### ESLint Configuration

For production applications, we recommend using TypeScript with type-aware lint rules. See the [Vite TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for configuration examples.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/habib-rehman-dev/Mui/issues).

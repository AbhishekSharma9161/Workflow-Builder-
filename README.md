# Workflow Builder 🚀

A professional, interactive workflow builder application built with React and TypeScript. Create, visualize, and manage complex workflows with an intuitive drag-and-drop interface.

![Workflow Builder](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.1.6-purple)

## ✨ Features

### Core Functionality
- **Visual Workflow Builder** - Create workflows with an intuitive node-based interface
- **Multiple Node Types**:
  - 🟢 **Start Node** - Entry point for workflows
  - 🔵 **Action Node** - Execute tasks or operations
  - 🔀 **Branch Node** - Conditional logic with True/False paths
  - 🔴 **End Node** - Terminate workflow execution

### Advanced Features
- **Undo/Redo** - Full history management (up to 50 states)
- **Zoom Controls** - Zoom in/out and reset view (50% - 200%)
- **Download Workflow** - Export workflows as JSON files
- **Share Options**:
  - 📋 Copy JSON to clipboard
  - 🔗 Generate shareable links
  - ✉️ Share via email
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### User Experience
- **Smooth Animations** - CSS transitions for professional feel
- **Custom Delete Modal** - Beautiful confirmation dialogs
- **Real-time Editing** - Edit node labels inline
- **Auto-reconnect** - Smart node deletion with automatic reconnection
- **Dark Gradient Navbar** - Modern, premium UI design

## 🎯 Tech Stack

- **Frontend Framework**: React 18.2 (Functional Components + Hooks)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Pure CSS (No UI libraries)
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/AbhishekSharma9161/Workflow-Builder-.git
cd Workflow-Builder-
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🚀 Usage

### Creating a Workflow

1. **Start with the root node** - Every workflow begins with a "Start" node
2. **Add nodes** - Hover over connection lines and click the `+` button
3. **Choose node type** - Select Action, Branch (Condition), or End
4. **Edit labels** - Click on any node label to rename it
5. **Delete nodes** - Hover over a node and click the trash icon
6. **Branch logic** - For Branch nodes, add steps to True/False paths

### Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

### Zoom Controls

Located at the bottom-left corner:
- **+** - Zoom in
- **-** - Zoom out
- **⊡** - Reset zoom to 100%

## 📁 Project Structure

```
workflow-builder/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Node.tsx            # Workflow node component
│   │   └── WorkflowCanvas.tsx  # Canvas container
│   ├── store/
│   │   └── WorkflowContext.tsx # State management
│   ├── types.ts                # TypeScript interfaces
│   ├── index.css               # Global styles
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design Philosophy

- **No External UI Libraries** - Pure CSS for maximum control
- **Professional Aesthetics** - Inspired by n8n, Zapier, and Retool
- **Accessibility First** - Keyboard navigation and screen reader support
- **Performance Optimized** - Efficient re-renders with React Context

## 📱 Responsive Design

The application is fully responsive and works on:
- 💻 **Desktop** - Full feature set with optimal layout
- 📱 **Tablet** - Adapted UI with touch-friendly controls
- 📱 **Mobile** - Simplified interface for small screens

## 🔧 Configuration

### Environment Variables
No environment variables required for basic usage.

### Customization
Edit `src/index.css` to customize:
- Color palette (CSS variables in `:root`)
- Node dimensions
- Spacing and layout
- Animations and transitions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Abhishek Sharma**
- GitHub: [@AbhishekSharma9161](https://github.com/AbhishekSharma9161)

## 🙏 Acknowledgments

- Inspired by workflow tools like n8n, Zapier, and Temporal
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## 📸 Screenshots

### Desktop View
![Desktop View](https://via.placeholder.com/800x400?text=Desktop+View)

### Mobile View
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

## 🐛 Known Issues

None at the moment. Please report issues on the [GitHub Issues](https://github.com/AbhishekSharma9161/Workflow-Builder-/issues) page.

## 🗺️ Roadmap

- [ ] Drag and drop node positioning
- [ ] Export to PNG/SVG
- [ ] Import workflows from JSON
- [ ] Workflow templates
- [ ] Collaborative editing
- [ ] Dark mode toggle
- [ ] Workflow execution simulation

---

Made with ❤️ by Abhishek Sharma

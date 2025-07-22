# Marqo - Advanced Markdown Editor with Data Injection

![Marqo](https://img.shields.io/badge/Next.js-15.3.4-black) ![React](https://img.shields.io/badge/React-19.0.0-blue) ![FluentUI](https://img.shields.io/badge/FluentUI-9.66.2-purple)

**Marqo** is a powerful markdown editor built with Next.js that features an innovative data injection system. It allows you to create dynamic documents by embedding data from a structured database directly into your markdown content using a custom syntax.

> **⚠️ Note**: This is a concept demo project showcasing the data injection capabilities. A production-ready version with TypeScript and shadcn/ui is currently in development.

## 🚀 Key Features

### 📝 Advanced Markdown Editor
- **Monaco Editor Integration**: Professional code editor experience with syntax highlighting
- **Real-time Preview**: Live markdown rendering with split-pane view
- **Resizable Panels**: Adjustable editor and preview panes for optimal workflow
- **Rich Formatting**: Support for all standard markdown features plus GitHub Flavored Markdown (GFM)

### 🗃️ Data Injection System
- **Custom Syntax**: Use `<db.path.to.data>` to inject dynamic content
- **Database Explorer**: Interactive tree view to browse and select data paths
- **Auto-completion**: Click-to-insert functionality for data paths
- **Table Generation**: Convert arrays to markdown tables with `<db.path.table()>`
- **Filtered Tables**: Generate tables with specific columns `<db.path.table(column1, column2)>`

### 🎯 Smart Features
- **Path Search**: Search and filter database paths in real-time
- **Data Preview**: Hover over paths to see data previews
- **Visual Feedback**: Highlight selected paths and show data content
- **Escape Sequences**: Use `/<db.path>/` to display the syntax without data injection

## 🛠️ Technology Stack

### Core Framework
- **[Next.js 15.3.4](https://nextjs.org)** - React framework with App Router
- **[React 19.0.0](https://react.dev)** - Latest React with concurrent features

### UI Components & Styling
- **[@fluentui/react-components 9.66.2](https://react.fluentui.dev)** - Microsoft's Fluent UI design system
- **[@fluentui/react-icons 2.0.304](https://react.fluentui.dev)** - Comprehensive icon library
- **[@fluentui-contrib/react-resize-handle 0.7.1](https://github.com/microsoft/fluentui-contrib)** - Resizable panel components

### Editor & Markdown
- **[@monaco-editor/react 4.7.0](https://github.com/suren-atoyan/monaco-react)** - VS Code editor in the browser
- **[react-markdown 10.1.0](https://github.com/remarkjs/react-markdown)** - Markdown to React component renderer
- **[remark-gfm 4.0.1](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown support

### State Management
- **[zustand 5.0.5](https://github.com/pmndrs/zustand)** - Lightweight state management

### Additional Dependencies
- **[marked-react 3.0.0](https://github.com/sibiraj-s/marked-react)** - Alternative markdown processor

## 🎮 How to Use

### Basic Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Data Injection Syntax

#### Simple Data Injection
```markdown
The car has: <db.class.car.hyundai.has.wheel.all>
```

#### Table Generation
```markdown
## Car Models
<db.class.car.models.table()>
```

#### Filtered Tables
```markdown
## Car Models (Name and Year only)
<db.class.car.models.table(name, year)>
```

#### Escape Syntax (Display without injection)
```markdown
To reference data, use: /<db.class.car.hyundai.has.wheel.all>/
```

### Database Explorer
- Browse the hierarchical data structure in the left panel
- Search for specific paths using the search box
- Click the insert button (➕) next to any item to add it to your markdown
- Click the table button (📊) next to arrays to insert as tables
- Hover over items to see data previews

### Editor Features
- **Split View**: Edit and preview simultaneously
- **View Modes**: Switch between edit-only, split, and preview-only modes
- **Text Formatting**: Bold, italic, and other markdown formatting tools
- **Live Updates**: See changes reflected in real-time

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   └── page.js            # Main page component
├── components/
│   ├── db-tree/           # Database explorer
│   │   └── db-tree-view.js
│   ├── layout/            # Layout components
│   │   └── header.js
│   ├── markdown/          # Markdown editor components
│   │   ├── markdown-container.js
│   │   ├── markdown-editor.js
│   │   ├── markdown-preview.js
│   │   └── markdown-toolbar.js
│   └── ui/                # Reusable UI components
│       └── resize-handle.js
├── lib/
│   ├── services/          # Business logic
│   │   └── databaseService.js
│   └── store/             # State management
│       └── useMarkdownStore.js
```

## 🔧 Development Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Adding Data Sources
Modify `src/lib/services/databaseService.js` to add your own data structure:

```javascript
const mockDatabase = {
  db: {
    // Add your data structure here
    products: [...],
    users: [...],
    // etc.
  }
};
```

### Styling
The project uses Fluent UI's design tokens and makeStyles API for consistent theming and easy customization.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is built with [Next.js](https://nextjs.org) and uses various open-source libraries. Check individual package licenses for details.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Marqo - Advanced Markdown Editor with Data Injection

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs) ![React](https://img.shields.io/badge/React-blue?logo=react) ![FluentUI](https://img.shields.io/badge/Fluent_UI-indigo?logoColor=f5f5f5&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAzMi4yMTQ4NDQgMCBMIDMxLjg1NTQ2OSAwIEwgMzEuNjQ4NDM4IDAuMDI3MzQzOCBMIDMxLjMwMDc4MSAwLjEyMTA5NCBMIDExLjAzOTA2MiAxMC4yNDYwOTQgTCAxMC43NDYwOTQgMTAuNDQ5MjE5IEwgMTAuNDg0Mzc1IDEwLjcxMDkzOCBMIDEwLjQ3MjY1NiAxMC43MjY1NjIgQyAxMC4zNzg5MDYgMTAuODQzNzUgMTAuMjkyOTY5IDEwLjk2ODc1IDEwLjIyMjY1NiAxMS4xMDkzNzUgTCAxMC4xNzE4NzUgMTEuMjIyNjU2IEwgMTAuMDgyMDMxIDExLjQ2NDg0NCBMIDEwLjAwNzgxMiAxMS44NTkzNzUgTCAxMCA1MC4yODEyNSBDIDEwIDUxLjAxOTUzMSAxMC4zOTA2MjUgNTEuNzAzMTI1IDExLjAzMTI1IDUyLjA3ODEyNSBMIDMwLjk4MDQ2OSA2My43MTQ4NDQgQyAzMi4zNzEwOTQgNjQuNTIzNDM4IDM0LjExMzI4MSA2My41MTU2MjUgMzQuMTA1NDY5IDYxLjkwNjI1IEwgMzMuOTg4MjgxIDQzLjE3OTY4OCBMIDUyLjg5NDUzMSAzMy44NTkzNzUgQyA1NC40MzM1OTQgMzMuMTAxNTYyIDU0LjQ0MTQwNiAzMC45MDYyNSA1Mi45MDYyNSAzMC4xMzY3MTkgTCAzNi42NzE4NzUgMjIuMDE5NTMxIEwgNTIuOTA2MjUgMTMuOTA2MjUgQyA1NC40Mzc1IDEzLjE0MDYyNSA1NC40Mzc1IDEwLjk1MzEyNSA1Mi45MDYyNSAxMC4xODc1IEwgMzIuOTQxNDA2IDAuMjA3MDMxIEwgMzIuNjQ0NTMxIDAuMDg1OTM3NSBaIE0gMTQuMTU2MjUgMzUuMzY3MTg4IEwgMjkuODMyMDMxIDQzLjI2NTYyNSBMIDI5LjkyNTc4MSA1OC4yODkwNjIgTCAxNC4xNTYyNSA0OS4wODk4NDQgWiBNIDI5Ljk0NTMxMiAzOC42Njc5NjkgTCAxNi43MjI2NTYgMzIuMDA3ODEyIEwgMjkuOTI1NzgxIDI1LjQ0NTMxMiBaIE0gNDcuMzAwNzgxIDMxLjk4MDQ2OSBMIDM0LjEwMTU2MiAzOC40ODQzNzUgTCAzNC4wNzgxMjUgMjUuMzcxMDk0IFogTSAxNC4xNTYyNSAyOC42MzY3MTkgTCAxNC4xNTYyNSAxNS40MjE4NzUgTCAyNy4zNTU0NjkgMjIuMDg1OTM4IFogTSAyOS45MjU3ODEgMTguNzIyNjU2IEwgMTYuNzEwOTM4IDEyLjA1NDY4OCBMIDI5Ljk0NTMxMiA1LjQzNzUgWiBNIDM0LjA3ODEyNSAxOC42Njc5NjkgTCAzNC4xMDE1NjIgNS40Mjk2ODggTCA0Ny4zMjgxMjUgMTIuMDQ2ODc1IFogTSAzNC4wNzgxMjUgMTguNjY3OTY5ICIvPgo8L2c+Cjwvc3ZnPg==)

**Marqo** is a powerful markdown editor built with Next.js that features an innovative data injection system. It allows you to create dynamic documents by embedding data from a structured database directly into your markdown content using a custom syntax.

> **⚠️ Note**: This is a **concept** demo project showcasing the data injection capabilities. A production-ready version with ![TS](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=f5f5f5) and ![UI](https://img.shields.io/badge/Shadcn_UI-black?logo=shadcnui&logoColor=f5f5f5) is currently in development.

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

### State Management

- **[zustand 5.0.5](https://github.com/pmndrs/zustand)** - Lightweight state management

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
- Click the table button (➕) next to arrays to insert as tables
- Hover over items to see data previews

### Editor Features

- **Split View**: Edit and preview simultaneously
- **View Modes**: Switch between edit-only, split, and preview-only modes
- **Text Formatting**: Bold, italic, and other markdown formatting tools
- **Live Updates**: See changes reflected in real-time

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

## 📄 License

This project is built with [Next.js](https://nextjs.org) and uses various open-source libraries. Check individual package licenses for details.

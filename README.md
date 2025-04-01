# ZARI Store Grid Editor

A modern React application for creating and managing product grid layouts with drag-and-drop functionality and dynamic row templates.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup and Installation](#setup-and-installation)
3. [Features](#features)
4. [URL Structure](#url-structure)
5. [Project Structure](#project-structure)
6. [Usage Guide](#usage-guide)
7. [Best Practices](#best-practices)
8. [Contributing](#contributing)

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Backend server (included in `/server` directory)

## Setup and Installation

### 1. Backend Setup (Required First)

The application requires the backend server to be running first:

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

The server will start on `http://localhost:3001`. Verify it's running by accessing:

```
http://localhost:3001/templates
```

### 2. Frontend Setup

1. Open a new terminal and navigate to the project root

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
```

Update the `.env` file with:

```
VITE_LOCAL_API_URL=http://localhost:3001
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

### 1. Product Grid Management

- Create and manage grid layouts with multiple rows
- Each row can contain 1-3 products
- Drag and drop products between rows
- Reorder rows through drag and drop
- Save and load grid configurations

### 2. Row Templates

- Apply different alignment templates to rows:
  - Left alignment
  - Center alignment
  - Right alignment
- Visual feedback of template application
- Template selection per row

### 3. Interactive Features

- **Drag and Drop**

  - Move products between rows
  - Reorder rows
  - Visual feedback during drag operations
  - Automatic validation of row capacity (1-3 products)

- **Zoom Controls**
  - Zoom in/out functionality
  - Mouse wheel zoom support (Ctrl/Cmd + scroll)
  - Reset zoom option
  - Visual zoom level indicator

### 4. Responsive Design

- Mobile-first approach
- Fluid layout adaptation
- Consistent experience across devices
- Optimized product card display

## URL Structure

### Frontend URLs

The application accepts query parameters to initialize the grid. Using the value of `VITE_LOCAL_API_URL` (default: `http://localhost:5173`):

```
http://localhost:5173/?productIds=prod_001,prod_002,prod_003&rows=2
```

#### Query Parameters

- `productIds`: Comma-separated list of product IDs to include in the grid
- `rows`: Number of rows to create (optional, products will be distributed automatically)

#### Examples

```
# Load 4 products in 2 rows
http://localhost:5173/?productIds=prod_001,prod_002,prod_003,prod_004&rows=2

# Load 6 products in 3 rows
http://localhost:5173/?productIds=prod_001,prod_002,prod_003,prod_004,prod_005,prod_006&rows=3

# Load products without specifying rows
http://localhost:5173/?productIds=prod_001,prod_002,prod_003,prod_004,prod_005
```

## Project Structure

```
project/
├── src/                 # Frontend source code
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript definitions
│   └── styles/         # Global styles
├── server/             # Backend server
│   ├── src/            # Server source code
│   └── README.md       # Server documentation
└── docs/              # Additional documentation
```

## Usage Guide

### 1. Creating a Grid

1. Start with an empty grid or use URL parameters
2. Drag products from the product list into rows
3. Adjust row templates as needed
4. Save the grid configuration

### 2. Managing Products in Rows

```typescript
// Example of row structure
interface Row {
	id: string;
	templateId: string;
	products: string[]; // 1-3 product IDs
}
```

### 3. Applying Templates

```typescript
// Available template alignments
type RowAlignment = "LEFT" | "CENTER" | "RIGHT";
```

### 4. Using Zoom Controls

- Use controls in bottom-right corner
- Keyboard shortcuts:
  - Ctrl/Cmd + Mouse Wheel: Zoom in/out
  - Click zoom percentage to reset

## Technologies

- React 18
- TypeScript
- TailwindCSS
- Modern React patterns and hooks
- Responsive design principles

## Best Practices

1. **Grid Organization**

   - Keep related products in the same row
   - Use consistent alignment patterns
   - Limit rows to 3 products for optimal display

2. **Template Usage**

   - Use left alignment for primary content
   - Center alignment for featured products
   - Right alignment for secondary content

3. **Performance Considerations**
   - Optimize images before upload
   - Use appropriate zoom levels
   - Save grid changes regularly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

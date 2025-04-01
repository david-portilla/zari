# Components Documentation

## ProductGrid

The main container component that manages the grid layout and interactions.

### Props

```typescript
interface ProductGridProps {
	rows: ProductRow[];
	onTemplateChange: (rowId: string, template: RowAlignment) => void;
	onUpdateRows: (updatedRows: ProductRow[]) => void;
}
```

### Features

- Manages drag and drop of products between rows
- Handles row reordering
- Implements zoom functionality
- Provides visual feedback during drag operations

### Example Usage

```typescript
<ProductGrid
  rows={gridRows}
  onTemplateChange={handleTemplateChange}
  onUpdateRows={handleRowsUpdate}
/>
```

## ProductRow

Displays a single row of products with configurable alignment.

### Props

```typescript
interface ProductRowProps {
	row: ProductRow;
	onTemplateChange?: (rowId: string, template: RowAlignment) => void;
	onDragStart: (product: Product, rowId: string) => void;
	onDragEnd: () => void;
	isDragging: boolean;
	draggedProductId?: string;
}
```

### Features

- Displays 1-3 products in a row
- Supports different alignment templates
- Provides template selection dropdown
- Shows visual feedback during drag operations

### Example Usage

```typescript
<ProductRow
  row={rowData}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  isDragging={isDragging}
  draggedProductId={draggedId}
/>
```

## ProductCard

Displays individual product information.

### Props

```typescript
interface ProductCardProps {
	product: Product;
}
```

### Features

- Displays product image
- Shows product name and price
- Optimized image loading
- Responsive design

### Example Usage

```typescript
<ProductCard product={productData} />
```

## GridZoomControls

Provides zoom control interface for the grid.

### Props

```typescript
interface GridZoomControlsProps {
	zoomLevel: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
}
```

### Features

- Zoom in/out buttons
- Current zoom level display
- Reset zoom functionality
- Fixed positioning in the viewport

### Example Usage

```typescript
<GridZoomControls
  zoomLevel={currentZoom}
  onZoomIn={handleZoomIn}
  onZoomOut={handleZoomOut}
  onReset={resetZoom}
/>
```

## Custom Hooks

### useDragAndDrop

Manages product drag and drop functionality.

```typescript
const { dragState, handleDragStart, handleDragEnd, handleDrop } =
	useDragAndDrop({ rows, onUpdateRows });
```

### useGridZoom

Manages grid zoom functionality.

```typescript
const { zoomLevel, zoomIn, zoomOut, resetZoom, getZoomStyle } = useGridZoom({
	minZoom: 0.5,
	maxZoom: 1.5,
	zoomStep: 0.1,
});
```

### useRowDragAndDrop

Manages row reordering functionality.

```typescript
const { rowDragState, handleRowDragStart, handleRowDragEnd, handleRowDrop } =
	useRowDragAndDrop({ rows, onUpdateRows });
```

## Styling

The application uses Tailwind CSS for styling with custom animations for enhanced user experience.

### Key Classes

```css
/* Grid container */
.grid-container {
	@apply relative min-h-[50vh] bg-gray-50;
}

/* Row styles */
.row-container {
	@apply mb-8 transition-all duration-200;
}

/* Product card */
.product-card {
	@apply border rounded-lg shadow-sm hover:shadow-md transition-shadow;
}

/* Zoom controls */
.zoom-controls {
	@apply fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-lg shadow-lg;
}
```

### Animations

```css
/* Drag feedback */
.dragging {
	@apply opacity-50;
}

/* Zoom transitions */
.zoom-transition {
	@apply transition-transform duration-200 ease-in-out;
}
```

## Best Practices

1. **Component Organization**

   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Add meaningful prop validations

2. **Performance**

   - Implement proper memoization where needed
   - Use optimized images
   - Implement virtualization for large lists
   - Monitor and optimize re-renders

3. **Accessibility**

   - Use semantic HTML
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Provide proper focus management

4. **Testing**
   - Write unit tests for components
   - Test drag and drop functionality
   - Test zoom controls
   - Test edge cases and error states

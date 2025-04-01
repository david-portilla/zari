import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDragAndDrop } from "../useDragAndDrop";
import { Product, ProductRow } from "../../types";

describe("useDragAndDrop", () => {
	const mockProduct: Product = {
		id: "1",
		name: "Test Product",
		price: { amount: 100, currency: "USD" },
		image: "test.jpg",
	};

	const mockRows: ProductRow[] = [
		{
			id: "row-1",
			products: [mockProduct],
			template: "LEFT",
		},
		{
			id: "row-2",
			products: [],
			template: "LEFT",
		},
	];

	/**
	 * Test initial state
	 */
	it("should initialize with correct default state", () => {
		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({ rows: mockRows, onUpdateRows })
		);

		expect(result.current.dragState).toEqual({
			isDragging: false,
			draggedProduct: null,
			sourceRowId: null,
		});
	});

	/**
	 * Test drag start
	 */
	it("should update state when drag starts", () => {
		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({ rows: mockRows, onUpdateRows })
		);

		act(() => {
			result.current.handleDragStart(mockProduct, "row-1");
		});

		expect(result.current.dragState).toEqual({
			isDragging: true,
			draggedProduct: mockProduct,
			sourceRowId: "row-1",
		});
	});

	/**
	 * Test drag end
	 */
	it("should reset state when drag ends", () => {
		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({ rows: mockRows, onUpdateRows })
		);

		// Start drag
		act(() => {
			result.current.handleDragStart(mockProduct, "row-1");
		});

		// End drag
		act(() => {
			result.current.handleDragEnd();
		});

		expect(result.current.dragState).toEqual({
			isDragging: false,
			draggedProduct: null,
			sourceRowId: null,
		});
	});

	/**
	 * Test drop handling
	 */
	it("should handle drop and update rows", () => {
		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({ rows: mockRows, onUpdateRows })
		);

		// Start drag
		act(() => {
			result.current.handleDragStart(mockProduct, "row-1");
		});

		// Handle drop
		act(() => {
			result.current.handleDrop("row-2");
		});

		// Verify onUpdateRows was called with updated rows
		expect(onUpdateRows).toHaveBeenCalledWith([
			{
				id: "row-1",
				products: [],
				template: "LEFT",
			},
			{
				id: "row-2",
				products: [mockProduct],
				template: "LEFT",
			},
		]);

		// Verify state was reset
		expect(result.current.dragState).toEqual({
			isDragging: false,
			draggedProduct: null,
			sourceRowId: null,
		});
	});

	/**
	 * Test drop handling with invalid source
	 */
	it("should not update rows when dropping with invalid source", () => {
		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({ rows: mockRows, onUpdateRows })
		);

		// Handle drop without starting drag
		act(() => {
			result.current.handleDrop("row-2");
		});

		expect(onUpdateRows).not.toHaveBeenCalled();
	});

	/**
	 * Test drop handling with full target row
	 */
	it("should not update rows when target row is full", () => {
		const fullRow: ProductRow = {
			id: "row-2",
			products: [
				{ ...mockProduct, id: "2" },
				{ ...mockProduct, id: "3" },
				{ ...mockProduct, id: "4" },
			],
			template: "LEFT",
		};

		const onUpdateRows = vi.fn();
		const { result } = renderHook(() =>
			useDragAndDrop({
				rows: [...mockRows.slice(0, 1), fullRow],
				onUpdateRows,
			})
		);

		// Start drag
		act(() => {
			result.current.handleDragStart(mockProduct, "row-1");
		});

		// Handle drop
		act(() => {
			result.current.handleDrop("row-2");
		});

		expect(onUpdateRows).not.toHaveBeenCalled();
	});
});

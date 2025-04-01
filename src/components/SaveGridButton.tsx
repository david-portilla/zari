import React, { useState, useEffect } from "react";
import { ProductRow } from "../types";
import { useSaveGrid } from "../hooks/useSaveGrid";

interface SaveGridButtonProps {
	rows: ProductRow[];
}

/**
 * Button component that handles saving the grid
 * Opens a modal for naming the grid and displays validation errors
 *
 * @param rows - The rows to save
 */
const SaveGridButton: React.FC<SaveGridButtonProps> = ({ rows }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [gridName, setGridName] = useState("");
	const [nameError, setNameError] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const { saveGrid, isLoading, isSuccess, error, validationErrors, savedGrid } =
		useSaveGrid();

	// Effect to handle successful save
	useEffect(() => {
		if (isSuccess && savedGrid) {
			console.log("Grid saved successfully to server:", savedGrid);
			setShowSuccessMessage(true);

			const timer = setTimeout(() => {
				setIsModalOpen(false);
				setGridName("");
				setNameError("");
				setShowSuccessMessage(false);
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [isSuccess, savedGrid]);

	/**
	 * Opens the save modal
	 */
	const handleOpenModal = () => {
		setIsModalOpen(true);
		setGridName("");
		setNameError("");
		setShowSuccessMessage(false);
	};

	/**
	 * Closes the save modal
	 */
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setGridName("");
		setNameError("");
	};

	/**
	 * Handles changes to the grid name input
	 *
	 * @param e - Change event
	 */
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGridName(e.target.value);
		if (e.target.value.trim() !== "") {
			setNameError("");
		}
	};

	/**
	 * Validates and saves the grid
	 */
	const handleSave = () => {
		// Validate grid name
		if (gridName.trim() === "") {
			setNameError("Please enter a name for your grid");
			return;
		}

		// Save the grid
		saveGrid(gridName, rows);
	};

	/**
	 * Renders validation errors if any
	 */
	const renderValidationErrors = () => {
		if (validationErrors.length === 0) return null;

		return (
			<div className="mt-4 text-red-500 text-sm">
				<p className="font-medium mb-1">Please fix the following issues:</p>
				<ul className="list-disc pl-5">
					{validationErrors.map((err, index) => (
						<li key={index}>{err}</li>
					))}
				</ul>
			</div>
		);
	};

	/**
	 * Renders success message if save was successful
	 */
	const renderSuccessMessage = () => {
		if (!showSuccessMessage || !savedGrid) return null;

		return (
			<div className="mt-4 text-green-600 text-sm">
				<p>Grid "{savedGrid.name}" saved successfully!</p>
			</div>
		);
	};

	return (
		<>
			<button
				onClick={handleOpenModal}
				className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
				disabled={isLoading}
			>
				{isLoading ? "Saving..." : "Save Grid"}
			</button>

			{/* Modal overlay */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full">
						<h2 className="text-xl font-bold mb-4">Save Grid</h2>

						<div className="mb-4">
							<label
								htmlFor="gridName"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Grid Name
							</label>
							<input
								type="text"
								id="gridName"
								value={gridName}
								onChange={handleNameChange}
								className={`w-full px-3 py-2 border rounded-md ${
									nameError ? "border-red-500" : "border-gray-300"
								} focus:outline-none focus:ring-2 focus:ring-blue-500`}
								placeholder="Enter a name for your grid"
							/>
							{nameError && (
								<p className="mt-1 text-sm text-red-500">{nameError}</p>
							)}
						</div>

						{renderValidationErrors()}
						{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
						{renderSuccessMessage()}

						<div className="mt-6 flex justify-end space-x-3">
							<button
								onClick={handleCloseModal}
								className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={isLoading || showSuccessMessage}
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
							>
								{isLoading
									? "Saving..."
									: showSuccessMessage
										? "Saved!"
										: "Save"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SaveGridButton;

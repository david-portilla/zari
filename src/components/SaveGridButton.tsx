import React, { useState, useEffect } from "react";
import { ProductRow } from "../types";
import { useSaveGrid } from "../hooks/useSaveGrid";

interface SaveGridButtonProps {
	rows: ProductRow[];
}

/**
 * Button component that handles saving the grid with Zara-inspired minimal design
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
			<div className="mt-5 text-xs">
				<p className="uppercase tracking-wider mb-2">
					Please fix the following issues:
				</p>
				<ul className="space-y-1">
					{validationErrors.map((err, index) => (
						<li key={index} className="font-light">
							{err}
						</li>
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
			<div className="mt-5 text-xs">
				<p className="uppercase tracking-wider">
					Grid "{savedGrid.name}" saved successfully.
				</p>
			</div>
		);
	};

	return (
		<>
			<button
				onClick={handleOpenModal}
				className="px-6 py-1.5 border border-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
				disabled={isLoading}
			>
				{isLoading ? "Saving..." : "Save Grid"}
			</button>

			{/* Modal overlay */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
					<div className="w-full max-w-md p-8">
						<h2 className="text-base uppercase tracking-wider font-light mb-8 text-center">
							Save Grid
						</h2>

						<div className="mb-6">
							<label
								htmlFor="gridName"
								className="block text-xs uppercase tracking-wider mb-3"
							>
								Name
							</label>
							<input
								type="text"
								id="gridName"
								value={gridName}
								onChange={handleNameChange}
								className={`w-full px-3 py-2 border ${
									nameError ? "border-black" : "border-gray-200"
								} focus:outline-none focus:border-black text-sm`}
								placeholder="Enter a name for your grid"
							/>
							{nameError && <p className="mt-2 text-xs">{nameError}</p>}
						</div>

						{renderValidationErrors()}
						{error && <p className="mt-5 text-xs">{error}</p>}
						{renderSuccessMessage()}

						<div className="mt-10 flex justify-between">
							<button
								onClick={handleCloseModal}
								className="px-6 py-1.5 text-xs uppercase tracking-wider hover:underline"
								disabled={isLoading || showSuccessMessage}
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={isLoading || showSuccessMessage}
								className="px-6 py-1.5 border border-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading
									? "Saving..."
									: showSuccessMessage
										? "Saved"
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

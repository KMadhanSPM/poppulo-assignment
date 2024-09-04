"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const buttonClasses =
    "px-4 py-2 rounded transition-colors duration-200 ease-in-out";
  const activeClasses = "bg-gray-200 hover:bg-gray-300 text-gray-700";
  const disabledClasses = "bg-blue-500 text-white cursor-not-allowed";

  // Function to render buttons
  const renderButton = (label, onClick, disabled) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClasses} ${disabled ? disabledClasses : activeClasses}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex justify-between items-center mt-4 space-x-2">
      {renderButton("First", () => onPageChange(1), currentPage === 1)}
      {renderButton(
        "Previous",
        () => onPageChange(Math.max(currentPage - 1, 1)),
        currentPage === 1
      )}
      <span className="px-4 py-2 rounded bg-gray-200 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {renderButton(
        "Next",
        () => onPageChange(Math.min(currentPage + 1, totalPages)),
        currentPage === totalPages
      )}
      {renderButton(
        "Last",
        () => onPageChange(totalPages),
        currentPage === totalPages
      )}
    </div>
  );
}

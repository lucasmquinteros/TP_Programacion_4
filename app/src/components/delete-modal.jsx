import React from "react";

export default function DeleteModal({
  open,
  title = "Confirmar acción",
  message = "¿Estás seguro?",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2
            id="confirm-modal-title"
            className="text-2xl font-semibold text-gray-900"
          >
            {title}
          </h2>
          <p className="mt-3 text-gray-600 text-sm">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button
            className="cursor-pointer rounded-md px-4 py-2 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
            onClick={onCancel}
            type="button"
          >
            Cancelar
          </button>

          <button
            className="cursor-pointer rounded-md px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
            onClick={onConfirm}
            type="button"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar usuario"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { deleteUser } from "../services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "./delete-modal";

export default function UserCard({ user }) {
  const initials = (user.userName || "")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const mutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      alert("Usuario eliminado correctamente");
      setOpen(false);
    },
    onError: (err) => {
      alert("Error al eliminar usuario");
      setOpen(false);
    },
  });

  const handleConfirm = () => {
    mutation.mutate(user.id);
  };

  return (
    <>
      <article className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition m-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg bg-linear-to-br from-green-400 to-blue-500">
            {initials || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {user.userName}
            </h3>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {user.roles?.map((r, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full"
                >
                  {r}
                </span>
              ))}

              <span className="ml-2 text-xs text-gray-500">
                {user.reservas?.length ?? 0} reservas
              </span>
            </div>
          </div>
        </div>

        <button
          className="shrink-0 bg-red-500 text-white text-xs px-3 py-2 rounded hover:bg-red-600 transition cursor-pointer"
          aria-label={`Eliminar usuario ${user.userName}`}
          onClick={() => setOpen(true)}
        >
          Eliminar Usuario
        </button>
      </article>

      <ConfirmModal
        open={open}
        title={`Eliminar ${user.userName}`}
        message={`Esta acción eliminará al usuario "${user.userName}" de forma permanente. ¿Deseas continuar?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        loading={mutation.isLoading}
      />
    </>
  );
}

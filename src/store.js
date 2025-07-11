import { create } from 'zustand';
import toast from 'react-hot-toast';

export const useStore = create((set) => ({
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],

  AddToPaste: (newPaste) =>
    set((state) => {
      const updated = [...state.pastes, newPaste];
      localStorage.setItem("pastes", JSON.stringify(updated));
      toast.success("Paste created successfully");
      return { pastes: updated }; // ✅ Always return updated state
    }),

  removePaste: (paste) =>
    set((state) => {
      const updated = state.pastes.filter((p) => p.id !== paste.id);
      localStorage.setItem("pastes", JSON.stringify(updated));
      toast.success("Paste deleted successfully");
      return { pastes: updated }; 
    }),

  updatePaste: (newPaste) =>
    set((state) => {
      const updated = state.pastes.map((p) =>
        p.id === newPaste.id ? newPaste : p
      );
      localStorage.setItem("pastes", JSON.stringify(updated));
      toast.success("Paste updated successfully");
      return { pastes: updated }; // ✅ Always return updated state
    }),

  resetPaste: () =>
    set(() => {
      localStorage.removeItem("pastes");
      toast.success("All pastes reset");
      return { pastes: [] }; // ✅ Reset to empty array
    }),
}));

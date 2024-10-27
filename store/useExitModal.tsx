import { create } from 'zustand'

type useExitModalProps = {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
};

export const useExitModal = create<useExitModalProps>((set) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true}),  
  handleClose: () => set({ isOpen: false}),
})) 
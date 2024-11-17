import { create } from 'zustand'

type usePracticeModalProps = {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
};

export const usePracticeModal = create<usePracticeModalProps>((set) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true}),  
  handleClose: () => set({ isOpen: false}),
})) 
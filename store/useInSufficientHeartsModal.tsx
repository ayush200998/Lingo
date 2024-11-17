import { create } from 'zustand'

type useInsufficientHeartsModalProps = {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
};

export const useInsufficientHeartsModal = create<useInsufficientHeartsModalProps>((set) => ({
  isOpen: false,
  handleOpen: () => set({ isOpen: true}),  
  handleClose: () => set({ isOpen: false}),
})) 
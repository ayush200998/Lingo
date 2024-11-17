'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { usePracticeModal } from '@/store/usePracticeModal';
import Image from "next/image";
import { Button } from "../ui/button";

const PracticeModalModal = () => {
    const isPracticeModalModalOpen = usePracticeModal((state) => state.isOpen);
    const handlePracticeModalModalClose = usePracticeModal((state) => state.handleClose);

  return (
    <Dialog
        open={isPracticeModalModalOpen}
        onOpenChange={handlePracticeModalModalClose}
    >
        <DialogContent>
            <DialogHeader>
                <div className='flex justify-center items-center mb-2'>
                    <Image 
                        src='/assets/heart.svg'
                        alt='Hearts'
                        height={100}
                        width={100}
                    />
                </div>
            <DialogTitle className='font-bold text-2xl text-center'>
                Practice Lesson
            </DialogTitle>
            <DialogDescription className='text-base text-center'>
                Use practice lessons to regain hearts and points. You cannot loose hearts or points in practice lessons.
            </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <div className='flex flex-col gap-y-2 w-full'>
                    <Button
                        variant='primary'
                        size='lg'
                        className='w-full'
                        onClick={() => {
                            handlePracticeModalModalClose();
                        }}
                    >
                        I understand!
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default PracticeModalModal
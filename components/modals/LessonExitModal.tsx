'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useExitModal } from "@/store/useExitModal"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LessonExitModal = () => {
    const isLessonExitModalOpen = useExitModal((state) => state.isOpen);
    const handleLessopmExitModalClose = useExitModal((state) => state.handleClose);

    const router = useRouter();

  return (
    <Dialog
        open={isLessonExitModalOpen}
        onOpenChange={handleLessopmExitModalClose}
    >
        <DialogContent>
            <DialogHeader>
                <div className='flex justify-center items-center mb-2'>
                    <Image 
                        src='/assets/mascot_sad.svg'
                        alt='Sad mascot'
                        height={80}
                        width={80}
                    />
                </div>
            <DialogTitle className='font-bold text-2xl text-center'>
                Wait don&apos;t go
            </DialogTitle>
            <DialogDescription className='text-base text-center'>
                You&apos;re about to leave the lesson. Are you sure ?
            </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <div className='flex flex-col gap-y-2 w-full'>
                    <Button
                        variant='primary'
                        size='lg'
                        className='w-full'
                        onClick={handleLessopmExitModalClose}
                    >
                        Keep Learning
                    </Button>

                    <Button
                        variant='dangerOutline'
                        size='lg'
                        className='w-full'
                        onClick={() => {
                            handleLessopmExitModalClose();
                            router.push('/learn');
                        }}
                    >
                        End Sesson
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default LessonExitModal
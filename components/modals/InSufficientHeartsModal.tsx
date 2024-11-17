'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useInsufficientHeartsModal } from '@/store/useInSufficientHeartsModal'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const InsufficientHeartsModal = () => {
    const isInsufficientHeartsModalOpen = useInsufficientHeartsModal((state) => state.isOpen);
    const handleInsufficientHeartsModalClose = useInsufficientHeartsModal((state) => state.handleClose);

    const router = useRouter();

    const onPurchaseHeartsClick = () => {
        handleInsufficientHeartsModalClose();
        router.push('/store')
    }

  return (
    <Dialog
        open={isInsufficientHeartsModalOpen}
        onOpenChange={handleInsufficientHeartsModalClose}
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
                You ran out of hearts!
            </DialogTitle>
            <DialogDescription className='text-base text-center'>
                Get Pro for unlimited hearts, or purchase them from store. 
            </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <div className='flex flex-col gap-y-2 w-full'>
                    <Button
                        variant='primary'
                        size='lg'
                        className='w-full'
                        onClick={onPurchaseHeartsClick}
                    >
                        Get unlimited hearts
                    </Button>

                    <Button
                        variant='dangerOutline'
                        size='lg'
                        className='w-full'
                        onClick={() => {
                            handleInsufficientHeartsModalClose();
                        }}
                    >
                        No Thanks
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default InsufficientHeartsModal
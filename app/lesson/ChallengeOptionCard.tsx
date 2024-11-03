import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCallback } from "react";
import { useAudio, useKey } from 'react-use';

type ChallengeOptionCardProps = {
    id: number,
    imageSrc: string | null,
    audioSrc: string | null,
    text: string,
    shortcut: string, 
    selected?: boolean,
    onClick: () => void,
    status: 'correct' | 'wrong' | 'none'
    disabled?: boolean,
    type: typeof challenges.$inferSelect['type'],
}

function ChallengeOptionCard({
    id,
    imageSrc,
    audioSrc,
    text,
    shortcut,
    selected,
    onClick,
    status,
    disabled,
    type,
} : ChallengeOptionCardProps) {
    const [audio, _, controls] = useAudio({
        src: audioSrc || '',
      });

    const handleChallengeSelect = useCallback(() => {
        if (disabled) return;

        controls.play();
        onClick();
    }, [
        disabled,
        onClick,
        controls,
    ]);

    useKey(shortcut, handleChallengeSelect, {}, [handleChallengeSelect]);

  return (
    <div
        id={`challenge-card-${text}-${id}`}
        className={cn(
            'h-full border-2 border-b-4 rounded-xl p-4 lg:p-6 hover:bg-black/5 cursor-pointer active:border-b-2',
            selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
            selected && status === 'correct' && 'border-green-300 bg-green-100 hover:bg-green-200',
            selected && status === 'wrong' && 'border-rose-300 bg-rose-100 hover:bg-rose-200',
            disabled && 'pointer-events-none hover:bg-white',
            type === 'ASSIST' && 'lg:p-3 w-full'
        )}
        onClick={handleChallengeSelect}
    >
        {audio}
        {imageSrc && (
            <div
                className='relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full'
            >
                <Image 
                    src={imageSrc}
                    alt={text}
                    fill
                    className='object-contain'
                />
            </div>
        )}
        <div
            className={cn(
                'flex items-center justify-between',
                type === 'ASSIST' && 'flex-row-reverse'
            )}
        >
            {type === 'ASSIST' && <div />}
            <p
                className={cn(
                    'text-neutral-600 text-sm lg:text-base',
                    selected && 'text-sky-500',
                    selected && status === 'correct' && 'text-green-500',
                    selected && status === 'wrong' && 'text-rose-500',
                )}
            >
                {text}
            </p>

            <div
                className={cn(
                    'lg:w-[30px] lg:h-[30px] w-[15px] h-[15px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold',
                    selected && 'text-sky-500 border-sky-300',
                    selected && status === 'correct' && 'text-green-500 border-green-500',
                    selected && status === 'wrong' && 'text-rose-500 border-green-500',
                )}
            >
                {shortcut}
            </div>
        </div>
    </div>
  )
}

export default ChallengeOptionCard
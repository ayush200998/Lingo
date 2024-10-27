import { challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
    >
        {imageSrc && (
            <div
                className='relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full'
            >
                <Image 
                    src={imageSrc}
                    alt={text}
                    fill
                />
            </div>
        )}
        {text}
    </div>
  )
}

export default ChallengeOptionCard
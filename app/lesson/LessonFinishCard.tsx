import { cn } from "@/lib/utils"
import Image from "next/image"

type LessonFinishCardProps = {
    label: string,
    value: number,
    iconSrc: string,
}

function LessonFinishCard({
    label,
    value,
    iconSrc,
} : LessonFinishCardProps) {
  return (
    <div
        className={cn(
            'rounded-2xl flex flex-col items-center p-1 gap-y-2 lg:gap-y-2 lg:min-w-[240px] min-w-[140px]',
            label === 'Total Xp' && 'bg-orange-400 border-orange-400',
            label === 'Hearts left' && 'bg-rose-500 border-rose-500',
        )}
    >
        <p 
            className='text-lg font-bold text-white uppercase'
        >
            {label}
        </p>
        <div 
            className='w-full min-h-[100px] p-4 rounded-2xl bg-white flex items-center justify-center'
        >
            <Image 
                src={iconSrc}
                alt={label}
                width={24}
                height={24}
                className='mr-2'
            />
            <p 
                className={cn(
                    'text-xl font-bold text-neutral-800',
                    label === 'Total Xp' && 'text-orange-400',
                    label === 'Hearts left' && 'text-rose-500',
                )}
            >
            {value}
        </p>
        </div>
    </div>
  )
}

export default LessonFinishCard
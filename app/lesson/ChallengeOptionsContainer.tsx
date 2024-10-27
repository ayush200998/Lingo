import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils"
import ChallengeOptionCard from "./ChallengeOptionCard"

type ChallengeOptionsContainerProps = {
    options: typeof challengeOptions.$inferSelect[],
    type: typeof challenges.$inferSelect['type'],
    onSelect: (id: number) => void,
    status: 'correct' | 'wrong' | 'none'
    disabled?: boolean,
    selectedOption?: number
}

function ChallengeOptionsContainer({
    options,
    type,
    onSelect,
    status,
    disabled,
    selectedOption,
} : ChallengeOptionsContainerProps) {
  return (
    <div
        className={cn(
            'grid gap-2',
            type === 'ASSIST' && 'grid-cols-1',
            type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
        )}
    >
        {options.map((option, index) => (
            <ChallengeOptionCard
                key={option.id}
                id={option.id}
                text={option.text}
                imageSrc={option.imageSrc}
                audioSrc={option.audioSrc}
                shortcut={`${index + 1}`}
                selected={selectedOption === option.id}
                onClick={() => onSelect(option.id)}
                status={status}
                type={type}
                disabled={disabled}
            />
        ))}
    </div>
  )
}

export default ChallengeOptionsContainer
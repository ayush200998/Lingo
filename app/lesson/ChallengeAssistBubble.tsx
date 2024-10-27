import Image from "next/image"

type ChallengeAssistBubbleProps = {
    question: string,
}

function ChallengeAssistBubble({ question } : ChallengeAssistBubbleProps) {
  return (
    <div
        id='challenge-assist-bubble'
        className='flex items-center gap-x-4 mb-6'
    >
        <Image 
            src='/assets/mascot.svg'
            alt='mascot'
            height={60}
            width={60}
            className='hidden lg:block'
        />

        <Image 
            src='/assets/mascot.svg'
            alt='mascot'
            height={60}
            width={60}
            className='block lg:hidden'
        />

        <div
            className='relative px-4 py-2 border-2 rounded-xl text-sm lg:text-xl'
        >
            {question}

            <div 
                className='absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-t-8 border-x-transparent transform -translate-y-1/2 rotate-90'
            />
        </div>
    </div>
  )
}

export default ChallengeAssistBubble
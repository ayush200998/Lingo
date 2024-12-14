import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

type LessonQuizFooterProps = {
    onCheck: () => void,
    status: 'correct' | 'wrong' | 'none' | 'completed',
    lessonId?: number,
    disabled?: boolean,
};

function LessonQuizFooter({
    onCheck,
    status,
    lessonId,
    disabled,
} : LessonQuizFooterProps) {
    const isMobileView = useMedia('(max-width: 1024px)');
    useKey('Enter', onCheck, {}, [onCheck]);
  return (
    <footer
        className={cn(
            'lg:h-[140px] h-[100px] border-t-2',
            status === 'correct' && 'border-t-transparent bg-green-100 dark:bg-green-700',
            status === 'wrong' && 'border-t-transparent bg-rose-100 dark:bg-rose-700'
            
        )}
    >
        <div
            className='h-full max-w-[1140px] flex items-center justify-between mx-auto lg:px-10 px-6'
        >
            {status === 'correct' && (
                <div
                    className='text-green-500 dark:text-green-300 text-base lg:text-2xl font-bold flex items-center'
                >
                    <CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
                    Nicely done!
                </div>
            )}
            {status === 'wrong' && (
                <div
                    className='text-rose-500 dark:text-rose-300 text-base lg:text-2xl font-bold flex items-center'
                >
                    <XCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
                    Try again
                </div>
            )}
            {status === 'completed' && (
                <Button
                    variant='default'
                    size={isMobileView ? 'sm' : 'lg'}
                    onClick={() => window.location.href = `/lesson/${lessonId}`}
                >
                    Practice again
                </Button>
            )}
            <Button
                disabled={disabled}
                className='ml-auto'
                size={isMobileView ? 'sm' : 'lg'}
                variant={status === 'wrong' ? 'danger' : 'secondary'}
                onClick={onCheck}
            >
                {status === 'none' && 'Check'}
                {status === 'correct' && 'Next'}
                {status === 'wrong' && 'Retry'}
                {status === 'completed' && 'Continue'}
            </Button>
        </div>
    </footer>
  )
}

export default LessonQuizFooter
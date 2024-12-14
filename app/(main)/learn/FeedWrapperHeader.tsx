import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type FeedWrapperHeaderProps = {
    title: string,
};

const FeedWrapperHeader = ({ title }: FeedWrapperHeaderProps) => {
  return (
    <div
        id='feed-wrapper-header'
        className='sticky top-0 pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 text-neutral-400 mb-5 lg:z-50'
    >
        <Link href='/courses'>
            <Button
                size='sm'
                variant='defaultOutline'
            >
                <ArrowLeft className='h-5 w-5 stroke-2 text-neutral-400 dark:text-neutral-300' />
            </Button>
        </Link>
        <h1
            className='font-bold text-lg dark:text-neutral-300'
        >
            {title}
        </h1>

        <div />
    </div>
  )
}

export default FeedWrapperHeader
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='max-w-screen-lg w-full h-full mx-auto flex flex-col lg:flex-row p-4 gap-3 items-center justify-center'>
      <div
        className='relative w-[200px] h-[200px] lg:w-[400px] lg:h-[360px] mb-4 lg:mb-0'
      >
        <Image
          src='/assets/hero.svg'
          alt='Hero'
          fill
        />
      </div>

      <div
        className='flex flex-col gap-y-6 items-center'
      >
        <h1
          className='text-xl text-neutral-600 max-w-[480px] lg:text-3xl font-bold text-center dark:text-neutral-300'
        >
          Learn, practice and master new languages with Lingo
        </h1>

        <div className='flex flex-col items-center gap-y-2'>
          <ClerkLoading>
            <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode='modal'
                fallbackRedirectUrl='/learn'
                signInFallbackRedirectUrl='/learn'
              >
                <Button size='lg' variant='secondary' className='w-full'>
                  Get started
                </Button>
              </SignUpButton>
              <SignInButton
                mode='modal'
                fallbackRedirectUrl='/learn'
                signUpFallbackRedirectUrl='/learn'
              >
                <Button size='lg' variant='primaryOutline' className='w-full'>
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button
                size='lg'
                variant='secondary'
                className='w-full'
              >
                <Link 
                  href='/learn'
                >
                  Continue learing
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </main>
  );
}

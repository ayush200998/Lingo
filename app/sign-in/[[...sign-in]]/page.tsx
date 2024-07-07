import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return (
        <div
            className='h-screen w-full flex flex-col items-center justify-center'
        >
            <SignIn path="/sign-in" />
        </div>
    );
}

export default SignInPage;
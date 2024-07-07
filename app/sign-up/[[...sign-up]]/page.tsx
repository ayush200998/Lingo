import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <div
            className='h-screen w-full flex flex-col items-center justify-center'
        >
            <SignUp path="/sign-up" />
        </div>
    );
}

export default SignUpPage
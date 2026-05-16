import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <span className="text-3xl mb-2 block">📬</span>
          <h1 className="text-xl font-bold">Welcome back to NewsLetterCraft</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border border-gray-200 rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}

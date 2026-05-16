import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <span className="text-3xl mb-2 block">📬</span>
          <h1 className="text-xl font-bold">Join NewsLetterCraft</h1>
          <p className="text-sm text-gray-500 mt-1">Start writing better newsletters</p>
        </div>
        <SignUp
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

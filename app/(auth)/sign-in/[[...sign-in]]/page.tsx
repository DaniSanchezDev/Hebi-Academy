import { SignIn } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

function SignInPage() {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-4 min-h-screen 
    '>
      <div className='w-full max-w-md p-6 rounded-xl border border-indigo-100 shadow-lg bg-white'>
        <h1 className='font-semibold text-4xl text-indigo-800 mb-2'>Welcome back!</h1>
        <p className='text-xl text-indigo-600 mb-6'>Sign in to continue</p>

        <SignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          redirectUrl="/"
          initialValues={{
            emailAddress: ''
          }}
          appearance={{
            elements: {
              formButtonPrimary: 
                'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white',
              formFieldInput: 
                'border-indigo-200 focus:border-violet-500 focus:ring-violet-500',
              card: 'shadow-none',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 
                'border border-indigo-200 hover:bg-indigo-50 transition',
              footer: 'text-indigo-600'
            }
          }}
        />
        
        <div className="mt-6 text-center">
          <p className="text-indigo-700">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-medium text-violet-600 hover:text-violet-800 underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
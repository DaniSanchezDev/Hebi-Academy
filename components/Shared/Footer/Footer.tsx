import Link from 'next/link'

export function Footer() {
  return (
    <footer className=' py-4 px-6 border-t bg-white w-full'>
      <div className='flex justify-between items-center text-sm text-sky-500'>
        <p>2025 &copy; Daniel Sánchez Vázquez</p>
        <div className='flex gap-2 items-center'>
          <Link href="/privacy-policy">Privacidad</Link>
          <Link href="/terms">Terminos de uso</Link>
        </div>
      </div>
    </footer>
  )
}

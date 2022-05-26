import Navbar from '@components/Navbar'

const Layout = (props, init) => {
  const { children } = props
  return (
    <>
      <main className='mx-auto flex w-full max-w-2xl flex-col justify-center px-8 py-36'>
        {children}
      </main>
      <Navbar />
    </>
  )
}

export default Layout

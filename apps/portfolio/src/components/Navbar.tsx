import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'classnames'
import {
  Home,
  User,
  Briefcase,
  Edit2,
  Aperture,
  Activity,
  Tool
} from 'react-feather'

function NavItem({ href, name, children }) {
  const router = useRouter()
  const isActive = router.asPath === href
  return (
    <Link href={href}>
      <a
        className={cn(
          isActive ? 'bg-white-0/75' : 'bg-white-10',
          'hover:bg-white-10/50 group relative block rounded-xl transition-all duration-200'
        )}
      >
        <span>{children}</span>
        <span className='bg-white-800 text-white-50 absolute -inset-x-6 -top-12 mx-auto max-w-max scale-0 rounded-md py-1 px-2 text-center text-sm transition-all duration-200 sm:group-hover:scale-100'>
          {name}
        </span>
      </a>
    </Link>
  )
}

const Nav = () => {
  return (
    <footer className='fixed inset-x-0 bottom-6  z-[9999999999] w-full text-center transition-all duration-500 md:bottom-9'>
      <nav className='mx-auto max-w-fit'>
        <div className='border-white-200 bg-white-50/[.85] fixed_nav mx-8 flex items-center space-x-2 overflow-x-auto rounded-[1.5rem] border-2 p-3 backdrop-blur  transition-all sm:overflow-x-visible'>
          <NavItem href='/' name='Home'>
            <Home className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/now' name='Now'>
            <Activity className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/about' name='About'>
            <User className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/projects' name='Projects'>
            <Briefcase className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/blog' name='Blog'>
            <Edit2 className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/play' name='Play'>
            <Aperture className='text-white-800 p-3' size={40} />
          </NavItem>
          <NavItem href='/colophon' name='Colophon'>
            <Tool className='text-white-800 p-3' size={40} />
          </NavItem>
        </div>
      </nav>
    </footer>
  )
}

export default Nav

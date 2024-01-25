import { FC } from 'react'

interface FooterProps {
  
}

const Footer: FC<FooterProps> = ({}) => {
  return <footer className='bg-white border-1'>
    <div className='mx-auto py-10'>
      <p className='text-center text-sx text-black'>
        &copy; 2023 FakeStoreName, Inc, All rights reserved.
      </p>
    </div>
  </footer>
}

export default Footer
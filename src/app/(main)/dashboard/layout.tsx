import React from 'react'

interface LayoutProps{
    children:React.ReactNode,
    params:any
}
const layout:React.FC<LayoutProps> = ({children,params}) => {
  return (
    <main className='flex overflow-hidden h-screen'>
        {
            children
        }
    </main>
  )
}

export default layout

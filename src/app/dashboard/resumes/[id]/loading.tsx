import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingPageComponent = () => {
  return (
	 <div className='flex items-center justify-center h-screen w-full'>
		<Loader2 className='animate-spin' size={30}/>
	 </div>
  )
}

export default LoadingPageComponent
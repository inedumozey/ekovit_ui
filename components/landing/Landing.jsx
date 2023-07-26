import React from 'react'
import Skeleton from '../utils/Skeleton'



export default function Landing() {

    return (
        <div className='flex gap-1 flex-wrap'>
            {
                [1, 2, 3].map((item, i) => {
                    return (
                        <div key={i} className='lg:w-[47%] md:w-[100%] w-[100%] flex-0'>
                            <Skeleton type='comment' />
                        </div>
                    )
                })
            }
        </div>
    )
}

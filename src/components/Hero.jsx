import React from 'react'
import Button from './Button'

export default function Hero() {
    return (
        <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
            <div className='flex flex-col gap-4'>

                <p>Sculpt Your Physique With</p>
                <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>Rep<span className='text-fuchsia-600'>Xplore</span></h1>
            </div>
            <p className='text-sm md:text-base font-light'><span className='text-fuchsia-600 font-medium'>By signing up</span>, I understand that I may become incredibly muscle-bound and accept all risks of transforming into the local behemoth, burdened with epic gains, suffering from an 
                inability to find clothes that fit, and facing challenges squeezing through standard doorways.</p>
            
            <Button func={() => {
                window.location.href = '#generate'
            }} text={"Consent To and Begin "}></Button>
        </div>
    )
}
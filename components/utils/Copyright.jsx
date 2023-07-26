import React, { useContext } from 'react'
import { ContextData } from '../../context/Context'
let currentYear = (new Date()).getFullYear();
let startedYear = 2023

export default function Copyright() {
    const { contact } = useContext(ContextData)

    return (
        <div className='text-center text-[.8rem] leading-[50px]' >
            <div>
                &copy; {currentYear > startedYear ? currentYear : startedYear} {contact.name} All Right Reserved
            </div>
        </div>
    )
}
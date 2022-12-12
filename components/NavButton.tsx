import React from 'react'

interface Props {
    title: string,
    isActive?: boolean,
    onClick?: () => void;
}

function NavButton({title, isActive, onClick}: Props) {
  return (
    <button onClick={onClick} className={`${isActive && "bg-[#bde0fe]"} hover:bg-emerald-500/50 text-gray-600 py-2 px-4 rounded font-bold shadow-md`}  >{title}</button>
  )
}

export default NavButton
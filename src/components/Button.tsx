import { ReactElement } from 'react';

interface Props {
  label: string;
  icon?: ReactElement;
  variant: 'primary' | 'secondary';
  link: string;
}

export function Button({label, icon, variant, link}: Props) {
  const mode = variant == 'primary' ? 'bg-green-500 hover:bg-green-700' : 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900 '
  return (
    <a href={link} 
      className={["p-4 text-sm flex items-center rounded font-bold uppercase gap-2 justify-center  transition-colors", mode].join(' ')}>
      {icon ?? icon}
      {label}
    </a> 
  )
}
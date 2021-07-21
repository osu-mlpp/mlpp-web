import { ReactChild } from "react";
import { IconType } from "react-icons";
import classnames from 'classnames'

interface BadgeProps {
  children: ReactChild;
  Icon?: IconType;
  className?: string[] | string;
}

export default function Badge({ children, Icon, className }: BadgeProps) {
  return (
    <span className={`px-4 rounded-full inline-flex place-items-center shadow-sm hover:shadow-md transition-shadow ${classnames(className)}`}>
      { children }
      { Icon && <Icon className="ml-1" /> }
    </span>
  )
}
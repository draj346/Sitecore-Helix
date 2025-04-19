import { CustomLinkTypes } from 'lib/component-props';
import Link from 'next/link';
import { useCallback } from 'react';

const CustomLink = ({
  href,
  id,
  onClick,
  title,
  className,
  children,
  target,
  rel,
  role,
}: CustomLinkTypes) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  }, []);

  return (
    <Link
      href={href}
      id={id}
      title={title}
      className={className}
      onClick={onClick ? handleClick : undefined}
      target={target}
      rel={rel}
      role={role}
    >
      {children}
    </Link>
  );
};

export default CustomLink;

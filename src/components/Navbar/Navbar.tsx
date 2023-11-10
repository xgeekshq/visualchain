import { ReactNode } from 'react';

type NavbarProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="w-[210px] p-2">
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
};

export default Navbar;

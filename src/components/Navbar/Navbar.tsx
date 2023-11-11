import { ReactNode } from 'react';

type NavbarProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  return (
    <nav className="flex flex-col items-center w-[210px] h-full overflow-hidden text-gray-400 bg-gray-900 rounded-tr-md rounded-br-md">
      <div className="flex items-center justify-center w-full px-3 mt-3 text-sm font-bold">
        VisualChain
      </div>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

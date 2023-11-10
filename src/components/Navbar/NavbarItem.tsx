type NavbarItemProps = {
  label: string;
  onClick: () => void;
};

const NavbarItem = ({ label, onClick }: NavbarItemProps) => {
  return (
    <li
      className="bg-green-700 text-white text-lg py-2 cursor-pointer text-center rounded-md"
      onClick={onClick}>
      {label}
    </li>
  );
};

export default NavbarItem;

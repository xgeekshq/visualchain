type NavbarItemProps = {
  label: string;
  type?: string;
  onClick: () => void;
  draggable?: boolean;
};

const NavbarItem = ({
  label,
  type = 'default',
  onClick,
  draggable = false,
}: NavbarItemProps) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <li
      className="bg-green-700 text-white text-lg py-2 cursor-pointer text-center rounded-md"
      onClick={onClick}
      onDragStart={(e) => onDragStart(e, type)}
      draggable={draggable}>
      {label}
    </li>
  );
};

export default NavbarItem;

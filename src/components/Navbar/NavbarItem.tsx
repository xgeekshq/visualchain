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
    <div
      className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
      onClick={onClick}
      onDragStart={(e) => onDragStart(e, type)}
      draggable={draggable}>
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
  );
};

export default NavbarItem;

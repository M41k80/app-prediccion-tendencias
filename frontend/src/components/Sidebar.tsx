import {
  Home,
  HelpCircle,
  FilePlus,
  History,
  CircleUserRound,
} from "lucide-react";

const icons = [Home, FilePlus, History,CircleUserRound,HelpCircle];

export default function Sidebar() {
  return (
    <aside className="w-40 bg-gris text-white flex flex-col items-center py-6 space-y-8">
      {icons.map((Icon, idx) => (
        <Icon
          key={idx}
          className="w-6 h-6 hover:bg-gris2 cursor-pointer"
          color="black"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </aside>
  );
}

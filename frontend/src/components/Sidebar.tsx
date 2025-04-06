import { Home, Upload, BarChart2, RotateCcw, HelpCircle } from "lucide-react";

const icons = [Home, Upload, BarChart2, RotateCcw, HelpCircle];

export default function Sidebar() {
  return (
    <aside className="w-16 bg-yellow-400 text-white flex flex-col items-center py-6 space-y-8">
      {icons.map((Icon, idx) => (
        <Icon key={idx} className="w-6 h-6 hover:text-zinc-400 cursor-pointer" />
      ))}
    </aside>
  );
}

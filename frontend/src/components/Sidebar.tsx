import {
  Home,
  HelpCircle,
  FilePlus,
  History,
  CircleUserRound,
} from "lucide-react"

const sidebarItems = [
{icon: Home, label: "Inicio"},
{icon: FilePlus, label: "Nueva Predicción"},
{icon: History, label: "Historial"},
{icon: CircleUserRound, label: "Perfil"},
{icon: HelpCircle, label: "Ayuda"}]


export default function Sidebar() {
  return (
    <aside className="w-1/7 bg-gris text-white flex flex-col items-center py-6 space-y-8">
      {sidebarItems.map(({icon:Icon, label}, idx) => (
        <div key={idx} className="flex flex-raw items-center space-y-2 gap-2 hover:bg-gris2 cursor-pointer w-full py-2 px-4">
        <Icon
          className="w-auto h-auto"
          color="black"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <span className="text-base font-semibold text-black">
          {label}
        </span>
        </div>
      ))}
    </aside>
  )
}

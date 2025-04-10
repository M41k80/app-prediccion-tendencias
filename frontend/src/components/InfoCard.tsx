interface InfoCardProps {
  title?: string
  subtitle?: string
  value?: string
  buttonText?: string
}

export default function InfoCard({ title, subtitle, value, buttonText }: InfoCardProps) {
  return (
    <div className="bg-white shadow-sm p-4 flex flex-col justify-between h-full border border-gray-200 rounded-xl">
      <div>
        {title && <h3 className="text-lg font-semibold text-black mb-1">{title}</h3>}
        {value && <p className="text-3xl font-semibold text-blue-600 mt-1">{value}</p>}
        {subtitle && <p className="text-sm text-gray-600 font-medium">{subtitle}</p>}
      </div>

      {buttonText && (
        <button className="mt-4 text-sm px-4 py-1.5 rounded-md text-black bg-gray-200 hover:bg-gray-300 self-start cursor-pointer">
          {buttonText}
        </button>
      )}
    </div>
  )
}

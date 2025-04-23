function SidebarItem({ icon, label, active = false }) {
    return (
      <div className={`flex items-center px-4 py-2 rounded-lg text-sm ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
        <div className="mr-3">{icon}</div>
        <span className={active ? 'font-medium' : ''}>{label}</span>
      </div>
    );
  }
  
  export default SidebarItem;

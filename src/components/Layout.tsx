import { LoginModal } from "@/components/LoginModal";
import { Home, User, Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const publicMenuItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre nós", href: "/sobre-nos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Contato", href: "/contato" },
];

const clientMenuItems = [
  { label: "Meus Projetos", href: "/client", icon: User },
];

const adminMenuItems = [
  { label: "Painel Admin", href: "/admin", icon: User },
];

export function Layout() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profile) {
        setUserRole(profile.role);
      }
    }
  }

  const getMenuItems = () => {
    if (location.pathname.startsWith('/admin') && userRole === 'ADMIN') {
      return [];
    }
    if (location.pathname.startsWith('/client') && userRole === 'CLIENT') {
      return [];
    }
    return publicMenuItems;
  };

  const menuItems = getMenuItems();
  const showNavigation = menuItems.length > 0;
  const isAdminOrClientPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/client');

  return (
    <div className="min-h-screen flex w-full">
      {!isAdminOrClientPage && showNavigation && (
        <Sidebar>
          <SidebarContent className="bg-white">
            <div className="flex justify-end p-2">
              <SidebarTrigger>
                <X className="text-[#f9e616] hover:text-[#f9e616]/90 h-6 w-6 cursor-pointer" />
              </SidebarTrigger>
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.href}
                      className={`flex items-center gap-2 ${
                        location.pathname === item.href ? 'font-bold' : ''
                      }`}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      )}

      <div className={`flex-1 flex flex-col ${state === "expanded" ? "relative after:absolute after:inset-0 after:bg-black/20 after:backdrop-blur-sm" : ""}`}>
        <header className="bg-[#420030] h-16">
          <div className="h-full max-w-7xl mx-auto px-4 flex items-center">
            {!isAdminOrClientPage && (
              <SidebarTrigger>
                <Menu className="text-[#f9e616] hover:text-[#f9e616]/90 h-6 w-6 cursor-pointer" />
              </SidebarTrigger>
            )}
            {!isAdminOrClientPage && showNavigation && (
              <nav className="flex-1 hidden md:flex items-center justify-center flex-wrap gap-y-2">
                {menuItems.map((item, index) => (
                  <div key={item.label} className="flex items-center">
                    <Link 
                      to={item.href} 
                      className={`px-3 py-2 text-white hover:text-gray-200 transition-colors whitespace-nowrap flex items-center gap-2 ${
                        location.pathname === item.href ? 'font-bold' : ''
                      }`}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                    {index < menuItems.length - 1 && (
                      <Separator orientation="vertical" className="h-4 bg-white/30" />
                    )}
                  </div>
                ))}
              </nav>
            )}
            <div className="ml-auto">
              <LoginModal />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="bg-[#420030] text-white py-6 text-center">
          <p className="mb-2 px-4 text-sm md:text-base">Giulia Cardozo | Arquitetura e Interiores - Transformando sonhos em realidade</p>
          <p className="text-sm md:text-base">&copy; 2025 Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}
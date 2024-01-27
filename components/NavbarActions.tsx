"use client";

import { Menu, ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "./ui/Button";
import useCart from "@/hooks/useCart";
import { Category } from "@/types";
import { Sidebar } from "./Sidebar";

const NavbarActions = ({ categories }: { categories: Category[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const [showOnSmallScreen, setShowOnSmallScreen] = useState(false);
  useEffect(() => {
    setShowOnSmallScreen(isTablet);
  }, [isTablet]);

  const routes = categories.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
      {showOnSmallScreen && (
        <Sidebar>
          <Sidebar.Trigger>
            <Menu />
          </Sidebar.Trigger>
          <Sidebar.Root>
            <Sidebar.Header className="justify-between items-center">
              <h2>Store</h2>
              <Sidebar.Trigger>
                <Menu />
              </Sidebar.Trigger>
            </Sidebar.Header>
            <Sidebar.Content>
              {routes.map((route) => (
                <Sidebar.Item
                  key={route.label}
                  href={route.href}
                  isActive={route.active}
                >
                  {route.label}
                </Sidebar.Item>
              ))}
            </Sidebar.Content>
          </Sidebar.Root>
        </Sidebar>
      )}
    </div>
  );
};

export default NavbarActions;

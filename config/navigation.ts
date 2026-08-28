export interface NavItem {
      title: string;
        icon: string;
          href: string;
            badge?: string;
            }

            export const sidebarNavigation: NavItem[] = [
              {
                  title: "Dashboard",
                      icon: "🏠",
                          href: "/",
                            },
                              {
                                  title: "Orders",
                                      icon: "📦",
                                          href: "/orders",
                                            },
                                              {
                                                  title: "Products",
                                                      icon: "🛍️",
                                                          href: "/products",
                                                            },
                                                              {
                                                                  title: "Customers",
                                                                      icon: "👥",
                                                                          href: "/customers",
                                                                            },
                                                                              {
                                                                                  title: "Marketing",
                                                                                      icon: "📢",
                                                                                          href: "/marketing",
                                                                                            },
                                                                                              {
                                                                                                  title: "AI Studio",
                                                                                                      icon: "🤖",
                                                                                                          href: "/ai",
                                                                                                              badge: "NEW",
                                                                                                                },
                                                                                                                  {
                                                                                                                      title: "Automation",
                                                                                                                          icon: "⚡",
                                                                                                                              href: "/automation",
                                                                                                                                },
                                                                                                                                  {
                                                                                                                                      title: "Apps",
                                                                                                                                          icon: "🧩",
                                                                                                                                              href: "/apps",
                                                                                                                                                },
                                                                                                                                                  {
                                                                                                                                                      title: "Settings",
                                                                                                                                                          icon: "⚙️",
                                                                                                                                                              href: "/settings",
                                                                                                                                                                },
                                                                                                                                                              {
                                                                                                                                                                title: "Payments",
                                                                                                                                                                  icon: "💳",
                                                                                                                                                                    href: "/settings/payments",
                                                                                                                                                                    },
                                                                                                                                                                ];

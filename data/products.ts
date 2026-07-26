export type Product = {
      id: number;
        name: string;
          category: string;
            sku: string;
              price: string;
                stock: number;
                  status: "Active" | "Low Stock" | "Out of Stock";
                  };

                  export const products: Product[] = [
                    {
                        id: 1,
                            name: "Premium Leather Wallet",
                                category: "Accessories",
                                    sku: "ACC-001",
                                        price: "Rs. 2,499",
                                            stock: 42,
                                                status: "Active",
                                                  },
                                                    {
                                                        id: 2,
                                                            name: "Wireless Earbuds",
                                                                category: "Electronics",
                                                                    sku: "ELE-015",
                                                                        price: "Rs. 6,999",
                                                                            stock: 8,
                                                                                status: "Low Stock",
                                                                                  },
                                                                                    {
                                                                                        id: 3,
                                                                                            name: "Sports Water Bottle",
                                                                                                category: "Fitness",
                                                                                                    sku: "FIT-023",
                                                                                                        price: "Rs. 1,299",
                                                                                                            stock: 0,
                                                                                                                status: "Out of Stock",
                                                                                                                  },
                                                                                                                  ];
                                                                                                                  
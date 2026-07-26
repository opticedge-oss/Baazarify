export interface Merchant {
      id: string;
        storeName: string;
          tenantId: string;
            tier: 'free' | 'premium' | 'enterprise';
              theme: string; // ID of selected theme
                aiGenerationsUsed: number;
                  aiGenerationsLimit: number;
                    features: string[]; // ['cod', 'analytics', 'ai-assistant', 'theme-customizer']
                      subscriptionEndsAt?: Date;
                        createdAt: Date;
                          updatedAt: Date;
                          }

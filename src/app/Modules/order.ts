export interface AddOrder {
    addressId: number;  // Required field for AddressId
    token: string;      // Required field for Token
  }
  export interface OrderAddState {
    state: boolean;           // State is a boolean (non-nullable)
    type?: string | null;     // Type is a string or null (nullable)
    message: string;          // Message is a string (non-nullable)
    sessionUrl?: string | null; // SessionUrl is a string or null (nullable)
  }
    
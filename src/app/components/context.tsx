import React from "react";

type ContextValue = {
  value: [];
};
const context = React.createContext<any>("hello");
const ProviderContext = context.Provider;
export default context;

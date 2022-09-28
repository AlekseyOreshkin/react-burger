import {
    Tab as TabUI,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  
  export const Tab: React.FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
  }> = TabUI;
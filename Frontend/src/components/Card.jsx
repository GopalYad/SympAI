import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

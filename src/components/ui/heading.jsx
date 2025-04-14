import React from "react";

const Heading = ({ children, className = "", as = "h2", size = "lg" }) => {
  const Tag = as;
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
  };

  return (
    <Tag
      className={`font-bold text-gray-900 dark:text-white ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Heading;

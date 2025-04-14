import React from "react";

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-7xl",
  xl: "max-w-screen-7xl",
  "2xl": "max-w-screen-7xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "py-0",
  sm: "py-2",
  md: "py-2",
  lg: "py-4",
  xl: "py-8",
};

const SectionWrapper = ({
  children,
  className = "",
  id,
  as = "section",
  maxWidth = "lg",
  padding = "md",
}) => {
  const baseClasses = "w-full mx-auto";
  const maxWidthClass = maxWidthClasses[maxWidth];
  const paddingClass = paddingClasses[padding];

  const Tag = as;

  return (
    <Tag
      id={id}
      className={`${baseClasses} ${maxWidthClass} ${paddingClass} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SectionWrapper;

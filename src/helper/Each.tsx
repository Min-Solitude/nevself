import React, { Children } from "react";

interface EachProps {
  render: (item: any, index: number) => React.ReactNode;
  of: any[];
}

export const Each = ({ render, of }: EachProps) =>
  Children.toArray(of.map((item, index) => render(item, index)));

import React from "react";

type Props = {
  title?: string;
};

export default function AdminTemplate({ title }: Props) {
  return (
    <div className="container">
      <h3>AdminTemplate</h3>
    </div>
  );
}

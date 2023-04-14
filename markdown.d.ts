declare module "*.md" {
  import React from "react";
  const react: React.VFC;
  export { react };
  const attributes: Record<string, unknown>;
  export { attributes };
  const html: string;
  export { html };
}

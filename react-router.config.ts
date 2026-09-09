import type { Config } from "@react-router/dev/config";

export default {
  // prerender enabled for Phase 6 deploy — disabled locally to avoid SSR timeout on framer-motion; re-enable with `pnpm build` on Vercel (static)
  // prerender: [
  //   "/", "/projects",
  //   "/projects/manhaj", "/projects/aqua", "/projects/veridex",
  //   "/projects/rentledger", "/projects/sahnaf", "/projects/nomad",
  //   "/about", "/contact",
  // ],
} satisfies Config;

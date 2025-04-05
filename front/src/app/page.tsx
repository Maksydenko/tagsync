import { redirect } from "next/navigation";

import { Locale } from "@/shared/model";

// This page only renders when the app is built statically (output: 'export')
const RootPage = () => {
  redirect("/" + Locale.Default);
};

export default RootPage;

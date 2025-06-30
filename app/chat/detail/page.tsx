import { Suspense } from "react";
import ChatPageClient from "./ChatPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading chat...</p>}>
      <ChatPageClient />
    </Suspense>
  );
}

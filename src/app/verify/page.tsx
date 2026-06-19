import type { Metadata } from "next"
import VerifyClient from "./client"

export const metadata: Metadata = {
  title: "Verify Certificate",
  description: "Verify the authenticity of credentials, training course documents, and internship certificates issued by Prokodex.",
}

export default function VerifyPage() {
  return <VerifyClient />
}

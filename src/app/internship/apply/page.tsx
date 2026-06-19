import type { Metadata } from "next"
import ApplyClient from "./client"

export const metadata: Metadata = {
  title: "Apply for Internship",
  description: "Enroll in a Prokodex internship program. Select your path, choose your mentorship tier, and submit your application to start coding live systems.",
}

export default function ApplyPage() {
  return <ApplyClient />
}

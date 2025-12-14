import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewThreadForm } from '@/components/forum/new-thread-form'
import { ArrowLeft } from 'lucide-react'

export default async function NewThreadPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/forum"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Thread</h1>
            <p className="text-lg text-muted-foreground">
              Start a discussion, ask a question, or share your knowledge with the community.
            </p>
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thread Details</CardTitle>
            </CardHeader>
            <CardContent>
              <NewThreadForm preSelectedCategory={category} />
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Posting Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✅ Be respectful and constructive</p>
              <p>✅ Search before posting to avoid duplicates</p>
              <p>✅ Use clear, descriptive titles</p>
              <p>✅ Provide context and details</p>
              <p>✅ Format code with backticks: `code`</p>
              <p>❌ No spam, self-promotion, or offensive content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

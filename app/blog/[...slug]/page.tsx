import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function BlogSlugRedirectPage({ params }: Props) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
  redirect(`/blogs/${fullSlug}`);
}

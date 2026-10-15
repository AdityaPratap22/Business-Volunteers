import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';
import { ALL_TOOLS, getToolById } from '../../../src/data/toolsData';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ALL_TOOLS.map(tool => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return constructNextMetadata('tools', slug);
}

export default async function DedicatedToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolById(slug);
  const targetSlug = tool?.slug || slug;
  redirect(`/tools-standalone/${targetSlug}.html`);
}

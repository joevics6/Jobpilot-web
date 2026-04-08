import { redirect } from 'next/navigation';

export default async function UKJobPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  redirect(`/jobs/united-kingdom/${params.slug}`);
}

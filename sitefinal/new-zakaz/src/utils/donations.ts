export interface DonationRow {
  slug: string;
  collected?: number;
  goal?: number;
}

// Reads JSON array from a public URL (Google Sheets via published JSON or your own endpoint)
export async function fetchDonations(url: string): Promise<DonationRow[]> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch donations: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .map((r: any) => ({
        slug: String(r.slug || '').trim(),
        collected: r.collected != null ? Number(r.collected) : undefined,
        goal: r.goal != null ? Number(r.goal) : undefined,
      }))
      .filter(r => !!r.slug);
  } catch {
    return [];
  }
}

export function mergeDonations<T extends { slug: string; donationInfo: { collected: number; goal: number } }>(
  projects: T[],
  rows: DonationRow[],
): T[] {
  const map = new Map(rows.map(r => [r.slug, r]));
  return projects.map(p => {
    const row = map.get(p.slug);
    if (!row) return p;
    return {
      ...p,
      donationInfo: {
        ...p.donationInfo,
        collected: row.collected != null ? row.collected : p.donationInfo.collected,
        goal: row.goal != null ? row.goal : p.donationInfo.goal,
      },
    };
  });
}











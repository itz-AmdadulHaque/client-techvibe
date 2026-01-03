// lib/api.ts
export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
        cache: "force-cache", // SSR fresh data
        next: { revalidate: 2 * 60} // 2min revalidation time
    });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json()
    return data.data;
}

export async function getConsultants(params: {
    name?: string;
    page?: number;
    limit?: number;
    category?: string;
}) {
    const query = new URLSearchParams();
    if (params.name) query.set("search", params.name);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.category) query.set("category", params.category);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/consultants?${query.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch consultants");

    const data = await res.json()

    return data.data;
}

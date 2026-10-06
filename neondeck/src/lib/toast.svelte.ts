// Toast notifications. Put <Toaster /> once in the root layout, then call toast.create() anywhere.
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
	id: number;
	title: string;
	description?: string;
	type: ToastType;
}

export interface ToastOptions {
	title: string;
	description?: string;
	type?: ToastType;
	duration?: number; // ms; 0 keeps it until dismissed. Errors default to 8s, others 5s.
}

let items = $state<ToastItem[]>([]);
let next = 1;

export const toast = {
	get items(): ToastItem[] {
		return items;
	},
	create({ title, description, type = 'info', duration }: ToastOptions): number {
		const id = next++;
		items = [...items, { id, title, description, type }];
		const ms = duration ?? (type === 'error' ? 8000 : 5000);
		if (ms > 0) setTimeout(() => toast.dismiss(id), ms);
		return id;
	},
	dismiss(id: number) {
		items = items.filter((t) => t.id !== id);
	}
};

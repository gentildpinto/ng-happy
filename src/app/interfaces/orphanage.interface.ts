import { Image } from './image.interface';

export interface Orphanage {
	id?: number;
	name: string;
	latitude: number;
	longitude: number;
	about: string;
	instructions: string;
	opened_hours: string;
	open_on_weekends: boolean;
	images?: Image[];
}

import {
	OnInit,
	OnDestroy,
	Component
} from '@angular/core';
import {
	latLng,
	tileLayer,
	marker,
	icon
} from 'leaflet';
import * as Leaflet from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Orphanage } from '../../interfaces/orphanage.interface';
import { OprhanageService } from 'src/app/services/oprhanage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-orphanage',
	templateUrl: './orphanage.component.html',
	styleUrls: ['./orphanage.component.scss']
})
export class OrphanageComponent implements OnInit, OnDestroy {

	private _options: any;
	private _map: Leaflet.Map;
	public orphanage: Orphanage;
	private _activeImageIndex = 0;
	private _destroy$: Subject<boolean> = new Subject<boolean>();

	private _markerIcon = {
		icon: Leaflet.icon({
			iconUrl: 'assets/images/map-marker.svg',
			iconSize: [58, 68],
			iconAnchor: [29, 68],
			popupAnchor: [0, -60]
		})
	};

	constructor(
		private _route: ActivatedRoute,
		private _oprhanageService: OprhanageService
	) { }

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			this._oprhanageService.getOrphanage(params.id)
				.pipe(takeUntil(this._destroy$))
				.subscribe((orphanage: Orphanage) => {
					this.orphanage = orphanage;
					this.initMap();
				});
		});
	}

	ngOnDestroy(): void {
		this._destroy$.next(true);
		this._destroy$.unsubscribe();
	}

	private initMap(): void {
		this._options = {
			layers: [
				tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '' })
			],
			zoom: 16,
			center: latLng(this.orphanage.latitude, this.orphanage.longitude),
			position: [this.orphanage.latitude, this.orphanage.longitude],
			dragging: false,
			touchZoom: false,
			zoomControl: false,
			scrollWhellZoom: false,
			doubleClickZoom: false,
			interactive: false,
			style: { width: '100%', height: '280px' },
		};
	}

	public get options(): any {
		return this._options;
	}

	public initMarkers(): void {
		Leaflet.marker([this.orphanage.latitude, this.orphanage.longitude], this._markerIcon)
			.addTo(this._map);
	}

	public onMapReady(map: Leaflet.Map): void {
		this._map = map;
		this.initMarkers();
	}

	public get activeImageIndex(): number {
		return this._activeImageIndex;
	}

	public set activeImageIndex(value: number) {
		this._activeImageIndex = value;
	}

	public currentImage(index: number, orphanageImages: any): any {
		return orphanageImages.id;
	}
}

import {
	OnInit,
	ViewChild,
	Component,
	ElementRef,
	OnChanges,
	Renderer2
} from '@angular/core';
import {
	latLng,
	tileLayer,
	marker,
	icon,
	LeafletMouseEvent
} from 'leaflet';
import * as Leaflet from 'leaflet';
import {
	FormGroup,
	FormBuilder,
	FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OprhanageService } from './../../services/oprhanage.service';

@Component({
	selector: 'app-create-orphanage',
	templateUrl: './create-orphanage.component.html',
	styleUrls: ['./create-orphanage.component.scss']
})
export class CreateOrphanageComponent implements OnInit {

	public form: FormGroup;

	public previewImagesArray = [];
	private _map: Leaflet.Map;
	private _options: object;
	private _position = {
		latitude: 0,
		longitude: 0
	};

	private _markerIcon = {
		icon: Leaflet.icon({
			iconUrl: 'assets/images/map-marker.svg',
			iconSize: [58, 68],
			iconAnchor: [29, 68],
			popupAnchor: [0, -60]
		})
	};

	public markers = Leaflet.layerGroup();

	constructor(
		public fb: FormBuilder,
		private _router: Router,
		private _renderer: Renderer2,
		private _sanitizer: DomSanitizer,
		private _oprhanageService: OprhanageService
	) {
		this.form = this.fb.group({
			name: '',
			latitude: '',
			longitude: '',
			about: '',
			instructions: '',
			opened_hours: '',
			open_on_weekends: '',
			images: [null],
		});
	}

	ngOnInit(): void {
		this._options = {
			layers: [
				tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
			],
			zoom: 15,
			center: latLng(-8.9179403, 13.200951799999999)
		};
	}

	public get position(): object {
		return this._position;
	}

	public onMapReady(map: Leaflet.Map): void {
		map.on('click', (e: LeafletMouseEvent) => {
			const { lat, lng } = e.latlng;

			this._position = {
				latitude: lat,
				longitude: lng
			};
			if (this._position.latitude !== 0) {
				this.removeMarkers();
				const m = Leaflet.marker(
					[this._position.latitude, this._position.longitude],
					this._markerIcon,
				);
				this.markers.addLayer(m);
				this._map.addLayer(this.markers);
			}

			this.form.patchValue({
				latitude: lat,
				longitude: lng
			});
		});
		this._map = map;
	}

	public removeMarkers(): void {
		this.markers.clearLayers();
	}

	public get options(): any {
		return this._options;
	}

	// private set Images(images: Array<any>) {
	//     this.images.nativeElement = images;
	// }

	public set previewImages(previewImages: Array<any>) {
		this.previewImagesArray = previewImages;
	}

	public get previewImages(): Array<any> {
		return this.previewImagesArray;
	}

	public handleSelectImages(event: any): void {
		const files = (event.target as HTMLInputElement).files;
		const selectedImages = Array.from(files);
		selectedImages.map(image => {
			return this.previewImagesArray.push(this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image)));
		});

		this.form.patchValue({
			images: files
		});
		this.form.get('images').updateValueAndValidity();
	}

	public toggleSelect(event: any): void {
		document
			.querySelectorAll('.button-select button')
			.forEach(btn => btn.classList.remove('active'));

		this._renderer.addClass(event.target, 'active');
		this.form.patchValue({
			open_on_weekends: event.currentTarget.dataset.value
		});

		// const input = document.querySelector('[name="open_on_weekends"]');
		// input.value = button.dataset.value;
	}

	public submit(): void {
		const formData = new FormData();
		formData.append('name', this.form.get('name').value);
		formData.append('latitude', this.form.get('latitude').value);
		formData.append('longitude', this.form.get('longitude').value);
		formData.append('about', this.form.get('about').value);
		formData.append('instructions', this.form.get('instructions').value);
		formData.append('opened_hours', this.form.get('opened_hours').value);
		formData.append('open_on_weekends', this.form.get('open_on_weekends').value);

		const files = Array.from(this.form.get('images').value);
		files.map((image: File) => {
			formData.append('images', image);
		});

		this._oprhanageService.storeOrphanage(formData)
			.subscribe(
				(response: any) => {
					console.log(response);
					this._router.navigate(['/orphanages']);
				},
				(error: any) => {
					console.log(error);
				}
			);
	}
}

import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Map, map, LatLngTuple, tileLayer, icon, Marker, LatLngExpression, marker, LeafletMouseEvent, LatLng } from 'leaflet';
import { tap } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() order!: Order
  @Input() readonly = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'assets/marker.png',
    iconSize: [22,34],
    iconAnchor: [21, 42]
  })
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', {static: true}) 
  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
   
  constructor(private service: LocationService) { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initMap();

    if(this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    const map = this.map;
    this.setMarker(this.addressLatLng);
    map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    map.dragging.disable();
    map.touchZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.off('click');
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation(){
    this.service.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng: LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng) {

    if (!latlng.lat.toFixed) return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}

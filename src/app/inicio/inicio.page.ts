import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GoogleMap } from '@capacitor/google-maps';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Petrol', weight: 1200, symbol: 'PET' },
  { position: 2, name: 'Diesel', weight: 4100, symbol: 'DIE' },
  { position: 3, name: 'LPG', weight: 800, symbol: 'LPG' },
  { position: 4, name: 'Natural Gas', weight: 1000, symbol: 'NG' },
  { position: 5, name: 'Ethanol', weight: 1300, symbol: 'ET' },
  { position: 6, name: 'Electric', weight: 150, symbol: 'ELEC' },
  { position: 7, name: 'Hydrogen', weight: 2500, symbol: 'H2' },
  { position: 8, name: 'Biodiesel', weight: 1200, symbol: 'BD' },
  { position: 9, name: 'Methanol', weight: 1400, symbol: 'MEOH' },
  { position: 10, name: 'Propano', weight: 900, symbol: 'PROP' },
];

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterViewInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  map!: GoogleMap;

  constructor() {}

  async ngAfterViewInit() {
    // Inicializar Google Maps
    const mapElement = document.getElementById('map') as HTMLElement;

    this.map = await GoogleMap.create({
      id: 'map-inicio', // ID único para el mapa
      element: mapElement,
      apiKey: 'AIzaSyD2oi1kGOVTlBuWkiU6C_Mw_8vlFa02Jc8',
      config: {
        center: {
          lat: 37.7749, 
          lng: -122.4194, 
        },
        zoom: 10,
      },
    });

    // Añadir un marcador
    await this.map.addMarkers([
      {
        coordinate: { lat: 37.7749, lng: -122.4194 },
        title: 'San Francisco',
        snippet: 'Bienvenido a San Francisco',
      },
    ]);
  }

  play() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.play();
    }
  }

  pause() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
  }

  stop() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
  }
}

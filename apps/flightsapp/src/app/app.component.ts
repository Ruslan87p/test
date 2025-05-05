import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayerComponent } from "./main-layer/main-layer.component";

@Component({
  imports: [RouterModule, MainLayerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'flightsapp';
}

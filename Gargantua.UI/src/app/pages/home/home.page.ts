import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Benchmark } from '@gargantua/domain/benchmark/benchmark.model';
import { AuthService } from '@gargantua/shared/auth/auth.service';
import { Base } from '@gargantua/shared/components/base/base.component';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        MatButtonModule
    ],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage extends Base {    
    private readonly httpClient = inject(HttpClient);
    private readonly authService = inject(AuthService);

    protected test() {
        this.httpClient
            .get<Benchmark[]>('https://localhost:7242/api/Benchmark')
            .pipe(takeUntil(this.destroy$))
            .subscribe((benchmarks) => {
                benchmarks.forEach((benchmark) => {
                    const documentParsed = JSON.parse(benchmark.Document);
    
                    const date = benchmark.DateTimeUtc;
                    const id = benchmark.Id;
                    const scenario = benchmark.Scenario;
                    const badResponses = documentParsed?.jobs?.load?.results['bombardier/badresponses'];
                    const maxLatency = documentParsed?.jobs?.load?.results['bombardier/latency/max'];
                    const avgLatency = documentParsed?.jobs?.load?.results['bombardier/latency/mean'];
                    const requests = documentParsed?.jobs?.load?.results['bombardier/requests'];

                    console.error({ id, date, scenario, badResponses, maxLatency, avgLatency, requests });
                });
            });
    }

    protected logout() {
        this.authService.logout();
    }
}
